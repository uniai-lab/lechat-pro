<!-- @format -->

<template>
    <a-modal
        :footer="null"
        v-model:open="props.isFilePreviewOpen"
        :width="modalWidth"
        :title="props.officeName"
        @cancel="emitHandlefileClose"
    >
        <iframe v-if="props.isFilePreviewOpen" :src="props.officeViewerUrl"></iframe>
    </a-modal>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ isFilePreviewOpen: boolean; officeName: string; officeViewerUrl: string }>()
const emit = defineEmits<{ fileClose: [] }>()

const modalWidth = ref<string>('80%')

const emitHandlefileClose = () => {
    emit('fileClose')
}

function updateModalWidth() {
    if (window.innerWidth >= 1000) {
        modalWidth.value = '900px'
    } else {
        modalWidth.value = '90%'
    }
}

onMounted(() => {
    updateModalWidth()
    window.addEventListener('resize', updateModalWidth)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateModalWidth)
})
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 70vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
}
</style>
