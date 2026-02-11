import { ForgetPasswordFormData } from "@/types/auth"

export type ForgetPasswordError = {
    default?: string
    email?: string
}

export function validateForgetPassword(data: ForgetPasswordFormData) {
    let errors: ForgetPasswordError = {}

    if (data.email.trim() === "") {
        errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email format"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}