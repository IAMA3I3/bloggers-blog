"use client"

import { useForm, ValidationError } from "@formspree/react"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { Button } from "../ui/Button"
import { IoIosSend } from "react-icons/io"

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [state, handleSubmit] = useForm("mleqbbaj")

    useEffect(() => {
        if (state.succeeded) {
            formRef.current?.reset()
            toast.success("Thanks! Your message has been sent.")
        }
    }, [state.succeeded])

    return (
        <form ref={formRef} onSubmit={handleSubmit} className=" w-full space-y-2">
            <div className=" flex flex-col">
                <input type="email" name="email" id="email" required placeholder="Enter Your Email" className=" w-full py-1 px-2 border-2 outline-none border-muted focus:border-primary rounded-lg" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className=" flex flex-col">
                <textarea name="message" id="message" placeholder="Type your message" className=" min-h-24 w-full py-1 px-2 border-2 outline-none border-muted focus:border-primary rounded-lg" required></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <Button text="Send" icon={IoIosSend} iconPosition="end" isLoading={state.submitting} rounded />
        </form>
    )
}