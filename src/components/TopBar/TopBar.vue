<!-- @format -->

<template>
    <div class="top-bar">
        <div class="logo">
            LeChat
            <div>pro</div>
        </div>
        <div v-if="props.ifComputer" class="title">乐聊多模型文档解析工具</div>

        <a-button v-if="!props.ifLogin" class="login-btn" @click.stop="props.switchLoginVisible">登录</a-button>

        <!-- this div makes the user btn and charge btn in the same line -->
        <div class="right-group">
            <TopPop
                :user-info="userInfo"
                :if-login="ifLogin"
                @show-personal-drawer="emitShowPersonalDrawer"
                @log-out="emitLogOut"
                @switch-modal-open="switchChargeModalVisible"
            ></TopPop>

            <a-button v-if="props.ifLogin && props.ifComputer" class="charge-btn" @click.stop="emitShowChargeModal">
                充值
            </a-button>

            <div v-if="props.ifLogin && !props.ifComputer" class="charge-icon" @click.stop="emitShowChargeModal">
                <WalletOutlined />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '@/types/interfaces'
import { WalletOutlined } from '@ant-design/icons-vue'
import TopPop from './TopPop.vue'
import { ref } from 'vue'

const props = defineProps<{
    userInfo: UserInfo
    ifLogin: boolean
    ifComputer: boolean
    switchLoginVisible: Function
}>()

const emit = defineEmits(['show-personal-drawer', 'show-charge-modal', 'log-out'])

const isTopModalOpen = ref<boolean>(false)

function emitShowPersonalDrawer() {
    emit('show-personal-drawer')
}

function emitShowChargeModal() {
    emit('show-charge-modal')
}

function emitLogOut() {
    emit('log-out')
}

function switchChargeModalVisible() {
    isTopModalOpen.value = !isTopModalOpen.value
}

function timeStampToString(timestamp: string) {
    // Convert millisecond timestamps to seconds
    let seconds = Math.floor(Number(timestamp) / 1000)
    // Create a Date Object
    let date = new Date(seconds * 1000)

    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')

    // Returns a formatted date string
    return `${year}-${month}-${day}`
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

    .right-group {
        display: flex;
        align-items: center;
        justify-content: center;

        .charge-btn {
            margin: 0.5rem 0.75rem;
            color: rgb(243 244 246);
            background-color: rgb(55 65 81);
            border: 0;
        }
        .charge-btn:hover {
            background-color: rgb(255 255 255);
            color: rgb(17 24 39);
        }

        .charge-icon {
            margin-left: 4px;
            color: rgb(243 244 246);
            font-size: 22px;
        }
    }

    .login-btn {
        position: relative;
        margin-left: auto;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-right: 0.75rem;
        color: rgb(243 244 246);
        background-color: rgb(55 65 81);
        border: 0;
    }
    .login-btn:hover {
        background-color: rgb(255 255 255);
        color: rgb(17 24 39);
    }
}
</style>
