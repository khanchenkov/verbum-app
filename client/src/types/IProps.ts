export interface HeaderProps {
    isAuth: boolean
    isReading?: boolean
}
export interface NavModalProps {
    active: boolean
    setActive: any
    avatar: string | undefined
    name: string | undefined
}
export interface PrivateRoutesProps {
    isAuth: boolean
}
export interface DarkModeButtonProps {
    onClick: () => void
}
export interface UserInfoProps {
    name: string | undefined
    avatar: string | undefined
    status: string | undefined
}
export interface ReadingInfoProps {
    daily_goal: number | undefined
    days_reading: number | undefined
    reading_time: number | undefined
}
export interface UserImageProps {
    src: (string & ArrayBuffer) | string | null | undefined
    alt: string
}
export interface UploadBookPanelProps {
    booksNum: number
}
export interface UploadBookModalProps {
    active: boolean
    setActive: any
}