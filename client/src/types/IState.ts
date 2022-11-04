export interface AuthState {
    isDarkMode: boolean
    isLoading: boolean
    isAuth: boolean
    error: string
}
export interface Book {

}
export interface UserState {
    userInfo: object
    userLibrary: Book[],
    error: string,
    isLoading: boolean,
    currentBook: object
}
