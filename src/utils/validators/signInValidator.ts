import { SignInFormData } from "@/types/auth"

export type SignInFormError = {
    default?: string
    identifier?: string // either email or username
    password?: string
}

export function validateSignIn(data: SignInFormData) {
    let errors: SignInFormError = {}

    if (data.identifier.trim() === "") {
        errors.identifier = "Email or username is required"
    }

    if (data.password === "") {
        errors.password = "Password is required"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}