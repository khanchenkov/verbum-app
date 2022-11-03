export interface AuthState {
    isLoading: boolean
    isAuth: boolean
    error: string
}
export interface Book {

}
export interface UserState {
    isDarkMode: boolean
    userInfo: object
    userLibrary: Book[],
    error: string,
    isLoading: boolean,
    currentBook: object
}
