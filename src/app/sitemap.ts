import { getCollection } from "@/lib/db"
import { Post } from "@/types/post"
import { siteUrl } from "@/utils/appStore"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: siteUrl, changeFrequency: "weekly", priority: 1 },
        { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.9 },
        { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
        { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
        { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ]

    try {
        const postsCollection = await getCollection<Post>("posts")
        const posts = await postsCollection
            .find({ status: "published" }, { projection: { slug: 1, updatedAt: 1 } })
            .toArray()

        const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: "weekly",
            priority: 0.7,
        }))

        return [...staticRoutes, ...postRoutes]
    } catch {
        return staticRoutes
    }
}
