export interface AuthRequest {
    accessToken: string
    refreshToken: string
    user: UserPayload
}
interface UserPayload {
    email: string
    id: number
    isActivated: boolean
}
export interface AuthRequestMessage {
    message: string
}
export interface AuthCheck {
    message: boolean
}