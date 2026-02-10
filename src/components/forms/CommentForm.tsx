"use client"

import { IoIosSend } from "react-icons/io"
import { Button } from "../ui/Button"

export default function CommentForm() {

    return (
        <form className=" w-full space-y-2">
            <div className=" flex flex-col">
                <textarea
                    rows={1}
                    placeholder="Type your comment"
                    className=" w-full max-w-2xl py-1 px-2 border-2 outline-none border-muted focus:border-primary rounded-lg"
                ></textarea>
                {/* <p className=" text-sm font-semibold text-red-400">Error</p> */}
            </div>
            <Button text="Send" icon={IoIosSend} iconPosition="end" rounded />
        </form>
    )
}