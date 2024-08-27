<!-- @format -->

<template>
    <div class="top-bar">
        <div class="logo">
            chat
            <div>KG</div>
        </div>
        <div v-if="props.ifComputer" class="title">chat-KG&ensp;知识图谱&数字人</div>
        <div v-if="!props.ifComputer" class="title"></div>

        <!-- this div makes the user btn and charge btn in the same line -->
        <div class="right-group">
            <KGTopPop :user-info="userInfo"></KGTopPop>
        </div>

        <a-cascader
            :allowClear="false"
            v-model:value="nowModule"
            class="right-btn"
            defaultValue="知识图谱"
            :options="moduleSelect"
            @change="selectedMode"
        ></a-cascader>
    </div>
</template>

<script lang="ts" setup>
import KGTopPop from './KGTopPop.vue'
import type { UserInfo } from '@/types/interfaces'
import { ref } from 'vue'
import type { CascaderProps } from 'ant-design-vue'

const props = defineProps<{
    userInfo: UserInfo
    ifComputer: boolean
}>()

const nowModule = defineModel<'KG' | 'RS' | 'CT'>('nowModule', { required: true })

const moduleSelect = ref<CascaderProps['options']>([
    { value: 'KG', label: '知识图谱' },
    { value: 'RS', label: '信息修改' },
    { value: 'CT', label: '数字人' }
])

function selectedMode(value: 'KG'[] | 'RS'[] | 'CT'[]) {
    nowModule.value = value[0]
}
</script>

<style scoped lang="scss">
.top-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: fixed;
    width: 100%;
    top: 0px;
    background-color: rgb(3 7 18);
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    padding: 1rem 1.5rem; /* 16px, 24px */
    height: 66px;

    .logo {
        display: flex;
        flex-direction: row;
        font-size: 1.5rem /* 24px */;
        line-height: 2rem /* 32px */;
        font-weight: 700;
        color: rgb(250 250 250);

        div {
            display: flex;
            flex-direction: row;
            margin-left: 0.25rem /* 4px */;
            background-color: rgb(75 85 99);
            padding-left: 0.25rem /* 4px */;
            padding-right: 0.25rem /* 4px */;
            border-radius: 0.375rem /* 6px */;
            justify-content: space-between;
            align-items: center;
            font-size: 0.875rem /* 14px */;
            line-height: 1.25rem /* 20px */;
            height: 20px;
        }
    }

    .title {
        margin-right: auto;
        margin-left: 1rem;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        color: rgb(228 228 231);
    }

    .right-btn {
        margin-left: 10px;
        width: 100px;
    }
}
</style>
