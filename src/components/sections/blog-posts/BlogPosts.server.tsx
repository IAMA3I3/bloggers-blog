import BlogFilter from "./BlogFilter"
import BlogPostsClient from "./BlogPosts.client"
import { posts } from "@/app/temp/postsData"

type BlogPostsProps = {
    searchQueries: {
        page?: string
        category?: string
        search?: string
        sort?: string
    }
}

export default function BlogPosts({ searchQueries }: BlogPostsProps) {

    return (
        <section id="blog-section" className=" py-12 container px-6 mx-auto">
            <BlogFilter />
            {/* <BlogPostsClient posts={posts} /> */}
            <BlogPostsClient posts={[...posts, ...posts, ...posts, ...posts]} />
        </section>
    )
}