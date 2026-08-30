"use client"

import { useStateContext } from "@/context/StateContext";
import { Button } from "../ui/Button"
import { FaStar, FaRegStar } from "react-icons/fa";
import { toggleFeaturedAction } from "@/actions/post";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FeatureButtonProps = {
    id: string
    featured: boolean
}

export default function FeatureButton({ id, featured }: FeatureButtonProps) {
    const router = useRouter()

    const { setIsModalOpen, setModalProps } = useStateContext()

    const onToggle = () => {
        setModalProps({
            title: featured ? "Unfeature" : "Feature",
            text: featured ? "Remove this post from featured?" : "Feature this post on the homepage?",
            proceed: {
                text: "Proceed",
                onProceed: async () => {
                    const result = await toggleFeaturedAction(id, !featured)
                    if (!result.success) {
                        toast.error(result.errors)
                        setIsModalOpen(false)
                        return
                    }
                    setIsModalOpen(false)
                    toast.success(featured ? "Post unfeatured" : "Post featured")
                    router.refresh()
                }
            }
        })
        setIsModalOpen(true)
    }

    return (
        <Button text={featured ? "Unfeature" : "Feature"} icon={featured ? FaStar : FaRegStar} variant="secondary" outlined onClick={onToggle} />
    )
}
