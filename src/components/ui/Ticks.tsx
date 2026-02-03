"use client"

import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

type TickProps = {
    onTick?: () => void
    onUntick?: () => void
    isTicked?: boolean
    size?: "small" | "medium" | "large" | "inherit"
}

export const HeartTick = ({ onTick, onUntick, isTicked = false, size = "medium" }: TickProps) => {

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
                ${size === "small" && " text-base"}
                ${size === "medium" && " text-xl"}
                ${size === "large" && " text-3xl"}
                ${ticked ? " text-rose-500" : " text-white"}
                cursor-pointer p-2 rounded-lg backdrop-blur-sm bg-black/5
            `}
        >
            {ticked ? <FaHeart /> : <FaRegHeart />}
        </button>
    )
}