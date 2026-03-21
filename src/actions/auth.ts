"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { ActionResponse, ActionResponseWithoutData } from "@/types/action";
import { ChangePasswordFormData, DeleteAccountFormData, EditProfileFormData, ForgetPasswordFormData, ResetPasswordFormData, SignInFormData, SignUpFormData, User, UserRole, UserStatus } from "@/types/auth";
import { SignInFormError, validateSignIn } from "@/utils/validators/signInValidator";
import { SignUpFormError, validateSignUp } from "@/utils/validators/signUpValidator";
import bcrypt from "bcrypt"
import { ObjectId, WithId } from "mongodb";
import { cookies } from "next/headers";
import crypto from "crypto"
import { sendMail } from "@/lib/mail/sendMail";
import { getVerifyEmailTemplate } from "@/lib/mail/templates/VerifyEmail";
import { redirect } from "next/navigation";
import { EditProfileFormError, validateEditaProfile } from "@/utils/validators/editProfileValidator";
import getAuthUser from "@/lib/auth/getAuthUser";
import { ChangePasswordFormError, validateChangePassword } from "@/utils/validators/changePasswordValidator";
import { ForgetPasswordError, validateForgetPassword } from "@/utils/validators/forgetPasswordValidator";
import { getResetPasswordEmailTemplate } from "@/lib/mail/templates/ResetPassword";
import { ResetPasswordError, validateResetPassword } from "@/utils/validators/resetPasswordvalidator";
import { DeleteAccountFormError, validateDeleteAccount } from "@/utils/validators/deleteAccountValidator";

export async function signUpAction(data: SignUpFormData): ActionResponse<SignUpFormData, SignUpFormError> {

    // validate data
    const { isValid, errors } = validateSignUp(data)
    if (!isValid) {
        return {
            success: false,
            errors,
            data
        }
    }

    const { username, email, password } = data

    // get or create the collection in db
    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: { default: "Service temporarily unavailable" }
        }
    }

    // check if user alredy exists
    const existingEmail = await userCollection.findOne({ email })
    if (existingEmail) {
        return {
            success: false,
            data,
            errors: { email: "Email already registered" }
        }
    }
    const existingUsername = await userCollection.findOne({ username })
    if (existingUsername) {
        return {
            success: false,
            data,
            errors: { username: "Username alredy exists, try something else" }
        }
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // now
    const now = new Date()

    // generate verification token (secure random hex token)
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpires = new Date(now.getTime() + 10 * 60 * 1000) // 10 minutes

    // create verify mail cookie
    const cookieStore = await cookies()
    cookieStore.set("verify-email", email, { maxAge: 600 })

    // prepare link to user's email:
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-account?token=${verificationToken}`
    const { subject, html } = getVerifyEmailTemplate(username, verificationUrl)

    // insert into the db
    const result = await userCollection.insertOne({ username, email, password: hashedPassword, role: "user", status: "active", verified: false, verificationToken, verificationTokenExpires, createdAt: now, updatedAt: now } as User)
    console.log(result)

    // send link to user's email:
    await sendMail({ to: email, subject, html })

    cookieStore.set("resend-cooldown", "1", { maxAge: 60, httpOnly: true })

    // create a session only when no verification is needed
    // await createSession(result.insertedId.toString(), email, username)

    return { success: true, errors: {}, data }
}

export async function signInAction(data: SignInFormData): ActionResponse<SignInFormData, SignInFormError> {

    // validate data
    const { isValid, errors } = validateSignIn(data)
    if (!isValid) {
        return {
            success: false,
            data,
            errors
        }
    }

    const { identifier, password } = data

    // get the collection
    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: { default: "Server error" }
        }
    }

    // check if user exists
    let existingUser: WithId<User> | null = null
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
        // identifier is email
        existingUser = await userCollection.findOne({ email: identifier })
    } else {
        // identifier is username
        existingUser = await userCollection.findOne({ username: identifier })
    }
    if (!existingUser) {
        return {
            success: false,
            data,
            errors: { default: "Invalid credential" }
        }
    }

    // check password
    const matchedPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchedPassword) {
        return {
            success: false,
            data,
            errors: { default: "Invalid credential" }
        }
    }

    // check if user is active
    if (existingUser.status === "inactive") {
        return {
            success: false,
            data,
            errors: { default: "This account is inactive, pls contact us for more information." }
        }
    }

    // check if account is verified
    if (!existingUser.verified) {
        const now = new Date()
        const verificationToken = crypto.randomBytes(32).toString("hex")
        const verificationTokenExpires = new Date(now.getTime() + 10 * 60 * 1000)

        const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-account?token=${verificationToken}`
        const { subject, html } = getVerifyEmailTemplate(existingUser.username, verificationUrl)

        await userCollection.updateOne({ email: existingUser.email }, {
            $set: { verificationToken, verificationTokenExpires }
        })

        // send mail
        await sendMail({ to: existingUser.email, subject, html })

        const cookieStore = await cookies()
        cookieStore.set("verify-email", existingUser.email, { maxAge: 600 })
        cookieStore.set("resend-cooldown", "1", { maxAge: 60, httpOnly: true })

        redirect("/verify-account")
    }

    // create session
    await createSession(existingUser._id.toString(), existingUser.email, existingUser.username, existingUser.role)

    return { success: true, errors: {}, data }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}





// resend verification link
export async function resendVerificationLink(email: string): ActionResponseWithoutData {
    // check cooldown cookie
    const cookieStore = await cookies()
    const lastSent = cookieStore.get("resend-cooldown")
    if (lastSent) {
        return {
            success: false,
            error: "Please wait a minute before requesting another link."
        }
    }
    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return { success: false, error: "Service temporarily unavailable" }
    }

    const existingUser = await userCollection.findOne({ email })
    if (!existingUser) {
        return { success: false, error: "Invalid user, please go to login" }
    }

    if (existingUser.verified) {
        return { success: false, error: "Account is already verified" }
    }

    if (existingUser.status === "inactive") {
        return { success: false, error: "This account is inactive, please contact us for more information." }
    }

    const now = new Date()
    const RESEND_COOLDOWN_MS = 60 * 1000 // 1 minute

    // backend rate limit: derive when the last token was issued
    if (existingUser.verificationTokenExpires) {
        const sentAt = new Date(existingUser.verificationTokenExpires.getTime() - 10 * 60 * 1000)
        const elapsed = now.getTime() - sentAt.getTime()

        if (elapsed < RESEND_COOLDOWN_MS) {
            const secondsLeft = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000)
            return {
                success: false,
                error: `Please wait ${secondsLeft} seconds before requesting another link.`
            }
        }
    }

    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpires = new Date(now.getTime() + 10 * 60 * 1000)

    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-account?token=${verificationToken}`
    const { subject, html } = getVerifyEmailTemplate(existingUser.username, verificationUrl)

    await userCollection.updateOne({ email }, {
        $set: { verificationToken, verificationTokenExpires }
    })

    // send mail
    await sendMail({ to: email, subject, html })

    // set cookie cooldown layer (client-side UX guard)
    cookieStore.set("resend-cooldown", "1", { maxAge: 60, httpOnly: true })

    return { success: true }
}


// update profile
export async function updateProfileAction(data: EditProfileFormData): ActionResponse<EditProfileFormData, EditProfileFormError> {
    // check logged in user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    // validate data
    const { isValid, errors } = validateEditaProfile(data)
    if (!isValid) {
        return {
            success: false,
            data,
            errors
        }
    }

    const { username } = data

    // get collection in db
    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: { default: "Service temporarily unavailable" }
        }
    }

    // check if username already exists
    const existingUsername = await userCollection.findOne({ username, _id: { $ne: ObjectId.createFromHexString(authUser.userId) } })
    if (existingUsername) {
        return {
            success: false,
            data,
            errors: { username: "Username already exists, try something else" }
        }
    }

    // update profile
    await userCollection.updateOne({ _id: ObjectId.createFromHexString(authUser.userId) }, {
        $set: {
            username,
            updatedAt: new Date()
        }
    })

    await createSession(authUser.userId, authUser.email!, username, authUser.role!)

    return { success: true, errors: {}, data }
}


// change password
export async function changePassword(data: ChangePasswordFormData): ActionResponse<ChangePasswordFormData, ChangePasswordFormError> {
    // check logged in user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")

    // validate data
    const { isValid, errors } = validateChangePassword(data)
    if (!isValid) {
        return {
            success: false,
            data,
            errors
        }
    }

    const { currentPassword, newPassword } = data

    // get collection in db
    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: { default: "Service temporarily unavailable" }
        }
    }

    // fetch the user
    const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(authUser.userId) })
    if (!user) {
        return {
            success: false,
            data,
            errors: { default: "Invalid user" }
        }
    }

    // check password
    const matchedPassword = await bcrypt.compare(currentPassword, user.password)
    if (!matchedPassword) {
        return {
            success: false,
            data,
            errors: { currentPassword: "Incorrect password" }
        }
    }

    // check if new password is same as current password
    const samePassword = await bcrypt.compare(newPassword, user.password)
    if (samePassword) {
        return {
            success: false,
            data,
            errors: { newPassword: "New password must be different from current password" }
        }
    }

    // hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // update password
    await userCollection.updateOne({ _id: ObjectId.createFromHexString(authUser.userId) }, {
        $set: {
            password: hashedPassword,
            updatedAt: new Date()
        }
    })

    return { success: true, errors: {}, data }
}


// forget password
export async function forgetPasswordAction(data: ForgetPasswordFormData): ActionResponse<ForgetPasswordFormData, ForgetPasswordError> {

    // validate data
    const { isValid, errors } = validateForgetPassword(data)
    if (!isValid) {
        return { success: false, data, errors }
    }

    const { email } = data

    // cookie cooldown check
    const cookieStore = await cookies()
    const lastSent = cookieStore.get("resend-cooldown")
    if (lastSent) {
        return {
            success: false,
            data,
            errors: { default: "Please wait a minute before requesting another link." }
        }
    }

    const userCollection = await getCollection<User>("users")
    if (!userCollection) {
        return { success: false, data, errors: { default: "Server error" } }
    }

    // generic message to avoid user enumeration
    const existingUser = await userCollection.findOne({ email })
    if (!existingUser) {
        return {
            success: false,
            data,
            errors: { email: "Not valid" }
        }
    }

    const now = new Date()
    const RESEND_COOLDOWN_MS = 60 * 1000

    // db-level rate limit
    if (existingUser.resetPasswordTokenExpires) {
        const sentAt = new Date(existingUser.resetPasswordTokenExpires.getTime() - 10 * 60 * 1000)
        const elapsed = now.getTime() - sentAt.getTime()

        if (elapsed < RESEND_COOLDOWN_MS) {
            const secondsLeft = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000)
            return {
                success: false,
                data,
                errors: { default: `Please wait ${secondsLeft} seconds before requesting another reset.` }
            }
        }
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex")
    const resetPasswordTokenExpires = new Date(now.getTime() + 10 * 60 * 1000)

    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetPasswordToken}`
    const { subject, html } = getResetPasswordEmailTemplate(existingUser.username, resetPasswordUrl)

    // update db before sending mail
    await userCollection.updateOne({ email }, {
        $set: { resetPasswordToken, resetPasswordTokenExpires }
    })

    await sendMail({ to: email, subject, html })

    cookieStore.set("resend-cooldown", "1", { maxAge: 60, httpOnly: true })

    return { success: true, errors: {}, data }
}


// reset password
export async function resetPasswordAction(token: string, data: ResetPasswordFormData): ActionResponse<ResetPasswordFormData, ResetPasswordError> {
    if (!token) return { success: false, data, errors: { default: "Invalid token" } }

    // validate data
    const { isValid, errors } = validateResetPassword(data)
    if (!isValid) {
        return { success: false, data, errors }
    }

    const { password } = data

    const userCollection = await getCollection<User>("users")
    if (!userCollection) return { success: false, data, errors: { default: "Service temporarily down" } }

    const user = await userCollection.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpires: { $gt: new Date() }
    })
    if (!user) return { success: false, data, errors: { default: "Invalid or expired token" } }

    // check new password isn't the same as current
    const samePassword = await bcrypt.compare(password, user.password)
    if (samePassword) {
        return {
            success: false,
            data,
            errors: { password: "New password must be different from your old password" }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await userCollection.updateOne({ _id: user._id }, {
        $set: {
            password: hashedPassword,
            updatedAt: new Date()
        },
        $unset: {
            resetPasswordToken: "",
            resetPasswordTokenExpires: ""
        }
    })

    return { success: true, data, errors: {} }
}

// delete account
export async function deleteAccountAction(data: DeleteAccountFormData): ActionResponse<DeleteAccountFormData, DeleteAccountFormError> {

    // validate input
    const { isValid, errors } = validateDeleteAccount(data)
    if (!isValid) return { success: false, data, errors }

    // check auth user
    const authUser = await getAuthUser()
    if (!authUser) return { success: false, data, errors: { default: "Invalid user" } }

    // get users collection
    const userCollection = await getCollection<User>("users")
    if (!userCollection) return { success: false, data, errors: { default: "Service temporarily down" } }

    const { password } = data

    // fetch user
    const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(authUser.userId) })
    if (!user) return { success: false, data, errors: { default: "Invalid user" } }

    // prevent delete for super admin
    if (user.email === process.env.SUPER_ADMIN_EMAIL) {
        return { success: false, data, errors: { default: "This user cannot be deleted" } }
    }

    // compare password
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (!matchedPassword) return { success: false, data, errors: { password: "Incorrect password" } }

    // delete account
    await userCollection.deleteOne({ _id: user._id })

    // unset session
    const cookieStore = await cookies()
    cookieStore.delete("session")

    return { success: true, data, errors: {} }
}

// update role
export async function updateRoleAction(userId: string, role: UserRole): ActionResponse<UserRole, string> {
    // validate role
    const validRoles: UserRole[] = ["admin", "user"]
    if (!validRoles.includes(role)) return { success: false, data: role, errors: "Invalid role" }

    // check auth user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    if (authUser.role !== "admin") return { success: false, data: role, errors: "Unathorized user" }
    if (authUser.userId === userId) {
        return { success: false, data: role, errors: "You cannot change your own role" }
    }

    // get collection
    const userCollection = await getCollection<User>("users")
    if (!userCollection) return { success: false, data: role, errors: "Service temporarily down" }

    // check user exist
    const existingUser = await userCollection.findOne({ _id: ObjectId.createFromHexString(userId) })
    if (!existingUser) return { success: false, data: role, errors: "Invalid user" }

    // prevent demoting the protected super admin
    if (existingUser.email === process.env.SUPER_ADMIN_EMAIL) {
        return { success: false, data: role, errors: "This user cannot be demoted" }
    }

    // update user role
    await userCollection.updateOne({ _id: existingUser._id }, {
        $set: {
            role,
            updatedAt: new Date()
        }
    })

    return { success: true, data: role, errors: "" }
}

export async function updateStatusAction(userId: string, status: UserStatus): ActionResponse<UserStatus, string> {
    // validate role
    const validStatus: UserStatus[] = ["active", "inactive"]
    if (!validStatus.includes(status)) return { success: false, data: status, errors: "Invalid role" }

    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    if (authUser.role !== "admin") return { success: false, data: status, errors: "Unauthorized user" }
    if (authUser.userId === userId) return { success: false, data: status, errors: "You cannot change your own status" }

    const userCollection = await getCollection<User>("users")
    if (!userCollection) return { success: false, data: status, errors: "Service temporarily down" }

    const existingUser = await userCollection.findOne({ _id: ObjectId.createFromHexString(userId) })
    if (!existingUser) return { success: false, data: status, errors: "Invalid user" }

    // protect super admin from being deactivated
    if (existingUser.email === process.env.SUPER_ADMIN_EMAIL) {
        return { success: false, data: status, errors: "This user cannot be deactivated" }
    }

    await userCollection.updateOne({ _id: existingUser._id }, {
        $set: { status, updatedAt: new Date() }
    })

    return { success: true, data: status, errors: "" }
}

// delete user action
export async function deleteUserAction(userId: string): ActionResponse<string, string> {
    // check auth user
    const authUser = await getAuthUser()
    if (!authUser) redirect("/sign-in")
    if (authUser.role !== "admin") return { success: false, data: userId, errors: "Unauthorized user" }
    if (authUser.userId === userId) return { success: false, data: userId, errors: "You cannot delete your account from here. go to profile." }

    const userCollection = await getCollection<User>("users")
    if (!userCollection) return { success: false, data: userId, errors: "Service temporarily down" }

    const existingUser = await userCollection.findOne({ _id: ObjectId.createFromHexString(userId) })
    if (!existingUser) return { success: false, data: userId, errors: "Invalid user" }

    // protect super admin from being deactivated
    if (existingUser.email === process.env.SUPER_ADMIN_EMAIL) {
        return { success: false, data: userId, errors: "This user cannot be deleted" }
    }

    // delete user
    await userCollection.deleteOne({ _id: existingUser._id })

    return { success: true, data: userId, errors: "" }
}