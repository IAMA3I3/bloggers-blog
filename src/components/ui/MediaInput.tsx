"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FiUpload, FiX } from "react-icons/fi"

type MediaInputType = {
    variant: "single"
    id: string
    mediaType?: "image" | "video" | "mixed"
    media?: File
    setMedia?: Dispatch<SetStateAction<File | undefined>>
    error?: string
} | {
    variant: "multiple"
    id: string
    mediaType?: "image" | "video" | "mixed"
    media?: File[]
    setMedia?: Dispatch<SetStateAction<File[] | undefined>>
    error?: string
}

type PreviewEntry = { file: File; url: string }

function getAccept(mediaType: "image" | "video" | "mixed"): string {
    if (mediaType === "image") return "image/*"
    if (mediaType === "video") return "video/*"
    return "image/*,video/*"
}

function MediaPreview({ url, file, onRemove }: { url: string; file: File; onRemove: () => void }) {
    const isVideo = file.type.startsWith("video/")
    return (
        <div className="relative h-full aspect-square rounded overflow-hidden shrink-0 group">
            {isVideo ? (
                <video src={url} autoPlay loop className="w-full h-full object-cover" muted />
            ) : (
                <img src={url} alt={file.name} className="w-full h-full object-cover" />
            )}
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove file"
            >
                <FiX size={12} />
            </button>
        </div>
    )
}

export function MediaInput({ variant, id, mediaType = "mixed", media, setMedia, error }: MediaInputType) {
    const inputRef = useRef<HTMLInputElement>(null)
    const accept = getAccept(mediaType)
    const [previews, setPreviews] = useState<PreviewEntry[]>([])

    // Revoke all URLs on unmount
    useEffect(() => () => { previews.forEach(p => URL.revokeObjectURL(p.url)) }, []) // eslint-disable-line

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files || files.length === 0) return
        const incoming = Array.from(files)

        if (variant === "single") {
            previews.forEach(p => URL.revokeObjectURL(p.url))
            const entry: PreviewEntry = { file: incoming[0], url: URL.createObjectURL(incoming[0]) }
            setPreviews([entry])
                ; (setMedia as Dispatch<SetStateAction<File | undefined>> | undefined)?.(incoming[0])
        } else {
            const entries: PreviewEntry[] = incoming.map(f => ({ file: f, url: URL.createObjectURL(f) }))
            setPreviews(prev => [...prev, ...entries])
                ; (setMedia as Dispatch<SetStateAction<File[] | undefined>> | undefined)?.(
                    prev => [...(prev ?? []), ...incoming]
                )
        }

        if (inputRef.current) inputRef.current.value = ""
    }

    function removeAt(index: number) {
        URL.revokeObjectURL(previews[index].url)
        setPreviews(prev => prev.filter((_, i) => i !== index))

        if (variant === "single") {
            ; (setMedia as Dispatch<SetStateAction<File | undefined>> | undefined)?.(undefined)
        } else {
            ; (setMedia as Dispatch<SetStateAction<File[] | undefined>> | undefined)?.(
                prev => prev?.filter((_, i) => i !== index)
            )
        }
    }

    return (
        <div>
            <div
                className={`
                ${variant === "single" ? "sm:flex-row items-center" : "items-center"}
                w-full flex flex-col flex-wrap gap-4 overflow-hidden
            `}
            >
                <div
                    className={`
                    ${variant === "single" ? "w-24" : "w-full pb-2 flex gap-2 flex-nowrap overflow-x-auto"}
                    h-24 rounded-lg border-2 border-border p-2 relative
                `}
                >
                    {previews.length === 0 && <p className=" text-xs font-semibold text-muted absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] text-center">Media preview</p>}
                    {previews.map((entry, i) => (
                        <MediaPreview
                            key={entry.url}
                            url={entry.url}
                            file={entry.file}
                            onRemove={() => removeAt(i)}
                        />
                    ))}
                </div>

                <div className="flex-1 flex">
                    <input
                        ref={inputRef}
                        type="file"
                        id={id}
                        accept={accept}
                        multiple={variant === "multiple"}
                        className="hidden"
                        onChange={handleChange}
                    />
                    <label
                        htmlFor={id}
                        className="flex *:flex-none items-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                    >
                        <span>Upload Media</span>
                        <FiUpload />
                    </label>
                </div>
            </div>
            {
                error && (
                    <p
                        className={`
                            ${variant === "single" ? " sm:text-left" : ""}
                            text-sm font-semibold text-red-400 text-center
                        `}
                    >
                        {error}
                    </p>
                )
            }
        </div>
    )
}