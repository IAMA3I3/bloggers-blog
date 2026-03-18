import { PageCard } from "@/components/containers/Cards";
import DeleteAccountForm from "@/components/forms/DeleteAccountForm";
import Link from "next/link";

export default function DeleteAccountPage() {

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 truncate">
                <Link href={"/dashboard/profile"} className=" text-muted hover:text-primary">Profile</Link> {"/"} Delete Account
            </h2>
            <PageCard centerAlign>
                <h3 className=" text-center text-2xl mb-2">Delete Account</h3>
                <p className=" text-center text-sm font-semibold mb-4 text-muted">By deleting your account, you loose access to all your data on this platform.</p>
                {/* form */}
                <DeleteAccountForm />
            </PageCard>
        </>
    )
}