import PageHeader from "@/components/layout/PageHeader"
import { Post } from "@/types/post"
import { formatPostDate } from "@/utils/formatPostDate"
import { dashedToCapitalized } from "@/utils/textFormat"
import { Suspense } from "react"
import BlogMedia from "@/components/sections/blog-posts/BlogMedia"
import { HeartTick } from "@/components/ui/Ticks"
import { BiCommentDetail } from "react-icons/bi";
import CommentForm from "@/components/forms/CommentForm"
import BlogComments from "@/components/sections/blog-details/BlogComments"
import { LoadingSpinner } from "@/components/ui/Loading"
import RelatedPosts from "@/components/sections/blog-details/RelatedPosts"

type BlogDetailProps = {
    params: Promise<{
        blogId: string
    }>
}

export default async function BlogDetails({ params }: BlogDetailProps) {
    const { blogId } = await params

    return (
        <article className=" flex-1">
            <Suspense fallback={<SkeletonLoading />}>
                <BlogDetailMain id={blogId} />
            </Suspense>
            {/* related post */}
            <RelatedPosts blogId={blogId} />
        </article>
    )
}

async function BlogDetailMain({ id }: { id: string }) {
    await new Promise(res => setTimeout(res, 2000))
    const post = mockPost // replace later

    return (
        <>
            <PageHeader title={`Blog Detail ${id} Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum`} parentPage={{ title: "Blog", href: "/blog" }} currentPage="Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor" />
            {/* Meta */}
            <div className="mt-4 container px-6 mx-auto flex flex-wrap gap-4 text-sm text-muted">
                <span className="capitalize">
                    {dashedToCapitalized(post.category)}
                </span>
                <span>•</span>
                <span>
                    {formatPostDate(post.createdAt)}
                </span>
                <span>•</span>
                <span>By Abdulazeez Salami</span>
            </div>
            {/* Media */}
            <BlogMedia media={post.media} />
            {/* Content */}
            <section className=" container my-12 px-6 mx-auto">
                <div
                    className=" prose prose-neutral dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </section>
            {/* likes and comments */}
            <section className=" container my-12 px-6 mx-auto flex gap-4 flex-wrap">
                <HeartTick size="large" variant="secondary" label="5" />
                <div className=" text-3xl text-muted p-2 rounded-lg flex items-center gap-2">
                    <span><BiCommentDetail /></span>
                    <span className=" text-2xl">3</span>
                </div>
            </section>
            {/* leave a comment */}
            <section className=" py-12 bg-gray-100 dark:bg-gray-900">
                <div className=" container px-6 mx-auto">
                    <h3 className=" text-2xl font-semibold mb-4">Leave a Comment</h3>
                    {/* <Link href={"/sign-in"} className=" text-muted hover:text-primary">Sign In to comment</Link> */}
                    {/* comment form */}
                    <CommentForm />
                    {/* comments */}
                    <div className=" py-4" />
                    <h4 className=" text-xl font-semibold mb-4">Comments</h4>
                    <Suspense fallback={<LoadingSpinner />}>
                        <BlogComments />
                    </Suspense>
                </div>
            </section>
        </>
    )
}

function SkeletonLoading() {
    return (
        <>
            <div className=" container px-6 pt-28 mx-auto">
                <div className=" relative overflow-hidden rounded-2xl p-8 border-2 border-border shadow-lg bg-linear-to-tr from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-black/20 dark:to-white/20 flex flex-col items-center">
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/70 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                    <span className=" text-2xl md:text-4xl text-center w-full max-w-200 text-white/0 py-1 px-3 rounded-xl bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                    <span className=" mt-2 w-full max-w-150 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                    <span className=" mt-4 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit.</span>
                </div>
            </div>
            <div className="mt-4 container px-6 mx-auto flex flex-wrap gap-4 text-sm text-muted animate-pulse">
                <span className="capitalize text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">
                    Lorem, ipsum.
                </span>
                <span>•</span>
                <span className=" text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">
                    Lorem.
                </span>
                <span>•</span>
                <span className=" text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem, ipsum dolor.</span>
            </div>
            <div className="my-8 container px-6 mx-auto">
                <div className="w-full relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer">
                            <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/70 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container my-12 px-6 mx-auto flex flex-col items-start animate-pulse">
                <span className=" text-2xl text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-2 text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-1 text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-1 text-base w-1/2 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-4 text-2xl text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-2 text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-1 text-base w-full text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
                <span className=" mt-1 text-base w-1/2 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
            </div>
        </>
    )
}

// mock — replace with DB fetch
const mockPost: Post = {
    _id: "1",
    title: "Building a Modern Blog with Next.js",
    content: `
  <p>Next.js makes building modern content platforms fast and scalable.</p>
  <p>This article explores architecture decisions, performance tips, and best practices.</p>
  <h2>Why Next.js?</h2>
  <p>Server components, SEO, and performance come out of the box.</p>
  `,
    userId: "user-1",
    category: "web-development",
    featured: true,
    status: "published",
    media: [
        {
            url: "https://picsum.photos/1200/700",
            type: "image",
            filename: "cover.jpg",
            size: 120000,
            uploadedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}