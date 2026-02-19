"use client"

import { dashedToCapitalized } from "@/utils/textFormat"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa6"

type DropSelectMenuProps = {
    direction?: "to-bottom" | "to-top"
    position?: "start" | "end"
    value: string
    setValue: Dispatch<SetStateAction<string>>
    className?: string
    menuItems: string[]
    fullWidth?: boolean
}

export const DropSelectMenu = ({ direction = "to-bottom", position = "end", value, setValue, className, menuItems, fullWidth = false }: DropSelectMenuProps) => {

    const dropDownRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [dropedMenu, setDropedMenu] = useState(false)

    const toggleDropMenu = () => {
        setDropedMenu(prev => !prev)
    }

    const closeDropMenu = () => {
        setDropedMenu(false)
    }

    const handleMenuItemClick = (item: string) => {
        closeDropMenu()
        setValue(item)
    }

    useEffect(() => {
        function handleClickOutside(event: globalThis.MouseEvent) {
            if (!dropedMenu) return

            const target = event.target as Node

            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                closeDropMenu()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropedMenu])


    return (
        <div className=" relative w-full">
            <button ref={buttonRef} type="button" onClick={toggleDropMenu} className=" relative w-full">
                <input
                    type="text"
                    readOnly
                    value={dashedToCapitalized(value)}
                    className={className}
                />
                <FaAngleDown className={`${dropedMenu ? " rotate-180" : " rotate-0"} transition-all duration-500 w-4 h-4 absolute top-[50%] -translate-y-[50%] right-4 text-muted`} />
            </button>
            <div
                ref={dropDownRef}
                className={`
                    ${dropedMenu ? " opacity-100 visible" : " opacity-0 invisible"}
                    ${direction === "to-bottom" ? (dropedMenu ? " translate-y-0 mt-4" : " -translate-y-5 mt-4") : ""}
                    ${direction === "to-top" ? (dropedMenu ? " translate-y-0 bottom-full mb-4" : " translate-y-5 bottom-full mb-4") : ""}
                    ${position === "start" && " left-0"}
                    ${position === "end" && " right-0"}
                    ${fullWidth ? " min-w-full" : " min-w-45"}
                    transition-all duration-500 absolute bg-white dark:bg-slate-800 rounded-lg border-2
                    border-gray-100 dark:border-slate-700 shadow-lg p-2 z-10
                `}
            >
                <div className=" space-y-2">
                    {
                        menuItems.map(item => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleMenuItemClick(item)}
                                className={`
                                    ${value === item ? " bg-primary/20 text-primary" : " bg-gray-100 dark:bg-slate-700 hover:bg-primary/20 hover:text-primary"}
                                    block text-left w-full py-2 px-4 text-xs font-semibold rounded cursor-pointer
                                `}
                            >
                                {dashedToCapitalized(item)}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}