import Link from "next/link"
import { Suspense } from "react"

type EditPageProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function EditPage({ params }: EditPageProps) {

    const { postId } = await params

    return (
        <Suspense fallback={<SkeletonLoading />}>
            <RenderPostsEdit id={postId} />
        </Suspense>
    )
}

async function RenderPostsEdit({ id }: { id: string }) {

    await new Promise(res => setTimeout(res, 2000))

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <Link href={`/dashboard/posts/${id}`} className=" text-muted hover:text-primary">{id}</Link> {"/"} Edit
            </h2>
        </>
    )
}

function SkeletonLoading() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <span className=" inline-block text-white/0 bg-muted/50 rounded-lg leading-none animate-pulse">text</span> {"/"} Edit
            </h2>
        </>
    )
}