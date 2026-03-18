import { DeleteAccountFormData } from "@/types/auth"

export type DeleteAccountFormError = {
    default?: string
    password?: string
}

export function validateDeleteAccount(data: DeleteAccountFormData) {
    let errors: DeleteAccountFormError = {}

    // password
    if (data.password.trim() === "") {
        errors.password = "Password is required"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}