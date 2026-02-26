"use client"

import { PostFormData, PostStatus } from "@/types/post"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { Input } from "../ui/Input"
import RichTextEditor from "@/utils/Richtexteditor"
import { MediaInput } from "../ui/MediaInput"
import RadioInput from "../ui/RadioInput"
import { Button } from "../ui/Button"
import toast from "react-hot-toast"
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator"
import { useRouter } from "next/navigation"

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

    const router = useRouter()

    const [data, setData] = useState(initialData)
    const [richTextContent, setRichTextContent] = useState("")
    const [images, setImages] = useState<File[] | undefined>()
    const [radioValue, setRadioValue] = useState<PostStatus>(initialFormData.status)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<PostFormError>({})

    useEffect(() => {
        setData(prev => ({ ...prev, content: richTextContent }))
    }, [richTextContent])

    useEffect(() => {
        setData(prev => ({ ...prev, media: images }))
    }, [images])

    useEffect(() => {
        setData(prev => ({ ...prev, status: radioValue }))
    }, [radioValue])

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validatePost(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        await new Promise(res => setTimeout(res, 2000)) // simulate delay
        console.log(data)

        setIsLoading(false)
        setError({})
        setData(initialData)
        setRichTextContent("")
        setImages([])
        setRadioValue(initialFormData.status)
        toast.success(data.status === "draft" ? "Saved as draft" : "Published")
        router.replace('/dashboard/posts')
    }

    return (
        <form onSubmit={onFormSubmit} className=" w-full space-y-4">
            <Input
                variant="secondary"
                label="Title"
                backgroundColor="bg-white dark:bg-slate-900"
                value={data.title}
                onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                error={error.title}
            />
            <RichTextEditor onChange={setRichTextContent} />
            <MediaInput variant="multiple" id="multiple" media={images} setMedia={setImages} />
            <RadioInput
                value={radioValue}
                setValue={setRadioValue as Dispatch<SetStateAction<string>>}
                options={radioOptions}
            />
            <div className=" flex justify-center">
                <Button type="submit" text="Submit" rounded size="large" isLoading={isLoading} />
            </div>
        </form>
    )
}