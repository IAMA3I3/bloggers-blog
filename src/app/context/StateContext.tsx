"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type AppState = {
    isDarkTheme: boolean
    setIsDarkTheme: Dispatch<SetStateAction<boolean>>
    isSideBarOpened: boolean
    toggleSideBar: () => void
    closeSideBar: () => void
}

const StateContext = createContext<AppState | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpened(prev => !prev)
    }

    const closeSideBar = () => {
        setIsSideBarOpened(false)
    }

    return (
        <StateContext.Provider value={{ isDarkTheme, setIsDarkTheme, isSideBarOpened, toggleSideBar, closeSideBar }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext)

    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateProvider')
    }

    return context
}