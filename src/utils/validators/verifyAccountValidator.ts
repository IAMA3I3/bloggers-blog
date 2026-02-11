import { VerifyAccountFormData } from "@/types/auth"

export type VerifyAccountError = {
    default?: string
    otp?: string
}

export function validateVerifyAccount(data: VerifyAccountFormData) {
    let errors: VerifyAccountError = {}

    if (data.otp.trim() === "") {
        errors.otp = "OTP is required"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}