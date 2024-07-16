<!-- @format -->

<template>
    <div id="captcha"></div>
    <div class="main">
        <a-form :model="passwordForm" :wrapper-col="{ span: 24 }" autocomplete="off">
            <a-form-item class="item-area" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
                <label>手机号</label>
                <a-input v-model:value="passwordForm.phone" />
            </a-form-item>

            <a-form-item class="item-area" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <label>密码</label>
                <a-input-password v-model:value="passwordForm.password" />
            </a-form-item>

            <div class="centralized-area">
                <a-button type="primary" class="login-btn" @click="lastCheckPhone">登录</a-button>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import type { PasswordForm } from '@/types/interfaces'
//  import { PasswordForm } from '@/types/interfaces'

const captchaObj: any = ref({}) // the captchaObj is like a symbol of the captcha

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
    margin-top: 6%;

    .item-area {
        display: flex;
        justify-content: center;
        align-items: center;
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
</style>
