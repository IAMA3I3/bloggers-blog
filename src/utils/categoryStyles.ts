import { PostCategory } from "@/types/post"

// Solid background so the tag stays legible over any cover image,
// unlike a translucent pill whose contrast depends on what's behind it.
export const CATEGORY_BADGE_COLOR: Record<PostCategory, string> = {
    "web-development": "bg-indigo-600",
    "productivity": "bg-emerald-600",
    "architecture": "bg-rose-600",
    "design": "bg-fuchsia-600",
    "technology": "bg-blue-600",
    "tutorial": "bg-amber-600",
    "others": "bg-slate-600",
}
