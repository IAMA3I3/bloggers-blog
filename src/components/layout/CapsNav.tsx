import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import ThemeToggle from "../ui/ThemeToggle";

export default function CapsNav() {

    return (
        <nav className=" fixed top-0 w-full p-4 flex justify-center z-50">
            <div className=" py-3 px-5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-border shadow-lg dark:shadow-black/70 flex gap-8 items-center">
                <Link href={"/"} className=" text-muted hover:text-primary text-xl">
                    <GoHomeFill />
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    )
}