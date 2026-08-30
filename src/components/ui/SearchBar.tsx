"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { LinkListItem } from "./ListItem"
import { searchDashboard, DashboardSearchResult } from "@/actions/search"

const emptyResults: DashboardSearchResult = { users: [], posts: [], notifications: [] }

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("")
    const [debouncedValue, setDebouncedValue] = useState("")
    const [dropedMenu, setDropedMenu] = useState(false)
    const [results, setResults] = useState<DashboardSearchResult>(emptyResults)
    const [isLoading, setIsLoading] = useState(false)
    const requestId = useRef(0)

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
        if (debouncedValue.trim() === "") {
            setResults(emptyResults)
            setDropedMenu(false)
            return
        }

        setDropedMenu(true)
        setIsLoading(true)

        const thisRequest = ++requestId.current
        searchDashboard(debouncedValue).then((data) => {
            // ignore stale responses if a newer search has since started
            if (thisRequest === requestId.current) {
                setResults(data)
                setIsLoading(false)
            }
        })
    }, [debouncedValue])

    const hasResults = results.users.length > 0 || results.posts.length > 0 || results.notifications.length > 0

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
                    {
                        isLoading ? (
                            <p className=" text-muted text-sm p-2">Searching...</p>
                        ) : !hasResults ? (
                            <p className=" text-muted text-sm p-2">No result found</p>
                        ) : (
                            <div className=" space-y-4">
                                {results.users.length > 0 && (
                                    <div className=" space-y-2">
                                        <p className=" text-xs font-semibold text-primary">Users</p>
                                        {results.users.map((user) => (
                                            <LinkListItem
                                                key={user.id}
                                                href={`/dashboard/users/${user.id}`}
                                                text={user.label}
                                            />
                                        ))}
                                    </div>
                                )}
                                {results.posts.length > 0 && (
                                    <div className=" space-y-2">
                                        <p className=" text-xs font-semibold text-primary">Posts</p>
                                        {results.posts.map((post) => (
                                            <LinkListItem
                                                key={post.id}
                                                href={`/dashboard/posts/${post.id}`}
                                                text={post.label}
                                            />
                                        ))}
                                    </div>
                                )}
                                {results.notifications.length > 0 && (
                                    <div className=" space-y-2">
                                        <p className=" text-xs font-semibold text-primary">Notifications</p>
                                        {results.notifications.map((notification) => (
                                            <LinkListItem
                                                key={notification.id}
                                                href={`/dashboard/notifications/${notification.id}`}
                                                text={notification.label}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
