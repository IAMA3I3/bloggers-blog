import ResendToken from "@/components/auth/ResendToken";
import AuthFormContainer from "@/components/containers/AuthFormContainer";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description:
        "Create a new password for your Bloggers Blog account and securely regain access.",
    openGraph: {
        title: "Reset Password | Bloggers Blog",
        description:
            "Set a new password and restore access to your Bloggers Blog account.",
        url: `${siteUrl}/reset-password`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

type ResetPasswordPageProps = {
    searchParams: Promise<{
        token?: string
    }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const { token } = await searchParams

    if (token) {
        return (
            <AuthFormContainer header="Reset Password" subHeader="Create a new password">
                <ResetPasswordForm token={token} />
            </AuthFormContainer>
        )
    }

    return (
        <AuthFormContainer header="Reset Password" subHeader="Check your email for password reset link">
            <ResendToken type="reset-password" />
        </AuthFormContainer>
    )
}