type BasicCardProps = {
    children: React.ReactNode
    noPadding?: boolean
    hoverEffect?: boolean
    noBackground?: boolean
    overflow?: boolean
}

export const BasicCard = ({ children, noPadding = false, hoverEffect = false, noBackground = false, overflow = false }: BasicCardProps) => {

    return (
        <div
            className={`
                ${noPadding ? "" : " p-5"}
                ${hoverEffect ? " hover:shadow-2xl" : ""}
                ${noBackground ? "" : " bg-background/60"}
                ${overflow ? "" : " overflow-hidden"}
                rounded-xl border border-border backdrop-blur-sm shadow-lg dark:shadow-black/50 group
            `}
        >
            {children}
        </div>
    )
}

type PageCardProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    fullWidth?: boolean
    fullHeight?: boolean
    centerAlign?: boolean
    scaleDown?: boolean
    scrollable?: boolean
}

export const PageCard = ({ children, fullWidth = false, fullHeight = false, centerAlign = false, scaleDown = false, scrollable = false, ...rest }: PageCardProps) => {

    return (
        <div
            {...rest}
            className={`
                ${fullWidth ? "" : " max-w-150"}
                ${fullHeight ? " h-full" : ""}
                ${centerAlign ? " mx-auto" : ""}
                ${scaleDown ? " scale-50" : " scale-100"}
                transition-all duration-500
                w-full p-6 rounded-lg shadow-lg bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 dark:shadow-black/70 backdrop-blur-md
            `}
        >
            <div className={`${scrollable && " overflow-y-auto"} w-full h-full`}>
                {children}
            </div>
        </div>
    )
}