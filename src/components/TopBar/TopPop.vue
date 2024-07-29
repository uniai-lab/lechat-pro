<!-- @format -->

<template>
    <!-- here to control the popover style, we edit the 'overlay-class-name' and 'getPopupContainer' -->
    <a-popover
        overlay-class-name="pop-over"
        :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode"
        trigger="hover"
        :arrow="false"
    >
        <template #content>
            <a-card class="pop-card">
                <template #cover>
                    <img alt="example" src="https://openai-1259183477.cos.ap-shanghai.myqcloud.com/WechatIMG925.jpg" />
                </template>
                <template #actions>
                    <div @click="emitShowPersonalDrawer">
                        <label class="pop-btn">修改信息</label>
                        <edit-outlined></edit-outlined>
                    </div>
                    <div @click.stop="emitLogout" class="pop-btn-red">
                        <label class="pop-btn">退出登录</label>
                        <logout-outlined></logout-outlined>
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
                            <!-- here should be the vip expired time, but the backend's levelExpiredAt do not show the timeStamp -->

                            <!-- <div class="vip-left-time" v-show="props.userInfo.chance.level != 0">
                                        到期时间：{{ timeStampToString(props.userInfo.chance.levelExpiredAt) }}
                                    </div> -->
                        </div>
                    </template>
                </a-card-meta>
            </a-card>
        </template>
        <a-button v-if="props.ifLogin" class="user-btn">
            {{ props.userInfo.name }}
        </a-button>
    </a-popover>
</template>
<script setup lang="ts">
import type { UserInfo } from '@/types/interfaces'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
    userInfo: UserInfo
    ifLogin: boolean
}>()
const emit = defineEmits<{ showPersonalDrawer: []; logout: [] }>()

function emitShowPersonalDrawer() {
    emit('showPersonalDrawer')
}

function emitLogout() {
    emit('logout')
}
</script>

<style lang="scss" scoped>
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
</style>
