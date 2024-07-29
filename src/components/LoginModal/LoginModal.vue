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
                            <MobileOutlined />
                        </a-radio-button>
                        <a-radio-button value="qrcode">
                            <QrcodeOutlined />
                        </a-radio-button>
                        <a-radio-button value="password">
                            <KeyOutlined />
                        </a-radio-button>
                    </a-radio-group>

                    <div class="close" @click="emitHideModal">
                        <CloseCircleOutlined />
                    </div>
                </div>

                <PhoneLogin
                    v-if="curLoginMethod == 'phone'"
                    v-model="phoneForm"
                    @after-click-phone-login="phoneSubmit"
                ></PhoneLogin>

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
import { http } from '@/common/request.js'
import { message } from 'ant-design-vue'
import { KeyOutlined, MobileOutlined, QrcodeOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import PhoneLogin from '@/components/LoginModal/PhoneLogin.vue'
import PasswordLogin from '@/components/LoginModal/PasswordLogin.vue'
import QRcodeLogin from '@/components/LoginModal/QRcodeLogin.vue'
import type { PasswordForm, PhoneForm } from '@/types/interfaces'

// qrcode token is used to confirm with the backend
const qrcodeToken = ref<string>('')
// this is a polling timer
// to send confirming request to backend
// to vertify qrcode login authorization
const startGlobalPollingTimer = ref<Function>(() => {})
const isShowLoadingMask = ref<boolean>(false)
const curLoginMethod = ref<'phone' | 'qrcode' | 'password'>('qrcode')

const phoneForm = ref<PhoneForm>({
    phone: '',
    vertifycode: ''
})

const passwordForm = ref<PasswordForm>({
    phone: '',
    password: ''
})

const emit = defineEmits(['hideModal', 'customEvent'])

function emitHideModal() {
    startGlobalPollingTimer.value(true)
    emit('hideModal')
}
function changeLoginMehod(changedMethod: 'phone' | 'qrcode' | 'password') {
    curLoginMethod.value = changedMethod
}

async function phoneSubmit() {
    isShowLoadingMask.value = true
    try {
        // here is a complex interface from uniai-mass from uniai
        const data: any = await http(
            'login',
            {
                phone: phoneForm.value.phone,
                code: phoneForm.value.vertifycode
            },
            'POST'
        )
        const res = await data.json()

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
        const data: any = await http(
            'login',
            {
                phone: passwordForm.value.phone,
                password: passwordForm.value.password
            },
            'POST'
        )
        const res = await data.json()
        isShowLoadingMask.value = false

        if (res.status == 1) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            emit('customEvent', '参数1', '参数2')
            emitHideModal()
        } else if (res.status == 0) {
            message.error('密码错误')
        } else {
            // specially, this branch I actually don't know for what
            message.error('登录失败')
        }
    } catch {
        message.error('登录失败')
    } finally {
        isShowLoadingMask.value = false
    }
}

function pollingRequestQRcode() {
    let timer: number | NodeJS.Timeout = 0

    return function (close = false) {
        if (close) {
            clearInterval(timer)
            timer = 0
            return
        }
        if (!timer) {
            timer = setInterval(async () => {
                // send request to backend's verify-qr-code
                try {
                    const res: any = await http(
                        `verify-qr-code?token=${qrcodeToken.value}`,
                        { token: qrcodeToken.value },
                        'GET'
                    )

                    const qes = await res.json()
                    if (qes.status == 1) {
                        if (qes.data != null) {
                            localStorage.setItem('id', qes.data.id)
                            localStorage.setItem('token', qes.data.token)

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
