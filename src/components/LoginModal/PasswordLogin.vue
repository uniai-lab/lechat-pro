<!-- @format -->

<template>
    <div id="captcha"></div>
    <div class="main">
        <a-form :model="passwordForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off">
            <a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入您的手机号' }]">
                <a-input v-model:value="passwordForm.phone" />
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入您的验证码' }]">
                <a-input-password v-model:value="passwordForm.password" />
            </a-form-item>

            <div class="centralized-area">
                <a-button type="primary" @click="lastCheckPhone">登录</a-button>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const captchaObj: any = ref({}) // the captchaObj is like a symbol of the captcha

interface PasswordForm {
    phone: string
    password: string
}
const passwordForm = defineModel<PasswordForm>({ required: true })

const emits = defineEmits(['after-click-password-login'])

function isPhoneRight(phoneNumer: string) {
    // this regex can vertify the phoneNumber
    const regex = /^1[3456789]\d{9}$/
    return regex.test(phoneNumer)
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
                    afterVertifySuccess()
                })
            }
        )
    }
})

async function afterVertifySuccess() {
    emits('after-click-password-login')
}

function lastCheckPhone() {
    if (isPhoneRight(passwordForm.value.phone)) {
        captchaObj.value.showCaptcha()
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
