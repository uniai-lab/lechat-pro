/** @format */

// Form interfaces used in LoginModal
export interface PhoneForm {
    phone: string
    vertifycode: string
}

export interface PasswordForm {
    phone: string
    password: string
}

// FileItem used to upload avatar
export interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
}

export interface FileInfo {
    file: FileItem
    fileList: FileItem[]
}

// UserInfo and PersonalInfoForm used to edit and show
export interface UserInfo {
    chance: {
        totalChatChance: number
        level: number
        levelExpiredAt: string
    }
    name: string
    phone: string
    avatar: string
}

export interface PersonalInfoForm {
    name: string
    phone: string
}

// ShopList used in ChargeModal
export interface ShopList {
    id: number
    price: number
    title: string
    rolelist: string[]
    description: string
}
