import { EditProfileFormData } from "@/types/auth"

export type EditProfileFormError = {
    default?: string
    username?: string
}

export function validateEditaProfile(data: EditProfileFormData) {
    let errors: EditProfileFormError = {}

    // USERNAME VALIDATION
    if (data.username.trim() === "") {
        errors.username = "Username is required"
    } else if (data.username.length < 3) {
        errors.username = "Username must be at least 3 characters"
    } else if (data.username.length > 20) {
        errors.username = "Username cannot be more than 20 characters"
    } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(data.username)) {
        errors.username =
            "Username can only contain letters, numbers, and underscore, and cannot start with a number"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}