/** @format */

// roleSet form
export interface RoleSetForm {
    name: string
    delivery: boolean
    type: string[]
    resource: string
    desc: string
    startmsg: string
}

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

// ChatList
export interface Chat {
    content: string
    dialogId: number
    resourceId: number | null
    chatId: number | null
    model: string | null
    subModel: string | string | null
    role: string
    avatar: string | null
    isEffect: boolean
    file?: { type: string; url: string; name: string; ext: string; size: number }
}

// File upload icon url
export interface SrcMap {
    openai: string
    iflytek: string
    baidu: string
    glm: string
    google: string
}

export interface FileSrcMap {
    pdf: string
    wps: string
    doc: string
    docx: string
    ppt: string
    pptx: string
    xls: string
    xlsx: string
    et: string
    csv: string
    txt: string
    md: string
    json: string
    jpg: null | string
    png: null | string
    jpeg: null | string
    webp: null | string
}

// these are copyBtn settings
export interface BtnTips {
    copy: string
    loading: string
    success: string
    error: string
}

export interface Option {
    value: string | number | null //得到的
    label: string //看到的
    disabled?: boolean
    children?: Option[]
}

export type ModelCascader = [string | null, string | null]

export interface PasswordFormState {
    pass: string
    checkPass: string
    age: number | undefined
}

// Resume
import type { Dayjs } from 'dayjs'
export type Gender = '女' | '男' | null
export type GPAfull = '5.0' | '4.0'

export interface BasicInfo {
    name: string
    gender: Gender
    age: number
    phone: string
    email: string
    address: string
    wechat: string
    site: string
    github: string
}

export interface EducationExperience {
    major: string
    degree: string
    school: string
    range: Dayjs[]
    gpa: string
    full: GPAfull
    honor: string
}

export interface ProjectExperience {
    name: string
    description: string
    tech: string
    work: string
    range: Dayjs[]
    url: string
}

export interface WorkExperience {
    company: string
    position: string
    range: Dayjs[]
    mission: string
    output: string
}

export interface AdditionalInfo {
    skill: string
    other: string
}

export interface ResumeInfo {
    basic: BasicInfo
    education: EducationExperience[]
    work: WorkExperience[]
    project: ProjectExperience[]
    addition: AdditionalInfo
}
