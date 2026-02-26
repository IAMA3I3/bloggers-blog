"use client"

import { PostFormData, PostStatus } from "@/types/post"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "../ui/Input"
import RichTextEditor from "@/utils/Richtexteditor"
import { MediaInput } from "../ui/MediaInput"
import RadioInput from "../ui/RadioInput"

type PostFormProps = {
    initialData?: PostFormData
}

const initialFormData: PostFormData = {
    title: "",
    content: "",
    status: "draft"
}

const radioOptions: { text: string; value: PostStatus }[] = [
    { text: "Save as draft", value: "draft" },
    { text: "Publish", value: "published" },
]

export default function PostForm({ initialData = initialFormData }: PostFormProps) {

    const [data, setData] = useState(initialData)
    const [richTextContent, setRichTextContent] = useState("")
    const [images, setImages] = useState<File[] | undefined>()
    const [radioValue, setRadioValue] = useState<PostStatus>(initialFormData.status)

    useEffect(() => {
        setData(prev => ({ ...prev, content: richTextContent }))
    }, [richTextContent])

    useEffect(() => {
        setData(prev => ({ ...prev, media: images }))
    }, [images])

    useEffect(() => {
        setData(prev => ({ ...prev, status: radioValue }))
    }, [radioValue])

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
            <RadioInput
                value={radioValue}
                setValue={setRadioValue as Dispatch<SetStateAction<string>>}
                options={radioOptions}
            />
        </form>
    )
}