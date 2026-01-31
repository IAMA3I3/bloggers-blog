import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

export default function NotFound() {

    return (
        <div className=" flex-1 flex justify-center items-center flex-col">
            <h1 className=' text-6xl md:text-9xl font-thin text-gray-500 dark:text-gray-300'>404</h1>
            <p className=' text-2xl text-gray-500 dark:text-gray-300'>Page Not Found</p>
            <Link href={"/"} className=" mt-6">
                <Button text="Home" icon={GoHomeFill} variant="secondary" />
            </Link>
        </div>
    )
}