// Escapes regex metacharacters in user input before it's used inside a
// MongoDB $regex filter — unescaped input lets a search query double as an
// arbitrary (and potentially catastrophic-backtracking) regex pattern.
export function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
