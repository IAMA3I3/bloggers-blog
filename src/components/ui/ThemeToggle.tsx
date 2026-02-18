"use client"

import { useStateContext } from "@/context/StateContext"
import { useEffect, useState } from "react"
import { IoMoon, IoSunny } from "react-icons/io5"

export default function ThemeToggle() {

    const { isDarkTheme, setIsDarkTheme } = useStateContext()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            document.documentElement.classList.toggle("dark", storedTheme === "dark")
            setIsDarkTheme(storedTheme === "dark")
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.classList.toggle("dark", prefersDark)
            setIsDarkTheme(prefersDark)
        }
    }, [])

    if (!mounted) return null

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", isDark ? "dark" : "light")
        setIsDarkTheme(isDark)
    }

    return (
        <button onClick={toggleTheme} className=" relative h-6.25 aspect-2/1 rounded-full bg-primary/50 shadow-inner shadow-black/50 p-1 flex items-center cursor-pointer">
            <div className={`${isDarkTheme ? ' left-6.5' : ' left-1'} transition-all duration-500 absolute h-4.5 aspect-square text-[12px] rounded-full bg-primary dark:bg-black shadow flex justify-center items-center text-white`}>
                {
                    isDarkTheme ?
                        <span><IoMoon /></span>
                        :
                        <span><IoSunny /></span>
                }
            </div>
        </button>
    );
}