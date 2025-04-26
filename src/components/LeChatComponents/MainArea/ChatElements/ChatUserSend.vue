<!-- @format -->

<template>
    <div class="markdown-container" v-html="md.render(props.content)"></div>
</template>

<script setup lang="ts">
import { md } from '@/libs/markdown'

const props = defineProps<{ content: string }>()
</script>

<style lang="scss" scoped>
.markdown-container {
    font-family:
        -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans',
        'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN',
        'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp',
        sans-serif;
    padding: 0 15px;
}
</style>
