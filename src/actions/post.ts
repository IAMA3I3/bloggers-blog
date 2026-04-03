"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
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
        media: [],
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

    // Parse the already-uploaded media URLs — no file upload needed here
    const uploadedMedia: PostMedia[] = JSON.parse(
        formData.get("uploadedMedia") as string || "[]"
    )

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