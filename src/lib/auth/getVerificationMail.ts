import { cookies } from "next/headers";

export default async function getVerificationMail() {
    const cookieStore = await cookies()
    const verifyEmail = cookieStore.get("verify-email")?.value

    if (!verifyEmail) return null

    return verifyEmail
}