import AuthFormContainer from "@/components/containers/AuthFormContainer";
import SignInForm from "@/components/forms/SignInForm";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description:
        "Sign in to your Bloggers Blog account to manage your posts and continue writing.",
    openGraph: {
        title: "Sign In | Bloggers Blog",
        description:
            "Access your Bloggers Blog account.",
        url: `${siteUrl}/signin`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function SignInPage() {

    return (
        <AuthFormContainer header="Sign In" subHeader="Login to your account">
            <SignInForm />
        </AuthFormContainer>
    )
}