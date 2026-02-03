export type PostCategory = "web-development" | "productivity" | "architecture" | "others"

export type MediaType = "image" | "video"

export type PostMedia = {
    url: string
    type: MediaType
    filename: string
    size: number // in bytes
    uploadedAt: Date
}

export type PostFormData = {
    title: string
    content: string
    media?: File[]
}

export type Post = {
    _id: string
    title: string
    content: string
    userId: string
    category: PostCategory
    media: PostMedia[] // Array of media files
    createdAt: Date
    updatedAt: Date
}