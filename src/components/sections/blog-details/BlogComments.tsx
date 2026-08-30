"use client"

import { SafeComment } from "@/types/post"
import { BasicCard } from "../../containers/Cards"
import { formatPostDate } from "@/utils/formatPostDate"
import { deleteCommentAction } from "@/actions/comment"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaTrashAlt } from "react-icons/fa"

type BlogCommentsProps = {
    comments: SafeComment[]
    currentUserId?: string
}

export default function BlogComments({ comments, currentUserId }: BlogCommentsProps) {
    const router = useRouter()

    const onDelete = async (commentId: string) => {
        const result = await deleteCommentAction(commentId)
        if (!result.success) {
            toast.error(result.error || "Failed to delete comment")
            return
        }
        toast.success("Comment deleted")
        router.refresh()
    }

    return (
        <div className=" grid gap-8 grid-cols-1 md:grid-cols-2">
            {
                comments.length === 0 && (
                    <h6 className=" text-3xl font-semibold text-gray-300 dark:text-gray-600">No comment yet</h6>
                )
            }
            {
                comments.map(comment => (
                    <BasicCard key={comment.id}>
                        <div className=" flex items-start justify-between gap-2">
                            <div>
                                <p className=" text-xs font-semibold text-primary">{comment.authorName}</p>
                                <p className=" text-xs font-semibold text-muted mb-2">{formatPostDate(comment.createdAt)}</p>
                            </div>
                            {
                                currentUserId === comment.userId && (
                                    <button
                                        onClick={() => onDelete(comment.id)}
                                        className=" text-muted hover:text-red-400 cursor-pointer"
                                        title="Delete comment"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )
                            }
                        </div>
                        <p className=" text-sm">{comment.content}</p>
                    </BasicCard>
                ))
            }
        </div>
    )
}
