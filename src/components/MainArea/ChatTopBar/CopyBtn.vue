<!-- @format -->

<template>
    <div class="copy-btn" @click="copyToClipboard()">
        <CopyOutlined class="btn-icon" v-show="btnStatus === 'default'" />

        <LoadingOutlined class="btn-icon" v-show="btnStatus === 'loading'" spin />

        <CheckCircleOutlined class="btn-icon" v-show="btnStatus === 'success'" />

        <CloseCircleOutlined class="btn-icon" v-show="btnStatus === 'error'" />

        <span>{{ btnTips[btnStatus as keyof typeof btnTips] }}</span>
    </div>
</template>

<script setup lang="ts">
import type { BtnTips } from '@/types/interfaces'
import { CopyOutlined, LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const porps = defineProps<{ content: string }>()

const btnTips: BtnTips = {
    copy: '复制全文',
    loading: '',
    success: '已复制到剪贴板！',
    error: '复制失败！'
}
const btnStatus = ref<'default' | 'loading' | 'success' | 'error'>('default')

function copyToClipboard(content: string = porps.content) {
    btnStatus.value = 'loading'
    var textArea = document.createElement('textarea')
    textArea.value = content
    document.body.appendChild(textArea)
    textArea.select()
    try {
        var successful = document.execCommand('copy')
        if (successful) {
            setTimeout(() => (btnStatus.value = 'success'), 150)
        }
        var msg = successful ? '复制成功' : '复制失败'
        console.log(msg)
    } catch (err) {
        btnStatus.value = 'error'
        console.log('复制失败', err)
    } finally {
        setTimeout(() => (btnStatus.value = 'default'), 1500)
    }

    document.body.removeChild(textArea)
    // navigator.clipboard
    //   .writeText(content)
    //   .then(() => setTimeout(() => (btnStatus.value = "success"), 150))
    //   .catch(() => (btnStatus.value = "error"))
    //   .finally(() => setTimeout(() => (btnStatus.value = "copy"), 1500));
}
</script>

<style lang="scss" scoped>
.copy-btn {
    display: flex;
    align-items: center;
    cursor: pointer;

    .btn-icon {
        font-size: 14px;
    }

    span {
        font-size: 0.75rem /* 12px */;
        line-height: 1rem /* 16px */;
        margin-left: 0.125rem /* 2px */;
        --tw-text-opacity: 1;
        color: rgb(107 114 128 / var(--tw-text-opacity)); /* #6b7280 */
        line-height: 1;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.rotate {
    animation: spin 2s linear infinite;
}
</style>
