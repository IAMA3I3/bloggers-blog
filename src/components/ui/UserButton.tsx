"use client"

import { useStateContext } from "@/app/context/StateContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import { FaAngleDown, FaUser } from "react-icons/fa6";

type UserButtonProps = {
    from: "MAIN" | "DASHBOARD"
}

export default function UserButton({ from }: UserButtonProps) {

    const { setModalProps, setIsModalOpen } = useStateContext()

    const dropDownRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [dropedMenu, setDropedMenu] = useState(false)

    const toggleDropMenu = () => {
        setDropedMenu(prev => !prev)
    }

    const closeDropMenu = () => {
        setDropedMenu(false)
    }

    const openLogoutModal = () => {
        setModalProps(prev => ({
            ...prev,
            title: "Logout",
            text: "Proceed to logout"
        }))
        setIsModalOpen(true)
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
        <div className=" relative">
            <button ref={buttonRef} onClick={toggleDropMenu} className={`${dropedMenu ? " bg-gray-300 dark:bg-slate-800" : " hover:bg-gray-300 dark:hover:bg-slate-800"} flex w-full overflow-hidden items-center space-x-2 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-300 dark:hover:bg-slate-800 transition-colors`}>
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-sm text-white">
                    <FaUser />
                </div>
                {
                    from === "MAIN" && (
                        <div className=" flex-1 overflow-hidden">
                            <p className=" text-left md:hidden text-sm text-muted truncate">username@gmail.com</p>
                        </div>
                    )
                }
                <FaAngleDown className={`${dropedMenu ? " rotate-180" : " rotate-0"} transition-all duration-500 w-4 h-4`} />
            </button>
            <div
                ref={dropDownRef}
                className={`
                ${dropedMenu ? " opacity-100 translate-y-0 visible" : (from === "MAIN" ? " opacity-0 translate-y-5 md:-translate-y-5 invisible" : " opacity-0 -translate-y-5 invisible")}
                ${from === "MAIN" ? " mb-4 bottom-full left-0 md:bottom-auto md:left-auto md:mt-4 md:right-0" : " mt-4 right-0"}
                transition-all duration-500 absolute min-w-45 bg-white dark:bg-slate-800 rounded-lg border-2
                border-gray-100 dark:border-slate-700 shadow-lg p-2
            `}
            >
                <div className=" w-45">
                    <p className=" text-sm font-semibold truncate">User Name</p>
                    <p className=" text-sm truncate">username@gmail.com</p>
                </div>
                <div className=" mt-2 space-y-2">
                    {
                        from === "DASHBOARD" ? (
                            <Link href={"/profile"} className=" block text-center w-full py-2 px-6 bg-gray-200 dark:bg-slate-700 text-xs font-semibold rounded cursor-pointer hover:bg-primary/20 hover:text-primary">Profile</Link>
                        ) : (
                            <Link href={"/dashboard"} className=" block text-center w-full py-2 px-6 bg-gray-200 dark:bg-slate-700 text-xs font-semibold rounded cursor-pointer hover:bg-primary/20 hover:text-primary">Dashboard</Link>
                        )
                    }
                    <button onClick={openLogoutModal} className=" w-full text-center py-2 px-6 bg-gray-200 dark:bg-slate-700 text-xs font-semibold rounded cursor-pointer hover:bg-red-300 hover:text-red-700">Logout</button>
                </div>
            </div>
        </div>
    )
}