import { PostCategory, PostMedia } from "@/types/post"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const postCategories: PostCategory[] = [
    "architecture",
    "design",
    "productivity",
    "technology",
    "tutorial",
    "web-development",
    "others"
]

export const periods = [
    "newest-first",
    "oldest-first",
    "this-month",
    "this-year"
]

export const defaultMedia: PostMedia = {
    url: "/assets/3d-logo.png",
    type: "image",
    filename: "Bloggers Blog",
    size: 986000,
    uploadedAt: new Date()
}