import { SafeComment } from "@/types/post"
import { BasicCard } from "../../containers/Cards"
import { formatPostDate } from "@/utils/formatPostDate"

export default async function BlogComments() {
    await new Promise(res => setTimeout(res, 2000))

    const comments: SafeComment[] = []

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
                        <p className=" text-xs font-semibold text-primary">UserName</p>
                        <p className=" text-xs font-semibold text-muted mb-2">{formatPostDate(comment.createdAt)}</p>
                        <p className=" text-sm">{comment.content}</p>
                    </BasicCard>
                ))
            }
        </div>
    )
}
