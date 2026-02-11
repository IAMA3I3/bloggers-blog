export type UserRole = "admin" | "user"

export type SignUpFormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export type SignInFormData = {
    identifier: string // either mail or username
    password: string
}

export type User = {
    _id: string
    username: string
    email: string
    role: "admin" | "user"
    password: string
    createdAt?: Date
    updatedAt?: Date
}