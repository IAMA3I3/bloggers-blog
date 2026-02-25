"use client"

import { Dispatch, SetStateAction } from "react"

type MediaInputType = {
    variant: "single"
    mediaType?: "image" | "video" | "mixed"
    media?: File
    setMedia?: Dispatch<SetStateAction<File>>
} | {
    variant: "multiple"
    mediaType?: "image" | "video" | "mixed"
    media?: File[]
    setMedia?: Dispatch<SetStateAction<File[]>>
}

export function MediaInput({ variant, mediaType = "mixed", media, setMedia }: MediaInputType) {

    return (
        <div
            className={`
                ${variant === "single" ? " flex-row" : " flex-col"}
                w-full flex flex-wrap gap-4
            `}
        >
            <div
                className={`
                    ${variant === "single" ? " w-25" : " w-full pb-1"}
                    h-25 rounded-lg border-2 border-border p-2
                `}
            ></div>
        </div>
    )
}