"use client"

import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { LinkListItem } from "./ListItem"

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("")
    const [debouncedValue, setDebouncedValue] = useState("")
    const [dropedMenu, setDropedMenu] = useState(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onInputFocus = () => {
        if (searchValue.trim() !== "") {
            setDropedMenu(true)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchValue)
        }, 400)

        return () => clearTimeout(timer)
    }, [searchValue])

    useEffect(() => {
        if (debouncedValue.trim() !== "") {
            setDropedMenu(true)

            console.log("Searching for:", debouncedValue)
        } else {
            setDropedMenu(false)
        }
    }, [debouncedValue])

    return (
        <div className=" relative">
            <div className="hidden md:flex items-center bg-gray-200 dark:bg-gray-600 text-muted rounded-lg px-4 py-2 w-96">
                <IoSearch className="w-5 h-5 text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={onInputChange}
                    className="bg-transparent outline-none w-full text-sm"
                    onFocus={onInputFocus}
                    onBlur={() => setDropedMenu(false)}
                />
            </div>
            <div
                className={`
                    ${dropedMenu ? " opacity-100 translate-y-0 visible" : " opacity-0 -translate-y-5 invisible"}
                    transition-all duration-500 absolute left-0 mt-6 w-100 bg-white dark:bg-slate-800 rounded-lg border-2
                    border-gray-200 dark:border-slate-700 shadow-lg p-2
                `}
            >
                <div className=" max-h-100 overflow-y-auto">
                    {/* <p className=" text-muted text-sm">No result found</p> */}
                    <div className=" space-y-4">
                        {/* users */}
                        <div className=" space-y-2">
                            <p className=" text-xs font-semibold text-primary">Users</p>
                            {
                                ["Username", "Somebody"].map(user => (
                                    <LinkListItem
                                        key={user}
                                        href={`/dashboard/users/${user}`}
                                        text={user}
                                    />
                                ))
                            }
                        </div>
                        {/* posts */}
                        <div className=" space-y-2">
                            <p className=" text-xs font-semibold text-primary">Posts</p>
                            {
                                ["Post 1", "Post 2"].map(post => (
                                    <LinkListItem
                                        key={post}
                                        href={`/dashboard/posts/${post}`}
                                        text={post}
                                    />
                                ))
                            }
                        </div>
                        {/* notifications */}
                        <div className=" space-y-2">
                            <p className=" text-xs font-semibold text-primary">Notifications</p>
                            {
                                ["Notification 1", "Notification 2"].map(notification => (
                                    <LinkListItem
                                        key={notification}
                                        href={`/dashboard/notifications/${notification}`}
                                        text={notification}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}