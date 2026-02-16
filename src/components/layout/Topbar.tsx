"use client"

import { useStateContext } from "@/app/context/StateContext"
import UserButton from "@/components/ui/UserButton"
import { CgClose } from "react-icons/cg"
import { FiMenu } from "react-icons/fi"
import { IoSearch } from "react-icons/io5"
import NotificationButton from "../ui/NotificationButton"

export default function Topbar() {

    const { isSideBarOpened, toggleSideBar } = useStateContext()

    return (
        <header className="bg-white dark:bg-slate-700 shadow-sm z-10">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSideBar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {isSideBarOpened ? <CgClose className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>

                    <div className="hidden md:flex items-center bg-gray-200 dark:bg-gray-600 text-muted rounded-lg px-4 py-2 w-96">
                        <IoSearch className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <NotificationButton />

                    <UserButton from="DASHBOARD" />
                </div>
            </div>
        </header>
    )
}