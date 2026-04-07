import { Suspense } from "react";
import BlogFilter from "./BlogFilter";
import BlogPostsClient from "./BlogPosts.client";
import { getCollection } from "@/lib/db";
import { Post, PostCategory, SafePost } from "@/types/post";
import { User } from "@/types/auth"; // adjust to your User type
import { ObjectId, Filter } from "mongodb";
import { stripHtml } from "@/utils/stripHTML";
import { periods } from "@/utils/appStore";

const POSTS_PER_PAGE = 6;

type SearchParams = {
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
};

type BlogPostsProps = {
    searchParams: SearchParams;
};

export default function BlogPosts({ searchParams }: BlogPostsProps) {
    return (
        <section id="blog-section" className="py-12 container px-6 mx-auto">
            <BlogFilter />
            <Suspense fallback={<SkeletonLoading />}>
                <BlogFetch searchParams={searchParams} />
            </Suspense>
        </section>
    );
}

async function BlogFetch({ searchParams }: BlogPostsProps) {
    const { search, category, sort, page } = searchParams;

    const currentPage = Math.max(1, Number(page) || 1);
    const skip = (currentPage - 1) * POSTS_PER_PAGE;

    // Build MongoDB filter
    const filter: Filter<Post> = {
        status: "published", // never expose drafts or suspended posts
    };

    if (search?.trim()) {
        filter.$or = [
            { title: { $regex: search.trim(), $options: "i" } },
            { content: { $regex: search.trim(), $options: "i" } },
        ];
    }

    if (category && category !== "all") {
        filter.category = category as PostCategory;
    }

    // Build sort order based on selected period
    const sortOrder = sort === periods[1]  // adjust based on your periods values
        ? { createdAt: 1 as const }
        : { createdAt: -1 as const };

    try {
        const postsCollection = await getCollection<Post>("posts");

        const [rawPosts, totalCount] = await Promise.all([
            postsCollection.find(filter).sort(sortOrder).skip(skip).limit(POSTS_PER_PAGE).toArray(),
            postsCollection.countDocuments(filter),
        ]);

        // Fetch authors in one query
        const userIds = [...new Set(rawPosts.map((p) => p.userId.toString()))];
        const usersCollection = await getCollection<User>("users");
        const users = await usersCollection
            .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
            .toArray();

        const usersMap: Record<string, string> = Object.fromEntries(
            users.map((u) => [u._id.toString(), u.username]) // adjust u.name to your field
        );

        const posts: SafePost[] = rawPosts.map(({ _id, userId, ...rest }) => ({
            ...rest,
            id: _id.toString(),
            userId: userId.toString(),
            authorName: usersMap[userId.toString()] ?? "Unknown",
            content: stripHtml(rest.content),
        }));

        const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

        return (
            <BlogPostsClient
                posts={posts}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        );
    } catch {
        throw new Error("Failed to load posts");
    }
}

function SkeletonCard() {
    return (
        <div className="relative rounded-xl h-100 border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 -translate-x-full animate-shimmer">
                    <div className="h-full w-[200%] bg-linear-to-r from-transparent via-white/95 dark:via-white/15 to-transparent skew-x-[-20deg]" />
                </div>
            </div>
            <div className="absolute top-4 left-4">
                <span className="text-xs font-medium text-white/0 capitalize py-1 px-3 rounded bg-muted/40">
                    Lorem, ipsum.
                </span>
            </div>
            <div className="absolute top-4 right-4">
                <div className="p-2 bg-muted/40 text-white/0 rounded-lg leading-none text-xl">1O</div>
            </div>
            <div className="absolute bottom-0 w-full p-4 text-white/0">
                <div className="text-xl mb-2 bg-muted/40 rounded-lg leading-none">Lorem ipsum dolor sit amet consectetur.</div>
                <div className="mb-2 text-sm w-full bg-muted/40 rounded-lg leading-none">text</div>
                <div className="mb-4 text-sm w-1/2 bg-muted/40 rounded-lg leading-none">text</div>
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
        <>
            <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
            <div className="mt-20 flex items-center justify-center gap-1 md:gap-2">
                <div className="rounded-full bg-muted/40 px-3 py-2 text-sm text-white/0">Prev</div>
                {[1, 2].map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-muted/40 rounded-full" />
                ))}
                <div className="rounded-full bg-muted/40 px-3 py-2 text-sm text-white/0">Next</div>
            </div>
        </>
    );
}