<!-- @format -->

<template>
    <div class="image-container">
        <a-config-provider :locale="zhCN">
            <a-spin :spinning="props.item.file?.type === 'sending'" tip="上传中...">
                <a-image :src="props.item.file?.url" />
            </a-spin>
        </a-config-provider>
    </div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types/interfaces'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const props = defineProps<{ item: Chat }>()
</script>

<style lang="scss" scoped>
.image-container {
    padding: 15px;
    max-width: 450px;
}
</style>
