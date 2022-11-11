export interface HeaderProps {
    isAuth: boolean
    isReading?: boolean
}
export interface NavModalProps {
    active: boolean
    setActive: any
    avatar: string
    name: string
    position: string
}
export interface PrivateRoutesProps {
    isAuth: boolean
}
export interface DarkModeButtonProps {
    onClick: () => void
}
export interface UserInfoProps {
    name: string
    avatar: string
    status: string
    booksReading: number
    booksRead: number
}
export interface ReadingInfoProps {
    daily_goal: number
    days_reading: number
    reading_time: number
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
export interface ReaderFooterProps {
    pageNumber: number
    numPages: number
    zoomValue: number
    changePageNext: () => void
    changePageBack: () => void
    setZoomValue: any
}
export interface BookReaderProps {
    containerRef: any
}