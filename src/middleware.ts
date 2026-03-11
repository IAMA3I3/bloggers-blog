import { NextRequest, NextResponse } from "next/server"
import getAuthUser from "./lib/auth/getAuthUser"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/sign-up", "/sign-in", "/forget-password", "/reset-password", "/verify-account"]

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtected = protectedRoutes.includes(path) || path.startsWith("/dashboard/")
    const isPublic = publicRoutes.includes(path)

    const authUser = await getAuthUser()

    if (isProtected && !authUser) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }

    if (isPublic && authUser) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}