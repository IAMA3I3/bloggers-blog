"use client"

import { useStateContext } from "@/app/context/StateContext"
import { PageCard } from "../containers/Cards"
import { Button } from "./Button"

export default function Modal() {

    const { isModalOpen, setIsModalOpen, modalProps } = useStateContext()

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const clickOutside = () => {
        if (modalProps.closeModalByClickOutside) {
            closeModal()
        }
    }

    return (
        <div
            onClick={clickOutside}
            className={`
                ${isModalOpen ? " opacity-100 visible" : " opacity-0 invisible"}
                transition-all duration-500
                fixed inset-0 z-50 bg-black/60 backdrop-blur-xs p-8 flex justify-center items-center
            `}
        >
            <PageCard onClick={(e) => e.stopPropagation()} scaleDown={!isModalOpen}>
                {
                    modalProps.title && (
                        <h2 className=" text-2xl">{modalProps.title}</h2>
                    )
                }
                {
                    modalProps.text && (
                        <p className=" text-muted">{modalProps.text}</p>
                    )
                }
                <div className=" mt-4 flex gap-4 flex-col sm:flex-row">
                    <Button onClick={modalProps.proceed?.onProceed} text={modalProps.proceed?.text} variant="success" />
                    <Button onClick={closeModal} text="Cancel" variant="danger" outlined />
                </div>
            </PageCard>
        </div>
    )
}