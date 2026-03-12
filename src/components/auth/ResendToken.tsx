"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { FaArrowsRotate } from "react-icons/fa6";
import toast from "react-hot-toast";

type ResendTokenProps = {
    type: "verify-account" | "reset-password"
}

const TIMER = 10

export default function ResendToken({ type }: ResendTokenProps) {

    const [countDown, setCountDown] = useState(TIMER)

    const onResend = () => {

        if (countDown <= 0) {
            setCountDown(TIMER)
        }
        toast.success("Link sent")
    }

    useEffect(() => {
        if (countDown <= 0) return

        const timer = setTimeout(() => {
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [countDown])

    return (
        <div className=" flex justify-center">
            <Button
                text={countDown > 0 ? `Resend Link (${countDown})` : "Resend Link"}
                isLoading={countDown > 0}
                icon={FaArrowsRotate}
                rounded
                onClick={onResend}
            />
        </div>
    )
}