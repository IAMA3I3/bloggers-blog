import ResendToken from "@/components/auth/ResendToken";
import VerifySuccess from "@/components/auth/VerifySuccess";
import AuthFormContainer from "@/components/containers/AuthFormContainer";
import getVerificationMail from "@/lib/auth/getVerificationMail";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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

type VerifyAccountPageProps = {
    searchParams: Promise<{
        token?: string
        status?: string
    }>
}

export default async function VerifyAccountPage({ searchParams }: VerifyAccountPageProps) {
    const { token, status } = await searchParams
    const verifyEmail = await getVerificationMail()

    if (token) redirect(`/api/verify-account?token=${token}`)

    if (status === "success") {
        return (
            <AuthFormContainer
                header="Account Verified"
                subHeader="Your account has been activated successfully"
            >
                <VerifySuccess />
            </AuthFormContainer>
        )
    }

    if (status === "failed") {
        return (
            <AuthFormContainer
                header="Verification Failed"
                subHeader="This link may have expired or already been used"
            >
                <ResendToken type="verify-account" email={verifyEmail} />
            </AuthFormContainer>
        )
    }

    return (
        <AuthFormContainer
            header="Verify Account"
            subHeader="Check your email for a verification link"
        >
            <ResendToken type="verify-account" email={verifyEmail} />
        </AuthFormContainer>
    )
}