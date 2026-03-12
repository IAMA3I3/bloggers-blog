import ResendToken from "@/components/auth/ResendToken";
import AuthFormContainer from "@/components/containers/AuthFormContainer";
import getVerificationMail from "@/lib/auth/getVerificationMail";
// import VerifyAccountForm from "@/components/forms/VerifyAccountForm";
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

type VerifyAccountPageProps = {
    searchParams: Promise<{
        token?: string
    }>
}

export default async function VerifyAccountPage({ searchParams }: VerifyAccountPageProps) {

    const token = await searchParams
    const verifyEmail = await getVerificationMail()

    console.log({ token })

    return (
        <AuthFormContainer header="Verify Account" subHeader="Check your email for verification link">
            <ResendToken type="verify-account" email={verifyEmail} />
            {/* <VerifyAccountForm /> */}
        </AuthFormContainer>
    )
}