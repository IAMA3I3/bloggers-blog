import PostsListClient from "./PostsList.client"
import { Filter, ObjectId, WithId } from "mongodb"
import { Post, PostStatus, SafePost } from "@/types/post"
import { getCollection } from "@/lib/db"
import getAuthUser from "@/lib/auth/getAuthUser"
import { redirect } from "next/navigation"

type PostsListProps = {
    status?: PostStatus | "all"
}

const serializePosts = (posts: WithId<Post>[]): SafePost[] => {
    return posts.map(({ _id, userId, ...rest }) => ({ ...rest, id: _id.toString(), userId: userId.toString() }))
}

export default async function PostsList({ status }: PostsListProps) {

    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    let posts: SafePost[] = []

    try {
        const postsCollection = await getCollection<Post>("posts")
        const query: Filter<Post> = {
            ...(status && status !== "all" ? { status } : {}),
            ...(authUser.role !== "admin" ? { userId: ObjectId.createFromHexString(authUser.userId) } : {}),
        }
        const rawPosts = await postsCollection.find(query).sort({ createdAt: -1 }).toArray()
        posts = serializePosts(rawPosts)
    } catch (err) {
        throw new Error("Failed to load posts")
    }

    return <PostsListClient posts={posts} />
}