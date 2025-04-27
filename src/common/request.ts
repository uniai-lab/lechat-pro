/** @format */

import config from '@/common/config'
const URL = config.url

enum Status {
    SUCCESS = 1,
    ERROR = 0,
    NO_AUTH = -1
}

export interface HttpResponse<T> {
    status: Status
    msg: string
    data: T | null | undefined
}

// 通用请求
export const http = async <T = any>(
    path: string,
    data: any = {},
    method: string = 'POST',
    header: Record<string, string> = {}
): Promise<HttpResponse<T>> => {
    const headers: HeadersInit = {
        token: localStorage.getItem('token') || '',
        id: localStorage.getItem('id') || '0',
        'app-type': 'web',
        ...header
    }
    const options: RequestInit = { method, mode: 'cors', headers }

    let url = `${URL}/${path}`
    if (method.toLowerCase() === 'post') {
        if (data instanceof FormData) options.body = data
        else {
            headers['Content-Type'] = 'application/json'
            options.body = JSON.stringify(data)
        }
    } else if (method.toLowerCase() === 'get') {
        const params = new URLSearchParams()
        for (const key in data) {
            if (data[key] !== undefined) {
                params.append(key, data[key])
            }
        }
        const queryString = params.toString()
        if (queryString) {
            url += `?${queryString}`
        }
    }

    const res = await fetch(url, options)
    return res.json() as Promise<HttpResponse<T>>
}

// SSE（Server-Sent Events）请求
export const sse = async (url: string, data: any = {}, header: Record<string, string> = {}): Promise<Response> => {
    const headers: HeadersInit = {
        token: localStorage.getItem('token') || '',
        id: localStorage.getItem('id') || '0',
        'Content-Type': 'application/json',
        'app-type': 'web',
        ...header
    }
    const options: RequestInit = { method: 'POST', headers, body: JSON.stringify(data) }
    return await fetch(`${URL}/${url}`, options)
}
