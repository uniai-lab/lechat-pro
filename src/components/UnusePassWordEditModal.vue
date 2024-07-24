<!-- @format -->

<template>
    <a-modal
        v-model:open="props.isPasswordEditModalOpen"
        :footer="null"
        destroyOnClose="true"
        title="修改密码"
        @ok="emitClose"
    >
        <a-spin :spinning="savePasswordLock">
            <a-form
                :validat="'cheekpasswordres'"
                style="margin-top: 32px"
                name="custom-validation"
                ref="formRef"
                :model="passwordFormState"
                :rules="passwordRules"
                v-bind="{ labelCol: { span: 6 }, wrapperCol: { span: 12 } }"
                @finish="() => {}"
                @finishFailed="() => {}"
            >
                <a-form-item has-feedback label="新的密码" name="pass">
                    <a-input-password v-model:value="passwordFormState.pass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="重复密码" name="checkPass">
                    <a-input-password v-model:value="passwordFormState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
            </a-form>
            <div class="save-btn-container flex justify-center mt-7 mb-9">
                <a-button @click="savePassword()" type="primary">确定</a-button>
            </div>
        </a-spin>
    </a-modal>
</template>

<script setup lang="ts">
import { http } from '@/common/request'
import type { PasswordFormState } from '@/types/interfaces'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const props = defineProps<{ isPasswordEditModalOpen: boolean }>()
const emit = defineEmits<{ clearInfo: []; close: []; getUserInfo: [] }>()

const formRef = ref<any>()
const savePasswordLock = ref<boolean>(false)
const passwordFormState = ref<PasswordFormState>({ pass: '', checkPass: '', age: undefined })

let myValidator = async (value: string) => {
    if (value === '') {
        return Promise.reject(new Error('请再次输入密码'))
    } else if (value !== passwordFormState.value.pass) {
        return Promise.reject(new Error('两次输入的密码不一致'))
    } else {
        return Promise.resolve()
    }
}
const passwordRules = {
    pass: [
        {
            required: true,
            validator: (value: string) => {
                return new Promise<void>((resolve, reject) => {
                    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
                        reject(new Error('必须包含字母和数字，不少于八位'))
                    } else {
                        resolve()
                    }
                })
            },
            trigger: 'change'
        }
    ],
    checkPass: [{ required: true, validator: myValidator, trigger: 'change' }]
}

function emitClearInfo() {
    emit('clearInfo')
}

function emitClose() {
    emit('close')
}

function emitGetUserInfo() {
    emit('getUserInfo')
}

async function savePassword() {
    if (!savePasswordLock.value) {
        savePasswordLock.value = true

        try {
            const checkPassword = await formRef.value.validate()

            const result: any = await http('update-user', { password: checkPassword.checkPass }, 'POST')
            const res = await result.json()
            if (res.status === -1) {
                emitClearInfo()
                return
            }

            if (res.status == 1) {
                message.success('保存成功')
                passwordFormState.value.checkPass = ''
                passwordFormState.value.pass = ''
                emitClose()
                emitGetUserInfo()
            } else {
                message.error('保存失败')
                console.log(res.msg)
            }
        } catch (e: any) {
            message.error('保存失败')
            console.log(e.msg)
        }
        savePasswordLock.value = false
    }
}
</script>

<style lang="scss" scoped>
.save-btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.75rem;
    margin-bottom: 2.25rem;
}
</style>
