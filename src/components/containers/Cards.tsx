type BasicCardProps = {
    children: React.ReactNode
    noPadding?: boolean
    hoverEffect?: boolean
}

export const BasicCard = ({ children, noPadding = false, hoverEffect = false }: BasicCardProps) => {

    return (
        <div
            className={`
                ${noPadding ? "" : " p-5"}
                ${hoverEffect ? " hover:shadow-2xl" : ""}
                rounded-xl border border-border bg-background/60 backdrop-blur-sm shadow-lg overflow-hidden group
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