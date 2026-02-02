import { IconType } from "react-icons"
import { LoadingSpinner } from "./Loading"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large" | "inherit"
    rounded?: boolean
    outlined?: boolean
    icon?: IconType
    text?: string
    iconPosition?: "start" | "end"
    fullWidth?: boolean
    isLoading?: boolean
}

export const Button = ({ variant = "primary", size = "medium", rounded = false, outlined = false, icon: Icon, text, iconPosition = "start", fullWidth = false, isLoading = false, ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            disabled={isLoading}
            className={`
                ${variant === "primary" && !outlined && " bg-blue-500 hover:bg-blue-400 text-white border-2 border-blue-500 hover:border-blue-400"}
                ${variant === "secondary" && !outlined && " bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-800 hover:border-slate-700"}
                ${variant === "primary" && outlined && " border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}
                ${variant === "secondary" && outlined && " border-2 border-slate-800 text-slate-800 hover:bg-slate-700 hover:text-white"}
                ${size === "small" && " text-xs font-semibold"}
                ${size === "medium" && " text-sm"}
                ${size === "large" && " text-base"}
                ${rounded ? " rounded-full" : " rounded"}
                ${fullWidth && "w-full justify-center"}
                py-2 px-6 tracking-wider flex items-center gap-2
                disabled:bg-gray-400 disabled:text-white cursor-pointer
                disabled:pointer-events-none active:scale-95 leading-none
                disabled:border-gray-400 relative
            `}>
            {
                isLoading ?
                    <>
                        {
                            Icon && iconPosition === "start" &&
                            <LoadingSpinner size="small" />
                        }
                        {
                            Icon ?
                                text
                                :
                                <>
                                    <span className=" opacity-0">{text}</span>
                                    <span className=" absolute w-full h-full top-0 left-0 flex justify-center items-center"><LoadingSpinner size="small" /></span>
                                </>
                        }
                        {
                            Icon && iconPosition === "end" &&
                            <LoadingSpinner size="small" />
                        }
                    </>
                    :
                    <>
                        {
                            Icon && iconPosition === "start" &&
                            <Icon
                                className={`
                        ${size === "small" && " text-sm"}
                        ${size === "medium" && " text-base"}
                        ${size === "medium" && " text-lg"}
                        mb-0.5x
                    `}
                            />
                        }
                        {text}
                        {
                            Icon && iconPosition === "end" &&
                            <Icon
                                className={`
                        ${size === "small" && " text-sm"}
                        ${size === "medium" && " text-base"}
                        ${size === "medium" && " text-lg"}
                        mb-0.5x
                    `}
                            />
                        }
                    </>
            }
        </button>
    )
}