"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { AiOutlineStop } from "react-icons/ai";

type SuspendButtonProps = {
    from?: "POSTS"
    id: string
}

export default function SuspendButton({ from = "POSTS", id }: SuspendButtonProps) {

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onSuspend = () => {
        setModalProps({
            title: "Suspend",
            text: "Proceed to suspend",
            proceed: {
                text: "Proceed",
                onProceed: () => {
                    console.log(`${from} ${id} suspended`)
                    setIsModalOpen(false)
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text="Suspend" icon={AiOutlineStop} variant="secondary" outlined onClick={onSuspend} />
    )
}