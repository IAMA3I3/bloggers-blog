"use client"

import { Post } from "@/types/post"
import { useState } from "react"
import { FeaturedPostCard } from "@/components/posts/PostCard"
import Pagination from "@/components/ui/Pagination"
import { useRouter, useSearchParams } from "next/navigation"

type BlogPostsClientProps = {
    posts: Post[]
}

const POSTS_PER_PAGE = 6

export default function BlogPostsClient({ posts }: BlogPostsClientProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page") || 1)

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

    const startingIndex = (currentPage - 1) * POSTS_PER_PAGE

    const currentPosts = posts.slice(startingIndex, startingIndex + POSTS_PER_PAGE) // replace with mongoDB fetching later

    const scrollUp = () => {
        document.getElementById("blog-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())

        router.push(`/blog?${params.toString()}`, { scroll: false })
        scrollUp()
    }

    return (
        <>
            {/* blog grid */}
            <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    currentPosts.map(post => (
                        <FeaturedPostCard
                            key={post._id}
                            category={post.category}
                            media={post.media}
                            id={post._id}
                            title={post.title}
                            content={post.content}
                            authorName="Ali Baba"
                            createdAt={post.createdAt}
                        />
                    ))
                }
            </div>

            {/* Pagination */}
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setPage} onPageChange={scrollUp} />
        </>
    )
}