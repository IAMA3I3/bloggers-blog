import { Suspense } from "react";
import { FeaturedPostCard } from "../posts/PostCard";
import Link from "next/link";
import { Button } from "../ui/Button";
import { FaArrowRight } from "react-icons/fa6";
import { Post, SafePost } from "@/types/post";
import { User } from "@/types/auth"; // adjust to your User type
import { WithId, ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { stripHtml } from "@/utils/stripHTML";

export default function FeaturedArticles() {
    return (
        <section className="bg-white dark:bg-background py-8">
            <div className="container px-6 mx-auto">
                {/* Section header */}
                <div className="mb-16 max-w-2xl">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        Featured content
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                        Read what matters
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Explore thoughtful articles written by developers and creators who
                        value clarity, depth, and real-world experience.
                    </p>
                </div>

                {/* Articles grid */}
                <Suspense fallback={<SkeletonLoading />}>
                    <FeaturedPostCards />
                </Suspense>

                <div className="mt-16">
                    <Link href="/blog">
                        <Button text="View More" icon={FaArrowRight} iconPosition="end" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const serializePosts = (
    posts: WithId<Post>[],
    usersMap: Record<string, string>
): SafePost[] => {
    return posts.map(({ _id, userId, ...rest }) => ({
        ...rest,
        id: _id.toString(),
        userId: userId.toString(),
        authorName: usersMap[userId.toString()] ?? "Unknown",
    }));
};

// ─── Async Server Component ──────────────────────────────────────────────────

async function FeaturedPostCards() {
    let posts: SafePost[] = [];

    try {
        // 1. Fetch latest 3 posts
        const postsCollection = await getCollection<Post>("posts");
        const rawPosts = await postsCollection
            .find({ featured: true })
            .sort({ createdAt: -1 })
            .limit(3)
            .toArray();

        // 2. Collect unique userIds
        const userIds = [...new Set(rawPosts.map((p) => p.userId.toString()))];

        // 3. Fetch matching users in one query
        const usersCollection = await getCollection<User>("users");
        const users = await usersCollection
            .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
            .toArray();

        // 4. Build userId -> authorName lookup map
        const usersMap: Record<string, string> = Object.fromEntries(
            users.map((u) => [u._id.toString(), u.username]) // adjust u.name to your field
        );

        // 5. Serialize
        posts = serializePosts(rawPosts, usersMap);
    } catch {
        throw new Error("Failed to load posts");
    }

    return (
        <div className="grid gap-8 lg:grid-cols-10">
            {/* Main (large) card */}
            <div className="lg:col-span-6">
                <FeaturedPostCard
                    category={posts[2].category}
                    id={posts[2].id}
                    media={posts[2].media}
                    title={posts[2].title}
                    content={stripHtml(posts[2].content)}
                    authorName={posts[2].authorName || ""}
                    createdAt={posts[2].createdAt}
                />
            </div>

            {/* Secondary (smaller) cards */}
            <div className="lg:col-span-4 space-y-8">
                {[posts[1], posts[0]].map((post) => (
                    <FeaturedPostCard
                        key={post.id}
                        variant="secondary"
                        category={post.category}
                        id={post.id}
                        media={post.media}
                        title={post.title}
                        content={stripHtml(post.content)}
                        authorName={post.authorName || ""}
                        createdAt={post.createdAt}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Skeleton Loader ─────────────────────────────────────────────────────────

function SkeletonCard({ className }: { className?: string }) {
    return (
        <div
            className={`relative rounded-xl border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden ${className}`}
        >
            {/* Shimmer */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 -translate-x-full animate-shimmer">
                    <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                </div>
            </div>

            {/* Top-left badge */}
            <div className="absolute top-4 left-4">
                <span className="text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                    Lorem, ipsum.
                </span>
            </div>

            {/* Top-right icon */}
            <div className="absolute top-4 right-4">
                <div className="p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">
                    1O
                </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 w-full p-4 text-white/0">
                <div className="mb-2 bg-muted/40 rounded-lg leading-none">
                    Lorem ipsum dolor sit amet consectetur.
                </div>
                <div className="mb-2 text-sm w-full bg-muted/40 rounded-lg leading-none">
                    text
                </div>
                <div className="mb-4 text-sm w-1/2 bg-muted/40 rounded-lg leading-none">
                    text
                </div>
                <div className="flex items-center flex-wrap gap-4 text-sm font-semibold">
                    <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                    <div className="bg-muted/40 rounded-lg leading-none">Lorem, ipsum.</div>
                </div>
            </div>
        </div>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid gap-8 lg:grid-cols-10">
            <div className="lg:col-span-6">
                <SkeletonCard className="h-100" />
            </div>
            <div className="lg:col-span-4 space-y-8">
                <SkeletonCard className="h-45" />
                <SkeletonCard className="h-45" />
            </div>
        </div>
    );
}