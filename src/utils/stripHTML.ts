export const stripHtml = (html: string): string => {
  if (!html) return "";

  return html
    // Block-level elements → newlines
    .replace(/<\/?(h[1-6]|div|section|article|header|footer|blockquote)[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")

    // List items
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<\/li>/gi, "")

    // Horizontal rules
    .replace(/<hr\s*\/?>/gi, "\n---\n")

    // Decode common HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/gi, "") // strip any remaining unknown entities

    // Strip all remaining tags
    .replace(/<[^>]+>/g, "")

    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n") // collapse 3+ newlines
    .replace(/[ \t]+/g, " ")    // collapse spaces/tabs
    .replace(/^ +| +$/gm, "")   // trim each line
    .trim();
};