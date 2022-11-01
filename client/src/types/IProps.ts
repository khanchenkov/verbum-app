export interface HeaderProps {
    isAuth: boolean,
    isReading?: boolean
}
export interface NavModalProps {
    active: boolean,
    setActive: any,
    avatar: string,
    name: string
}

export interface PrivateRoutesProps {
    isAuth: boolean
}