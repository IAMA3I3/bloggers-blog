"use client"

import { PostFormData } from "@/types/post"
import { useState } from "react"
import { Input } from "../ui/Input"

type PostFormProps = {
    initialData?: PostFormData
}

const initialFormData: PostFormData = {
    title: "",
    content: ""
}

export default function PostForm({ initialData = initialFormData }: PostFormProps) {

    const [data, setData] = useState(initialData)

    return (
        <form>
            <Input
                variant="secondary"
                label="Title"
                backgroundColor="bg-white dark:bg-slate-900"
            />
        </form>
    )
}