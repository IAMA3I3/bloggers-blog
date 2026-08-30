const UPLOAD_MARKER = "/upload/"

// Inserts a Cloudinary delivery transform (e.g. "f_auto,q_auto,w_1200") right after
// "/upload/" in a Cloudinary URL. Non-Cloudinary URLs are returned unchanged so this
// is safe to call on any image src without checking the host first.
export function cldUrl(url: string, transform: string): string {
    if (!url.includes("res.cloudinary.com") || !url.includes(UPLOAD_MARKER)) return url

    const index = url.indexOf(UPLOAD_MARKER) + UPLOAD_MARKER.length
    return `${url.slice(0, index)}${transform}/${url.slice(index)}`
}
