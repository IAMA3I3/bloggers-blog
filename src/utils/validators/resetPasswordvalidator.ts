import { ResetPasswordFormData } from "@/types/auth"

export type ResetPasswordError = {
    default?: string
    otp?: string
    password?: string
    confirmPassword?: string
}

export function validateResetPassword(data: ResetPasswordFormData) {
    let errors: ResetPasswordError = {}

    if (data.otp.trim() === "") {
        errors.otp = "OTP is required"
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