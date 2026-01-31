type LogoProps = {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large" | "inherit"
    rounded?: boolean
    shadow?: boolean
}

export const Logo = ({ variant = "primary", size = "medium", rounded = false, shadow = false }: LogoProps) => {
    return (
        <div
            className={`
                ${size === "small" && "text-base w-6 md:w-8"}
                ${size === "medium" && "text-2xl w-12 md:w-14"}
                ${size === "large" && "text-5xl w-20 md:w-24"}
                ${size === "inherit" ? " p-5 inline-block" : "aspect-square flex"}
                ${variant === "primary" && "text-primary bg-primary/20"}
                ${variant === "secondary" && "text-primary"}
                ${rounded ? " rounded-full" : " rounded-lg"}
                ${shadow && "shadow-2xl"}
                justify-center items-center hover:animate-pulse
            `}
        >
            B
        </div>
    )
}