"use client"

export default function ErrorBoundary({ error }: { error: unknown }) {

    return (
        <div className=" flex-1 h-full flex flex-col items-center justify-center text-center">
            <div className=" text-2xl font-thin text-red-500">{error instanceof Error ? error.message : "Something went wrong"}</div>
        </div>
    )
}