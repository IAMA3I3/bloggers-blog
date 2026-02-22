"use client"

import { Button } from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteButton() {

    return (
        <Button text="Delete" icon={FaTrashAlt} variant="danger" outlined />
    )
}