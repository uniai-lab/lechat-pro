<!-- @format -->
<template>
    <div class="bottom-bar">
        <div class="tool-box">
            <div class="text-box">
                <a-textarea
                    :style="{
                        padding: '5px 5px 5px 28px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }"
                    :auto-size="{ maxRows: 5 }"
                    :type="'text'"
                    @keydown="keydownHandle"
                    :placeholder="!ifLogin ? '请先登录' : '剩余对话次数' + props.userInfo.chance.totalChatChance"
                    v-model:value="text"
                ></a-textarea>
            </div>

            <a-config-provider :theme="{ token: { colorPrimary: ' rgb(17,20,24)' } }">
                <a-button
                    ref="step5"
                    @click="emitSendMessage"
                    type="primary"
                    :loading="generating"
                    :style="{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '6px'
                    }"
                >
                    发送
                </a-button>
            </a-config-provider>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Option, UserInfo } from '@/types/interfaces'

const props = defineProps<{
    ifLogin: boolean
    ifComputer: boolean
    generating: boolean

    options: Option[]

    userInfo: UserInfo
}>()

const emit = defineEmits<{ sendMessage: [] }>()

const text = defineModel<string>('text', { required: true })

function emitSendMessage() {
    emit('sendMessage')
}

function keydownHandle(event: KeyboardEvent) {
    if (event.keyCode === 13) {
        if (!event.ctrlKey && !event.metaKey) {
            // 如果只按下了Enter键，则执行事件a的逻辑
            event.stopPropagation()
            event.preventDefault()

            emitSendMessage()
        } else if (event.ctrlKey || event.metaKey) {
            // 如果同时按下了Shift键和Enter键，则执行换行逻辑
            event.preventDefault() // 阻止默认的换行行为

            text.value += '\n'
            toBottom(event.target as HTMLElement) // 立即滚动到底部
        }
    }
}

function toBottom(inputElement: HTMLElement) {
    requestAnimationFrame(() => {
        inputElement.scrollTop = inputElement.scrollHeight
    })
}
</script>

<style lang="scss" scoped>
.base-style {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #f9fafb;
    margin-right: 3px;
}

.output-choose-btn {
    margin-top: -1.6px;
    font-size: 18px;
    display: 'flex';
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.bottom-bar {
    position: fixed;
    max-width: 1000px;
    width: 100%;
    min-height: 72px;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 8px;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    .upload-list .ant-upload-list-item-container .ant-upload-list-item {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
        border: none !important;
    }

    .tool-box {
        display: flex;
        padding: 4px 0;
        min-height: 40px;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .history-btn {
            justify-content: center;
            margin-left: 0;
            min-height: 32px;
            padding: 0 0.5rem;
            color: #374151;

            .history-text {
                pointer-events: none;
                margin-left: 4px;
            }
        }

        .choose-mod {
            justify-content: center;
            min-height: 32px;
            padding: 0 2px;
            width: 152px;
            color: #374151;

            .pc-choose-mod {
                width: 152px;
                height: 30.4px;
                margin-right: 3px;
            }
        }

        .mobile {
            width: 36px;
            margin-left: 1px;
            justify-content: center;

            &:hover {
                border-color: #00000000;
                background-color: #ddd;
            }
        }

        .role-set-icon {
            justify-content: center;
            padding: 0 2px;
            width: 38px;
            height: 32px;
            margin-left: 6px;
        }

        .text-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            margin-right: -3px;
            flex-grow: 1;
        }
    }
}
</style>
