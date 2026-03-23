import { ObjectId } from "mongodb"

export type PostCategory = "web-development" | "productivity" | "architecture" | "design" | "technology" | "tutorial" | "others"

export type MediaType = "image" | "video"

export type PostStatus = "published" | "draft" | "suspended"

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
    status: PostStatus
}

export type Post = {
    _id: ObjectId
    title: string
    content: string
    userId: string
    category: PostCategory
    featured: boolean
    media: PostMedia[] // Array of media files
    status: PostStatus
    createdAt: Date
    updatedAt: Date
}

export type PostComment = {
    _id: ObjectId
    postId: string
    userId: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export type SafePost = Omit<Post, "_id"> & { id: string }