import "server-only"

import { jwtVerify, SignJWT, JWTPayload } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET

if (!secretKey) {
    throw new Error("SESSION_SECRET is not defined")
}

const encodedKey = new TextEncoder().encode(secretKey)

export type SessionPayload = JWTPayload & {
    userId: string
    email?: string
    username?: string
}

export async function encrypt(
    payload: SessionPayload
): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}

export async function decrypt(
    session?: string
): Promise<SessionPayload | null> {
    if (!session) return null

    try {
        const { payload } = await jwtVerify<SessionPayload>(
            session,
            encodedKey,
            {
                algorithms: ["HS256"],
            }
        )

        return payload
    } catch {
        console.error("Failed to verify session")
        return null
    }
}

export async function createSession(userId: string, email: string, username: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, email, username })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: "/"
    })
}