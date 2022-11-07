export interface AuthState {
    isDarkMode: boolean
    isLoading: boolean
    isAuth: boolean
    error: string
}
export interface User {
    id?: number
    email?: string
    user_name?: string
    status?: string
    avatar?: string
    reading_time?: number
    daily_goal?: number
    days_reading?: number
    is_activated?: boolean
}
export interface UserState {
    userInfo: User
    isLoading: boolean
    error: string
}
// export interface Book {}
// export interface BookState {
//     currentBook: Book
//     userLibrary: Book[]
//     isLoading: boolean
//     error: string
// }