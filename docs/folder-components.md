<!-- @format -->

# copy.vue

## brief introduce

make a copy btn and a textArea from the real textArea used in every dialog.

the copy function has four status, copy, loading, success, error.

It's style used the Tailwind and traditional CSS.

`@click='copyToClipboard'`

## props, btnConfig, btnTips, btnStatus

`props` is used in function `copyToClipboard`, which value are passed from outside

`btnConfig` is kind of style set of btn

`btnTips` is an object which contains four status tips of btn(copy, loading, success, error)

`btnStatus` is a ref of <"copy" | "loading" | "success" | "error">, default is "copy"

## copyToClipboard

`const copyToClipboard = (content: string = porps.content)=>{}`

first it change the status to "loading" and make a textArea to show the content from outside,
then it use `textArea.select()` to select the content and use try catch to copy the content to clipboard by using ~~`document.execCommand("copy")`~~(this is not recommended now, maybe edit later, but it seems that new way has been tried before). In the end, it change the status to "copy" and removeChild the textArea.

# cost.vue

## brief introduce

this shows what model to choose and how many times left to use.

## close

`function close()`

emit the 'close'

## load

`async function load()`

this function introduce the http request from `request.js` and set data from the res from the request. The `provider` is against the provider of the model and initail the model and push models by judging how many times left in the request.

# loading.vue

it seems defined alot of animation when loading, but it does not appear in the project. I guess this may someone try to make a loading animation by himself but in the last he give up and use the ant design's animation instead. Maybe anythings else.

# loadingModal.vue

this vue shows the login logic and component, it used **Geetest**'s product to make captcha vertification and await QRcode(onMounted).

## onMounted

initial the captcha and QRcode.

## hideModal

change `globalTimer` to `true` and `emit('hideModal')`

## changelefttime

return a timer and change the `getCodetitle` to left seconds and finally the `重新发送` and change loginfalg to true then clear the timer.

## getCode, validatePhone

validatePhone check the phone number by regex and return the result.

if the phone number is valid, show the notification(MessageApi from vue3-dxui) of `手机号格式错误`.

## aftersuccess

it uses the **Geetest**'s `getValidate()` which default include some fields, change that into `const header={}` then send a http request to the backend that notificate`验证码已发送` or throw an `ERROR` message.

## submit

it trys to send a http request to the backend with info, and judge the res then set localStorage token and id.

## beforelogin

it judges the phone and awiat the `submit()`.

## loginBbyPassword

if the phone fill the requirement, it will send a http request and emit a `customEvent('参数一','参数二')` and `hideModal()`.

after `submit`, it `consolo.log(info.value)`

## getqrcode

it sends a http request to the `get-qr-code` and get the `qrcode` and other info like `qrcodetocken` and change `codesstatus` in the end it `refrshQRcode`, change status to `expired`.

## codeRefresh

change codesstatus to loading and await getqecode.

## requestVertifyQRCode

it seems like firstly make a always false judgement and set a timer to make request to `/verify-qr-code` interface, then it make res which from http request and `qes` as "QRcode res" and if anything is right, it just emit `customEvent(options.value,'参数二')` then `hideModal` and clear the timer in anycase.

# vue-composition.vue

this seems like introduce a "tree" to make a markdown mindmap throw this props.tree when onMounted, but it does not have later use in home.vue, only a variable called compoent(which is never used) conclude this.

# vue-legacy.vue

basically like `vue-compostion.vue`, it may wants to show a markmap, but finally it does not appear in the final page.
