<!-- @format -->

<template>
    <div class="main-area">
        <FilePreview
            v-model:is-file-preview-open="isFilePreviewOpen"
            v-model:office-name="officeName"
            v-model:office-viewer-url="officeViewerUrl"
            @file-close="handlefileClose"
        ></FilePreview>

        <a-spin v-if="props.isLinking" class="link-spin" tip="正在连接服务器..." />

        <div class="chat" v-for="(item, index) in aChat.slice().reverse()" :key="index">
            <ChatTopBar :item="item" :index="index" :generating="generating" />

            <div>
                <LoadingAnimation class="load-animation" v-if="!item.content && !item.file" />

                <ChatServerSend v-else-if="item.content && item.role !== 'user'" v-model="item.content" />

                <ChatUserSend v-else-if="item.content && item.role === 'user'" :content="item.content" />

                <ChatFile
                    class="file-box"
                    v-if="item.file && !item.file.ext.match('image.*')"
                    :item="item"
                    v-model:is-file-preview-open="isFilePreviewOpen"
                    v-model:office-name="officeName"
                    v-model:office-viewer-url="officeViewerUrl"
                />

                <ChatImage class="file-box" v-if="item.file && item.file.ext.match('image.*')" :item="item" />
            </div>
        </div>

        <SendingAnimation :up-sending="upLoading"></SendingAnimation>
    </div>

    <StopChatingBtn :generating="generating" @stop-chating="stopChating"></StopChatingBtn>
</template>

<script lang="ts" setup>
import type { Chat } from '@/types/interfaces'
import { ref } from 'vue'

import FilePreview from './FilePreview.vue'
import SendingAnimation from './SendingAnimation.vue'
import StopChatingBtn from './StopChatingBtn.vue'
import ChatServerSend from './ChatElements/ChatServerSend.vue'
import ChatImage from './ChatElements/ChatImage.vue'
import ChatUserSend from './ChatElements/ChatUserSend.vue'
import ChatFile from './ChatElements/ChatFile.vue'
import ChatTopBar from './ChatTopBar/ChatTopBar.vue'
import LoadingAnimation from '../LoadingAnimation.vue'

const props = defineProps<{ isLinking: boolean }>()

const upLoading = defineModel<boolean>('upLoading', { required: true })
const aChat = defineModel<Chat[]>('aChat', { required: true })
const generating = defineModel<boolean>('generating', { required: true })
const couldContinue = defineModel<boolean>('couldContinue', { required: true })

const isFilePreviewOpen = ref<boolean>(false)
const officeName = ref<string>('')
const officeViewerUrl = ref<string>('')

function handlefileClose() {
    isFilePreviewOpen.value = false
}

function stopChating() {
    couldContinue.value = false
}
</script>

<style lang="scss" scoped>
.main-area {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    height: fit-content;
    max-height: 100%;
    padding-top: 64px;
    padding-bottom: 90px;

    .link-spin {
        margin-top: 120px;
    }

    .chat {
        width: 100%;
        max-width: 1000px;
        display: flex;
        margin-top: 0.5rem /* 8px */;
        padding: 0.75rem 1rem;
        color: rgb(17 24 39);
        border-radius: 0.5rem;
        flex-direction: column;
        justify-content: flex-end;
    }

    .load-animation {
        margin-left: 20px;
    }

    .file-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem /* 8px */;
        margin-top: 0.75rem /* 8px */;
    }
}
</style>
