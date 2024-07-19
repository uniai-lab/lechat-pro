<!-- @format -->

<template>
    <div class="top-bar">
        <div v-if="props.item.role != 'assistant'" class="avatar-container">
            <div :class="props.index == 1 ? 'user-active' : 'user-deactive'">Me</div>
        </div>
        <div v-if="props.item.role == 'assistant' && !generating" class="avatar-container">
            <img
                :class="props.index == 0 ? 'le-sleep-now' : 'le-sleep-before'"
                :src="
                    props.index == 0
                        ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/after.png'
                        : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'
                "
            />
            <div class="le-title">LeChat</div>
            <img class="le-model" :src="srcMap[props.item.model as keyof typeof srcMap]" />

            <div class="le-submodel">{{ props.item.subModel || '' }}</div>
        </div>

        <div v-if="props.item.role == 'assistant' && props.generating" class="avatar-container">
            <img
                :class="props.index == 0 ? 'le-gener-now' : 'le-gener-before'"
                :src="
                    props.index == 0
                        ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/loading.png'
                        : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'
                "
            />

            <div class="le-title">LeChat</div>
            <img class="le-model" :src="srcMap[props.item.model as keyof typeof srcMap]" />

            <div class="le-submodel">{{ props.item.subModel || '' }}</div>
        </div>

        <CopyBtn class="invisible group-hover:visible" :content="props.item.content" />
    </div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types/interfaces'
import { srcMap } from '@/common/iconSrcUrl'
import CopyBtn from './CopyBtn.vue'

const props = defineProps<{
    item: Chat
    index: number
    generating: boolean
}>()
</script>

<style lang="scss" scoped>
.top-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .avatar-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .user-active {
            align-items: center;
            display: flex;
            justify-content: center;
            height: 44px;
            width: 44px;
            border-radius: 50%;
            font-size: 18px;
            margin: 10px 0;
            margin-left: 10px;
            background-color: rgb(17 24 39);
            color: rgb(243 244 246);
        }

        .user-deactive {
            align-items: center;
            display: flex;
            justify-content: center;
            height: 44px;
            width: 44px;
            border-radius: 50%;
            font-size: 18px;
            margin: 10px 0;
            margin-left: 10px;
            background-color: rgb(75 85 99);
            color: rgb(243 244 246);
        }

        .le-sleep-now {
            height: 64px;
            filter: grayscale(0.9) brightness(0.6) contrast(900%);
        }

        .le-sleep-before {
            height: 64px;
            filter: grayscale(0.9) brightness(0.8) contrast(300%);
        }

        .le-gener-now {
            height: 64px;
            filter: grayscale(0.9) brightness(0.9) contrast(900%);
        }

        .le-gener-before {
            height: 64px;
            filter: grayscale(0.9) brightness(0.9) contrast(300%);
        }

        .le-title {
            font-weight: 700;
            margin-right: 0.75rem /* 12px */;
        }

        .le-model {
            height: 22px;
        }

        .le-submodel {
            margin-left: 0.25rem /* 4px */;
        }
    }
}
</style>
