import { User } from "@/types/auth"
import { getCollection } from "../db"
import { createSession } from "../sessions"

export async function verifyAccount(token: string) {
    if (!token) return false

    // get the collection
    const userCollection = await getCollection<User>("users")
    if (!userCollection) return false

    // find user with matching token that hasn't expired
    const user = await userCollection.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: new Date() }
    })

    if (!user) return false

    await userCollection.updateOne({ _id: user._id }, {
        $set: {
            verified: true,
            updatedAt: new Date()
        },
        $unset: {
            verificationToken: "",
            verificationTokenExpires: ""
        }
    })

    // create session
    await createSession(user._id.toString(), user.email, user.username, user.role)

    return true
}