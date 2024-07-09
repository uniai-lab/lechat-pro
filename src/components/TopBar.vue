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
            <!-- here to control the popover style, we edit the 'overlay-class-name' and 'getPopupContainer' -->
            <a-popover
                overlay-class-name="pop-over"
                :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode"
                trigger="click|hover"
                :arrow="false"
            >
                <template #content>
                    <a-card class="pop-card">
                        <template #cover>
                            <img
                                alt="example"
                                src="https://openai-1259183477.cos.ap-shanghai.myqcloud.com/WechatIMG925.jpg"
                            />
                        </template>
                        <template #actions>
                            <div @click="emitShowPersonalDrawer">
                                <label class="pop-btn">修改信息</label>
                                <EditOutlined></EditOutlined>
                            </div>
                            <div @click.stop="emitLogOut" class="pop-btn-red">
                                <label class="pop-btn">退出登录</label>
                                <LogoutOutlined></LogoutOutlined>
                            </div>
                        </template>
                        <a-card-meta
                            :title="props.userInfo.name"
                            :description="'对话次数：' + props.userInfo.chance.totalChatChance"
                        >
                            <template #avatar>
                                <div class="avatar-container">
                                    <a-avatar class="avatar" :src="props.userInfo.avatar" />
                                    <div class="name-plate">VIP {{ props.userInfo.chance.level }}</div>
                                    <div class="vip-left-time" v-show="props.userInfo.chance.level != 0">
                                        到期时间：{{ timeStampToString(props.userInfo.chance.levelExpiredAt) }}
                                    </div>
                                </div>
                            </template>
                        </a-card-meta>
                    </a-card>
                </template>

                <a-button v-if="props.ifLogin" class="user-btn">{{ props.userInfo.name }}</a-button>
            </a-popover>

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
import { EditOutlined, LogoutOutlined, WalletOutlined } from '@ant-design/icons-vue'

interface UserInfo {
    chance: {
        totalChatChance: number
        level: number
        levelExpiredAt: string
    }
    name: string
    phone: string
    avatar: string
}

const props = defineProps<{
    userInfo: UserInfo
    ifLogin: boolean
    ifComputer: boolean
    switchLoginVisible: Function
}>()

const emits = defineEmits(['show-personal-drawer', 'show-charge-modal', 'log-out'])

function emitShowPersonalDrawer() {
    emits('show-personal-drawer')
}

function emitShowChargeModal() {
    emits('show-charge-modal')
}

function emitLogOut() {
    emits('log-out')
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

        // here the css may be confusing but it works
        .a-popover {
            width: 340px;
        }
        .pop-over {
            width: 340px;
            .pop-card {
                width: 340px;

                .pop-btn-red:hover {
                    color: rgb(255, 77, 79);
                }
                .pop-btn {
                    margin-right: 10px;
                }
                .pop-btn:hover {
                    cursor: pointer;
                }

                .avatar-container {
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;

                    .avatar {
                        height: 50px;
                        width: 50px;
                        margin: 0px 10px 10px 10px;
                    }

                    .name-plate {
                        width: 50px;
                        position: relative;
                        background: black;
                        color: gold;
                        border-radius: 10px;
                        padding: 0;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        margin-top: -5px;
                        font-size: 10px;
                        font-weight: 500;
                        z-index: 99999;
                    }

                    .vip-left-time {
                        margin-left: 87px;
                        margin-top: -16px;
                        position: absolute;
                        font-size: 12px;
                        flex-wrap: nowrap;
                        color: rgb(75 85 99);
                    }
                }
            }
        }

        .user-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            width: auto;
            background-color: rgb(3 7 18);
            color: rgb(255 255 255);
            border: 0;
        }
        .user-btn:hover {
            background-color: rgb(255 255 255);
            color: rgb(17 24 39);
        }

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
            color: rgb(243 244 246);
            font-size: 22px;
        }
    }

    .login-btn {
        margin-left: auto;
        margin: 0.5rem 0.75rem;
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
