"use client"

import { ActionListItem } from "@/components/ui/ListItem"
import Pagination from "@/components/ui/Pagination"
import { SafePost } from "@/types/post"
import { defaultMedia } from "@/utils/appStore"
import { formatPostDate } from "@/utils/formatPostDate"
import { stripHtml } from "@/utils/stripHTML"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type PostsListClientProps = {
    posts: SafePost[]
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

    if (currentPosts.length === 0) return <h3 className=" mt-4 text-3xl font-semibold text-center text-gray-400">No post for this filter.</h3>

    return (
        <div className=" space-y-4">
            {
                currentPosts.map(post => (
                    <ActionListItem
                        key={post.id}
                        media={post.media[0] || defaultMedia}
                        mutedText={formatPostDate(post.createdAt)}
                        mainText={post.title}
                        contentText={stripHtml(post.content)}
                        href={`/dashboard/posts/${post.id}`}
                        actionButton={{ action: "EDIT", href: `/dashboard/posts/${post.id}/edit` }}
                        deleteAction={{ for: "POSTS", id: post.id }}
                        status={{
                            variant: post.status === "published" ? "success" : post.status === "draft" ? "info" : "secondary",
                            text: post.status === "published" ? "Published" : post.status === "draft" ? "Draft" : "Suspended"
                        }}
                    />
                ))
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setPage} /> 
        </div>
    )
}