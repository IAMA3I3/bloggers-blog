import AuthFormContainer from "@/components/containers/AuthFormContainer";
import VerifyAccountForm from "@/components/forms/VerifyAccountForm";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Account",
    description:
        "Verify your email address to activate your Bloggers Blog account securely.",
    openGraph: {
        title: "Verify Account | Bloggers Blog",
        description:
            "Confirm your email and activate your Bloggers Blog account.",
        url: `${siteUrl}/verify`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function ForgetPasswordPage() {

    return (
        <AuthFormContainer header="Verify Account" subHeader="Enter the OTP that was sent to user@gmail.com">
            <VerifyAccountForm />
        </AuthFormContainer>
    )
}