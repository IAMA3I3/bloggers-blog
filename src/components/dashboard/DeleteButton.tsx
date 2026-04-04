"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deletePostAction } from "@/actions/post";

type DeleteButtonProps = {
    id: string
}

export default function DeleteButton({ id }: DeleteButtonProps) {
    const router = useRouter()

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onDelete = () => {
        setModalProps({
            title: "Delete",
            text: "Proceed to delete",
            proceed: {
                text: "Proceed",
                onProceed: async () => {
                    // console.log(`${from} ${id} deleted`)
                    const result = await deletePostAction(id)
                    if (!result.success) {
                        toast.error(result.errors)
                        setIsModalOpen(false)
                        return
                    }
                    setIsModalOpen(false)
                    toast.success("Post deleted")
                    router.replace("/dashboard/posts")
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text="Delete" icon={FaTrashAlt} variant="danger" outlined onClick={onDelete} />
    )
}