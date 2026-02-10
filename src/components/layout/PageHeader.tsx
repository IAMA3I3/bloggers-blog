import Link from "next/link"
import { GoHomeFill } from "react-icons/go";

type PageHeaderProps = {
    title?: string
    subtitle?: string
    parentPage?: { title: string, href: string }
    currentPage?: string
}

export default function PageHeader({ title, subtitle, parentPage, currentPage }: PageHeaderProps) {
    return (
        <section className=" container px-6 pt-28 mx-auto">
            <div className=" rounded-2xl p-8 border-2 border-border shadow-lg bg-linear-to-tr from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-black/20 dark:to-white/20">
                <h1 className=" text-2xl md:text-4xl text-center">{title}</h1>
                <p className=" text-muted text-center mt-2 max-w-200 mx-auto">{subtitle}</p>
                {
                    currentPage && (
                        <div className=" mt-4 flex items-center justify-center gap-2">
                            <Link href={'/'} className=" flex items-center gap-1 text-muted font-semibold hover:text-primary">
                                <span><GoHomeFill /></span>
                                {!parentPage && <span>Home</span>}
                            </Link>
                            {
                                parentPage && (
                                    <>
                                        <span>/</span>
                                        <Link href={parentPage.href} className=" text-muted font-semibold hover:text-primary">
                                            <span>{parentPage.title}</span>
                                        </Link>
                                    </>
                                )
                            }
                            <span>/</span>
                            <p
                                className={`
                                    ${parentPage ? " max-w-25" : " max-w-40"}
                                    font-semibold truncate
                                `}
                            >{currentPage}</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}