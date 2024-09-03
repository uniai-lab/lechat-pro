<!-- @format -->

# Home.vue brief cut

-   **line 3 to line 1251**, is the `<template/>` with some traditional css style and tailwind css
-   **line 1253 to line 3035**, is the `<script setup lang="ts"/>`
-   **line 3036 to line 3060**, is the traditonal css for firefox or chrome/safari/edge
-   **line 3061 to line 3312**, is the scss

# Drop, Drag

## introduce

make the drag upload file component

## html

-   **line 14 to line 53** basically use `ant-design-vue`'s `<a-upload-dragger/>`
-   **line 4 to line 1250** all the element on the screen can trig this

## script

-   **line 376** `isDragging = ref(false)` controls whether to show
-   **line 1416 to line 1420** `function cuntomUpload()` prevent default upload
-   **line 1421 to line 1429** `function beforeUploadBT()` add file to `fileListBT[]` and prevent default upload

## style

-   **line 3076 to line 3098**
-   **line 3259 to line 3269**

# Login

## introduce

by using `LoginModal.vue` to login

## html

-   **line 55 to line 60** use the `<login-modal/>` from `LoginModal.vue`

## script

-   **line 2208 to line 2220** `async function handleCustomEvent(options,param2)` await `getUserInfo()` and await `init()`, change `iflogin` to true, then scroll the chatListDom to bottom
-   **line 2190 to line 2202** `function clickConfig()` judge `isConfig`, but is does not matter, because true and false both will `clearMessageContent()` and set `visible` to its opposite, finally `switchConfigStatus()` which sets `isConfig` to its opposite

## style

-   **line 57** traditional css and inComponent styles

# Cost

## introduce

by using `Cost.vue` to show how many costs left of modals

## html

-   **line 61** use `<cost/>` from `Cost.vue`

## script

-   **line 1377** `showCost = ref(false)` controls whether to show

## style

-   **line 61** traditional css and inComponent styles

# Agent choose float btn

## introduce

infact I assume this is role play instead, it is judged by `ifPhone` which is true when the devcice infact is a computer!

## html

-   **line 73 to line 97** an icon, and an `ant-design-vue`'s `a-float-button` stay close to the right bottom of the phone device

## script

-   **line 1940** `ifPhone`, a vaiable to judge whether the device is a computer or phone, but it is true then this device actually a computer
-   **line 2723 to line 2725** `function showface()`, change `openfase`(openface?), against an `<a-modal/>` in **line 142**

## style

-   **line 73 to line 77** style in html

# Password

## introduce

password component, used to login, uses `ant-design-vue`'s `<a-form/>` and `<a-spin/>`

## html

-   **line 101 to line 137** a `<div/>`

## script

-   **line 1490 to line 1495** `function handleFinish()` and `fuinction handleFinishFailed()` but infact they are not used in this project
-   **line 1452** `formStatepw` from interface`FormStatepw` and defines the password's structure
-   **line 1522** `pwvisible` judges the password's visibility
-   **line 1542** `sevepwclock` default false
-   **line 1544 to line 1574** `function sevepw()` trise to send a http request to vertify the password and `clearinfo()`, `closeProfile()` then `getUserInfo()` which will `clearinfo()` and `closeProfile()` again then apply some user info

## style

-   **line 101 to line 137** in html css and some ant styles in `<a-form/>`

# Agent choose modal

## introduce

really agent choose by using `<a-modal/>` and `<a-form/>`, `<a-textarea/>`

## html

-   **line 142 to line 168** an `<a-modal/>` concludes an `<a-form/>` which concludes some `<a-form/>` and `<a-textarea/>`

## script

-   **line 1728** `openfase` judges the open or close
-   **line 2726 to line 2734** `function facehandleOk()` sets a timer and change `openfase` to false
-   **line 1714 to line 1734** `function onSubmit()` sets some localStorage and change `openfase` to false

## style

-   **line 142 to line 168** in html css

# Personal info edit

## introduce

a drawer to edit personal info by using `<a-drawer/>` and `<a-form/>`

## html

-   **line 170 to line 248** an `<a-drawer/>` concludes an `<a-form/>` and a `<div/>`

## script

-   **line 1624** `msgvisible` to control open
-   **line 1630 to line 1632** `function onmsgClose()` switch `msgvisible` to false
-   **line 1605** `function noup()` empty defination, no used
-   **line 1606 to line 1616** `function beforeUpload()` fitstly `isJpgOrPng` and `isLt2M` finally returns a boolean shows if the uploadfile meets the rule
-   **line 1588 to line 1604** `function handleChange()` if the `status` is `uploading` just set `loading` to true and `getBase64()`, if the `status` is `done` just `getBase64()`

## style

-   **line 170 to line 248** mix in html css and tailwind css

# Top bar

## introduce

basically the top bar of the whole page, and depends on phone or computer, it will act diffently

## html

-   **line 251 to line 296** original html `<div/>`

## script

-   **line 1940** `ifphone` infact is `ifcomputer`, controls whether to show `"乐聊多模型文档解析工具"`

-   **line 2190 to line 2202** `function clickConfig()` judge `isConfig`, but is does not matter, because true and false both will `clearMessageContent()` and set `visible` to its opposite, finally `switchConfigStatus()` which sets `isConfig` to its opposite when `@click.stop="clickConfig()"`
-   **line 2579 to line 2581** `function showProfile()` change `isProfileOpen` when `@click.stop="showProfile()"`
-   **line 1943 to line 1956** `funtion showchargeModal()` just sent `httppay()` to backend and use `ant-design-vue`'s `notification` to notice user

## style

-   **line 251 to line 296** tailwind css and some in html css mixed

# Charge prise modal

## introduce

a modal to show how much every modal cost

## html

-   **line 299 to line 374** use `ant-design-vue`'s `<a-modal/>`

## script

-   **line 2787 to line 2809** `function choseItem()` judges item and send `httppay()` request then open a `monitorPayment()` which will check the payment status at intervals(3s) then if payment success, it will clear timer and return this interval

## style

-   **line 299 to line 374** tailwind css and some in html css mixed
-   **line 3248 to line 3258** scss

# Personal info middle modal

## introduce

shows personal info and may edit(this may open another component)

## html

-   **line 377 to line 427** use `ant-design-vue`'s `<a-card/>` and use `<template/>` to load picture and other parts

## script

-   **line 1653** `isProfileOpen` controls whether to show
-   **line 2582 to line 2584** `function closeProfile()` for @
-   **line 1524 to line 1526** `function showpwModal()` for icon `<KeyOutlined/>`, change `pwvisible` to true
-   **line 2738 to line 2740** `function changeuserinfo()` use `showmsgDrawer()` for `<edit-outlined/>`, change `msgvisible` to flase
-   **line 2611 to line 2614** `function logout()` first `clearinfo()` and `notification` for `<LogoutOutlined/>`
-   **line 1432 to line 1443** `function timestampToDateString()` convert timestamp to date string like `${year}-${month}-${day}}`

## style

-   **line 377 to line 427** tailwind css and some in html css mixed
-   **line 3108 to line 3117** scss

# Purchase modal

## introduce

when paying on lechat, this modal will jump out

## html

-   **line 429 to line 599** use `ant-design-vue`'s `<a-modal/>` and `<a-result/>`

## script

-   **line 1693** `showpayres` controls whether to show
-   **line 2835 to line 2852** `handchargecidekeOk()` close QRcode and set showpayres to false, then `stopMonitoringFunction()` to close monitor
-   **line 1640** `shopQRcode` show QRcode

## style

-   **line 429 to line 599** tailwind css and some in html css mixed

# History chat drawer

## introduce

this offers hostory chats

## html

-   **line 602 to line 647** use `ant-design-vue`'s `<a-drawer/>`

## script

-   **line 2149** `function onClose` set `open` to false
-   **line 2987 to line 3034** `function todailog()` (maybe todialog()) by using `getListChat()` to get dialog and `window.scrollTo()` to scroll to the bottom
-   **line 2923 to line 2944** `function deldailog()`(maybe deldialog()) by sending a http request to backend and sends `notification` by judging the response and may `claerinfo()` when error or `todailog()` when success
-   **line 2902 to line 2916** `function convertTimestamp()` another convert time function
-   **line 2945 to line 2955** `function ondailogLoadMore()` just `getDailogList()`, if the response is not empty, then add dialogs to `historyChat`, if is empty, sends`notification` instead
-   **line 2958 to line 2984** `function newdailog()` firstly check `newdailogclock==false` then set `newdailogclock` to true then send a http request and if error sends `notification` and `clearinfo()`, uf success sends `notification` and `getDailogList()` to dailogList to historyChat,then `todailog()` position the position, finally set `newdailogclock` to false again

## style

-   **line 602 to line 647** in html css
-   **line 3291 to line 3306** list css
-   **line 3231 to line 3237** listName css
-   **line 3271 to line 3289** newdialogbox and newdialogbtn css

# Center Area

## tour

-   **line 667 to line 676** a tour guide for functions

## file preview

-   **line 679 to line 699** if you upload a file this will show file and a logo

## main chat stream

-   **line 708 to line 839** the main of the main, the stream of the chat
-   **line 840 to line 933** the animation of loading, used a `<div/>` called load-container

## stopBtn

-   **line 936 to line 970** a stopBtn to stop sending

# Bottom bar

-   **line 987 to line 1002** `ant upload list`
-   **line 1005 to line 1029** History Chat Btn
-   **line 1030 to line 1059** Modal Choose Btn
-   **line 1060 to line 1095** Role Choose Btn
-   **line 1096 to line 1239** fileUpload Btn, chatWordTextarea, send Btn
