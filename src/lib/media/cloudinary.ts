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

export async function deleteFromCloudinary(url: string): Promise<void> {
    // Extract public_id from the Cloudinary URL
    // e.g. https://res.cloudinary.com/cloud/image/upload/v123456/posts/filename.jpg
    //                                                                 ^^^^^^^^^^^^^^^^^ this is the public_id
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/)
    if (!matches) throw new Error(`Could not extract public_id from URL: ${url}`)

    const publicId = matches[1] // e.g. "posts/filename"
    const isVideo = url.includes("/video/upload/")

    await cloudinary.uploader.destroy(publicId, {
        resource_type: isVideo ? "video" : "image"
    })
}