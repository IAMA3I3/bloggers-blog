import { Post } from "@/types/post"
import BlogPostsClient from "./BlogPosts.client"
import { posts } from "@/app/temp/postsData"

export default function BlogPosts() {

    return (
        <section id="blog-section" className=" py-12 container px-6 mx-auto">
            {/* <BlogPostsClient posts={posts} /> */}
            <BlogPostsClient posts={[...posts, ...posts, ...posts, ...posts]} />
        </section>
    )
}