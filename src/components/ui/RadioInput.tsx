"use client"

import { Dispatch, SetStateAction } from "react"
import { FaRegCircle, FaRegCircleDot } from "react-icons/fa6";

type RadioInputProps = {
    variant?: "primary" | "secondary"
    orientation?: "inline" | "block"
    value: string
    setValue: Dispatch<SetStateAction<string>>
    options: {
        text: string
        value: string
    }[]
}

export default function RadioInput({ variant = "primary", orientation = "block", value, setValue, options }: RadioInputProps) {

    return (
        <div
            className={`
                ${orientation === "inline" ? " flex-row flex-wrap" : " flex-col items-start"}
                flex gap-4
            `}
        >
            {
                options.map((option, i) => (
                    <div
                        key={i}
                        onClick={() => setValue(option.value)}
                        className=" flex gap-2 cursor-pointer"
                    >
                        {
                            option.value === value ? (
                                <span
                                    className={`
                                        ${variant === "primary" ? " text-primary" : ""}
                                        pt-0.5
                                    `}
                                >
                                    <FaRegCircleDot />
                                </span>
                            ) : (
                                <span
                                    className={`
                                        ${variant === "primary" ? " text-muted" : ""}
                                        pt-0.5
                                    `}
                                >
                                    <FaRegCircle />
                                </span>
                            )
                        }
                        <p
                            className={`
                                text-sm font-semibold
                            `}
                        >
                            {option.text}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}