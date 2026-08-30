import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { decrypt, SessionPayload } from "../sessions"
import { getCollection } from "../db"
import { User } from "@/types/auth"

// Role/status live in the DB, not the JWT: a demoted or deactivated user's
// existing cookie would otherwise keep granting the access it had at login
// until the token naturally expires. Revalidating here closes that gap
// without needing a session-revocation store. (Not wrapped in React's
// cache() since this also runs from middleware, outside the React render
// tree where that memoization is scoped.)
export default async function getAuthUser(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value

    if (!session) return null

    try {
        const payload = await decrypt(session)
        if (!payload) return null

        const userCollection = await getCollection<User>("users")
        const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(payload.userId) })

        if (!user || user.status === "inactive") return null

        return {
            ...payload,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    } catch {
        return null
    }
}