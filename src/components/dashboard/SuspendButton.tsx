"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { AiOutlineStop } from "react-icons/ai";
import { suspendPostAction } from "@/actions/post";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type SuspendButtonProps = {
    id: string
}

export default function SuspendButton({ id }: SuspendButtonProps) {
    const router = useRouter()

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onSuspend = () => {
        setModalProps({
            title: "Suspend",
            text: "Proceed to suspend",
            proceed: {
                text: "Proceed",
                onProceed: async () => {
                    // console.log(`${from} ${id} suspended`)
                    const result = await suspendPostAction(id)
                    if (!result.success) {
                        toast.error(result.errors)
                        setIsModalOpen(false)
                        return
                    }
                    setIsModalOpen(false)
                    toast.success("Post suspended")
                    router.refresh()
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text="Suspend" icon={AiOutlineStop} variant="secondary" outlined onClick={onSuspend} />
    )
}