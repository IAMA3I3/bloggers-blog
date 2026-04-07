"use client"

import { SafePost } from "@/types/post";
import { FeaturedPostCard } from "@/components/posts/PostCard";
import Pagination from "@/components/ui/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

type BlogPostsClientProps = {
    posts: SafePost[];
    totalPages: number;
    currentPage: number;
};

export default function BlogPostsClient({ posts, totalPages, currentPage }: BlogPostsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const scrollUp = () => {
        document.getElementById("blog-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/blog?${params.toString()}`, { scroll: false });
        scrollUp();
    };

    if (posts.length === 0) {
        return (
            <div className="mt-16 flex flex-col items-center justify-center text-center gap-2">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">No posts found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <>
            <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <FeaturedPostCard
                        key={post.id}
                        category={post.category}
                        media={post.media}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        authorName={post.authorName || ""}
                        createdAt={post.createdAt}
                    />
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setPage}
                onPageChange={scrollUp}
            />
        </>
    );
}