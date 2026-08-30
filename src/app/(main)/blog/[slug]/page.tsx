import PageHeader from "@/components/layout/PageHeader"
import { Post, SafePost } from "@/types/post"
import { formatPostDate } from "@/utils/formatPostDate"
import { dashedToCapitalized } from "@/utils/textFormat"
import { Suspense } from "react"
import BlogMedia from "@/components/sections/blog-posts/BlogMedia"
import CommentForm from "@/components/forms/CommentForm"
import BlogComments from "@/components/sections/blog-details/BlogComments"
import RelatedPosts from "@/components/sections/blog-details/RelatedPosts"
import LikeButton from "@/components/posts/LikeButton"
import PostContent from "@/components/posts/PostContent"
import type { Metadata } from "next"
import { getCollection } from "@/lib/db"
import { getCommentsForPost } from "@/actions/comment"
import { User } from "@/types/auth"
import getAuthUser from "@/lib/auth/getAuthUser"
import { notFound } from "next/navigation"
import { siteUrl } from "@/utils/appStore"
import { stripHtml } from "@/utils/stripHTML"
import { BiCommentDetail } from "react-icons/bi"

type BlogDetailProps = {
    params: Promise<{ slug: string }>
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
    const { slug } = await params

    try {
        const postsCollection = await getCollection<Post>("posts")
        const post = await postsCollection.findOne({ slug, status: "published" })

        if (!post) {
            return {
                title: "Post Not Found",
                description: "This post does not exist or has been removed.",
            }
        }

        const plainContent = stripHtml(post.content).slice(0, 160)
        const coverImage = post.media?.[0]?.url
        const url = `${siteUrl}/blog/${slug}`

        return {
            title: post.title,
            description: plainContent,
            alternates: { canonical: url },
            openGraph: {
                title: `${post.title} | Bloggers Blog`,
                description: plainContent,
                url,
                type: "article",
                publishedTime: post.createdAt.toISOString(),
                modifiedTime: post.updatedAt.toISOString(),
                ...(coverImage && {
                    images: [{ url: coverImage, width: 1200, height: 700, alt: post.title }],
                }),
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: plainContent,
                ...(coverImage && { images: [coverImage] }),
            },
        }
    } catch {
        return {
            title: "Blog Post",
            description: "Read this article on Bloggers Blog.",
        }
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetails({ params }: BlogDetailProps) {
    const { slug } = await params

    return (
        <article className="flex-1">
            <Suspense fallback={<SkeletonLoading />}>
                <BlogDetailMain slug={slug} />
            </Suspense>
        </article>
    )
}

// ─── Main Content ─────────────────────────────────────────────────────────────

async function BlogDetailMain({ slug }: { slug: string }) {
    let post: SafePost

    try {
        const postsCollection = await getCollection<Post>("posts")
        const rawPost = await postsCollection.findOne({
            slug,
            status: "published",
        })

        if (!rawPost) return notFound()

        // Fetch author
        const usersCollection = await getCollection<User>("users")
        const author = await usersCollection.findOne({ _id: rawPost.userId })

        const { _id, userId, ...rest } = rawPost
        post = {
            ...rest,
            id: _id.toString(),
            userId: userId.toString(),
            authorName: author?.username ?? "Unknown",
        }
    } catch {
        return notFound()
    }

    const [authUser, comments] = await Promise.all([
        getAuthUser(),
        getCommentsForPost(post.id),
    ])

    const url = `${siteUrl}/blog/${slug}`
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: { "@type": "Person", name: post.authorName },
        image: post.media?.[0]?.url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: post.category,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PageHeader
                title={post.title}
                parentPage={{ title: "Blog", href: "/blog" }}
                currentPage={post.title}
            />

            {/* Meta */}
            <div className="mt-4 container px-6 mx-auto">
                <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-sm text-muted">
                    <span className="capitalize">
                        {dashedToCapitalized(post.category)}
                    </span>
                    <span>•</span>
                    <span>{formatPostDate(post.createdAt)}</span>
                    <span>•</span>
                    <span>By {post.authorName}</span>
                </div>
            </div>

            {/* Media */}
            <BlogMedia media={post.media} />

            {/* Content */}
            <section className="container my-12 px-6 mx-auto">
                <PostContent html={post.content} className="prose prose-neutral prose-invert max-w-3xl mx-auto text-lg" />
            </section>

            {/* Likes and comments count */}
            <section className="container my-12 px-6 mx-auto">
                <div className="max-w-3xl mx-auto flex gap-4 flex-wrap">
                    <LikeButton
                        postId={post.id}
                        initialLiked={!!authUser && post.likes.includes(authUser.userId)}
                        initialCount={post.likes.length}
                        size="large"
                        variant="secondary"
                        requireAuth={!authUser}
                    />
                    <div className="text-3xl text-muted p-2 rounded-lg flex items-center gap-2">
                        <span><BiCommentDetail /></span>
                        <span className="text-2xl">{comments.length}</span>
                    </div>
                </div>
            </section>

            {/* Comments */}
            <section className="py-12 bg-gray-100 dark:bg-gray-900">
                <div className="container px-6 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
                        <CommentForm postId={post.id} isAuthenticated={!!authUser} />
                        <div className="py-4" />
                        <h4 className="text-xl font-semibold mb-4">Comments</h4>
                        <BlogComments comments={comments} currentUserId={authUser?.userId} />
                    </div>
                </div>
            </section>
            <RelatedPosts id={post.id} category={post.category} />
        </>
    )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonLoading() {
    return (
        <>
            <div className="container px-6 pt-28 mx-auto">
                <div className="relative overflow-hidden rounded-2xl p-8 border-2 border-border shadow-lg bg-linear-to-tr from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-black/20 dark:to-white/20 flex flex-col items-center">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/70 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                    <span className="text-2xl md:text-4xl text-center w-full max-w-200 text-white/0 py-1 px-3 rounded-xl bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                    <span className="mt-2 w-full max-w-150 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                    <span className="mt-4 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                </div>
            </div>
            <div className="mt-4 container px-6 mx-auto flex flex-wrap gap-4 text-sm text-muted animate-pulse">
                <span className="text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem, ipsum.</span>
                <span>•</span>
                <span className="text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem.</span>
                <span>•</span>
                <span className="text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem, ipsum dolor.</span>
            </div>
            <div className="my-8 container px-6 mx-auto">
                <div className="w-full relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/70 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-12 px-6 mx-auto flex flex-col items-start animate-pulse">
                {Array.from({ length: 2 }).map((_, section) => (
                    <div key={section} className={`w-full ${section > 0 ? "mt-4" : ""}`}>
                        <span className="block text-2xl text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                        <span className="mt-2 block text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                        <span className="mt-1 block text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                        <span className="mt-1 block text-base w-1/2 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                    </div>
                ))}
            </div>
        </>
    )
}
