"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa";

type DeleteButtonProps = {
    from?: "POSTS"
    id: string
}

export default function DeleteButton({ from = "POSTS", id }: DeleteButtonProps) {

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onDelete = () => {
        setModalProps({
            title: "Delete",
            text: "Proceed to delete",
            proceed: {
                text: "Proceed",
                onProceed: () => {
                    console.log(`${from} ${id} deleted`)
                    setIsModalOpen(false)
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text="Delete" icon={FaTrashAlt} variant="danger" outlined onClick={onDelete} />
    )
}