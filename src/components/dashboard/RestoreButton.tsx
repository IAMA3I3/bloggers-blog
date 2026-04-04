"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { FaCheck } from "react-icons/fa";
import { restorePostAction } from "@/actions/post";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type RestoreButtonProps = {
    id: string
}

export default function RestoreButton({ id }: RestoreButtonProps) {
    const router = useRouter()

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onRestore = () => {
        setModalProps({
            title: "Suspend",
            text: "Proceed to suspend",
            proceed: {
                text: "Proceed",
                onProceed: async () => {
                    // console.log(`${from} ${id} suspended`)
                    const result = await restorePostAction(id)
                    if (!result.success) {
                        toast.error(result.errors)
                        setIsModalOpen(false)
                        return
                    }
                    setIsModalOpen(false)
                    toast.success("Post restored")
                    router.refresh()
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text="Restore" icon={FaCheck} variant="secondary" outlined onClick={onRestore} />
    )
}