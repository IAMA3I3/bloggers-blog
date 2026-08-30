"use server"

import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { ActionResponseWithoutData } from "@/types/action"
import { Post, PostComment, SafeComment } from "@/types/post"
import { User } from "@/types/auth"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { createNotification } from "./notification"

const MAX_COMMENT_LENGTH = 1000

export async function getCommentsForPost(postId: string): Promise<SafeComment[]> {
    const commentsCollection = await getCollection<PostComment>("comments")
    const rawComments = await commentsCollection.find({ postId }).sort({ createdAt: -1 }).toArray()

    if (rawComments.length === 0) return []

    const userIds = [...new Set(rawComments.map((c) => c.userId.toString()))]
    const usersCollection = await getCollection<User>("users")
    const users = await usersCollection.find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } }).toArray()
    const usersMap: Record<string, string> = Object.fromEntries(users.map((u) => [u._id.toString(), u.username]))

    return rawComments.map(({ _id, userId, ...rest }) => ({
        ...rest,
        id: _id.toString(),
        userId: userId.toString(),
        authorName: usersMap[userId.toString()] ?? "Unknown",
    }))
}

export async function createCommentAction(postId: string, content: string): ActionResponseWithoutData {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const trimmed = content.trim()
    if (trimmed === "") return { success: false, error: "Comment cannot be empty" }
    if (trimmed.length > MAX_COMMENT_LENGTH) return { success: false, error: `Comment cannot be more than ${MAX_COMMENT_LENGTH} characters` }

    const postsCollection = await getCollection<Post>("posts")
    const post = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId), status: "published" })
    if (!post) return { success: false, error: "Post not found" }

    const commentsCollection = await getCollection<PostComment>("comments")
    const now = new Date()
    await commentsCollection.insertOne({
        _id: new ObjectId(),
        postId,
        userId: ObjectId.createFromHexString(authUser.userId),
        content: trimmed,
        createdAt: now,
        updatedAt: now,
    })

    // Notify the post's author, unless they're commenting on their own post
    if (post.userId.toString() !== authUser.userId) {
        await createNotification(
            post.userId.toString(),
            `${authUser.username ?? "Someone"} commented on your post "${post.title}"`,
            `/dashboard/posts/${postId}`
        )
    }

    return { success: true }
}

export async function deleteCommentAction(commentId: string): ActionResponseWithoutData {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const commentsCollection = await getCollection<PostComment>("comments")
    const comment = await commentsCollection.findOne({ _id: ObjectId.createFromHexString(commentId) })
    if (!comment) return { success: false, error: "Comment not found" }

    if (authUser.role !== "admin" && comment.userId.toString() !== authUser.userId) {
        return { success: false, error: "Unauthorized" }
    }

    await commentsCollection.deleteOne({ _id: comment._id })

    return { success: true }
}
