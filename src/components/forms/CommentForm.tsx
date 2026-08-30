"use client"

import { IoIosSend } from "react-icons/io"
import { Button } from "../ui/Button"
import { Textarea } from "../ui/Input"
import toast from "react-hot-toast"
import { FormEvent, useRef, useState } from "react"
import { createCommentAction } from "@/actions/comment"
import { useRouter } from "next/navigation"
import Link from "next/link"

type CommentFormProps = {
    postId: string
    isAuthenticated: boolean
}

export default function CommentForm({ postId, isAuthenticated }: CommentFormProps) {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    if (!isAuthenticated) {
        return (
            <p className="text-muted text-sm">
                <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link> to leave a comment.
            </p>
        )
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const content = (formData.get("content") as string || "").trim()

        if (content === "") {
            toast.error("Comment cannot be empty")
            return
        }

        setIsLoading(true)
        const result = await createCommentAction(postId, content)
        setIsLoading(false)

        if (!result.success) {
            toast.error(result.error || "Failed to post comment")
            return
        }

        formRef.current?.reset()
        toast.success("Comment posted")
        router.refresh()
    }

    return (
        <form ref={formRef} className=" w-full space-y-2" onSubmit={onSubmit}>
            <div className=" flex flex-col">
                <div className=" w-full max-w-2xl">
                    <Textarea
                        name="content"
                        rows={1}
                        placeholder="Type your comment"
                    />
                </div>
            </div>
            <Button text="Send" icon={IoIosSend} iconPosition="end" rounded isLoading={isLoading} />
        </form>
    )
}
