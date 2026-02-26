import { PageCard } from "@/components/containers/Cards";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaUser, FaEdit, FaLock } from "react-icons/fa";

export default function ProfilePage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Profile
            </h2>
            <PageCard centerAlign>
                <div className=" flex justify-center mb-6">
                    <div className=" w-25 aspect-square rounded-full overflow-hidden bg-background dark:bg-gray-700 flex justify-center items-center text-4xl text-muted">
                        <FaUser />
                    </div>
                </div>
                <div className=" text-center">
                    <h3 className=" text-xl">User_Name</h3>
                    <p>username@gmail.com</p>
                </div>
                <div className=" mt-8 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
                    <Link href={"/dashboard/profile/edit"}>
                        <Button
                            text="Edit Username"
                            icon={FaEdit}
                        />
                    </Link>
                    <Link href={"/dashboard/profile/change-password"}>
                        <Button
                            text="Change Password"
                            icon={FaLock}
                            outlined
                        />
                    </Link>
                </div>
            </PageCard>
        </>
    )
}