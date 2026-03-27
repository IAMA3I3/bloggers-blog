"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { ActionResponse } from "@/types/action";
import { Post, PostFormData } from "@/types/post";
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator";
import { redirect } from "next/navigation";

export async function createPostAction(data: PostFormData): ActionResponse<PostFormData, PostFormError> {

    // check auth user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    // validate data
    const { isValid, errors } = validatePost(data)
    if (!isValid) return { success: false, errors, data }

    const { title, content, media, status } = data

    // get or create the collection
    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return { success: false, data, errors: { default: "Service temporarily unavailable" } }

    // check if title already exists
    const existingTitle = await postsCollection.findOne({ title })
    if (existingTitle) return { success: false, data, errors: { title: "Post with the same title exists. try something different" } }

    // now
    const now = new Date()

    // insert into db
    await postsCollection.insertOne({title, content, status, createdAt: now, updatedAt: now} as Post)

    return { success: true, data, errors: {} }
}