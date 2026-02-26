import { ChangePasswordFormData } from "@/types/auth"

export type ChangePasswordFormError = {
    default?: string
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
}

export function validateChangePassword(data: ChangePasswordFormData) {
    let errors: ChangePasswordFormError = {}

    // current password
    if (data.currentPassword.trim() === "") {
        errors.currentPassword = "Current password is required"
    }

    // new password
    if (data.newPassword.trim() === "") {
        errors.newPassword = "New password is required"
    } else if (data.newPassword.length < 8) {
        errors.newPassword = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
        errors.newPassword = "Password must contain uppercase, lowercase, and number"
    }

    // confirm password
    if (data.newPassword && data.confirmPassword !== data.newPassword) {
        errors.confirmPassword = "Passwords do not match"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}