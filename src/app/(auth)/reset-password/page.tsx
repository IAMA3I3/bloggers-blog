import AuthFormContainer from "@/components/containers/AuthFormContainer";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ForgetPasswordPage() {

    return (
        <AuthFormContainer header="Reset Password" subHeader="Create a new password, enter the OTP sent to use***@gmail.com">
            <ResetPasswordForm />
        </AuthFormContainer>
    )
}