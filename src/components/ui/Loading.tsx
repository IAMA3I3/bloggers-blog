import { ImSpinner9 } from "react-icons/im";

type LoadingSpinnerProps = {
    size?: "small" | "medium" | "large"
}

export const LoadingSpinner = ({ size = "medium" }: LoadingSpinnerProps) => {

    return (
        <div className=" flex-1 flex justify-center items-center">
            <ImSpinner9
                className={`
                    ${size === "small" && " text-base"}
                    ${size === "medium" && " text-3xl"}
                    ${size === "large" && " text-5xl"}
                    animate-spin text-gray-600 dark:text-gray-300
                `}
            />
        </div>
    )
}