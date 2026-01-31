"use client"

export default function GlobalError() {
    return (
        <html>
            <body className=" h-screen">
                <div className=" w-full h-full flex flex-col justify-center items-center text-center gap-8">
                    <div className=" text-4xl font-thin text-red-500">Something went wrong</div>
                    <button onClick={() => window.location.reload()} className=" hover:underline">Refresh</button>
                </div>
            </body>
        </html>
    )
}