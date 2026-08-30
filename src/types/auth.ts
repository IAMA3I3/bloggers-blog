import { ObjectId } from "mongodb"

export type UserRole = "admin" | "user"
export type UserStatus = "active" | "inactive"

export type SignUpFormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export type ForgetPasswordFormData = {
    email: string
}

export type ResetPasswordFormData = {
    password: string
    confirmPassword: string
}

export type VerifyAccountFormData = {
    otp: string
}

export type SignInFormData = {
    identifier: string // either mail or username
    password: string
}

export type EditProfileFormData = {
    username: string
}

export type ChangePasswordFormData = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export type DeleteAccountFormData = {
    password: string
}

export type User = {
    _id: ObjectId
    username: string
    email: string
    role: UserRole
    status: UserStatus
    verified: boolean
    password: string
    verificationToken?: string,
    verificationTokenExpires?: Date,
    resetPasswordToken?: string,
    resetPasswordTokenExpires?: Date,
    failedLoginAttempts?: number
    lockUntil?: Date
    createdAt: Date
    updatedAt?: Date
}

export type SafeUser = Omit<User, "_id" | "password" | "verificationToken" | "verificationTokenExpires" | "resetPasswordToken" | "resetPasswordTokenExpires"> & { id: string }