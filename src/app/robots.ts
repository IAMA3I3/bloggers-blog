import { siteUrl } from "@/utils/appStore"
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/api", "/sign-in", "/sign-up", "/forget-password", "/reset-password", "/verify-account"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    }
}
