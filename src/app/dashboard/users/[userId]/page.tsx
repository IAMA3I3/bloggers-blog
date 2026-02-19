type UserEditPageProps = {
    params: Promise<{
        userId: string
    }>
}

export default async function UserEditPage({ params }: UserEditPageProps) {

    const { userId } = await params

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">
                Users {">"} {userId}
            </h2>
        </>
    )
}