import PageHeader from "@/components/layout/PageHeader";
import BlogPosts from "@/components/sections/blog-posts/BlogPosts.server";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read articles, tutorials, and stories on writing, design, technology, and modern publishing.",
    openGraph: {
        title: "Blog | Bloggers Blog",
        description:
            "Insights, tutorials, and stories from writers on Bloggers Blog.",
        url: `${siteUrl}/blog`,
    },
}


export default function BlogPage() {

    return (
        <div className=" flex-1">
            <PageHeader title="Blog" subtitle="Insights, tutorials, and stories from writers building on Bloggers Blog." currentPage="Blog" />
            <BlogPosts />
        </div>
    )
}