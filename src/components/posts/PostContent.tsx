"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js"
import { cldUrl } from "@/utils/cloudinaryUrl"

type PostContentProps = {
    html: string
    className?: string
}

// Post content is stored as plain HTML (no language hint on code blocks, since
// the editor's toolbar doesn't offer a language picker), so highlighting runs
// client-side after mount with auto-detection rather than at save time.
export default function PostContent({ html, className }: PostContentProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        ref.current.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })

        // Belt-and-suspenders: sanitizePostContent already forces this on save,
        // but older/edge-case content may predate that rule.
        ref.current.querySelectorAll("a[href]").forEach((link) => {
            link.setAttribute("target", "_blank")
            link.setAttribute("rel", "noopener noreferrer nofollow")
        })

        // Route in-content images through Cloudinary's auto format/quality/resize
        // instead of shipping whatever size was originally uploaded.
        ref.current.querySelectorAll("img[src]").forEach((img, index) => {
            const src = img.getAttribute("src")
            if (!src) return
            img.setAttribute("src", cldUrl(src, "f_auto,q_auto,w_1400"))
            img.setAttribute("loading", index === 0 ? "eager" : "lazy")
        })
    }, [html])

    return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
