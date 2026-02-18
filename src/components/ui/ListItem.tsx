"use client"

import Link from "next/link"

type LinkListItemProps = {
    href: string
    onClick?: () => void
    mutedText?: string
    text: string
    shadow?: boolean
}

export const LinkListItem = ({ href, onClick = () => { }, mutedText, text, shadow = false }: LinkListItemProps) => {

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
                ${shadow ? " shadow-inner shadow-black/20" : ""}
                block py-2 px-4 bg-gray-100 dark:bg-slate-700 text-xs font-semibold rounded hover:bg-primary/20 hover:text-primary
            `}
        >
            {mutedText && <p className=" text-xs text-muted mb-1">{mutedText}</p>}
            <p className=" line-clamp-2">{text}</p>
        </Link>
    )
}