type BasicCardProps = {
    children: React.ReactNode
    noPadding?: boolean
    hoverEffect?: boolean
    noBackground?: boolean
}

export const BasicCard = ({ children, noPadding = false, hoverEffect = false, noBackground = false }: BasicCardProps) => {

    return (
        <div
            className={`
                ${noPadding ? "" : " p-5"}
                ${hoverEffect ? " hover:shadow-2xl" : ""}
                ${noBackground ? "" : " bg-background/60"}
                rounded-xl border border-border backdrop-blur-sm shadow-lg overflow-hidden dark:shadow-black group
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
                w-full p-6 rounded-lg shadow-lg bg-white border-2 border-gray-100
            `}
        >
            <div className=" w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}