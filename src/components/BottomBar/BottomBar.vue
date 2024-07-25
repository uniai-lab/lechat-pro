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
                :beforeUpload="false"
                list-type="picture"
            >
                <template v-slot:iconRender="props: any">
                    <img :src="fileSrcMap[props.file.name.split('.').pop() as keyof typeof fileSrcMap] || fileError" />
                </template>
            </a-upload>
        </div>

        <div class="tool-box">
            <a-button ref="step1" @click="emitShowHistoryDrawer" class="base-style history-btn">
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

                <div v-if="ifComputer" class="history-text">历史对话</div>
            </a-button>

            <!-- pc  -->
            <div class="choose-mod" v-if="ifComputer">
                <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
                    <a-cascader
                        class="pc-choose-mod"
                        :value="commonModel"
                        :allowClear="false"
                        :options="props.options"
                        @change="modelChange"
                        ref="step2"
                    />
                </a-config-provider>
            </div>

            <!-- mobile -->
            <div v-if="!ifComputer" style="margin-left: 1px" class="base-style mobile">
                <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
                    <a-cascader :value="commonModel" :options="props.options" @change="modelChange">
                        <CodeSandboxOutlined :style="{ fontSize: '18px', padding: '6px 0px' }" />
                    </a-cascader>
                </a-config-provider>
            </div>

            <a-button ref="step3" @click="emitShowRoleSet" class="base-style role-set-icon" v-if="ifComputer">
                <a-icon
                    :style="{
                        width: '20px',
                        fontSize: '20px',
                        display: 'flex',
                        flexDection: 'row',
                        justifyContent: 'center'
                    }"
                >
                    <svg
                        t="1709611594182"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="19888"
                        width="30"
                        height="30"
                    >
                        <path
                            d="M582.464 228.202667L490.666667 192l91.797333-36.202667L618.666667 64l36.202666 91.797333L746.666667 192l-91.797334 36.202667L618.666667 320l-36.202667-91.797333z m213.333333-64L704 128l91.797333-36.202667L832 0l36.202667 91.797333L960 128l-91.797333 36.202667L832 256l-36.202667-91.797333z m64 213.333333L768 341.333333l91.797333-36.202666L896 213.333333l36.202667 91.797334L1024 341.333333l-91.797333 36.202667L896 469.333333l-36.202667-91.797333zM512 42.666667v85.333333C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384h85.333333c0 259.2-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m-181.013333 670.165333l60.330666-60.330667a170.666667 170.666667 0 0 0 241.365334 0l60.330666 60.330667c-99.968 99.989333-262.058667 99.989333-362.026666 0zM362.666667 533.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m298.666666 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                            fill="#000000"
                            p-id="19889"
                        ></path>
                    </svg>
                </a-icon>
            </a-button>

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
                    <LinkOutlined
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
                    autoSize
                    :type="'text'"
                    @keydown="keydownHandle"
                    :placeholder="!ifLogin ? '请先登录' : '剩余对话次数' + props.userInfo.chance.totalChatChance"
                    v-model:value="text"
                ></a-textarea>
            </div>

            <a-config-provider :theme="{ token: { colorPrimary: ' rgb(17,20,24)' } }">
                <a-dropdown-button
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
                    <template #overlay>
                        <a-menu @click="handleOutputTypeClick">
                            <a-menu-item key="0">
                                <CloudSyncOutlined />
                                智能生成
                            </a-menu-item>
                            <a-menu-item key="1">
                                <FileTextOutlined />
                                生成文本
                            </a-menu-item>
                            <a-menu-item key="3">
                                <FileImageOutlined />
                                生成图片
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <template #icon>
                        <div class="dropdown" v-if="outputType == '0'">
                            <CloudSyncOutlined />
                        </div>

                        <div class="dropdown" v-if="outputType == '1'">
                            <FileTextOutlined />
                        </div>

                        <div class="dropdown" v-if="outputType == '3'">
                            <FileImageOutlined />
                        </div>
                    </template>
                </a-dropdown-button>
            </a-config-provider>
        </div>
    </div>

    <a-config-provider :locale="zhCN">
        <a-tour
            v-if="props.ifComputer"
            v-model:current="curStep"
            :open="leadOpen"
            :steps="steps"
            @close="emitCloseLead"
            :arrow="false"
        />
    </a-config-provider>
</template>
<script setup lang="ts">
import {
    CloudSyncOutlined,
    LinkOutlined,
    FileImageOutlined,
    FileTextOutlined,
    CodeSandboxOutlined
} from '@ant-design/icons-vue'
import { fileSrcMap, fileError } from '@/common/iconSrcUrl'
import type { ModelCascader, Option, UserInfo } from '@/types/interfaces'
import type { MenuProps, TourProps } from 'ant-design-vue'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { ref, type ComponentPublicInstance } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const props = defineProps<{
    ifLogin: boolean
    ifComputer: boolean
    generating: boolean

    options: Option[]

    userInfo: UserInfo

    leadOpen: boolean
}>()

const emit = defineEmits<{ showHistoryDrawer: []; showRoleSet: []; sendMessage: []; closeLead: [] }>()

const text = defineModel<string>('text', { required: true })
const fileList = defineModel<any[]>('fileList', { required: true })
const commonModel = defineModel<ModelCascader>('commonModel', { required: true, default: ['选择模型', '智能选择模型'] })
const isDragging = defineModel<boolean>('isDragging', { required: true })
const outputType = defineModel<string>('outputType', { required: true })

const curStep = ref(0)
const step1 = ref<ComponentPublicInstance | null>(null)
const step2 = ref<ComponentPublicInstance | null>(null)
const step3 = ref<ComponentPublicInstance | null>(null)
const step4 = ref<ComponentPublicInstance | null>(null)
const step5 = ref<ComponentPublicInstance | null>(null)

const steps: TourProps['steps'] = [
    {
        title: '历史对话',
        placement: 'top',
        description: '点击此处查看历史对话',
        target: () => step1.value && step1.value.$el
    },
    {
        title: '模型选择',
        placement: 'top',
        description: '点击此处选择您需要的模型',
        target: () => step2.value && step2.value.$el
    },
    {
        title: '预设开场白',
        placement: 'top',
        description: '点击此处可以预设场景与开场白',
        target: () => step3.value && step3.value.$el
    },
    {
        title: '文件上传',
        placement: 'top',
        description: '点击此处上传您要分析的文件',
        target: () => step4.value && step4.value.$el
    },
    {
        title: '选择对话模式',
        description: '按钮右侧图标可选择对话模式，默认为智能融合',
        placement: 'top',
        target: () => step5.value && step5.value.$el
    },
    {
        title: '文件上传',
        placement: 'right',
        description: '您可以直接将文件拖入到页面中',
        target: () => null
    }
]

function emitShowHistoryDrawer() {
    emit('showHistoryDrawer')
}

function emitShowRoleSet() {
    emit('showRoleSet')
}

function emitSendMessage() {
    emit('sendMessage')
}

function emitCloseLead() {
    emit('closeLead')
}

function keydownHandle(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        if (!event.ctrlKey && !event.metaKey) {
            // 如果只按下了Enter键，则执行事件a的逻辑
            event.stopPropagation()
            event.preventDefault()
            emitSendMessage()
        } else {
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
    console.log(fileList.value)
    fileList.value.push(file)
    isDragging.value = false

    return false // 返回false以阻止自动上传
}

function modelChange(currentModel: ModelCascader) {
    commonModel.value = currentModel
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
