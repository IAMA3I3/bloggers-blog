"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { ActionResponse } from "@/types/action";
import { SignUpFormData, User } from "@/types/auth";
import { SignUpFormError, validateSignUp } from "@/utils/validators/signUpValidator";
import bcrypt from "bcrypt"

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

    await new Promise(resolve => setTimeout(resolve, 2000)) // delay 2s
    console.log(data)

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

    // insert into the db
    const result = await userCollection.insertOne({username, email, password: hashedPassword, role: "user" } as User)
    console.log(result)

    // create a session
    await createSession(result.insertedId.toString(), email, username)

    return { success: true, errors: {}, data }
}