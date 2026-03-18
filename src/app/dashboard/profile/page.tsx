import { PageCard } from "@/components/containers/Cards";
import { Button } from "@/components/ui/Button";
import getAuthUser from "@/lib/auth/getAuthUser";
import Link from "next/link";
import { FaUser, FaEdit, FaLock } from "react-icons/fa";

export default async function ProfilePage() {

    const authUser = await getAuthUser()

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
                    <h3 className=" text-xl">{authUser?.username}</h3>
                    <p>{authUser?.email}</p>
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
                <div className=" mt-8 flex justify-center">
                    <Link href={"/dashboard/profile/delete-account"} className=" text-sm font-semibold text-red-400 hover:underline text-center">Delete Account</Link>
                </div>
            </PageCard>
        </>
    )
}