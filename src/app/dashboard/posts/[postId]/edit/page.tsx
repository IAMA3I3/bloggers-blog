import { PageCard } from "@/components/containers/Cards"
import PostForm from "@/components/forms/PostForm"
import { Post, PostFormData } from "@/types/post"
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

    const post = mockPost

    const initialFormData: PostFormData = {
        title: post.title,
        content: post.content,
        // media: post.media
        status: post.status
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} <Link href={`/dashboard/posts/${id}`} className=" text-muted hover:text-primary">{id}</Link> {"/"} Edit
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-4">Update Post</h3>
                <PostForm initialData={initialFormData} />
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