"use client"

import Link from "next/link"
import { BasicCard } from "../containers/Cards"
import { PostMedia } from "@/types/post"
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "./Button";
import { useStateContext } from "@/context/StateContext";
import { MdEditSquare } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

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

type ActionListItemProps = {
    media?: PostMedia
    mutedText?: string
    mainText: string
    contentText?: string
    href?: string
    actionButton?: {
        action: "EDIT"
        href: string
    }
    deleteAction?: {
        for: "USERS" | "POSTS"
        id: string
    }
    status?: {
        variant: "primary" | "secondary" | "success" | "info" | "error"
        text: string
    }
}

export const ActionListItem = ({ media, mutedText, mainText, contentText, href, actionButton, deleteAction, status }: ActionListItemProps) => {

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onDelete = () => {
        setModalProps({
            title: "Delete",
            text: "Proceed to delete",
            proceed: {
                text: "Proceed",
                onProceed: () => {
                    console.log(`${deleteAction?.for} ${deleteAction?.id} deleted`)
                    setIsModalOpen(false)
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <BasicCard hoverEffect noBackground noPadding={!!media}>
            <div className=" flex flex-col md:flex-row gap-4 items-center">
                {
                    status && (
                        <div className=" absolute top-2 right-2 flex gap-2 items-center py-1 px-3 rounded-lg backdrop-blur-lg z-50">
                            <div
                                className={`
                                    ${status.variant === "primary" && " bg-primary"}
                                    ${status.variant === "secondary" && " bg-gray-400"}
                                    ${status.variant === "success" && " bg-green-500"}
                                    ${status.variant === "info" && " bg-yellow-500"}
                                    ${status.variant === "error" && " bg-red-500"}
                                    w-2 aspect-square rounded-full
                                `}
                            ></div>
                            <p
                                className={`
                                    ${status.variant === "primary" && " text-primary"}
                                    ${status.variant === "secondary" && " text-gray-400"}
                                    ${status.variant === "success" && " text-green-500"}
                                    ${status.variant === "info" && " text-yellow-500"}
                                    ${status.variant === "error" && " text-red-500"}
                                    text-xs font-semibold
                                `}
                            >{status.text}</p>
                        </div>
                    )
                }
                {
                    media && (
                        <div className=" w-full md:w-25 h-25 overflow-hidden">
                            {
                                media.type === "image" ? (
                                    <img src={media.url} alt={media.filename} className=" w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                ) : (
                                    <video src={media.url} autoPlay loop muted className=" w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                )
                            }
                        </div>
                    )
                }
                <div className={`${media && "px-4 md:py-4"} w-full flex-1 overflow-hidden text-center md:text-left`}>
                    {mutedText && <p className=" text-xs font-semibold text-muted">{mutedText}</p>}
                    {
                        href ? (
                            <Link href={href} className=" block font-semibold truncate hover:text-primary">{mainText}</Link>
                        ) : (
                            <h6 className=" font-semibold truncate">{mainText}</h6>
                        )
                    }
                    {contentText && <p className=" text-sm truncate">{contentText}</p>}
                </div>
                {
                    (deleteAction || actionButton) && (
                        <div className={`${media && "px-4 md:py-4 pb-4 md:pb-0"} flex gap-4 items-center flex-nowrap`}>
                            {
                                actionButton && (
                                    <Link href={actionButton.href}>
                                        <Button
                                            icon={
                                                actionButton.action === "EDIT" ?
                                                    MdEditSquare : GoDotFill
                                            }
                                            outlined
                                            size="small"
                                        />
                                    </Link>
                                )
                            }
                            {
                                deleteAction && (
                                    <Button
                                        icon={FaTrashCan}
                                        outlined
                                        variant="danger"
                                        size="small"
                                        onClick={onDelete}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </BasicCard>
    )
}