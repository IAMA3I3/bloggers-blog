import AuthFormContainer from "@/components/containers/AuthFormContainer";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
    description:
        "Reset your Bloggers Blog account password securely and regain access to your account.",
    openGraph: {
        title: "Forgot Password | Bloggers Blog",
        description:
            "Securely reset your Bloggers Blog account password.",
        url: `${siteUrl}/forgot-password`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function ForgetPasswordPage() {

    return (
        <AuthFormContainer header="Forget Password" subHeader="Enter your registered email so we can send verification OTP to you">
            <ForgetPasswordForm />
        </AuthFormContainer>
    )
}