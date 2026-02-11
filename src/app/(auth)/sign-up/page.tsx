import AuthFormContainer from "@/components/containers/AuthFormContainer";
import SignUpForm from "@/components/forms/SignUpForm";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description:
        "Create an account on Bloggers Blog to start writing, publishing, and managing your own content.",
    openGraph: {
        title: "Sign Up | Bloggers Blog",
        description:
            "Join Bloggers Blog and start sharing your ideas with the world.",
        url: `${siteUrl}/signup`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function SignUpPage() {

    return (
        <AuthFormContainer header="Sign Up" subHeader="Create an account">
            <SignUpForm />
        </AuthFormContainer>
    )
}