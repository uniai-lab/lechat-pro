<!-- @format -->

<template>
    <div class="top-bar">
        <div class="logo">
            chat
            <div>KG</div>
        </div>
        <div v-if="props.ifComputer" class="title">chat-KG简历问答机器人</div>

        <!-- this div makes the user btn and charge btn in the same line -->
        <div class="right-group">
            <KGTopPop :user-info="userInfo"></KGTopPop>
        </div>

        <a-upload
            :accept="
                Object.keys(fileSrcMap)
                    .map(key => `.${key}`)
                    .join(',')
            "
            v-model:file-list="fileList"
            name="file"
            :customRequest="customUpload"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
        >
            <a-button v-if="props.ifComputer" class="charge-btn">上传</a-button>
            <div v-if="!props.ifComputer" class="charge-icon">
                <cloud-upload-outlined />
            </div>
        </a-upload>
    </div>
</template>

<script lang="ts" setup>
import KGTopPop from './KGTopPop.vue'
import type { UserInfo } from '@/types/interfaces'
import { CloudUploadOutlined } from '@ant-design/icons-vue'
import { fileSrcMap } from '@/common/iconSrcUrl'

const props = defineProps<{
    userInfo: UserInfo
    ifComputer: boolean
}>()

const fileList = defineModel<any[]>('fileList', { required: true })
const isDragging = defineModel<boolean>('isDragging', { required: true })

function customUpload(options: any) {
    options.onSuccess()
    isDragging.value = false
}

function beforeUpload(file: any) {
    fileList.value.push(file)

    isDragging.value = false

    return false // 返回false以阻止自动上传
}
</script>

<style scoped lang="scss">
.top-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: fixed;
    width: 100%;
    top: 0px;
    background-color: rgb(3 7 18);
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    padding: 1rem 1.5rem; /* 16px, 24px */
    height: 66px;

    .logo {
        display: flex;
        flex-direction: row;
        font-size: 1.5rem /* 24px */;
        line-height: 2rem /* 32px */;
        font-weight: 700;
        color: rgb(250 250 250);

        div {
            display: flex;
            flex-direction: row;
            margin-left: 0.25rem /* 4px */;
            background-color: rgb(75 85 99);
            padding-left: 0.25rem /* 4px */;
            padding-right: 0.25rem /* 4px */;
            border-radius: 0.375rem /* 6px */;
            justify-content: space-between;
            align-items: center;
            font-size: 0.875rem /* 14px */;
            line-height: 1.25rem /* 20px */;
            height: 20px;
        }
    }

    .title {
        margin-right: auto;
        margin-left: 1rem;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        color: rgb(228 228 231);
    }

    .right-group {
        display: flex;
        align-items: center;
        justify-content: center;

        .charge-btn {
            margin: 0.5rem 0.75rem;
            color: rgb(243 244 246);
            background-color: rgb(55 65 81);
            border: 0;
        }
        .charge-btn:hover {
            background-color: rgb(255 255 255);
            color: rgb(17 24 39);
        }

        .charge-icon {
            margin-left: 4px;
            color: rgb(243 244 246);
            font-size: 22px;
        }
    }

    .login-btn {
        position: relative;
        margin-left: auto;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-right: 0.75rem;
        color: rgb(243 244 246);
        background-color: rgb(55 65 81);
        border: 0;
    }
    .login-btn:hover {
        background-color: rgb(255 255 255);
        color: rgb(17 24 39);
    }
}
</style>
