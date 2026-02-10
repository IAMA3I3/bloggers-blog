"use client"

import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

type TickProps = {
    variant?: "primary" | "secondary"
    onTick?: () => void
    onUntick?: () => void
    isTicked?: boolean
    size?: "small" | "medium" | "large" | "inherit"
    label?: string
}

export const HeartTick = ({ variant = "primary", onTick, onUntick, isTicked = false, size = "medium", label }: TickProps) => {

    const [ticked, setTicked] = useState(isTicked)

    const handleTick = () => {
        setTicked(true)
        onTick && onTick()
    }

    const handleUntick = () => {
        setTicked(false)
        onUntick && onUntick()
    }

    const handleButtonClick = () => {
        ticked ? handleUntick() : handleTick()
    }

    return (
        <button
            onClick={handleButtonClick}
            className={`
                ${variant === "primary" ? " bg-black/5 backdrop-blur-sm" : " hover:bg-black/5"}
                ${size === "small" && " text-base"}
                ${size === "medium" && " text-xl"}
                ${size === "large" && " text-3xl"}
                ${ticked ? " text-rose-500" : (variant === "primary" ? " text-white" : " text-muted")}
                cursor-pointer p-2 rounded-lg flex items-center gap-2
            `}
        >
            <span>{ticked ? <FaHeart /> : <FaRegHeart />}</span>
            {
                label && (
                    <span
                        className={`
                            ${size === "small" && " text-sm"}
                            ${size === "medium" && " text-lg"}
                            ${size === "large" && " text-2xl"}
                        `}
                    >{label}</span>
                )
            }
        </button>
    )
}