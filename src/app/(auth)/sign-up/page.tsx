import AuthFormContainer from "@/components/containers/AuthFormContainer";
import SignUpForm from "@/components/forms/SignUpForm";

export default function SignUpPage() {

    return (
        <AuthFormContainer header="Sign Up" subHeader="Create an account">
            <SignUpForm />
        </AuthFormContainer>
    )
}