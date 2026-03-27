import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File): Promise<{
    url: string
    type: "image" | "video"
    filename: string
    size: number
}> {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
        const isVideo = file.type.startsWith("video/")

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: isVideo ? "video" : "image",
                folder: "posts",
            },
            (error, result) => {
                if (error || !result) return reject(error)
                resolve({
                    url: result.secure_url,
                    type: isVideo ? "video" : "image",
                    filename: file.name,
                    size: file.size,
                })
            }
        )
        stream.end(buffer)
    })
}