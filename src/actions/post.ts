"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/media/cloudinary";
import { ActionResponse } from "@/types/action";
import { Post, PostFormData, PostMedia } from "@/types/post";
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData): ActionResponse<(PostFormData & { id: string }), PostFormError> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const data: PostFormData & { id: string } = {
        id: "",
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        status: formData.get("status") as PostFormData["status"],
        category: formData.get("category") as PostFormData["category"],
        media: [],
    }

    const { isValid, errors } = validatePost(data)
    if (!isValid) return { success: false, errors, data }

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return { success: false, data, errors: { default: "Service temporarily unavailable" } }

    const existingTitle = await postsCollection.findOne({ title: data.title })
    if (existingTitle) return { success: false, data, errors: { title: "A post with this title already exists" } }

    const uploadedMedia: PostMedia[] = JSON.parse(formData.get("uploadedMedia") as string || "[]")

    const now = new Date()
    const result = await postsCollection.insertOne({
        _id: new ObjectId(),
        title: data.title,
        content: data.content,
        status: data.status,
        userId: ObjectId.createFromHexString(authUser.userId),
        category: data.category,
        featured: false,
        media: uploadedMedia,
        createdAt: now,
        updatedAt: now
    })

    return { success: true, data: { ...data, id: result.insertedId.toString() }, errors: {} }
}

export async function updatePostAction(postId: string, formData: FormData): ActionResponse<(PostFormData & { id: string }), PostFormError> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: { id: postId, title: "", content: "", status: "draft", category: "others", media: [] },
        errors: { default: "Service temporarily unavailable" }
    }

    // Check post exists and user owns it
    const existing = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })
    if (!existing) return {
        success: false,
        data: { id: postId, title: "", content: "", status: "draft", category: "others", media: [] },
        errors: { default: "Post not found" }
    }

    if (authUser.role !== "admin" && existing.userId.toString() !== authUser.userId) redirect("/sign-in")

    const data: PostFormData & { id: string } = {
        id: postId,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        status: formData.get("status") as PostFormData["status"],
        category: formData.get("category") as PostFormData["category"],
        media: [],
    }

    const { isValid, errors } = validatePost(data)
    if (!isValid) return { success: false, errors, data }

    // Check title uniqueness — exclude the current post
    const duplicateTitle = await postsCollection.findOne({
        title: data.title,
        _id: { $ne: ObjectId.createFromHexString(postId) }
    })
    if (duplicateTitle) return { success: false, data, errors: { title: "A post with this title already exists" } }

    // Merge kept existing media + newly uploaded media
    const keptMedia: PostMedia[] = JSON.parse(formData.get("keptMedia") as string || "[]")
    const newMedia: PostMedia[] = JSON.parse(formData.get("uploadedMedia") as string || "[]")
    const finalMedia: PostMedia[] = [...keptMedia, ...newMedia]

    await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        {
            $set: {
                title: data.title,
                content: data.content,
                // If currently suspended, lock the status — only admin can lift it later
                status: existing.status === "suspended" ? "suspended" : data.status,
                category: data.category,
                media: finalMedia,
                updatedAt: new Date()
            }
        }
    )

    return { success: true, data: { ...data, id: postId }, errors: {} }
}

export async function suspendPostAction(postId: string): ActionResponse<string, string> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    if (authUser.role !== "admin") redirect("/sign-in")

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: postId,
        errors: "Service temporarily unavailable"
    }

    // check post exists
    const existingPost = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })
    if (!existingPost) return {
        success: false,
        data: postId,
        errors: "Post not found"
    }

    if (existingPost.status === "suspended") return {
        success: false,
        data: postId,
        errors: "Post is already suspended"
    }

    await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        {
            $set: {
                status: "suspended",
                updatedAt: new Date()
            }
        }
    )

    return { success: true, data: postId, errors: "" }
}

export async function restorePostAction(postId: string): ActionResponse<string, string> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    if (authUser.role !== "admin") redirect("/sign-in")

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: postId,
        errors: "Service temporarily unavailable"
    }

    // check post exists
    const existingPost = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })
    if (!existingPost) return {
        success: false,
        data: postId,
        errors: "Post not found"
    }

    if (existingPost.status !== "suspended") return {
        success: false,
        data: postId,
        errors: "Post is not suspended"
    }

    await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        {
            $set: {
                status: "published",
                updatedAt: new Date()
            }
        }
    )

    return { success: true, data: postId, errors: "" }
}

export async function deletePostAction(postId: string): ActionResponse<string, string> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: postId,
        errors: "Service temporarily unavailable"
    }

    // Check post exists and user owns it
    const existing = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })
    if (!existing) return {
        success: false,
        data: postId,
        errors: "Post not found"
    }

    if (authUser.role !== "admin" && existing.userId.toString() !== authUser.userId) redirect("/sign-in")

    if (authUser.role !== "admin" && existing.status === "suspended") return {
        success: false,
        data: postId,
        errors: "Suspended posts cannot be deleted"
    }

    if (existing.media && existing.media.length > 0) {
        await Promise.allSettled(existing.media.map(m => deleteFromCloudinary(m.url)))
    }

    await postsCollection.deleteOne({ _id: ObjectId.createFromHexString(postId) })

    return { success: true, data: postId, errors: "" }
}