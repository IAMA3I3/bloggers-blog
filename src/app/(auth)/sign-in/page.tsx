import AuthFormContainer from "@/components/containers/AuthFormContainer";
import SignInForm from "@/components/forms/SignInForm";

export default function SignInPage() {

    return (
        <AuthFormContainer header="Sign In" subHeader="Login to your account">
            <SignInForm />
        </AuthFormContainer>
    )
}