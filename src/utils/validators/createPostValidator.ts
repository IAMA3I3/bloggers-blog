import { PostFormData } from "@/types/post"

export type PostFormError = {
    default?: string
    title?: string
    content?: string
    media?: string
    status?: string
}

export function validatePost(data: PostFormData) {
    let errors: PostFormError = {}

    if (data.title.trim() === "") {
        errors.title = "Title is required"
    } else if (data.title.length < 3) {
        errors.title = "Title must be at least 3 characters"
    } else if (data.title.length > 70) {
        errors.title = "Title cannot be more than 70 characters"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}