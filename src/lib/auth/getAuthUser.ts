import { cookies } from "next/headers"
import { decrypt, SessionPayload } from "../sessions"

export default async function getAuthUser(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value

    if (!session) return null

    try {
        const user = await decrypt(session)
        if (!user) return null
        return user
    } catch {
        return null
    }
}