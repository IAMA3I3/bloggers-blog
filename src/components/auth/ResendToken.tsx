"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { FaArrowsRotate } from "react-icons/fa6";
import toast from "react-hot-toast";
import { resendVerificationLink } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ResendTokenProps = {
    type: "verify-account" | "reset-password"
    email?: string | null
}

const TIMER = 59

export default function ResendToken({ type, email }: ResendTokenProps) {
    const router = useRouter()

    const [countDown, setCountDown] = useState(TIMER)
    const [error, setError] = useState("")

    const onResend = async () => {

        if (type === "verify-account") {
            if (!email) {
                setError("Invalid user, please go to login")
                return
            }
            const result = await resendVerificationLink(email)
            if (!result.success) {
                setError(result.error as string)
                return
            }
            toast.success("Link sent")
        }

        if (type === "reset-password") {
            router.replace("/forget-password")
        }

        setError("")

        if (countDown <= 0) {
            setCountDown(TIMER)
        }
    }

    useEffect(() => {
        if (countDown <= 0) return

        const timer = setTimeout(() => {
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [countDown])

    return (
        <div className=" flex items-center flex-col text-center gap-4">
            <Button
                text={countDown > 0 ? `Resend Link (${countDown})` : "Resend Link"}
                isLoading={countDown > 0}
                icon={FaArrowsRotate}
                rounded
                onClick={onResend}
            />
            {error && <p className=" text-sm text-center font-semibold text-red-400">{error}</p>}
            {error && <Link href={"/sign-in"} className=" text-center text-sm font-semibold text-primary hover:underline">Login</Link>}
        </div>
    )
}