<!-- @format -->

# commoncontent.js

## content

export some words that can be used in the beginning.

# config.js

## url

export an url used in project.https://api.uniai.cas-ll.cn

## upload

export a upload url may use in upload.https://api.uniai.cas-ll.cn

# http.js

## http

`export async function http(url, data={}, method = 'post',header={})`

used to send (default **post**) request to `URL/web/[url]` through `uni.request`.

may return a **res.data**, if it fail, it will throw an **error** or use `uni.redirectTo` to `/pages/user/login`.

## upload

`export async function upload(filePath, formData)`

async function that upload files. send a request to `URL/web/upload` through `uni.uploadFile`.

may return a **res.data**, if it fail, it will throw an **error** or use `uni.redirectTo` to `/pages/user/login`.

## uploadhead

`export async function uploadhead(filePath, formData)`

async function that upload files. But send a request to `URL/web/upload-avatar`.

may return a **res.data**, if it fail, it will throw an **error** or use `uni.redirectTo` to `/pages/user/login`.

## login

`export async function login()`

use `uni.login` to login(provider: wechat).
if success, `console.log(response)`, and if it fail, it will throw an **error**.

## url

`export async function login()`

return an url called `URL/web`.

## questions

it imported a \* as $ from ./function, but it seems this file is not exist.

it used funtion in `uni` but where is this?

# loglogo.js

## content

a logo of lechat.

```
    ██╗      ████████╗  ███████╗██╗  ██╗ █████╗████████╗
    ██║      ██╔═════╝  ██╔════╝██║  ██║██╔══██╗  ██╔══╝
    ██║      ████████╗  ██║     ███████║███████║  ██║
    ██║      ██╔═════╝  ██║     ██╔══██║██╔══██║  ██║
    ████████╗████████╗  ███████╗██║  ██║██║  ██║  ██║
    ╚═══════╝╚═══════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═╝
```

# msg.js

## msgtemplate

`export const msgtemplate = async() => {}`

async function that contains a template of message called `content` and return 0.

# request.js

## http

`export const http = async (action, data = {}, method = 'GET', header = {})`

async cors function that send a request to `URL/web/[action]` through `fetch`.and return a result from this fetch.

## httppay

`export const httppay = async (url, data = {}, method = 'GET', header = {})`

async function that send a post request to `URL/pay/[url]` through `fetch`.and return a result or throw an errow from this fetch.
