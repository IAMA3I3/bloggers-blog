import { Suspense } from "react"
import BlogFilter from "./BlogFilter"
import BlogPostsClient from "./BlogPosts.client"
import { mockPosts } from "@/temp/postsData"

export default function BlogPosts() {

    return (
        <section id="blog-section" className=" py-12 container px-6 mx-auto">
            <BlogFilter />
            {/* <BlogPostsClient posts={posts} /> */}
            <Suspense fallback={<SkeletonLoading />}>
                <BlogFetch />
            </Suspense>
        </section>
    )
}

async function BlogFetch() {
    // await new Promise(res => setTimeout(res, 3000))

    const posts = mockPosts

    return <BlogPostsClient posts={[...posts, ...posts, ...posts, ...posts]} />
}

function SkeletonLoading() {
    return (
        <>
            <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    [1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div key={i} className="rounded-xl h-100 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden">
                            {/* Shimmer effect overlay */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 -translate-x-full animate-shimmer">
                                    <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                                </div>
                            </div>
                            <div className=" absolute top-4 left-4">
                                <span className=" text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                                    Lorem, ipsum.
                                </span>
                            </div>
                            <div className=" absolute top-4 right-4">
                                <div className=" p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">1O</div>
                            </div>
                            <div className=" absolute bottom-0 w-full p-4 text-white/0">
                                <div className=" text-xl mb-2 bg-muted/40 rounded-lg leading-none">Lorem ipsum dolor sit amet consectetur.</div>
                                <div className=" mb-2 text-sm w-full bg-muted/40 rounded-lg leading-none">text</div>
                                <div className=" mb-4 text-sm w-1/2 bg-muted/40 rounded-lg leading-none">text</div>
                                <div className=" flex items-center flex-wrap gap-4 text-sm font-semibold">
                                    <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                                    <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="mt-20 flex items-center justify-center gap-1 md:gap-2">
                <div className=" rounded-full bg-muted/40 px-3 py-2 text-sm text-white/0">Prev</div>
                {
                    [1, 2].map((_, i) => (
                        <div key={i} className=" h-8 w-8 bg-muted/40 rounded-full"></div>
                    ))
                }
                <div className=" rounded-full bg-muted/40 px-3 py-2 text-sm text-white/0">Next</div>
            </div>
        </>
    )
}