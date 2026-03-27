"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/media/cloudinary";
import { ActionResponse } from "@/types/action";
import { Post, PostFormData, PostMedia } from "@/types/post";
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData): ActionResponse<(PostFormData & { id: string }), PostFormError> {

    // check auth user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    // Reconstruct PostFormData from FormData
    const data: PostFormData & { id: string } = {
        id: "",
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        status: formData.get("status") as PostFormData["status"],
        category: formData.get("category") as PostFormData["category"],
        media: formData.getAll("media").filter(f => f instanceof File && f.size > 0) as File[],
    }

    // validate data
    const { isValid, errors } = validatePost(data)
    if (!isValid) return { success: false, errors, data }

    // get or create the collection
    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return { success: false, data, errors: { default: "Service temporarily unavailable" } }

    // check if title already exists
    const existingTitle = await postsCollection.findOne({ title: data.title })
    if (existingTitle) return { success: false, data, errors: { title: "A post with this title already exists" } }

    // Upload all media files to Cloudinary in parallel
    let uploadedMedia: PostMedia[] = []
    if (data.media && data.media.length > 0) {
        try {
            const result = await Promise.all(data.media.map(uploadToCloudinary))
            const now = new Date()
            uploadedMedia = result.map(r => ({ ...r, uploadedAt: now }))
        } catch {
            return { success: false, data, errors: { media: "Media upload failed. Please try again." } }
        }
    }

    // now
    const now = new Date()

    // insert into db
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