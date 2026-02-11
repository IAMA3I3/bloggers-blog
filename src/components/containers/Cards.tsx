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

type PageCardProps = {
    children: React.ReactNode
    fullWidth?: boolean
    fullHeight?: boolean
    centerAlign?: boolean
}

export const PageCard = ({ children, fullWidth = false, fullHeight = false, centerAlign = false }: PageCardProps) => {

    return (
        <div
            className={`
                ${fullWidth ? "" : " max-w-150"}
                ${fullHeight ? " h-full" : ""}
                ${centerAlign ? " mx-auto" : ""}
                w-full p-6 rounded-lg shadow-lg bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 dark:shadow-black/70 backdrop-blur-md
            `}
        >
            <div className=" w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}