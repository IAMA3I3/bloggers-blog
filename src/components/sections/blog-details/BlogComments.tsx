import { PostComment } from "@/types/post"
import { BasicCard } from "../../containers/Cards"
import { formatPostDate } from "@/utils/formatPostDate"

export default async function BlogComments() {
    await new Promise(res => setTimeout(res, 2000))

    const comments = mockComments

    return (
        <div className=" grid gap-8 grid-cols-1 md:grid-cols-2">
            {
                comments.length === 0 && (
                    <h6 className=" text-3xl font-semibold text-gray-300 dark:text-gray-600">No comment yet</h6>
                )
            }
            {
                comments.map(comment => (
                    <BasicCard key={comment._id}>
                        <p className=" text-xs font-semibold text-primary">UserName</p>
                        <p className=" text-xs font-semibold text-muted mb-2">{formatPostDate(comment.createdAt)}</p>
                        <p className=" text-sm">{comment.content}</p>
                    </BasicCard>
                ))
            }
        </div>
    )
}

const mockComments: PostComment[] = [
    {
        _id: "c1",
        postId: "1",
        userId: "user_7",
        content:
            "This was a really clear introduction to React hooks. I especially liked how you explained useEffect with real-world examples. Looking forward to a follow-up post on custom hooks.",
        createdAt: new Date("2024-10-11T18:20:00"),
        updatedAt: new Date("2024-10-11T18:20:00"),
    },
    {
        _id: "c2",
        postId: "1",
        userId: "user_8",
        content:
            "Great article! I’ve been struggling with structuring my React components, and this gave me a better mental model.",
        createdAt: new Date("2024-10-12T09:40:00"),
        updatedAt: new Date("2024-10-12T09:40:00"),
    },
    {
        _id: "c3",
        postId: "3",
        userId: "user_9",
        content:
            "Clean Architecture finally makes sense after reading this. The separation of concerns section was particularly helpful.",
        createdAt: new Date("2024-08-19T14:10:00"),
        updatedAt: new Date("2024-08-19T14:10:00"),
    },
    {
        _id: "c4",
        postId: "5",
        userId: "user_10",
        content:
            "I’ve tried a few of these morning habits already, and they genuinely help. Cutting down phone usage in the first hour was a game changer.",
        createdAt: new Date("2024-06-10T11:05:00"),
        updatedAt: new Date("2024-06-10T11:05:00"),
    },
    {
        _id: "c5",
        postId: "7",
        userId: "user_11",
        content:
            "Nice comparison between Grid and Flexbox. The examples made it very easy to understand when to use each.",
        createdAt: new Date("2024-04-03T17:30:00"),
        updatedAt: new Date("2024-04-03T17:30:00"),
    },
    {
        _id: "c6",
        postId: "9",
        userId: "user_12",
        content:
            "Scalability is often overlooked early on. I appreciate how you emphasized maintainability, not just performance.",
        createdAt: new Date("2024-02-02T13:45:00"),
        updatedAt: new Date("2024-02-02T13:45:00"),
    },
    {
        _id: "c7",
        postId: "13",
        userId: "user_13",
        content:
            "The App Router explanation was solid. Would love to see a deep dive into server components next.",
        createdAt: new Date("2023-09-15T18:00:00"),
        updatedAt: new Date("2023-09-15T18:00:00"),
    },
    {
        _id: "c8",
        postId: "16",
        userId: "user_14",
        content:
            "This felt very real and relatable. Thanks for sharing lessons beyond just code.",
        createdAt: new Date("2023-06-11T10:00:00"),
        updatedAt: new Date("2023-06-11T10:00:00"),
    },
]
