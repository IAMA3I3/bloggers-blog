import { FeaturedPostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Suspense } from "react"
import { Post, PostCategory, SafePost } from "@/types/post"
import { getCollection } from "@/lib/db"
import { ObjectId, WithId } from "mongodb"
import { stripHtml } from "@/utils/stripHTML"
import { User } from "@/types/auth"

type RelatedPostsProps = {
    id: string
    category: PostCategory
}

export default function RelatedPosts({ id, category }: RelatedPostsProps) {

    return (
        <section className=" py-12 container px-6 mx-auto">
            <h3 className=" text-2xl font-semibold mb-4">Related Posts</h3>
            <Suspense fallback={<SkeletonLoading />}>
                <FetchedRelatedPosts id={id} category={category} />
            </Suspense>
            <Link href={"/blog"} className=" mt-8 inline-block">
                <Button text="View all posts" rounded />
            </Link>
        </section>
    )
}

const serializePosts = (posts: WithId<Post>[], usersMap: Record<string, string>): SafePost[] => {
    return posts.map(({ _id, userId, ...rest }) => ({ ...rest, id: _id.toString(), userId: userId.toString(), authorName: usersMap[userId.toString()] ?? "Unknown" }))
}

async function FetchedRelatedPosts({ id, category }: { id: string; category: PostCategory }) {

    let relatedPosts: SafePost[] = []

    try {
        const postsCollection = await getCollection<Post>("posts")
        const rawPosts = await postsCollection.find({ category, status: "published", _id: { $ne: ObjectId.createFromHexString(id) } }).sort({ createdAt: -1 }).toArray()

        const userIds = [...new Set(rawPosts.map((p) => p.userId.toString()))]

        const usersCollection = await getCollection<User>("users")
        const users = await usersCollection.find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } }).toArray()

        const usersMap: Record<string, string> = Object.fromEntries(users.map((u) => [u._id.toString(), u.username]))

        relatedPosts = serializePosts(rawPosts, usersMap)
    } catch { }

    return (
        <>
            {
                relatedPosts.length === 0 ? (
                    <h6 className=" text-3xl font-semibold text-gray-400 dark:text-gray-500">No related post</h6>
                ) : (
                    <div className=" grid gap-8 grid-cols-1 lg:grid-cols-3">
                        {
                            relatedPosts.slice(0, 3).map(post => (
                                <FeaturedPostCard
                                    key={post.id}
                                    category={post.category}
                                    media={post.media}
                                    id={post.id}
                                    title={post.title}
                                    content={stripHtml(post.content)}
                                    authorName={post.authorName || ""}
                                    createdAt={post.createdAt}
                                />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

function SkeletonLoading() {
    return (
        <div className=" grid gap-8 grid-cols-1 lg:grid-cols-3">
            {
                [1, 2, 3].map((_, i) => (
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
    )
}