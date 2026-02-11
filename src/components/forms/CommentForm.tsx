"use client"

import { IoIosSend } from "react-icons/io"
import { Button } from "../ui/Button"
import { Textarea } from "../ui/Input"

export default function CommentForm() {

    return (
        <form className=" w-full space-y-2">
            <div className=" flex flex-col">
                <div className=" w-full max-w-2xl">
                    <Textarea
                        rows={1}
                        placeholder="Type your comment"
                    />
                </div>
            </div>
            <Button text="Send" icon={IoIosSend} iconPosition="end" rounded />
        </form>
    )
}