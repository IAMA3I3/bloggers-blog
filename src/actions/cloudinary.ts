// src/actions/cloudinary.ts
"use server"

import { v2 as cloudinary } from "cloudinary"
import getAuthUser from "@/lib/auth/getAuthUser"
import { redirect } from "next/navigation"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getCloudinarySignature(isVideo: boolean) {
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    const timestamp = Math.round(new Date().getTime() / 1000)
    const allowedFormats = isVideo ? "mp4,webm,mov" : "jpg,jpeg,png,webp,gif"
    const params = { timestamp, folder: "posts", allowed_formats: allowedFormats }

    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!)

    return {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        apiKey: process.env.CLOUDINARY_API_KEY!,
        resourceType: isVideo ? "video" : "image",
        allowedFormats,
    }
}