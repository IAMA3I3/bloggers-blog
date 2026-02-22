import DeleteButton from "@/components/dashboard/DeleteButton"
import BlogMedia from "@/components/sections/blog-posts/BlogMedia"
import { Button } from "@/components/ui/Button"
import { Post } from "@/types/post"
import { formatPostDate } from "@/utils/formatPostDate"
import { dashedToCapitalized } from "@/utils/textFormat"
import Link from "next/link"
import { Suspense } from "react"
import { FaEdit } from "react-icons/fa";

type PostDetailPageProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {

    const { postId } = await params

    return (
        <>
            <Suspense fallback={<SkeletonLoading />}>
                <PostDetailMain id={postId} />
            </Suspense>
            <div className=" container px-6 mx-auto flex gap-4">
                <Link href={`/dashboard/posts/${postId}/edit`}>
                    <Button
                        text="Edit"
                        icon={FaEdit}
                    />
                </Link>
                {/* delete button */}
                <DeleteButton id={postId} />
            </div>
        </>
    )
}

async function PostDetailMain({ id }: { id: string }) {
    await new Promise(res => setTimeout(res, 2000))
    const post = mockPost // replace later

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/posts"} className=" text-muted hover:text-primary">Posts</Link> {"/"} {id} {post.title}
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
                <span>By Abdulazeez Salami</span>
            </div>
            {/* Content */}
            <section className=" container my-12 px-6 mx-auto">
                <h2 className=" text-3xl font-semibold">{post.title}</h2>
                <div
                    className=" prose prose-neutral dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </section>
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