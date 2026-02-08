import { PostCategory } from "@/types/post"

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