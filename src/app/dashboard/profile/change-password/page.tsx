import { PageCard } from "@/components/containers/Cards";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import Link from "next/link";

export default function ChangePasswordPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/profile"} className=" text-muted hover:text-primary">Profile</Link> {"/"} Change Password
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-4">Update Password</h3>
                {/* form */}
                <ChangePasswordForm />
            </PageCard>
        </>
    )
}