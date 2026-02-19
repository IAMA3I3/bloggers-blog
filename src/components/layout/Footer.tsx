import Link from "next/link"
import { Logo } from "../ui/Logo"
import { FaGithub, FaGlobe, FaWhatsapp, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa"

export const Footer = () => {
    return (
        <footer className=" w-full py-8 bg-slate-800 text-white">
            <div className=" container mx-auto px-6">
                <div className=" w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className=" sm:pr-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Logo size="small" />
                            <span className="font-semibold md:text-lg">Bloggers Blog</span>
                        </Link>
                        <p className=" mt-4 text-sm">A modern blogging platform for writers who value clarity, simplicity, and focus.</p>
                    </div>
                    <div className="">
                        <h4 className="text-sm font-medium">
                            Quick Links
                        </h4>
                        <div className=" mt-6 text-xs font-semibold flex flex-col items-start gap-3">
                            <Link href={"/"} className=" text-gray-300 hover:text-primary">Home</Link>
                            <Link href={"/blog"} className=" text-gray-300 hover:text-primary">Blog</Link>
                            <Link href={"/dashboard"} className=" text-gray-300 hover:text-primary">Dashboard</Link>
                            <Link href={"/sign-in"} className=" text-gray-300 hover:text-primary">Sign In</Link>
                            <Link href={"/sign-up"} className=" text-gray-300 hover:text-primary">Sign Up</Link>
                        </div>
                    </div>
                    <div className="">
                        <h4 className="text-sm font-medium">
                            Need to Know
                        </h4>
                        <div className=" mt-6 text-xs font-semibold flex flex-col items-start gap-3">
                            <Link href={"/about"} className=" text-gray-300 hover:text-primary">About</Link>
                            <Link href={"/contact"} className=" text-gray-300 hover:text-primary">Contact</Link>
                            <Link href={"/terms"} className=" text-gray-300 hover:text-primary">Terms & conditions</Link>
                        </div>
                    </div>
                    <div className="">
                        <h4 className="text-sm font-medium">
                            Built By
                        </h4>
                        <div className=" mt-6 text-xs font-semibold flex flex-col items-start gap-3">
                            <a
                                href="https://abdulazeezsalami.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-primary"
                            >
                                <FaGlobe size={16} />
                                Portfolio
                            </a>

                            <a
                                href="https://github.com/IAMA3I3/bloggers-blog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-primary"
                            >
                                <FaGithub size={16} />
                                GitHub
                            </a>
                            <div className=" mt-4 flex gap-4 items-center text-lg">
                                <a href="https://wa.me/+2348106925925" target="_blank" rel="noopener noreferrer" className=" text-gray-300 hover:text-primary">
                                    <FaWhatsapp />
                                </a>
                                <a href="https://www.linkedin.com/in/abdulazeezsalami19/" target="_blank" rel="noopener noreferrer" className=" text-gray-300 hover:text-primary">
                                    <FaLinkedinIn />
                                </a>
                                <a href="https://web.facebook.com/profile.php?id=100084453611899" target="_blank" rel="noopener noreferrer" className=" text-gray-300 hover:text-primary">
                                    <FaFacebookF />
                                </a>
                                <a href="https://www.instagram.com/_az_ziz/" target="_blank" rel="noopener noreferrer" className=" text-gray-300 hover:text-primary">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className=" mt-8 pt-4 border-t border-gray-600 text-sm flex flex-col sm:flex-row justify-between gap-4 items-center text-center">
                    <p>© {new Date().getFullYear()} Bloggers Blog. All rights reserved.</p>
                    <p>Developed By <a href="https://abdulazeezsalami.vercel.app/" target="_blank" rel="noopener noreferrer" className=" hover:underline">Aziz</a></p>
                </div>
            </div>
        </footer>
    )
}

export const DashboardFooter = () => {

    return (
        <div className=" fixed bottom-2 right-6 py-1 px-3 rounded bg-white/20 backdrop-blur text-sm font-semibold text-gray-700 dark:text-gray-300">
            Developed by <a href="https://abdulazeezsalami.vercel.app/" target="_blank" className=" hover:underline">Aziz</a>
        </div>
    )
}