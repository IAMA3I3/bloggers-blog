import { mockPosts } from "@/temp/postsData"
import PostsListClient from "./PostsList.client"

export default async function PostsList() {

    await new Promise(res => setTimeout(res, 2000))

    const posts = mockPosts

    return <PostsListClient posts={posts} />
}