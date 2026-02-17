"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("")
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
        if (searchValue.trim() !== "") {
            setDropedMenu(true)
        } else {
            setDropedMenu(false)
        }
    }, [searchValue])

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
                <p className=" text-muted text-sm">No result found</p>
            </div>
        </div>
    )
}