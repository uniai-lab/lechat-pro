<!-- @format -->

<template>
    <div class="login-modal-mask" id="LoginModal">
        <!-- modal it self -->
        <div class="login-modal">
            <a-spin :spinning="isShowLoadingMask">
                <div class="top-bar">
                    <a-radio-group
                        v-model:value="curLoginMethod"
                        button-style="solid"
                        @change="changeLoginMehod(curLoginMethod)"
                    >
                        <a-radio-button value="phone">
                            <mobile-outlined />
                        </a-radio-button>
                        <a-radio-button value="mail">
                            <mail-outlined />
                        </a-radio-button>
                        <a-radio-button value="qrcode">
                            <qrcode-outlined />
                        </a-radio-button>
                        <a-radio-button value="password">
                            <key-outlined />
                        </a-radio-button>
                    </a-radio-group>

                    <div class="close" @click="emitHideModal">
                        <close-circle-outlined />
                    </div>
                </div>

                <PhoneLogin
                    v-if="curLoginMethod == 'phone'"
                    v-model="phoneForm"
                    @after-click-phone-login="phoneSubmit"
                ></PhoneLogin>

                <MailLogin
                    v-if="curLoginMethod == 'mail'"
                    v-model="mailForm"
                    @after-click-mail-login="mailSubmit"
                ></MailLogin>

                <PasswordLogin
                    v-if="curLoginMethod == 'password'"
                    v-model="passwordForm"
                    @after-click-password-login="passwordSubmit"
                ></PasswordLogin>

                <QRcodeLogin
                    v-if="curLoginMethod == 'qrcode'"
                    v-model:qrcode-token="qrcodeToken"
                    v-model:start-global-polling-timer="startGlobalPollingTimer"
                ></QRcodeLogin>
            </a-spin>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { http } from '@/common/request.ts'
import { message } from 'ant-design-vue'
import { KeyOutlined, MobileOutlined, QrcodeOutlined, CloseCircleOutlined, MailOutlined } from '@ant-design/icons-vue'
import PhoneLogin from '@/components/LeChatComponents/LoginModal/PhoneLogin.vue'
import PasswordLogin from '@/components/LeChatComponents/LoginModal/PasswordLogin.vue'
import QRcodeLogin from '@/components/LeChatComponents/LoginModal/QRcodeLogin.vue'
import MailLogin from '@/components/LeChatComponents/LoginModal/MailLogin.vue'
import type { PasswordForm, PhoneForm, EmailForm } from '@/types/interfaces'

// qrcode token is used to confirm with the backend
const qrcodeToken = ref<string>('')
// this is a polling timer
// to send confirming request to backend
// to vertify qrcode login authorization
const startGlobalPollingTimer = ref<Function>(() => {})
const isShowLoadingMask = ref<boolean>(false)
const curLoginMethod = ref<'phone' | 'mail' | 'qrcode' | 'password'>('mail')

const phoneForm = ref<PhoneForm>({ phone: '', vertifycode: '' })
const mailForm = ref<EmailForm>({ email: '', vertifycode: '' })
const passwordForm = ref<PasswordForm>({ phone: '', password: '' })

const emit = defineEmits(['hideModal', 'customEvent'])

function emitHideModal() {
    startGlobalPollingTimer.value(true)
    emit('hideModal')
}
function changeLoginMehod(changedMethod: 'phone' | 'mail' | 'qrcode' | 'password') {
    curLoginMethod.value = changedMethod
}

async function phoneSubmit() {
    isShowLoadingMask.value = true
    try {
        const res = await http('web/login', { phone: phoneForm.value.phone, code: phoneForm.value.vertifycode })
        if (res.status == 1) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            emit('customEvent', '参数1', '参数2')
            emitHideModal()
        } else {
            message.error(res.msg)
        }
    } catch (error) {
        message.error('登录失败')
    } finally {
        isShowLoadingMask.value = false
    }
}

async function mailSubmit() {
    isShowLoadingMask.value = true
    try {
        const res = await http('web/login', { email: mailForm.value.email, code: mailForm.value.vertifycode })
        if (res.status == 1) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            emit('customEvent', '参数1', '参数2')
            emitHideModal()
        } else {
            message.error(res.msg)
        }
    } catch (error) {
        message.error('登录失败')
    } finally {
        isShowLoadingMask.value = false
    }
}

async function passwordSubmit() {
    isShowLoadingMask.value = true
    try {
        const res = await http('web/login', { phone: passwordForm.value.phone, password: passwordForm.value.password })
        isShowLoadingMask.value = false
        if (res.status == 1) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            emit('customEvent', '参数1', '参数2')
            emitHideModal()
        } else if (res.status == 0) {
            message.error('密码错误')
        } else {
            message.error('登录失败')
        }
    } catch {
        message.error('登录失败')
    } finally {
        isShowLoadingMask.value = false
    }
}

function pollingRequestQRcode() {
    let timer: number = 0
    return function (close = false) {
        if (close) {
            clearInterval(timer)
            timer = 0
            return
        }
        if (!timer) {
            timer = setInterval(async () => {
                try {
                    const res = await http(`web/verify-qr-code`, { token: qrcodeToken.value }, 'GET')
                    if (res.status == 1) {
                        if (res.data != null) {
                            localStorage.setItem('id', res.data.id)
                            localStorage.setItem('token', res.data.token)
                            emit('customEvent', undefined, '参数2')
                            emitHideModal()
                            clearInterval(timer)
                            timer = 0
                        }
                    } else {
                        clearInterval(timer)
                        timer = 0
                    }
                } catch (error) {
                    console.log(error)
                    message.error('登录失败')
                }
            }, 3000)
        }
    }
}

onBeforeMount(async () => {
    startGlobalPollingTimer.value = pollingRequestQRcode()
})
</script>

<style scoped lang="scss">
.login-modal-mask {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0 0 0 / 0.5) /* #000000 */;
    z-index: 999;

    .login-modal {
        background-color: rgb(255, 255, 255);
        height: 300px;
        width: 340px;
        border-radius: 0.375rem /* 6px */;
        box-shadow:
            0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
        padding: 1rem /* 16px */;

        .top-bar {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem /* 8px */;
            width: 100%;
        }
        .close {
            margin-left: auto;
            font-size: large;
            color: rgb(55 65 81) /* #374151 */;
        }
        .close:hover {
            color: rgb(17 24 39) /* #111827 */;
        }
    }
}
</style>
