"use client"

import { useState } from "react"
import { HeartTick } from "../ui/Ticks"
import { toggleLikeAction } from "@/actions/post"
import toast from "react-hot-toast"

type LikeButtonProps = {
    postId: string
    initialLiked: boolean
    initialCount: number
    size?: "small" | "medium" | "large" | "inherit"
    variant?: "primary" | "secondary"
    requireAuth?: boolean
}

export default function LikeButton({ postId, initialLiked, initialCount, size = "medium", variant = "primary", requireAuth = false }: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked)
    const [count, setCount] = useState(initialCount)

    const handleClick = async () => {
        if (requireAuth) {
            toast.error("Sign in to like posts")
            return
        }

        // optimistic update
        const nextLiked = !liked
        setLiked(nextLiked)
        setCount(c => nextLiked ? c + 1 : c - 1)

        const result = await toggleLikeAction(postId)
        if (!result.success) {
            // revert on failure
            setLiked(liked)
            setCount(count)
            toast.error(result.errors)
            return
        }

        setLiked(result.data.liked)
        setCount(result.data.likeCount)
    }

    return (
        // Keyed on `liked` so a server-action failure (which reverts local
        // state) forces HeartTick to remount with the correct value — it's
        // an uncontrolled component internally, so a prop change alone
        // wouldn't otherwise resync its displayed icon.
        <HeartTick
            key={String(liked)}
            size={size}
            variant={variant}
            isTicked={liked}
            label={String(count)}
            onTick={handleClick}
            onUntick={handleClick}
        />
    )
}
