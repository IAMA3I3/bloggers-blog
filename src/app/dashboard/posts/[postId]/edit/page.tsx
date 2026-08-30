import { PageCard } from "@/components/containers/Cards"
import PostForm from "@/components/forms/PostForm"
import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { SessionPayload } from "@/lib/sessions"
import { Post, PostFormData, SafePost } from "@/types/post"
import { ObjectId, WithId } from "mongodb"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"

type EditPageProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function EditPage({ params }: EditPageProps) {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    const { postId } = await params

    return (
        <Suspense fallback={<SkeletonLoading />}>
            <RenderPostsEdit id={postId} authUser={authUser} />
        </Suspense>
    )
}

const serializePost = (post: WithId<Post>): SafePost => {
    return { ...post, id: post._id.toString(), userId: post.userId.toString() }
}

async function RenderPostsEdit({ id, authUser }: { id: string, authUser: SessionPayload }) {

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

    // Only the author can edit — admin moderation is limited to suspend/restore/delete
    if (post.userId !== authUser.userId) notFound()

    const initialFormData: PostFormData = {
        title: post.title,
        content: post.content,
        existingMedia: post.media,
        status: post.status,
        category: post.category
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <Link href={`/dashboard/posts/${id}`} className=" text-muted hover:text-primary">{post.title}</Link> {"/"} Edit
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-4">Update Post</h3>
                <PostForm initialData={initialFormData} isEdit postId={id} />
            </PageCard>
        </>
    )
}

function SkeletonLoading() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <span className=" inline-block text-white/0 bg-muted/50 rounded-lg leading-none animate-pulse">text</span> {"/"} Edit
            </h2>
            <div className=" mx-auto w-full h-full relative overflow-hidden max-w-150 p-6 rounded-lg border-2 border-gray-100 dark:border-slate-800 dark:shadow-black/70 shadow-lg">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer">
                        <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                    </div>
                </div>
            </div>
        </>
    )
}
