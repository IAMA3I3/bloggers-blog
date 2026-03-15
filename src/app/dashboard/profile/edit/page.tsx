import { PageCard } from "@/components/containers/Cards";
import EditProfileForm from "@/components/forms/EditProfileForm";
import getAuthUser from "@/lib/auth/getAuthUser";
import { EditProfileFormData } from "@/types/auth";
import Link from "next/link";

export default async function EditProfilePage() {

    const authUser = await getAuthUser()

    const initialFormData: EditProfileFormData = {
        username: authUser?.username || ""
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/profile"} className=" text-muted hover:text-primary">Profile</Link> {"/"} Edit
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-4">Update Username</h3>
                {/* form */}
                <EditProfileForm initialData={initialFormData} />
            </PageCard>
        </>
    )
}