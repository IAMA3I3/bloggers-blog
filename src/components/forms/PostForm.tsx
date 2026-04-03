"use client"

import { PostCategory, PostFormData, PostMedia, PostStatus } from "@/types/post"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { Input } from "../ui/Input"
import RichTextEditor from "@/utils/Richtexteditor"
import { MediaInput } from "../ui/MediaInput"
import RadioInput from "../ui/RadioInput"
import { Button } from "../ui/Button"
import toast from "react-hot-toast"
import { PostFormError, validatePost } from "@/utils/validators/createPostValidator"
import { useRouter } from "next/navigation"
import { createPostAction } from "@/actions/post"
import { DropSelectMenu } from "../ui/DropMenu"
import { uploadFileToCloudinary } from "@/lib/media/uploadToCloudinaryClient"

type PostFormProps = {
    initialData?: PostFormData
}

const initialFormData: PostFormData = {
    title: "",
    content: "",
    status: "draft",
    category: "others"
}

const radioOptions: { text: string; value: PostStatus }[] = [
    { text: "Save as draft", value: "draft" },
    { text: "Publish", value: "published" }
]

const categories: PostCategory[] = ["architecture", "design", "productivity", "technology", "tutorial", "web-development", "others"]

export default function PostForm({ initialData = initialFormData }: PostFormProps) {

    const router = useRouter()

    const [data, setData] = useState(initialData)
    const [richTextContent, setRichTextContent] = useState(initialData.content)
    const [images, setImages] = useState<File[] | undefined>(initialData.media)
    const [radioValue, setRadioValue] = useState<PostStatus>(initialData.status)
    const [category, setCategory] = useState<PostCategory>(initialData.category)
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

    useEffect(() => {
        setData(prev => ({ ...prev, category }))
    }, [category])

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validatePost(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        // Upload media directly to Cloudinary from the client
        let uploadedMedia: PostMedia[] = []
        if (images && images.length > 0) {
            try {
                uploadedMedia = await Promise.all(images.map(uploadFileToCloudinary))
            } catch {
                setError({ media: "Media upload failed. Please try again." })
                setIsLoading(false)
                return
            }
        }

        // Now send only text + uploaded URLs to the server action
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("status", data.status)
        formData.append("category", data.category)
        formData.append("uploadedMedia", JSON.stringify(uploadedMedia))

        const result = await createPostAction(formData)
        if (!result.success) {
            setError(result.errors)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        setError({})
        setData(initialData)
        setRichTextContent(initialData.content)
        setImages(initialData.media)
        setRadioValue(initialData.status)
        toast.success(data.status === "draft" ? "Saved as draft" : "Published")
        router.replace(`/dashboard/posts/${result.data.id}`)
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
                id="title"
            />
            <RichTextEditor initialContent={richTextContent} onChange={setRichTextContent} error={error.content} />
            <DropSelectMenu
                label="Category"
                value={category}
                setValue={setCategory as Dispatch<SetStateAction<string>>}
                menuItems={categories}
                fullWidth
                className=" w-full text-sm bg-transparent py-2 px-4 rounded-lg border-2 border-border focus:border-primary outline-none"
            />
            <MediaInput variant="multiple" id="multiple" media={images} setMedia={setImages} error={error.media} />
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