import { SignUpFormData } from "@/types/auth"

export type SignUpFormError = {
    default?: string
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export function validateSignUp(data: SignUpFormData) {
    let errors: SignUpFormError = {}

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

    if (data.email.trim() === "") {
        errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email format"
    }

    if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (data.password && data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}