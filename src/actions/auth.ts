"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { ActionResponse } from "@/types/action";
import { SignInFormData, SignUpFormData, User } from "@/types/auth";
import { SignInFormError, validateSignIn } from "@/utils/validators/signInValidator";
import { SignUpFormError, validateSignUp } from "@/utils/validators/signUpValidator";
import bcrypt from "bcrypt"
import { WithId } from "mongodb";
import { cookies } from "next/headers";
import crypto from "crypto"
import { sendMail } from "@/lib/mail/sendMail";
import { getVerifyEmailTemplate } from "@/lib/mail/templates/VerifyEmail";

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

    await sendMail({ to: email, subject, html })

    // insert into the db
    const result = await userCollection.insertOne({ username, email, password: hashedPassword, role: "user", verified: false, verificationToken, verificationTokenExpires, createdAt: now, updatedAt: now } as User)
    console.log(result)

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

    // create session
    await createSession(existingUser._id.toString(), existingUser.email, existingUser.username)

    return { success: true, errors: {}, data }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}