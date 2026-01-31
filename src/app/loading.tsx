import { LoadingSpinner } from "@/components/ui/Loading";

export default function Loading() {
    return (
        <div className=" flex-1 flex flex-col">
            <LoadingSpinner size="large" />
        </div>
    )
}