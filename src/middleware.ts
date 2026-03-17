import { NextRequest, NextResponse } from "next/server"
import getAuthUser from "./lib/auth/getAuthUser"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/sign-up", "/sign-in", "/forget-password", "/reset-password"]
const adminRoutes = ["/dashboard/users"]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtected = protectedRoutes.some(r => path === r || path.startsWith("/dashboard/"))
    const isPublic = publicRoutes.includes(path)
    const isAdminProtected = adminRoutes.includes(path) || path.startsWith("/dashboard/users/")

    const authUser = await getAuthUser()

    // 1. Unauthenticated users can't access protected routes
    if (isProtected && !authUser) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }

    // 2. Authenticated users shouldn't see public auth pages
    if (isPublic && authUser) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    // 3. Non-admins can't access admin routes (only reached if authenticated)
    if (isAdminProtected && authUser?.role !== "admin") {
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