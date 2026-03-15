"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { ActionResponse, ActionResponseWithoutData } from "@/types/action";
import { EditProfileFormData, SignInFormData, SignUpFormData, User } from "@/types/auth";
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

    // send link to user's email:
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-account?token=${verificationToken}`
    const { subject, html } = getVerifyEmailTemplate(username, verificationUrl)

    // insert into the db
    const result = await userCollection.insertOne({ username, email, password: hashedPassword, role: "user", verified: false, verificationToken, verificationTokenExpires, createdAt: now, updatedAt: now } as User)
    console.log(result)

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
    await createSession(existingUser._id.toString(), existingUser.email, existingUser.username)

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
            errors: { username: "Username alredy exists, try something else" }
        }
    }

    // update profile
    await userCollection.updateOne({ _id: ObjectId.createFromHexString(authUser.userId) }, {
        $set: {
            username,
            updatedAt: new Date()
        }
    })

    await createSession(authUser.userId, authUser.email!, username)

    return { success: true, errors: {}, data }
}