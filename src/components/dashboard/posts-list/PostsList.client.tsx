"use client"

import { ActionListItem } from "@/components/ui/ListItem"
import Pagination from "@/components/ui/Pagination"
import { Post } from "@/types/post"
import { defaultMedia } from "@/utils/appStore"
import { formatPostDate } from "@/utils/formatPostDate"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type PostsListClientProps = {
    posts: Post[]
}

const POSTS_PER_PAGE = 10

export default function PostsListClient({ posts }: PostsListClientProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page") || 1)

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

    const startingIndex = (currentPage - 1) * POSTS_PER_PAGE

    const currentPosts = posts.slice(startingIndex, startingIndex + POSTS_PER_PAGE)

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())

        router.push(`/dashboard/posts?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        const container = document.getElementById("dashboard-scroll-container")

        container?.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [currentPage])

    if (currentPosts.length === 0) return <h3 className=" mt-4 text-3xl font-semibold text-center text-gray-400">No post yet</h3>

    return (
        <div className=" space-y-4">
            {
                currentPosts.map(post => (
                    <ActionListItem
                        key={post._id}
                        media={post.media[0] || defaultMedia}
                        mutedText={formatPostDate(post.createdAt)}
                        mainText={post.title}
                        contentText={post.content}
                        href={`/dashboard/posts/${post._id}`}
                        actionButton={{ action: "EDIT", href: `/dashboard/posts/${post._id}/edit` }}
                        deleteAction={{ for: "POSTS", id: post._id }}
                        status={{
                            variant: post.status === "published" ? "success" : "info",
                            text: post.status === "published" ? "Published" : "Draft"
                        }}
                    />
                ))
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setPage} /> 
        </div>
    )
}