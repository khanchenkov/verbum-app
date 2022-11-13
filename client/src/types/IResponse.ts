export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserPayloadResponse
}
interface UserPayloadResponse {
    email: string
    id: number
    isActivated: boolean
}
export interface messageResponse {
    message: string
}