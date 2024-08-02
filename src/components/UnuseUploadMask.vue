<!-- @format -->

<template>
    <div>
        <a-upload-dragger
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
            <div class="upload-container">
                <div class="img-container">
                    <img class="file-logo" src="../assets/filebg.webp" />
                </div>
                <div class="upload-title">文件拖动到此处即可上传</div>
                <div class="upload-msg">
                    支持的文件格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
                </div>
            </div>
        </a-upload-dragger>
    </div>
</template>

<script setup lang="ts">
import { fileSrcMap } from '@/common/iconSrcUrl'

const fileList = defineModel<any[]>('mambaOut', { required: true })
const isDragging = defineModel<boolean>('isDragging', { required: true })

function customUpload(options: any) {
    // 阻止默认的上传行为
    options.onSuccess()
    isDragging.value = false
}

function beforeUpload(file: any) {
    // 将文件添加到fileList数组
    fileList.value.push(file)

    isDragging.value = false

    return false // 返回false以阻止自动上传
}
</script>

<style lang="scss" scoped>
.upload-container {
    width: 90vw;
    margin-left: 5vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .img-container {
        font-size: '160px';
        color: '#080603';
        display: 'flex';
        flex-direction: 'column';
        justify-content: 'center';
        align-items: 'center';

        .file-logo {
            height: 200px;
            border-radius: 30px;
            margin-bottom: 30px;
        }
    }

    .upload-title {
        margin-top: 20px;
        font-size: 30px;
        font-weight: 600;
    }

    .upload-msg {
        color: #505050;
        font-size: 20px;
        margin-top: 17px;
    }
}
</style>
