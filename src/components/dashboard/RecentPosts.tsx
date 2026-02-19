import { Post } from "@/types/post";
import { BasicCard } from "../containers/Cards";
import { LinkListItem } from "../ui/ListItem";
import { formatPostDate } from "@/utils/formatPostDate";
import { Suspense } from "react";
import { mockPosts } from "@/temp/postsData";

export default function RecentPosts() {

    return (
        <BasicCard noBackground>
            <h3 className="text-base sm:text-lg font-semibold mb-1">
                Recent Posts
            </h3>
            <Suspense fallback={<SkeletonLoading />}>
                <RenderPosts />
            </Suspense>
        </BasicCard>
    )
}

async function RenderPosts() {

    await new Promise(res => setTimeout(res, 5000))

    const posts: Post[] = mockPosts

    return (
        <div className=" space-y-2">
            {
                posts.length === 0 ? (
                    <h6 className=" text-gray-500 text-lg text-center font-semibold">No post yet</h6>
                ) : posts.slice(0, 3).map(post => (
                    <LinkListItem
                        key={post._id}
                        href={`/dashboard/posts/${post._id}`}
                        mutedText={formatPostDate(post.createdAt)}
                        text={post.title}
                        shadow
                    />
                ))
            }
        </div>
    )
}

function SkeletonLoading() {
    return (
        <div className=" space-y-2">
            {
                [1, 2, 3].map(i => (
                    <div key={i} className="block relative overflow-hidden py-2 px-4 bg-gray-100 dark:bg-slate-700 text-xs font-semibold rounded hover:bg-primary/20 hover:text-primary">
                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer">
                                <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/60 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                            </div>
                        </div>
                        <p className=" text-xs inline-block mb-1 text-white/0 bg-muted/50 rounded-lg leading-none">Lorem.</p>
                        <p className=" text-white/0 bg-muted/50 rounded-lg leading-none w-full">text</p>
                    </div>
                ))
            }
        </div>
    )
}