import { verifyAccount } from "@/lib/auth/verifyAccount"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token")

    if (!token) redirect("/verify-account")

    const success = await verifyAccount(token)

    if (success) redirect("/verify-account?status=success")

    redirect("/verify-account?status=failed")
}