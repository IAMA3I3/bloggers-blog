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
    existingMedia?: PostMedia[] // already uploaded, from DB
    status: PostStatus
    category: PostCategory
}

export type Post = {
    _id: ObjectId
    title: string
    content: string
    userId: ObjectId
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
    userId: ObjectId
    content: string
    createdAt: Date
    updatedAt: Date
}

export type SafePost = Omit<Post, "_id" | "userId"> & { id: string, userId: string }

export type SafeComment = Omit<PostComment, "_id" | "userId"> & { id: string, userId: string }