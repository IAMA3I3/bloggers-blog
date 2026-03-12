export type ActionResponse<D, E> = Promise<{
    success: boolean
    errors: E
    data: D
}>

export type ActionResponseWithoutData = Promise<{
    success: boolean
    error?: string
}>