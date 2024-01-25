import * as $ from './function'
import config from './config'

const URL = config['url']

export async function http(url, data = {}, method = 'post',header={}) {
  const response = await uni.request({
    url: `${URL}/web/${url}`,
    method,
    data,
    header: {
      token: $.get('token') || '',
      id: $.get('id') || 0,
	  "app-type":'web',
      ...header
    }
  })

  if (response[0]) throw new Error(response[0].errMsg)

  const status = response[1].statusCode
  const res = response[1].data
  if (status !== 200) throw new Error(res)

  if (res.status === 1) return res.data
  else {
    if (res.status === -1) {
      $.remove('token')
      $.remove('id')
      $.remove('userinfo')
      uni.redirectTo({ url: '/pages/user/login' })
    }
    throw new Error(res.msg)
  }
}

export async function upload(filePath, formData) {
  const response = await uni.uploadFile({
    url: `${URL}/web/upload`,
    filePath,
    name: 'file',
    header: {
      token: $.get('token') || '',
      id: $.get('id') || 0
    },
    formData
  })

  if (response[0]) throw new Error(response[0].errMsg)

  const status = response[1].statusCode
  const data = response[1].data
  if (status !== 200) throw new Error(data)

  const res = JSON.parse(data)
  if (res.status === 1) return res.data
  else {
    if (res.status === -1) {
      $.remove('token')
      $.remove('id')
      $.remove('userinfo')
      uni.redirectTo({ url: '/pages/user/login' })
    }
    throw new Error(res.msg)
  }
}
export async function uploadhead(filePath, formData) {
  const response = await uni.uploadFile({
    url: `${URL}/web/upload-avatar`,
    filePath,
    name: 'file',
    header: {
      token: $.get('token') || '',
      id: $.get('id') || 0
    },
    formData
  })

  if (response[0]) throw new Error(response[0].errMsg)

  const status = response[1].statusCode
  const data = response[1].data
  if (status !== 200) throw new Error(data)

  const res = JSON.parse(data)
  if (res.status === 1) return res.data
  else {
    if (res.status === -1) {
      $.remove('token')
      $.remove('id')
      $.remove('userinfo')
      uni.redirectTo({ url: '/pages/user/login' })
    }
    throw new Error(res.msg)
  }
}

export async function login() {
  const response = await uni.login({ provider: 'weixin' })

  if (response[0]) throw new Error(response[0].errMsg)
  console.log(response)

  const { code } = response[1]
  if (!code) throw new Error('fail to get web code')
  return code
}

export async function url() {
  return `${config['url']}/web`
}
