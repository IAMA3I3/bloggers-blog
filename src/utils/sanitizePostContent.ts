import sanitizeHtml from "sanitize-html"

// Post content is rendered with dangerouslySetInnerHTML on the public blog
// and dashboard preview, and any signed-up "user" can author a post — so the
// server, not the TipTap client editor, is what actually has to keep this safe.
// Allowlist matches exactly what src/utils/Richtexteditor.tsx can produce.
export function sanitizePostContent(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [
            "p", "br", "hr",
            "h1", "h2", "h3",
            "strong", "b", "em", "i", "u", "s", "strike", "del",
            "code", "pre", "blockquote",
            "ul", "ol", "li",
            "a", "span", "img",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel", "class"],
            span: ["style", "class"],
            img: ["src", "alt", "title", "class"],
        },
        allowedSchemes: ["http", "https", "mailto"],
        allowedStyles: {
            span: {
                color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/],
                "font-size": [/^\d{1,3}px$/],
            },
        },
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow", target: "_blank" }),
        },
    })
}
