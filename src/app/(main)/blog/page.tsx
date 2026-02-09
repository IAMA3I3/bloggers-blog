import PageHeader from "@/components/layout/PageHeader";
import BlogPosts from "@/components/sections/blog-posts/BlogPosts.server";
import CTA from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";
import Link from "next/link";

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

export default async function BlogPage() {

    return (
        <div className=" flex-1">
            <PageHeader title="Blog" subtitle="Insights, tutorials, and stories from writers building on Bloggers Blog." currentPage="Blog" />
            <BlogPosts />
            <CTA
                text="Ready to start writing?"
                subText="Join writers who value clarity, simplicity, and thoughtful publishing."
            >
                <Link href={"/sign-up"}>
                    <Button text="Create an account" rounded />
                </Link>
            </CTA>
        </div>
    )
}