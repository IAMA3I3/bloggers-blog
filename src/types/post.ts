export type PostCategory = "web-development" | "productivity" | "architecture" | "design" | "technology" | "tutorial" | "others"

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
    featured: boolean
    media: PostMedia[] // Array of media files
    createdAt: Date
    updatedAt: Date
}

export type PostComment = {
    _id: string
    postId: string
    userId: string
    content: string
    createdAt: Date
    updatedAt: Date
}