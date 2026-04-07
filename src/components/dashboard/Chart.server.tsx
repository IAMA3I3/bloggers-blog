import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { Post, SafePost } from "@/types/post"
import { Filter, ObjectId, WithId } from "mongodb"
import { redirect } from "next/navigation"
import Chart from "./Chart"

const serializePosts = (posts: WithId<Post>[]): SafePost[] => {
    return posts.map(({ _id, userId, ...rest }) => ({ ...rest, id: _id.toString(), userId: userId.toString() }))
}

export default async function ChartServer() {

    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    let posts: SafePost[] = []

    try {
        const postsCollection = await getCollection<Post>("posts")
        const query: Filter<Post> = {
            ...(authUser.role !== "admin" ? { userId: ObjectId.createFromHexString(authUser.userId) } : {}),
        }
        const rawPosts = await postsCollection.find(query).sort({ createdAt: -1 }).toArray()
        posts = serializePosts(rawPosts)
    } catch (err) {
        throw new Error("Failed to load posts")
    }

    return <Chart posts={posts} />
}