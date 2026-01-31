"use client"

import { Logo } from "@/components/ui/Logo"
import ThemeToggle from "@/components/ui/ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HiMenuAlt1 } from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { FiLogIn } from "react-icons/fi";
import UserButton from "@/components/ui/UserButton"
import { Button } from "@/components/ui/Button"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
]

export default function NavbarClient() {

    const pathname = usePathname()

    const [isSticky, setIsSticky] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 8) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }
        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        return () => window.removeEventListener('resize', setVH);
    }, [])

    return (
        <>
            <header className={`${isSticky ? "border-b shadow dark:shadow-black/40" : ""} transition-all duration-500 sticky top-0 z-50 border-border bg-background/80 backdrop-blur`}>
                <nav className={`${isSticky ? "py-2 px-6" : "py-8 px-10 md:px-16"} transition-all duration-500 container mx-auto flex items-center justify-between`}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Logo size="small" />
                        <span className="font-semibold md:text-lg">Bloggers Blog</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-6 md:flex">
                        {
                            navLinks.map(link => {
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`${isActive ? " text-primary" : " text-muted hover:text-foreground"} text-sm font-semibold transition-colors`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })
                        }
                        <ThemeToggle />
                        <Link href={"/sign-in"} className=" p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-800 transition-colors text-2xl hover:text-primary">
                            <FiLogIn />
                        </Link>
                        {/* <UserButton from="MAIN" /> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(true)} className="md:hidden text-foreground text-2xl">
                        <HiMenuAlt1 />
                    </button>
                </nav>
            </header>
            <div onClick={() => setIsOpen(false)} className={`${isOpen ? ' visible opacity-100' : ' invisible opacity-0'} transition-all duration-500 md:hidden z-50 fixed top-0 left-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}></div>
            <div className={`${isOpen ? ' translate-x-0 shadow-lg' : ' -translate-x-62.5'} transition-all duration-500 md:hidden z-50 fixed top-0 left-0 h-[calc(var(--vh,1vh)*100)] w-62.5 bg-white/90 dark:bg-black/80 backdrop-blur rounded-r-2xl shadow-black flex flex-col pr-4`}>
                <div className=" h-20"></div>
                <div className=" flex-1 pr-4 space-y-4 overflow-y-auto scrollbar small-scrollbar">
                    {
                        navLinks.map(link => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                            return (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`${isActive ? ' bg-primary/20 text-primary' : ' text-primary hover:bg-primary/20'} flex items-center font-semibold py-2 px-6 rounded-r-full`}>{link.name}</Link>
                            )
                        })
                    }
                </div>
                <div className=" px-2 py-4">
                    <ThemeToggle />
                </div>
                <div className=" px-2 py-4 border-t-2 border-gray-300 dark:border-slate-800">
                    <Link href={"/sign-in"} className=" inline-block w-full">
                        <Button text="Sign In" rounded fullWidth icon={FiLogIn} iconPosition="end" />
                    </Link>
                    {/* <UserButton from="MAIN" /> */}
                </div>
            </div>
            <div onClick={() => setIsOpen(false)} className={`${isOpen ? ' visible scale-100' : ' invisible scale-0'} transition-all duration-500 md:hidden z-50 fixed top-4 right-4 w-10 aspect-square rounded-full shadow-lg text-2xl bg-white dark:bg-black/70 text-primary flex justify-center items-center hover:bg-primary hover:text-white active:scale-95 cursor-pointer`}>
                <IoCloseOutline />
            </div>
        </>
    )
}