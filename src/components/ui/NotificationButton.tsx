"use client"

import { mockNotifications } from "@/temp/notificationData"
import { formatPostDate } from "@/utils/formatPostDate"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaRegBell } from "react-icons/fa"

export default function NotificationButton() {

    const dropDownRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [dropedMenu, setDropedMenu] = useState(false)

    const toggleDropMenu = () => {
        setDropedMenu(prev => !prev)
    }

    const closeDropMenu = () => {
        setDropedMenu(false)
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

    const notifications = mockNotifications.filter(i => i.status === "unread")

    return (
        <div className=" relative">
            <button ref={buttonRef} onClick={toggleDropMenu} className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <FaRegBell className="w-6 h-6" />
                {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>
            <div
                ref={dropDownRef}
                className={`
                    ${dropedMenu ? " opacity-100 translate-y-0 visible" : " opacity-0 -translate-y-5 invisible"}
                    transition-all duration-500 absolute -right-16 sm:right-0 mt-5 w-60 bg-white dark:bg-slate-800 rounded-lg border-2
                    border-gray-200 dark:border-slate-700 shadow-lg p-2
                `}
            >
                <div className=" space-y-2">
                    {
                        notifications.length === 0 ? (
                            <p className=" text-muted text-sm">No unread notifications</p>
                        ) : notifications.slice(0, 5).map(notification => (
                            <Link key={notification._id} href={`/dashboard/notifications/${notification._id}`} className=" block py-2 px-4 bg-gray-200 dark:bg-slate-700 text-xs font-semibold rounded hover:bg-primary/20 hover:text-primary">
                                <p className=" text-xs text-muted mb-1">{formatPostDate(notification.createdAt)}</p>
                                <p className=" line-clamp-2">{notification.content}</p>
                            </Link>
                        ))
                    }
                    <Link href={"/dashboard/notifications"} className=" text-sm text-primary hover:underline">See all notifications</Link>
                </div>
            </div>
        </div>
    )
}
