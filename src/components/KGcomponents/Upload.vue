<!-- @format -->

<template>
    <div class="upload-container"></div>
    <a-col :span="20" :offset="2">
        <a-collapse v-model:activeKey="activeKey" :bordered="false" style="margin-top: 100px">
            <a-collapse-panel key="1" header="上传简历">
                <a-config-provider :theme="{ token: { colorPrimary: ' rgb(17,20,24)' } }">
                    <div class="upload">
                        <a-upload-dragger
                            :accept="
                                Object.keys(fileSrcMap)
                                    .map(key => `.${key}`)
                                    .join(',')
                            "
                            v-model:file-list="uploadFileList"
                            name="file"
                            :customRequest="customUpload"
                            :beforeUpload="beforeUpload"
                        >
                            <p class="ant-upload-drag-icon">
                                <inbox-outlined></inbox-outlined>
                            </p>
                            <p class="ant-upload-text">点击按钮上传简历</p>
                            <p class="ant-upload-hint">
                                支持的简历格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
                            </p>
                        </a-upload-dragger>
                        <div class="buttons">
                            <a-button danger @click="emitClearResume">清空</a-button>
                            <a-button type="primary" @click="emitSendMultiple" :disabled="!uploadFileList.length">
                                解析
                            </a-button>
                        </div>
                    </div>
                </a-config-provider>
            </a-collapse-panel>
        </a-collapse>
    </a-col>
</template>

<script setup lang="ts">
import { fileSrcMap } from '@/common/iconSrcUrl'
import { inject, ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'

const customUpload = inject('customUpload')
const beforeUpload = inject('beforeUpload')

const emit = defineEmits<{ sendMultiple: []; clearResume: [] }>()

const uploadFileList = defineModel<any[]>('uploadFileList', { required: true })

const activeKey = ref<number>(1)
function emitSendMultiple() {
    emit('sendMultiple')
}

function emitClearResume() {
    emit('clearResume')
}
</script>

<style lang="scss" scoped>
.upload-container {
    margin: 0 auto;
    width: 80%;
}
.top-divider {
    margin-top: 100px;
}
.upload {
    margin-left: auto;
    margin-right: auto;

    .buttons {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;

        button {
            width: 240px;
        }
    }
}
</style>
