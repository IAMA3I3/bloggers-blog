import Link from "next/link";
import { Logo } from "../ui/Logo";

type AuthFormContainerProps = {
    children: React.ReactNode
    header: string
    subHeader: string
}

export default function AuthFormContainer({ children, header, subHeader }: AuthFormContainerProps) {

    return (
        <div className=" space-y-4">
            <div className=" flex justify-center">
                <Link href={"/"} className=" inline-block">
                    <Logo />
                </Link>
            </div>
            <div>
                <h3 className=" text-center text-2xl">{header}</h3>
                <p className=" text-sm text-muted text-center">{subHeader}</p>
            </div>
            {children}
        </div>
    )
}