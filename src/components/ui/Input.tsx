"use client"

import { useEffect, useRef, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type BaseInputProps = {
    variant?: "primary" | "secondary"
    customSize?: "small" | "medium" | "large"
    label?: string
    backgroundColor?: string
    error?: string
    viewPassword?: boolean
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseInputProps

export function Input({ variant = "primary", customSize = "medium", label, backgroundColor = "bg-background", error, viewPassword = false, ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocus, setIsFocus] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        setHasValue(false)
        if (inputRef.current && inputRef.current.value.trim() !== "") {
            setHasValue(true)
        }
    }, [inputRef.current?.value])

    return (
        <div className=" w-full flex flex-col items-start">
            {
                label && variant === "primary" && (
                    <label
                        htmlFor={rest.id}
                        className={`
                            ${customSize === "small" && " text-xs"}
                            ${customSize === "medium" && " text-sm"}
                            ${customSize === "large" && " text-base"}
                            text-muted font-semibold
                        `}
                    >{label}</label>
                )
            }
            <div className=" relative w-full">
                {
                    label && variant === "secondary" && (
                        <label
                            className={`
                            ${customSize === "small" && " text-sm translate-x-2"}
                            ${customSize === "medium" && " text-base translate-x-3"}
                            ${customSize === "large" && " text-lg translate-x-4"}
                            ${isFocus || hasValue ? " top-0 -translate-y-[55%]" : " top-[50%] -translate-y-[50%]"}
                            ${backgroundColor}
                            text-muted font-semibold absolute transition-all px-2 rounded
                        `}
                        >{label}</label>
                    )
                }
                <input
                    {...rest}
                    ref={inputRef}
                    type={viewPassword && !showPassword ? "password" : rest.type}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    className={`
                        ${variant === "primary" ? "" : ""}
                        ${customSize === "small" && " text-sm py-1 px-2 rounded"}
                        ${customSize === "medium" && " text-base py-1 px-3 rounded-lg"}
                        ${customSize === "large" && " text-lg py-2 px-4 rounded-xl"}
                        ${viewPassword && " pr-10"}
                        outline-none w-full border-2 bg-transparent border-border focus:border-primary
                    `}
                />
                {
                    viewPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className={`
                                ${customSize === "small" && " text-sm right-2"}
                                ${customSize === "medium" && " text-base right-3"}
                                ${customSize === "large" && " text-lg right-4"}
                                absolute top-[50%] -translate-y-[50%] cursor-pointer
                            `}
                        >
                            {
                                showPassword ? (
                                    <FaRegEyeSlash />
                                ) : (
                                    <FaRegEye />
                                )
                            }
                        </button>
                    )
                }
            </div>
            {
                error && (
                    <p
                        className={`
                            ${customSize === "small" && " text-xs"}
                            ${customSize === "medium" && " text-sm"}
                            ${customSize === "large" && " text-base"}
                            font-semibold text-red-400
                        `}
                    >{error}</p>
                )
            }
        </div>
    )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & BaseInputProps

export function Textarea({ variant = "primary", customSize = "medium", label, backgroundColor = "bg-background", error, ...rest }: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isFocus, setIsFocus] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    useEffect(() => {
        setHasValue(false)
        if (textareaRef.current && textareaRef.current.value.trim() !== "") {
            setHasValue(true)
        }
    }, [textareaRef.current?.value])

    return (
        <div className=" w-full flex flex-col items-start">
            {
                label && variant === "primary" && (
                    <label
                        htmlFor={rest.id}
                        className={`
                            ${customSize === "small" && " text-xs"}
                            ${customSize === "medium" && " text-sm"}
                            ${customSize === "large" && " text-base"}
                            text-muted font-semibold
                        `}
                    >{label}</label>
                )
            }
            <div className=" relative w-full">
                {
                    label && variant === "secondary" && (
                        <label
                            className={`
                            ${customSize === "small" && " text-sm translate-x-2"}
                            ${customSize === "medium" && " text-base translate-x-3"}
                            ${customSize === "large" && " text-lg translate-x-4"}
                            ${isFocus || hasValue ? " top-0 -translate-y-[55%]" : " top-0 translate-y-1.5"}
                            ${backgroundColor}
                            text-muted font-semibold absolute transition-all px-2 rounded
                        `}
                        >{label}</label>
                    )
                }
                <textarea
                    {...rest}
                    ref={textareaRef}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    className={`
                        ${variant === "primary" ? "" : ""}
                        ${customSize === "small" && " text-sm py-1 px-2 rounded"}
                        ${customSize === "medium" && " text-base py-1 px-3 rounded-lg"}
                        ${customSize === "large" && " text-lg py-2 px-4 rounded-xl"}
                        outline-none w-full border-2 bg-transparent border-border focus:border-primary
                    `}
                ></textarea>
            </div>
            {
                error && (
                    <p
                        className={`
                            ${customSize === "small" && " text-xs"}
                            ${customSize === "medium" && " text-sm"}
                            ${customSize === "large" && " text-base"}
                            font-semibold text-red-400
                        `}
                    >{error}</p>
                )
            }
        </div>
    )
}