<!-- @format -->

<script setup lang="ts">
import { Copy, Loading, CheckOne } from '@icon-park/vue-next'
import type { Theme } from '@icon-park/vue-next/lib/runtime'
import { ref } from 'vue'

const porps = defineProps<{ content: string }>()
const btnConfig: {
    size: number
    fill: string
    theme: Theme
} = {
    size: 14,
    fill: '#999',
    theme: 'outline'
}
const btnTips = {
    copy: '复制全文',
    loading: '',
    success: '已复制到剪贴板！',
    error: '复制失败！'
}
const btnStatus = ref<'copy' | 'loading' | 'success' | 'error'>('copy')

const copyToClipboard = (content: string = porps.content) => {
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
        setTimeout(() => (btnStatus.value = 'copy'), 1500)
    }

    document.body.removeChild(textArea)
    // navigator.clipboard
    //   .writeText(content)
    //   .then(() => setTimeout(() => (btnStatus.value = "success"), 150))
    //   .catch(() => (btnStatus.value = "error"))
    //   .finally(() => setTimeout(() => (btnStatus.value = "copy"), 1500));
}
</script>

<template>
    <div class="copy-btn" @click="copyToClipboard()">
        <copy v-show="btnStatus === 'copy'" :theme="btnConfig.theme" :size="btnConfig.size" :fill="btnConfig.fill" />
        <loading
            class="rotate"
            v-show="btnStatus === 'loading'"
            :theme="btnConfig.theme"
            :size="btnConfig.size"
            :fill="btnConfig.fill"
        />
        <check-one
            v-show="btnStatus === 'success'"
            :theme="btnConfig.theme"
            :size="btnConfig.size"
            :fill="btnConfig.fill"
        />
        <close-one
            v-show="btnStatus === 'error'"
            :theme="btnConfig.theme"
            :size="btnConfig.size"
            :fill="btnConfig.fill"
        />
        <span>{{ btnTips[btnStatus] }}</span>
    </div>
</template>

<style lang="scss" scoped>
.copy-btn {
    display: flex;
    align-items: center;
    cursor: pointer;

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
