"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifySuccess() {
    const [count, setCount] = useState(5)
    const router = useRouter()

    useEffect(() => {
        if (count === 0) {
            router.push("/dashboard")
            return
        }
        const timer = setTimeout(() => setCount(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [count, router])

    return (
        <div className="flex flex-col items-center gap-4">
            <Link href="/dashboard">
                <Button text="Go to Dashboard" rounded />
            </Link>
            <p className="text-sm text-muted">
                Redirecting in <span className="font-semibold text-foreground">{count}s</span>...
            </p>
        </div>
    )
}