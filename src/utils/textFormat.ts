export function dashedToCapitalized(value: string): string {
  return value
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function toDashed(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
}
