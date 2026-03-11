import { cookies } from "next/headers"
import { decrypt, SessionPayload } from "../sessions"

export default async function getAuthUser(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value

    if (!session) return null

    const user = await decrypt(session)
    return user
}