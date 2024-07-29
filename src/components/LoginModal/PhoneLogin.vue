<!-- @format -->

<template>
    <div id="captcha"></div>
    <div class="main">
        <a-form :model="phoneForm" :wrapper-col="{ span: 24 }" autocomplete="off">
            <a-form-item class="item-area" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
                <label>手机号</label>
                <a-input v-model:value="phoneForm.phone" />
            </a-form-item>

            <a-form-item class="item-area" name="vertifycode" :rules="[{ required: true, message: '请输入验证码' }]">
                <label>验证码</label>
                <a-input-group compact>
                    <a-input v-model:value="phoneForm.vertifycode" class="vertify-code-input" />
                    <a-button :disabled="forbidSend" @click="getVertifyCode">
                        {{ vertifyBtnText }}
                    </a-button>
                </a-input-group>
            </a-form-item>

            <a-form-item>
                <div class="centralized-area">
                    <a-button type="primary" class="login-btn" @click="lastCheckPhone">登录</a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { http } from '@/common/request'
import type { PhoneForm } from '@/types/interfaces'

const emit = defineEmits(['after-click-phone-login'])

const phoneForm = defineModel<PhoneForm>({ required: true })

// this ref will also be used in how many seconds left in sending vertifyCode
const vertifyBtnText = ref<string>('获取验证码')
const forbidSend = ref<boolean>(false)
const leftSeconds = ref<number>(0)
// the captchaObj is like a symbol of the captcha
const captchaObj = ref<any>({})

function isPhoneRight(phoneNumer: string) {
    // this regex can vertify the phoneNumber
    const regex = /^1[3456789]\d{9}$/
    return regex.test(phoneNumer)
}

function getVertifyCode() {
    if (isPhoneRight(phoneForm.value.phone)) {
        captchaObj.value.showCaptcha()
    } else {
        message.error('手机号格式错误')
    }
}

async function afterVertifySuccess(result: any) {
    const header: { [key: string]: any } = {}
    for (let i of Object.keys(result)) {
        header[i.replace('_', '-')] = result[i]
    }

    try {
        await http(
            'get-sms-code',
            {
                phone: phoneForm.value.phone
            },
            'POST',
            header
        )
        message.success('验证码已发送')
        forbidSend.value = true
        leftSeconds.value = 46
        countLeftSeconds()
    } catch (error) {
        message.error('验证码发送失败')
    }
}

function countLeftSeconds() {
    let timer: number | NodeJS.Timeout = 0

    // the original version of this function used closure
    // but later I found that with closure the text in btn will not change anymore
    // so I just use normal way
    timer = setInterval(() => {
        leftSeconds.value -= 1
        vertifyBtnText.value = leftSeconds.value + '秒后重试'
        if (leftSeconds.value <= 0) {
            vertifyBtnText.value = '重发验证码'
            forbidSend.value = false
            clearInterval(timer)
        }
    }, 1000)
}

function lastCheckPhone() {
    if (isPhoneRight(phoneForm.value.phone)) {
        emit('after-click-phone-login')
    } else {
        message.error('手机号格式错误')
    }
}

// here used some confusing methods
onMounted(async () => {
    let script = document.createElement('script')
    script.src = 'https://static.geetest.com/v4/gt4.js'
    document.body.appendChild(script)
    script.onload = () => {
        ;(window as any).initGeetest4(
            {
                captchaId: 'b0a78ab0191bd4361905eba5b2209be5',
                product: 'bind'
            },
            (captcha: any) => {
                captcha.appendTo('#captcha') // use  .appendTo to load the captcha to the <div id="captcha"/>
                captchaObj.value = captcha
                captcha.onSuccess(async () => {
                    let result = await captcha.getValidate()
                    afterVertifySuccess(result)
                })
            }
        )
    }
})
</script>

<style lang="scss" scoped>
.main {
    margin-top: 6%;

    .item-area {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 225px;
        margin: 20px auto;
    }
}

.centralized-area {
    display: flex;
    align-items: center;
    justify-content: center;

    .login-btn {
        margin-top: 4%;
        width: 225px;
    }
}

.vertify-code-input {
    width: 124px;
}
</style>
