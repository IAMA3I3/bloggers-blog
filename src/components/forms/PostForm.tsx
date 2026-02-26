"use client"

import { PostFormData } from "@/types/post"
import { useEffect, useState } from "react"
import { Input } from "../ui/Input"
import RichTextEditor from "@/utils/Richtexteditor"
import { MediaInput } from "../ui/MediaInput"

type PostFormProps = {
    initialData?: PostFormData
}

const initialFormData: PostFormData = {
    title: "",
    content: "",
    status: "draft"
}

export default function PostForm({ initialData = initialFormData }: PostFormProps) {

    const [data, setData] = useState(initialData)
    const [richTextContent, setRichTextContent] = useState("")
    const [images, setImages] = useState<File[] | undefined>()

    useEffect(() => {
        setData(prev => ({ ...prev, content: richTextContent }))
    }, [richTextContent])

    useEffect(() => {
        setData(prev => ({ ...prev, media: images }))
    }, [images])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <form className=" w-full space-y-4">
            <Input
                variant="secondary"
                label="Title"
                backgroundColor="bg-white dark:bg-slate-900"
            />
            <RichTextEditor onChange={setRichTextContent} />
            <MediaInput variant="multiple" id="multiple" media={images} setMedia={setImages} />
        </form>
    )
}