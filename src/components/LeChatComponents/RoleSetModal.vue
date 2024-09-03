<!-- @format -->

<template>
    <a-modal
        v-model:open="openRoleSet"
        :footer="null"
        :confirm-loading="confirmLoading"
        title="角色扮演"
        @ok="handleOk"
    >
        <br />
        <a-form :model="roleSetForm" :label-col="formLabelCol" :wrapper-col="formWrapperCol">
            <a-form-item label="场景描述">
                <a-textarea :rows="7" :placeholder="'请输入您对角色和场景的定义'" v-model:value="roleSetForm.desc" />
            </a-form-item>
            <a-form-item label="开场白">
                <a-textarea
                    :rows="4"
                    :placeholder="'设置该角色的开场白（可选）'"
                    v-model:value="roleSetForm.startmsg"
                />
            </a-form-item>
            <a-form-item :wrapper-col="itemWrapperCol">
                <a-button class="submit-btn" type="primary" @click="emitSubmit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import type { RoleSetForm } from '@/types/interfaces'
import { ref } from 'vue'

const emit = defineEmits<{ closeRoleSet: []; onSubmit: [] }>()
const roleSetForm = defineModel<RoleSetForm>('roleSetForm', { required: true })
const openRoleSet = defineModel<boolean>('openRoleSet', { required: true })

const confirmLoading = ref<boolean>(false)
const formLabelCol = { style: { width: '70px' } }
const formWrapperCol = { span: 19 }
const itemWrapperCol = { span: 14, offset: 10 }

function emitSubmit() {
    emit('onSubmit')
}

async function handleOk() {
    confirmLoading.value = true
    setTimeout(() => {
        emit('closeRoleSet')
        confirmLoading.value = false
    }, 2000)
}
</script>

<style lang="scss" scoped>
.submit-btn {
    background-color: black;
}
</style>
