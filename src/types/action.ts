export type ActionResponse<D, E> = Promise<{
    success: boolean
    errors: E
    data: D
}>