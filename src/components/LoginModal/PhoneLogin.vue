<!-- @format -->

<template>
    <div id="captcha"></div>
    <div class="main">
        <a-form :model="phoneForm" :label-col="{ span: 6 }" autocomplete="off">
            <a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入您的手机号' }]">
                <a-input v-model:value="phoneForm.phone" />
            </a-form-item>

            <a-form-item label="验证码" name="vertifycode" :rules="[{ required: true, message: '请输入您的验证码' }]">
                <a-input-group compact>
                    <a-input v-model:value="phoneForm.vertifycode" class="vertify-code-input" />
                    <a-button :disabled="forbidSend" @click="getVertifyCode">
                        {{ vertifyBtnText }}
                    </a-button>
                </a-input-group>
            </a-form-item>

            <a-form-item>
                <div class="centralized-area btn">
                    <a-button type="primary" @click="lastCheckPhone">登录</a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { http } from '@/common/request'

// this ref will also be used in how many seconds left in sending vertifyCode
const vertifyBtnText = ref('获取验证码')
const forbidSend = ref(false)
const leftSeconds = ref(0)
// the captchaObj is like a symbol of the captcha
const captchaObj: any = ref({})

interface PhoneForm {
    phone: string
    vertifycode: string
}
const phoneForm = defineModel<PhoneForm>({ required: true })

const emits = defineEmits(['after-click-phone-login'])

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
        emits('after-click-phone-login')
    } else {
        message.error('手机号格式错误')
    }
}
</script>

<style lang="scss" scoped>
.main {
    margin-top: 20%;
}

.centralized-area {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vertify-code-input {
    width: calc(100% - 102px);
}

// when the sceen is too small, the ant input will wrap
// so to make the btn in the right place, use this @media
@media (max-width: 576px) {
    .main {
        margin-top: 0;
    }
}
@media (min-width: 576px) {
    .main {
        margin-top: 20%;
    }
}
</style>
