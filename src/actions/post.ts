"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/media/cloudinary";
import { ActionResponse } from "@/types/action";
import { Post, PostFormData, PostMedia } from "@/types/post";
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator";
import { sanitizePostContent } from "@/utils/sanitizePostContent";
import { sendMail } from "@/lib/mail/sendMail";
import { getNewPostNotificationTemplate } from "@/lib/mail/templates/NewPostNotification";
import { slugify } from "@/utils/slugify";
import { createNotification } from "./notification";
import { Collection, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const MAX_MEDIA_ITEMS = 5

// Slug is generated once at creation and kept stable across edits, so
// published links never break just because the title was later tweaked.
async function generateUniqueSlug(postsCollection: Collection<Post>, title: string): Promise<string> {
    const base = slugify(title) || "post"
    let slug = base
    let suffix = 2

    while (await postsCollection.findOne({ slug })) {
        slug = `${base}-${suffix}`
        suffix++
    }

    return slug
}

// Moderation alert: lets the super admin catch inappropriate content shortly
// after it goes live, since there's no pre-publish review queue.
async function notifySuperAdminOfNewPost(postId: string, slug: string, title: string, authorName: string, category: string) {
    if (!process.env.SUPER_ADMIN_EMAIL) return

    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/posts/${postId}`
    const { subject, html } = getNewPostNotificationTemplate(title, authorName, category, postUrl, dashboardUrl)

    await sendMail({ to: process.env.SUPER_ADMIN_EMAIL, subject, html })
}

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
    if (uploadedMedia.length > MAX_MEDIA_ITEMS) {
        return { success: false, data, errors: { media: `Media cannot be more than ${MAX_MEDIA_ITEMS}` } }
    }

    const now = new Date()
    const slug = await generateUniqueSlug(postsCollection, data.title)
    const result = await postsCollection.insertOne({
        _id: new ObjectId(),
        title: data.title,
        slug,
        content: sanitizePostContent(data.content),
        status: data.status,
        userId: ObjectId.createFromHexString(authUser.userId),
        category: data.category,
        featured: false,
        media: uploadedMedia,
        likes: [],
        createdAt: now,
        updatedAt: now
    })

    if (data.status === "published") {
        await notifySuperAdminOfNewPost(result.insertedId.toString(), slug, data.title, authUser.username ?? "Unknown", data.category)
    }

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

    // Only the author can edit — admin moderation is limited to suspend/restore/delete
    if (existing.userId.toString() !== authUser.userId) redirect("/sign-in")

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

    if (finalMedia.length > MAX_MEDIA_ITEMS) {
        return { success: false, data, errors: { media: `Media cannot be more than ${MAX_MEDIA_ITEMS}` } }
    }

    // If currently suspended, lock the status — only admin can lift it later
    const finalStatus = existing.status === "suspended" ? "suspended" : data.status

    await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        {
            $set: {
                title: data.title,
                content: sanitizePostContent(data.content),
                status: finalStatus,
                category: data.category,
                media: finalMedia,
                updatedAt: new Date()
            }
        }
    )

    if (finalStatus === "published" && existing.status !== "published") {
        await notifySuperAdminOfNewPost(postId, existing.slug, data.title, authUser.username ?? "Unknown", data.category)
    }

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

    await createNotification(
        existingPost.userId.toString(),
        `Your post "${existingPost.title}" was suspended. You can still edit it while it's under review.`,
        `/dashboard/posts/${postId}`
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

    await createNotification(
        existingPost.userId.toString(),
        `Your post "${existingPost.title}" was restored and is live again.`,
        `/dashboard/posts/${postId}`
    )

    return { success: true, data: postId, errors: "" }
}

export async function toggleFeaturedAction(postId: string, featured: boolean): ActionResponse<string, string> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    // Deliberately not authUser.role === "admin" — featuring is reserved for
    // the super admin specifically, not every admin account. Guard against
    // SUPER_ADMIN_EMAIL being unset, which would otherwise match everyone.
    if (!process.env.SUPER_ADMIN_EMAIL || authUser.email !== process.env.SUPER_ADMIN_EMAIL) return {
        success: false,
        data: postId,
        errors: "Unauthorized"
    }

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: postId,
        errors: "Service temporarily unavailable"
    }

    const existingPost = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })
    if (!existingPost) return {
        success: false,
        data: postId,
        errors: "Post not found"
    }

    if (existingPost.status !== "published") return {
        success: false,
        data: postId,
        errors: "Only published posts can be featured"
    }

    await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        { $set: { featured, updatedAt: new Date() } }
    )

    if (featured) {
        await createNotification(
            existingPost.userId.toString(),
            `Your post "${existingPost.title}" was marked as featured.`,
            `/dashboard/posts/${postId}`
        )
    }

    return { success: true, data: postId, errors: "" }
}

export async function toggleLikeAction(postId: string): ActionResponse<{ liked: boolean, likeCount: number }, string> {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const postsCollection = await getCollection<Post>("posts")
    if (!postsCollection) return {
        success: false,
        data: { liked: false, likeCount: 0 },
        errors: "Service temporarily unavailable"
    }

    const post = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId), status: "published" })
    if (!post) return { success: false, data: { liked: false, likeCount: 0 }, errors: "Post not found" }

    const alreadyLiked = post.likes.includes(authUser.userId)

    await postsCollection.updateOne(
        { _id: post._id },
        alreadyLiked
            ? { $pull: { likes: authUser.userId } }
            : { $addToSet: { likes: authUser.userId } }
    )

    return {
        success: true,
        data: { liked: !alreadyLiked, likeCount: alreadyLiked ? post.likes.length - 1 : post.likes.length + 1 },
        errors: ""
    }
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

    // Only the author can delete — admin moderation is suspend/restore, not deletion,
    // so an author can still fix and republish flagged content instead of losing it
    if (existing.userId.toString() !== authUser.userId) redirect("/sign-in")

    if (existing.status === "suspended") return {
        success: false,
        data: postId,
        errors: "Suspended posts cannot be deleted. Contact an admin to review the suspension."
    }

    if (existing.media && existing.media.length > 0) {
        await Promise.allSettled(existing.media.map(m => deleteFromCloudinary(m.url)))
    }

    await postsCollection.deleteOne({ _id: ObjectId.createFromHexString(postId) })

    return { success: true, data: postId, errors: "" }
}