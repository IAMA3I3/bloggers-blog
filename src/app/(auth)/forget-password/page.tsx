import AuthFormContainer from "@/components/containers/AuthFormContainer";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";

export default function ForgetPasswordPage() {

    return (
        <AuthFormContainer header="Forget Password" subHeader="Enter your registered email so we can send verification OTP to you">
            <ForgetPasswordForm />
        </AuthFormContainer>
    )
}