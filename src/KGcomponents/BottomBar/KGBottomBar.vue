<!-- @format -->
<template>
    <div class="bottom-bar">
        <!-- upload file preview list  -->
        <div class="upload-list" style="position: absolute; right: 28px; width: 300px; bottom: 80px">
            <a-upload
                :accept="
                    Object.keys(fileSrcMap)
                        .map(key => `.${key}`)
                        .join(',')
                "
                v-model:file-list="fileList"
                :beforeUpload="() => {}"
                list-type="picture"
            >
                <template v-slot:iconRender="props: any">
                    <img :src="fileSrcMap[props.file.name.split('.').pop() as keyof typeof fileSrcMap] || fileError" />
                </template>
            </a-upload>
        </div>

        <div class="tool-box">
            <a-button @click="emitShowHistoryDrawer" class="base-style history-btn">
                <svg
                    t="1709609597661"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4448"
                    width="18"
                    height="18"
                >
                    <path
                        d="M279.04 617.472c0.896-26.496 4.16-52.864 9.728-78.848H39.424a39.424 39.424 0 1 0 0 78.848H279.04zM39.424 774.656a39.424 39.424 0 0 0 0 78.848h304.128c-15.808-24.768-28.8-51.2-38.912-78.848H39.424z m0-629.76H880.64a39.424 39.424 0 1 0 0-78.848H39.424a39.424 39.424 0 0 0 0 78.848z m397.824 157.696H39.424a39.424 39.424 0 0 0 0 78.848H360.96c21.76-29.568 47.488-56.064 76.288-78.848z m258.56-1.024a328.192 328.192 0 1 0 0 656.384 328.192 328.192 0 0 0 0-656.384z m115.712 368.64h-115.712a39.424 39.424 0 0 1-39.424-39.424V486.4a39.424 39.424 0 0 1 78.848 0v104.96h76.288a39.424 39.424 0 1 1 0 78.848z"
                        p-id="4449"
                        fill="#515151"
                        data-spm-anchor-id="a313x.search_index.0.i0.71083a81622esI"
                        class="selected"
                    ></path>
                </svg>

                <div v-if="ifComputer" class="history-text">历史简历</div>
            </a-button>

            <!-- pc  -->
            <div class="choose-mod" v-if="ifComputer">
                <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
                    <a-cascader
                        class="pc-choose-mod"
                        :value="choseModel"
                        :allowClear="false"
                        :options="props.options"
                        @change="modelChange"
                    />
                </a-config-provider>
            </div>

            <!-- mobile -->
            <div v-if="!ifComputer" style="margin-left: 1px" class="base-style mobile">
                <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
                    <a-cascader :value="choseModel" :options="props.options" @change="modelChange">
                        <code-sandbox-outlined :style="{ fontSize: '18px', padding: '6px 0px' }" />
                    </a-cascader>
                </a-config-provider>
            </div>

            <div class="text-box">
                <a-upload
                    :accept="
                        Object.keys(fileSrcMap)
                            .map(key => `.${key}`)
                            .join(',')
                    "
                    ref="step4"
                    v-model:file-list="fileList"
                    name="file"
                    :customRequest="customUpload"
                    :beforeUpload="beforeUpload"
                    :showUploadList="false"
                    style="z-index: 999; margin-right: -25px; display: flex; align-items: center"
                >
                    <link-outlined
                        :style="{
                            fontSize: '18px',
                            color: 'gray',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }"
                    />
                </a-upload>

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
import { LinkOutlined, CodeSandboxOutlined } from '@ant-design/icons-vue'
import { fileSrcMap, fileError } from '@/common/iconSrcUrl'
import type { ModelCascader, Option, UserInfo } from '@/types/interfaces'
import type { MenuProps } from 'ant-design-vue'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

const props = defineProps<{
    ifLogin: boolean
    ifComputer: boolean
    generating: boolean

    options: Option[]

    userInfo: UserInfo
}>()

const emit = defineEmits<{ showHistoryDrawer: []; sendMessage: [] }>()

const text = defineModel<string>('text', { required: true })
const fileList = defineModel<any[]>('fileList', { required: true })
const choseModel = defineModel<ModelCascader>('choseModel', { required: true, default: [null, null] })
const isDragging = defineModel<boolean>('isDragging', { required: true })

// 0 for auto, 1 for text, 3 for image
const outputType = defineModel<string>('outputType', { required: true })

function emitShowHistoryDrawer() {
    emit('showHistoryDrawer')
}

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

function customUpload(options: any) {
    options.onSuccess()
    isDragging.value = false
}

function beforeUpload(file: any) {
    fileList.value.push(file)

    isDragging.value = false

    return false // 返回false以阻止自动上传
}

function modelChange(currentModel: ModelCascader) {
    choseModel.value = currentModel
}
const handleOutputTypeClick: MenuProps['onClick'] = (e: MenuInfo) => {
    outputType.value = e.key.toString()
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
