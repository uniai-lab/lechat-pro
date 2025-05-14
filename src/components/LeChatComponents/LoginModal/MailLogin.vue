<!-- @format -->

<template>
    <div id="captcha"></div>
    <div class="main">
        <a-form :model="emailForm" :wrapper-col="{ span: 24 }" autocomplete="on">
            <a-form-item class="item-area" name="email" :rules="[{ required: true, message: '请输入邮箱' }]">
                <label>输入邮箱</label>
                <a-input v-model:value="emailForm.email" />
            </a-form-item>

            <a-form-item class="item-area" name="vertifycode" :rules="[{ required: true, message: '请输入验证码' }]">
                <label>验证码</label>
                <a-input-group compact>
                    <a-input v-model:value="emailForm.vertifycode" class="verify-code-input" />
                    <a-button :disabled="forbidSend" @click="getVerifyCode" class="verify-code-btn">
                        {{ vertifyBtnText }}
                    </a-button>
                </a-input-group>
            </a-form-item>

            <a-form-item>
                <div class="centralized-area">
                    <a-button type="primary" class="login-btn" @click="lastCheckEmail">登录</a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { http } from '@/common/request'
import type { EmailForm } from '@/types/interfaces'

const emit = defineEmits(['after-click-email-login'])

const emailForm = defineModel<EmailForm>({ required: true })

const vertifyBtnText = ref<string>('获取验证码')
const forbidSend = ref<boolean>(false)
const leftSeconds = ref<number>(0)

function isEmailRight(email: string) {
    // 简单邮箱正则
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return regex.test(email)
}
function getVerifyCode() {
    if (isEmailRight(emailForm.value.email)) {
        captchaObj.value.showCaptcha()
    } else {
        message.error('邮箱格式不正确')
    }
}

function countLeftSeconds() {
    let timer: number = 0
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

function lastCheckEmail() {
    if (isEmailRight(emailForm.value.email)) {
        emit('after-click-email-login')
    } else {
        message.error('邮箱格式错误')
    }
}

async function afterVertifySuccess(result: any) {
    const header: { [key: string]: any } = {}
    for (let i of Object.keys(result)) {
        header[i.replace('_', '-')] = result[i]
    }

    try {
        const res = await http('web/get-email-code', { email: emailForm.value.email }, 'POST')
        if (!res.status) throw new Error(res.msg)

        message.success('验证码已发送')
        forbidSend.value = true
        leftSeconds.value = 46
        countLeftSeconds()
    } catch (error) {
        message.error('验证码发送失败')
    }
}

const captchaObj = ref<any>({})
// here used some confusing methods
onMounted(async () => {
    let script = document.createElement('script')
    script.src = 'https://static.geetest.com/v4/gt4.js'
    document.body.appendChild(script)
    script.onload = () => {
        ;(window as any).initGeetest4(
            { captchaId: 'b0a78ab0191bd4361905eba5b2209be5', product: 'bind' },
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

.verify-code-input {
    width: 100px;
}
.verify-code-btn {
    width: 124px;
}
</style>
