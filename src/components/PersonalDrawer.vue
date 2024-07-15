<!-- @format -->

<template>
    <a-drawer
        title="编辑个人资料"
        :closable="true"
        class="drawer"
        :visible="props.personalDrawerVisible"
        @close="emitClosePersonalDrawer"
        width="320"
    >
        <a-spin :spinning="props.savePersonalInfoClock">
            <a-form :model="personalInfoForm" :rules="formRule" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="头像" name="avatar">
                            <a-upload
                                name="avatar"
                                list-type="picture-card"
                                :show-upload-list="false"
                                :customRequest="forbidDefaultUpload"
                                :before-upload="checkAvatarFormat"
                                @change="handleAvatarChange"
                            >
                                <img class="avatar" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                <div v-if="!imageUrl">
                                    <LoadingOutlined v-if="avatarLoading"></LoadingOutlined>
                                    <PlusOutlined v-if="!avatarLoading"></PlusOutlined>
                                    <div>上传</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="用户名" name="name">
                            <a-input v-model:value="personalInfoForm.name" placeholder="请输入用户名" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="手机号" name="phone">
                            <div class="phone">
                                <a-input
                                    :disabled="true"
                                    v-model:value="personalInfoForm.phone"
                                    placeholder="暂未绑定"
                                />
                            </div>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <div class="save-btn-container">
                <a-button class="save-btn" @click="emitSavePersonalInfo">保存</a-button>
            </div>
        </a-spin>
    </a-drawer>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import type { FileInfo, FileItem, PersonalInfoForm } from '@/types/interfaces'

const props = defineProps(['personalDrawerVisible', 'savePersonalInfoClock'])
const emits = defineEmits(['close-personal-drawer', 'save-personal-info'])

const personalInfoForm = defineModel<PersonalInfoForm>('personalInfoForm', { required: true })
const imageUrl = defineModel<string>('imageUrl', { required: true })

const avatarLoading = ref<boolean>(false)

const formRule = { name: [{ required: false, message: '请输入用户名' }] }

function emitClosePersonalDrawer() {
    emits('close-personal-drawer')
}

function emitSavePersonalInfo() {
    emits('save-personal-info')
}

function forbidDefaultUpload() {}

function checkAvatarFormat(file: FileItem) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('格式错误，只可上传JPG格式文件')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片必须小于2MB')
    }
    return isJpgOrPng && isLt2M
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

function handleAvatarChange(info: FileInfo) {
    if (info.file.status === 'uploading') {
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url
            avatarLoading.value = false
        })
        return
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url
            avatarLoading.value = false
        })
    }
}
</script>

<style lang="scss" scoped>
.drawer {
    padding-bottom: 80px;
    z-index: 999;

    .avatar {
        height: 100%;
    }

    .phone {
        display: flex;
        flex-direction: row;
    }

    .save-btn-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5rem;

        .save-btn {
            width: 120px;
            color: rgb(243 244 246);
            background-color: rgb(17 24 39);
        }
        .save-btn:hover {
            color: rgb(243 244 246);
            background-color: rgb(55 65 81);
        }
    }
}
</style>
