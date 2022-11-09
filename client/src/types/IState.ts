export interface AuthState {
    isDarkMode: boolean
    isLoading: boolean
    isAuth: boolean
    error: string
}
export interface User {
    id: number
    email: string
    user_name: string
    status: string
    avatar: string
    reading_time: number
    daily_goal: number
    days_reading: number
    is_activated: boolean
}
export interface UserState {
    userInfo: User
    isLoading: boolean
    error: string
}
export interface BookState {
    library: Book[]
    currentBook: Book | undefined
    isLoading: boolean
    error: string
}
export interface Book {
    id: number
    title: string
    author: string
    book_path: string
    thumbnail_path: string
    pages: number
    current_page: number
    is_reading: boolean
    is_read: boolean
    user_id: number
}