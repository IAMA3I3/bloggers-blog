import { PostFormData } from "@/types/post"

export type PostFormError = {
    default?: string
    title?: string
    content?: string
    media?: string
    status?: string
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024      // 5MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024     // 20MB

export function validatePost(data: PostFormData) {
    let errors: PostFormError = {}

    // title
    if (data.title.trim() === "") {
        errors.title = "Title is required"
    } else if (data.title.length < 3) {
        errors.title = "Title must be at least 3 characters"
    } else if (data.title.length > 70) {
        errors.title = "Title cannot be more than 70 characters"
    }

    // content
    if (data.content.trim() === "" || data.content === "<p></p>") {
        errors.content = "Content is required"
    }

    // media
    if (data.media) {
        data.media.map(m => {
            if (m.type.startsWith("image") && m.size > MAX_IMAGE_SIZE) {
                errors.media = "Image must not exceed 5MB"
            }
            if (m.type.startsWith("video") && m.size > MAX_VIDEO_SIZE) {
                errors.media = "Video must not exceed 20MB"
            }
        })

        if (data.media.length > 5) {
            errors.media = "Media cannot be more than 5"
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}