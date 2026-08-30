"use client"

import { Button } from "@/components/ui/Button"
import { IoMdRefresh } from "react-icons/io"

export default function ErrorBoundary({ error, reset }: { error: unknown, reset: () => void }) {

    return (
        <div className=" flex-1 h-full flex flex-col items-center justify-center text-center gap-4">
            <div className=" text-2xl font-thin text-red-500">{error instanceof Error ? error.message : "Something went wrong"}</div>
            <Button text="Try again" icon={IoMdRefresh} variant="secondary" outlined onClick={reset} />
        </div>
    )
}