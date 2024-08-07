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
    padding: 20px;
    background: none;
}
</style>
