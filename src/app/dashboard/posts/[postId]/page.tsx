import DeleteButton from "@/components/dashboard/DeleteButton"
import BlogMedia from "@/components/sections/blog-posts/BlogMedia"
import { Button } from "@/components/ui/Button"
import { HeartTick } from "@/components/ui/Ticks"
import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { SessionPayload } from "@/lib/sessions"
import { User } from "@/types/auth"
import { Post, SafePost } from "@/types/post"
import { formatPostDate } from "@/utils/formatPostDate"
import { dashedToCapitalized } from "@/utils/textFormat"
import { ObjectId, WithId } from "mongodb"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { BiCommentDetail } from "react-icons/bi"
import { FaEdit } from "react-icons/fa";

type PostDetailPageProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const { postId } = await params

    return (
        <>
            <Suspense fallback={<SkeletonLoading />}>
                <PostDetailMain id={postId} authUser={authUser} />
            </Suspense>
        </>
    )
}

const serializePost = (post: WithId<Post>): SafePost => {
    return { ...post, id: post._id.toString(), userId: post.userId.toString() }
}

async function PostDetailMain({ id, authUser }: { id: string, authUser: SessionPayload }) {

    let post: SafePost | null = null

    try {
        const postsCollection = await getCollection<Post>("posts")
        if (!postsCollection) notFound()

        const rawPost = await postsCollection.findOne({ _id: ObjectId.createFromHexString(id) })
        if (!rawPost) notFound()

        post = serializePost(rawPost)
    } catch {
        notFound()
    }

    if (authUser.role !== "admin" && post.userId !== authUser.userId) notFound()

    let authorName: string | null = null

    try {
        const usersCollection = await getCollection<User>("users")
        if (usersCollection) {
            const user = await usersCollection.findOne({ _id: ObjectId.createFromHexString(post.userId) })
            authorName = user?.username ?? null
        }
    } catch {
        // non-critical, author name just won't show
    }

    const isOwner = authUser.role === "admin" || post.userId === authUser.userId

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} {post.title}
            </h2>
            <BlogMedia media={post.media} />
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
                <span>By {authorName}</span>
            </div>
            {/* Content */}
            <section className=" container my-12 px-6 mx-auto">
                <h2 className=" text-3xl font-semibold">{post.title}</h2>
                <div
                    className=" prose prose-neutral dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </section>
            {/* likes and comments */}
            <section className=" container mt-12 px-6 mx-auto flex gap-4 flex-wrap">
                <HeartTick size="large" variant="secondary" label="5" />
                <div className=" text-3xl text-muted p-2 rounded-lg flex items-center gap-2">
                    <span><BiCommentDetail /></span>
                    <span className=" text-2xl">3</span>
                </div>
            </section>
            <section className=" container mb-12 px-6 mx-auto flex gap-4 flex-wrap">
                {
                    post.status === "draft" ? (
                        <p className=" text-muted font-semibold">Post saved as draft</p>
                    ) : post.status === "published" ? (
                        <p className=" text-muted font-semibold">Post published: <Link href={`/blog/${post.id}`} className=" text-primary hover:underline">View live</Link></p>
                    ) : (
                        <p className=" text-red-400 font-semibold">Post suspended, contact us for more details.</p>
                    )
                }
            </section>
            {isOwner && (
                <div className="container px-6 mx-auto flex gap-4">
                    <Link href={`/dashboard/posts/${id}/edit`}>
                        <Button text="Edit" icon={FaEdit} />
                    </Link>
                    <DeleteButton id={id} />
                </div>
            )}
        </>
    )
}

function SkeletonLoading() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <span className=" inline-block text-white/0 bg-muted/50 rounded-lg leading-none animate-pulse">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </h2>
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
            <div className=" container my-12 px-6 mx-auto flex flex-col items-start animate-pulse">
                <span className=" text-3xl font-semibold text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet consectetur adipisicing.</span>
                <span className=" text-2xl mt-3 text-white/0 py-1 px-3 rounded-lg bg-muted/40 leading-none">Lorem ipsum dolor sit amet.</span>
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
