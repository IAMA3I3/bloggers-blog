"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type ModalProps = {
    title?: string
    text?: string
    proceed?: {
        text?: string
        onProceed?: () => void
    }
    closeModalByClickOutside?: boolean
}

type AppState = {
    isDarkTheme: boolean
    setIsDarkTheme: Dispatch<SetStateAction<boolean>>
    isSideBarOpened: boolean
    toggleSideBar: () => void
    closeSideBar: () => void
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    modalProps: ModalProps
    setModalProps: Dispatch<SetStateAction<ModalProps>>
}

const StateContext = createContext<AppState | undefined>(undefined)

const initialModalProps: ModalProps = {
    proceed: {text: "Proceed", onProceed: () => {}},
    closeModalByClickOutside: false
}

export function StateProvider({ children }: { children: React.ReactNode }) {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalProps, setModalProps] = useState<ModalProps>(initialModalProps)

    const toggleSideBar = () => {
        setIsSideBarOpened(prev => !prev)
    }

    const closeSideBar = () => {
        setIsSideBarOpened(false)
    }

    return (
        <StateContext.Provider value={{ isDarkTheme, setIsDarkTheme, isSideBarOpened, toggleSideBar, closeSideBar, isModalOpen, setIsModalOpen, modalProps, setModalProps }}>
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