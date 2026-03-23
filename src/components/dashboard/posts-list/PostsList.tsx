import PostsListClient from "./PostsList.client"
import { Filter, WithId } from "mongodb"
import { Post, PostStatus, SafePost } from "@/types/post"
import { getCollection } from "@/lib/db"

type PostsListProps = {
    status?: PostStatus | "all"
}

const serializePosts = (posts: WithId<Post>[]): SafePost[] => {
    return posts.map(({ _id, ...rest }) => ({ ...rest, id: _id.toString() }))
}

export default async function PostsList({ status }: PostsListProps) {

    let posts: SafePost[] = []

    try {
        const postsCollection = await getCollection<Post>("posts")
        const query: Filter<Post> = status && status !== "all" ? { status } : {}
        const rawPosts = await postsCollection.find(query).sort({ createdAt: -1 }).toArray()
        posts = serializePosts(rawPosts)
    } catch (err) {
        throw new Error("Failed to load posts")
    }

    return <PostsListClient posts={posts} />
}