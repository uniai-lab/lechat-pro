/** @format */

import config from '@/common/config'
const URL = config.url
const UPLOAD = config.upload

/**
 * async http request function to send http request to server
 *
 * @param {string} action reqiest path, means what action this request will do
 * @param {Object|FormData} data default is {}
 * @param {string} method default is 'GET'
 * @param {Object} header default is {}
 * @returns {unknown} depends on what action it takes
 */
export const http = async (action, data = {}, method = 'GET', header = {}) => {
    const options = {
        method,
        mode: 'cors',
        headers: {
            token: localStorage.getItem('token') || '',
            id: localStorage.getItem('id') || 0,
            'app-type': 'web',
            ...header
        }
    }

    let url = `${URL}/web/${action}`
    if (method.toLowerCase() === 'post') {
        if (data instanceof FormData) {
            url = `${UPLOAD}/web/${action}`
            options.body = data
        } else if (typeof data === 'object') {
            options.headers['Content-Type'] = 'application/json'
            options.body = JSON.stringify(data)
            url = `${URL}/web/${action}`
        }
    }

    const result = await fetch(url, options)
    return result
}

/**
 * async http request function to send http request to server, which is insight into pay
 *
 * @param {string} url request url
 * @param {Object} data default is {}
 * @param {string} method default is 'GET'
 * @param {Object} header default is {}
 * @returns {Object}
 * @throws {Error} when this request failed
 */
export const httppay = async (url, data = {}, method = 'GET', header = {}) => {
    const options = {
        method,
        headers: {
            token: localStorage.getItem('token') || '',
            id: localStorage.getItem('id') || 0,
            'app-type': 'web',
            'Content-Type': 'application/json',

            ...header
        }
    }
    if (method === 'POST' || method === 'post') {
        options.body = JSON.stringify(data)
    }

    try {
        const result = await fetch(URL + '/pay/' + url, options)
        return result
    } catch (error) {
        throw error
    }
}
/**
 * async function receive data by server sent events
 *
 * @param {string} url request API path
 * @param {Object} data default is {}
 * @param {Object} header default is {}
 * @returns {unknown} three different
 */
export async function sse(url, data = {}, header = {}) {
    return await fetch(URL + '/web/' + url, {
        method: 'POST',
        timeout: 15000,
        responseType: 'stream',
        headers: {
            token: localStorage.getItem('token') || '',
            id: localStorage.getItem('id') || 0,
            'Content-Type': 'application/json',
            'app-type': 'web',
            ...header
        },
        timeout: 0,
        body: JSON.stringify(data)
    })
}
