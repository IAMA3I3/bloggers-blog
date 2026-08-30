// src/lib/media/uploadToCloudinaryClient.ts
import { getCloudinarySignature } from "@/actions/cloudinary"
import { PostMedia } from "@/types/post"

export async function uploadFileToCloudinary(file: File): Promise<PostMedia> {
    const isVideo = file.type.startsWith("video/")
    const { signature, timestamp, cloudName, apiKey, resourceType, allowedFormats } =
        await getCloudinarySignature(isVideo)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("api_key", apiKey)
    formData.append("timestamp", String(timestamp))
    formData.append("signature", signature)
    formData.append("folder", "posts")
    formData.append("allowed_formats", allowedFormats)

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        { method: "POST", body: formData }
    )

    if (!res.ok) throw new Error(`Upload failed for ${file.name}`)

    const data = await res.json()
    return {
        url: data.secure_url,
        type: isVideo ? "video" : "image",
        filename: file.name,
        size: file.size,
        uploadedAt: new Date(),
    }
}