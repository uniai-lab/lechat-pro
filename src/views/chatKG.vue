<!-- @format -->

<template>
    <div @dragenter.prevent="handleOver" @dragleave.prevent="handleLeave" @drop="handleDrop" class="page">
        <div v-if="isDragging" class="upload-mask">
            <a-upload-dragger
                :accept="
                    Object.keys(fileSrcMap)
                        .map(key => `.${key}`)
                        .join(',')
                "
                v-model:file-list="uploadFileList"
                name="file"
                :customRequest="customUpload"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
            >
                <div class="upload-container">
                    <div class="img-container">
                        <img class="file-logo" src="../assets/filebg.webp" />
                    </div>
                    <div class="upload-title">简历拖动到此处即可上传</div>
                    <div class="upload-msg">
                        支持的简历格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
                    </div>
                </div>
            </a-upload-dragger>
        </div>

        <KGTopBar
            :user-info="user.info"
            :if-computer="isComputer.val"
            v-model:file-list="uploadFileList"
            v-model:is-dragging="isDragging"
        ></KGTopBar>

        <HistoryResume
            :open="isHistoryDrawerOpen"
            :history-resume="historyDialogue"
            @dialog-more="onDialogueLoadMore"
            @new-dialog="newDialogue"
            @on-close="closeHistoryDrawer"
            @to-dialog="toLatestDialogue"
            @del-dialog="delDialogue"
        ></HistoryResume>

        <Resume
            :generating="generating"
            v-model:resume-info="resumeInfo"
            v-model:upload-file-list="uploadFileList"
            @analyse="sendMessage"
        ></Resume>

        <!--          <KGMain
            :is-linking="isLinking"
            @time-to-refresh="refreshJudge"
            v-model:up-loading="upLoading"
            v-model:a-chat="aChat"
            v-model:generating="generating"
            v-model:could-continue="couldContinue"
        ></KGMain>

        <KGBottomBar
            :if-login="ifLogin.val"
            :if-computer="isComputer.val"
            :generating="generating"
            :options="options"
            :user-info="user.info"
            @show-history-drawer="showHistroyDrawer"
            @send-message="sendMessage"
            v-model:text="textInput"
            v-model:file-list="uploadFileList"
            v-model:chose-model="choseModel"
            v-model:is-dragging="isDragging"
            v-model:output-type="outputType"
        ></KGBottomBar>-->

        <a-button @click="aChat2JSON(aChat.slice().reverse()[0].content)">clickme</a-button>
    </div>
</template>

<script setup lang="ts">
import { http, sse } from '@/common/request'
import KGTopBar from '@/KGcomponents/TopBar/KGTopBar.vue'
import { useComputerStore } from '@/stores/computer'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import { onMounted, provide, ref, watch, type InjectionKey } from 'vue'
import { fileSrcMap } from '@/common/iconSrcUrl'
import KGBottomBar from '@/KGcomponents/BottomBar/KGBottomBar.vue'
import { useLoginStore } from '@/stores/login'
import type {
    AdditionalInfo,
    BasicInfo,
    Chat,
    EducationExperience,
    ModelCascader,
    Option,
    ProjectExperience,
    ResumeInfo,
    WorkExperience
} from '@/types/interfaces'
import kgContent from '@/common/kgContent'
import Resume from '@/KGcomponents/MainArea/Resume.vue'
import { EventSourceParserStream } from 'eventsource-parser/stream'
import KGMain from '@/KGcomponents/MainArea/KGMain.vue'
import HistoryResume from '@/KGcomponents/HistoryResume.vue'
import dayjs from 'dayjs'
import { resumePrompt } from '@/common/prompt'

provide('beforeUpload', beforeUpload)
provide('customUpload', customUpload)

const isComputer = useComputerStore()
const ifLogin = useLoginStore()
const resumeInfo = ref<ResumeInfo>({
    basic: {
        name: '',
        gender: null,
        age: 0,
        phone: '',
        email: '',
        address: '',
        wechat: '',
        site: '',
        github: ''
    },
    education: [
        {
            major: '',
            degree: '',
            school: '',
            range: [dayjs(), dayjs()],
            gpa: '',
            full: '4.0',
            honor: ''
        }
    ],
    work: [
        {
            company: '',
            position: '',
            range: [dayjs(), dayjs()],
            mission: '',
            output: ''
        }
    ],
    project: [
        {
            name: '',
            description: '',
            tech: '',
            work: '',
            range: [dayjs(), dayjs()],
            url: ''
        }
    ],
    addition: {
        skill: '',
        other: ''
    }
})

function printLogo() {
    console.log(`
 ██████╗██╗  ██╗ █████╗ ████████╗    ██╗  ██╗ ██████╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝    ██║ ██╔╝██╔════╝
██║     ███████║███████║   ██║       █████╔╝ ██║  ███╗
██║     ██╔══██║██╔══██║   ██║       ██╔═██╗ ██║   ██║
╚██████╗██║  ██║██║  ██║   ██║       ██║  ██╗╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝
`)
    console.log(
        '%cUni-AI  \n%cWelcome to join us\nwww.uniai.us\n%c© 2024 中科苏州智能计算技术研究院. All Rights Reserved.  \n\n%c ',
        'font-family: "微软雅黑", sans-serif;font-size:50px;color: #2f3542;-webkit-text-fill-color: #2f3542;-webkit-text-stroke: #2f3542;text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3)',
        "font-family: '微软雅黑';color: #9C27B0;font-size:  20px;",
        "font-family: '微软雅黑';color: #9C27B0;font-size: 12px;",
        'color: red;font-size: 14px;'
    )
}
function refreshJudge(isTop: boolean) {
    if (isTop && ifLogin.val && !refreshClock.value && !allFinished.value) {
        refreshData()
    }
}

// drag and drop
const isDragging = ref<boolean>(false)

function handleOver() {
    isDragging.value = true
}
function handleLeave(event: DragEvent) {
    // 检查 event.relatedTarget 是否为 null 或者不是当前元素的子元素
    // 如果是，说明文件被拖出了当前元素，可能是浏览器窗口

    if (event.relatedTarget === null) {
        isDragging.value = false
    }
}
function handleDrop(event: DragEvent) {
    // 重置拖拽状态
    // 获取文件
    event.preventDefault()
    isDragging.value = false
}
function customUpload(options: any) {
    // 阻止默认的上传行为
    options.onSuccess()
    isDragging.value = false
}
function beforeUpload(file: any) {
    // 将文件添加到fileListBT数组
    uploadFileList.value.push(file)
    isDragging.value = false

    return false // 返回false以阻止自动上传
}

// user info
const user = useUserStore()

async function clearInfo() {
    localStorage.clear()
    ifLogin.val = false
    aChat.value = [
        {
            avatar: '',
            chatId: 0,
            content: kgContent.content,
            dialogId: 0,
            isEffect: true,
            model: choseModel.value[0],
            resourceId: null,
            role: 'assistant',
            subModel: choseModel.value[1]
        }
    ]
    dialogueId.value = 0
}
async function getUserInfo() {
    try {
        const data: any = await http('userinfo', {}, 'GET')
        const res = await data.json()
        if (res.status === -1) {
            clearInfo()
            return
        }
        if (res.status == 1) {
            user.info = res.data
            localStorage.setItem('userinfo', JSON.stringify(res.data))
            options.value = res.data.models
        } else throw new Error(res.msg)
    } catch (e: any) {
        message.error('获取用户信息失败')
        console.log(e.msg)
    }
}

// history dialogue
const isHistoryDrawerOpen = ref<boolean>(false)
const historyDialogue = ref<any[]>([])
const dialogueId = ref<number>(0)
const dialogueIndex = ref<number>(0)
const newDialogueClock = ref<boolean>(false)

function showHistroyDrawer() {
    isHistoryDrawerOpen.value = true
}
function closeHistoryDrawer() {
    isHistoryDrawerOpen.value = false
}
async function getHistoryDialogueList(lastId: number = 0, pageSize: number = 10, id: number | null = null) {
    let data = []
    try {
        if (upLoading.value) return
        upLoading.value = true

        const adata: any = await http('list-dialog', { lastId, pageSize, id }, 'POST')
        const res = await adata.json()

        if (res.status == -1) {
            message.error('获取对话失败')
            console.log(res.msg)

            return clearInfo()
        }

        if (res.status === 1) {
            data = res.data
        } else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('获取对话失败')
        console.log(e.msg)
    } finally {
        upLoading.value = false
    }
    return data
}
async function onDialogueLoadMore() {
    let lastdialgid = historyDialogue.value[historyDialogue.value.length - 1].id
    let data: any = await getHistoryDialogueList(lastdialgid, 10)
    if (data.length != 0) {
        historyDialogue.value = [...historyDialogue.value, ...data]
    } else {
        message.info('没有更多了')
    }
}
async function newDialogue() {
    if (newDialogueClock.value == false) {
        newDialogueClock.value = true
        try {
            const adata: any = await http('add-dialog', {}, 'GET')
            const res = await adata.json()

            if (res.status == -1) {
                message.error('新建对话失败')
                console.log(res.msg)
                clearInfo()
            } else if (res.status == 1) {
                message.success('新建对话成功')
                const dialogList = await getHistoryDialogueList()
                historyDialogue.value = dialogList
            }
            await toLatestDialogue(res.data.id, 0)
        } finally {
            newDialogueClock.value = false
        }
    }
}
async function toLatestDialogue(id: number, index: number) {
    dialogueId.value = id
    dialogueIndex.value = index

    try {
        aChat.value = []

        const data: any = await getChatList(0, 10, id)

        if (data.length === 0) {
            aChat.value = [
                {
                    chatId: 0,
                    avatar: '',
                    content: kgContent.content,
                    dialogId: 0,
                    isEffect: true,
                    model: choseModel.value[0],
                    resourceId: null,
                    role: 'assistant',
                    subModel: choseModel.value[1]
                }
            ]
        }
        for (const item of data) {
            dialogueId.value = item.dialogId
            aChat.value.push(item)
        }
        isHistoryDrawerOpen.value = false
    } catch (e: any) {
        message.error('切换对话失败')
        console.log(e.msg)
    } finally {
        allFinished.value = false
    }
}
async function delDialogue(id: number) {
    try {
        const adata: any = await http(`del-dialog?id=${id}`, {}, 'GET')
        const res = await adata.json()

        if (res.status == -1) {
            message.error('删除对话失败')
            console.log(res.msg)

            clearInfo()
            refreshData()
        } else if (res.status == 1) {
            message.success('删除对话成功')

            historyDialogue.value = await getHistoryDialogueList()

            if (id == dialogueId.value) {
                dialogueId.value = historyDialogue.value[0].id

                toLatestDialogue(dialogueId.value, 0)
            }

            refreshData()
        } else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('删除对话失败')
        console.log(e.msg)
    }
}

// bottom
const textInput = ref<string>(resumePrompt)
const uploadFileList = ref<any[]>([])
const choseModel = ref<ModelCascader>(['iflytek', 'ultra'])
const outputType = ref<string>('1')
const options = ref<Option[]>([
    {
        value: null,
        label: '选择模型',
        disabled: false,
        children: [
            {
                value: null,
                label: '智能选择模型',
                disabled: false
            }
        ]
    },
    {
        value: 'openai',
        label: 'OpenAI',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'gpt-3.5-turbo-1106',
                label: 'gpt-3.5-turbo-1106'
            },
            {
                disabled: false,
                value: 'gpt-3.5-turbo',
                label: 'gpt-3.5-turbo'
            },
            {
                disabled: false,
                value: 'gpt-3.5-turbo-16k',
                label: 'gpt-3.5-turbo-16k'
            },
            {
                disabled: false,
                value: 'gpt-4',
                label: 'gpt-4'
            },
            {
                disabled: false,
                value: 'gpt-4-32k',
                label: 'gpt-4-32k'
            },
            {
                disabled: false,
                value: 'gpt-4-1106-preview',
                label: 'gpt-4-1106-preview'
            },
            {
                disabled: false,
                value: 'gpt-4-vision-preview',
                label: 'gpt-4-vision-preview'
            }
        ]
    },
    {
        value: 'iflytek',
        label: 'IFlyTek',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'v1.1',
                label: 'v1.1'
            },
            {
                disabled: false,
                value: 'v2.1',
                label: 'v2.1'
            },
            {
                disabled: false,
                value: 'v3.1',
                label: 'v3.1'
            }
        ]
    },
    {
        value: 'baidu',
        label: 'Baidu',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'completions',
                label: 'completions'
            },
            {
                disabled: false,
                value: 'completions_pro',
                label: 'completions_pro'
            },
            {
                disabled: false,
                value: 'ernie_bot_8k',
                label: 'ernie_bot_8k'
            },
            {
                disabled: false,
                value: 'eb-instant',
                label: 'eb-instant'
            }
        ]
    },
    {
        value: 'google',
        label: 'Google',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'gemini-pro',
                label: 'gemini-pro'
            },
            {
                disabled: false,
                value: 'gemini-pro-vision',
                label: 'gemini-pro-vision'
            },
            {
                disabled: false,
                value: 'gemini-ultra',
                label: 'gemini-ultra'
            }
        ]
    },
    {
        value: 'glm',
        label: 'GLM',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'chatglm3-6b-32k',
                label: 'chatglm3-6b-32k'
            },
            {
                disabled: false,
                value: 'glm-3-turbo',
                label: 'glm-3-turbo'
            },
            {
                disabled: false,
                value: 'glm-4',
                label: 'glm-4'
            },
            {
                disabled: false,
                value: 'glm-4v',
                label: 'glm-4v'
            }
        ]
    },
    {
        value: 'moonshot',
        label: 'MoonShot',
        disabled: false,
        children: [
            {
                disabled: false,
                value: 'moonshot-v1-8k',
                label: 'moonshot-v1-8k'
            },
            {
                disabled: false,
                value: 'moonshot-v1-32k',
                label: 'moonshot-v1-32k'
            },
            {
                disabled: false,
                value: 'moonshot-v1-128k',
                label: 'moonshot-v1-128k'
            }
        ]
    }
])

async function sendMessage() {
    try {
        // is sending?
        if (generating.value) {
            return
        }

        couldContinue.value = true

        if (!textInput.value.trim() && uploadFileList.value.length == 0) {
            return
        }
        if (!user.info.chance.totalChatChance) {
            return () => {
                message.error('您的次数已用尽')
                message.info('请点击右上角充值按钮进行充值')
            }
        }

        const input = resumePrompt
        // const input = textInput.value
        // textInput.value = ''
        generating.value = true

        if (uploadFileList.value.length) {
            // send files
            const promiseList = []

            for (let index = 0; index < uploadFileList.value.length; index++) {
                const formData = new FormData()
                const fileitem = uploadFileList.value[index] as any

                formData.append('dialogId', dialogueId.value.toString())
                formData.append('file', fileitem.originFileObj)

                fileitem.type = 'sending'
                fileitem.ext = ' '

                const reader = new FileReader()

                // 确保文件是图片类型
                if (fileitem.originFileObj.type.match('image.*')) {
                    fileitem.ext = fileitem.originFileObj.type
                    reader.onload = e => {
                        fileitem.url = e.target?.result
                    }
                    reader.readAsDataURL(fileitem.originFileObj) // 读取文件内容，并转换为Base64编码
                }

                const aindex = aChat.value.push({
                    chatId: 0,
                    avatar: user.info.avatar || '',
                    content: '',
                    role: 'user',
                    dialogId: dialogueId.value,
                    resourceId: null,
                    model: null,
                    subModel: null,
                    isEffect: true,
                    file: fileitem as any
                })

                promiseList.push(
                    http('upload', formData, 'POST')
                        .then((res: any) => {
                            return res.json()
                        })
                        .then((res: any) => {
                            res.data.file.type = 'done'
                            aChat.value[aindex - 1].file = res.data.file
                        })
                        .catch((e: any) => {
                            aChat.value[aindex - 1].file!.type = 'error'
                            console.error(e)
                        })
                )
            }
            uploadFileList.value = []

            // send user message
            if (input) {
                // user
                aChat.value.push({
                    avatar: user.info.avatar || '',
                    content: input,
                    role: 'user',
                    dialogId: dialogueId.value,
                    chatId: 0,
                    model: choseModel.value[0],
                    resourceId: null,
                    subModel: choseModel.value[1],
                    isEffect: true
                })
                // model
                aChat.value.push({
                    avatar: user.info.avatar || '',
                    content: '',
                    role: 'assistant',
                    dialogId: dialogueId.value,
                    chatId: 0,
                    model: choseModel.value[0],
                    resourceId: null,
                    subModel: choseModel.value[1],
                    isEffect: true
                })
            }
            await Promise.all(promiseList)
            if (input) {
                await getChatStream(input)
                await getUserInfo()
            }
            const qes: any = await getHistoryDialogueList(0, 10, dialogueId.value)

            // cover chat
            if (qes.length > 0) historyDialogue.value[dialogueIndex.value] = qes[0]
        } else {
            // user
            aChat.value.push({
                chatId: 0,
                avatar: user.info.avatar || '',
                content: input,
                role: 'user',
                dialogId: dialogueId.value,
                resourceId: null,
                isEffect: true,
                model: null,
                subModel: null
            })
            // model
            aChat.value.push({
                chatId: 0,
                avatar: user.info.avatar || '',
                content: '',
                role: 'assistant',
                dialogId: dialogueId.value,
                model: choseModel.value[0],
                resourceId: null,
                subModel: choseModel.value[1],
                isEffect: true
            })

            await getChatStream(input)
            await getUserInfo()

            const qes: any = await getHistoryDialogueList(0, 10, dialogueId.value)

            if (qes.length > 0) historyDialogue.value[dialogueIndex.value] = qes[0]
        }
    } catch (e: any) {
        message.error('发送消息失败')
        console.log(e.message)
    } finally {
        generating.value = false
    }
}

// chat and main area
const isLinking = ref<boolean>(true)
const chatListDom = ref<HTMLElement | null>(null)
const aChat = ref<Chat[]>([])
const allFinished = ref<boolean>(false)
const couldContinue = ref<boolean>(true)
const generating = ref<boolean>(false)
const upLoading = ref<boolean>(false)
const refreshClock = ref<boolean>(false)

async function refreshData() {
    if (aChat.value.length == 0) return (upLoading.value = false)

    const nowList = aChat.value[0]

    if (refreshClock.value == false) {
        refreshClock.value = true
        let data: any = await getChatList(nowList.chatId as number, 10, dialogueId.value)
        if (data.length == 0) {
            allFinished.value = true
        }

        for (const i in data) {
            dialogueId.value = data[i].dialogId
        }
        for (const item of data.reverse()) {
            aChat.value.unshift(item)
        }

        setTimeout(() => {
            upLoading.value = false
        }, 1000)

        refreshClock.value = false
    }
}

async function getChatStream(input: string = '') {
    //创建sse流式传输

    const response: any = await sse('chat-stream', {
        input: resumePrompt,
        sse: true,
        dialogId: dialogueId.value,
        provider: choseModel.value[0],
        model: choseModel.value[1],
        // 这里不清楚是前端设定好返回后端还是后端调好参数之后返回前端
        assistant: '',
        system: '',
        mode: Number(outputType.value) * 1
    })

    const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new EventSourceParserStream())
        .getReader()

    while (true && couldContinue.value) {
        generating.value = true
        const onceData = await reader.read()

        if (onceData.done && !onceData.value) {
            break
        }

        const res = JSON.parse(onceData.value.data)
        const data = res.data

        let end
        if (!couldContinue.value) {
            message.info('回答终止')

            break
        }
        if (res.status === 1) {
            if (aChat.value.length == 0) {
                end = aChat.value.length
            } else {
                end = aChat.value.length - 1
            }

            if (!data || data.dialogId !== dialogueId.value) {
                break
            }

            if (aChat.value[end].chatId === 0) {
                aChat.value[end] = data
            }
            if (aChat.value[end].chatId !== data.chatId) {
                aChat.value.push(data)
            }

            if (onceData.done || data.chatId) {
                break
            }
        } else {
            aChat.value.pop()
            throw new Error(res.msg)
        }
    }
    generating.value = false
}
async function getChatList(lastId: number = 0, pageSize: number = 10, dialogId: number | null = null) {
    let data = []
    try {
        if (upLoading.value) return
        upLoading.value = true

        const adata = await http('list-chat', { lastId, pageSize, dialogId }, 'POST')
        const res = await adata.json()

        if (res.status == -1) {
            message.error('获取聊天失败')
            console.log(res.msg)

            historyDialogue.value = []
            return clearInfo()
        }
        if (res.status === 1) data = res.data
        else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('获取聊天失败')
        console.log(e.msg)
    } finally {
        upLoading.value = false
    }
    return data
}
async function initChat() {
    try {
        aChat.value = []

        const dialogList = await getHistoryDialogueList()
        historyDialogue.value = dialogList

        dialogueId.value = dialogList[0].id
        dialogueIndex.value = 0

        const data: any = await getChatList(0, 10, dialogueId.value)

        if (data.length === 0) {
            aChat.value = [
                {
                    avatar: '',
                    chatId: 0,
                    content: kgContent.content,
                    dialogId: 0,
                    isEffect: true,
                    model: choseModel.value[0],
                    resourceId: null,
                    role: 'assistant',
                    subModel: choseModel.value[1]
                }
            ]
        }

        for (const item of data) {
            dialogueId.value = item.dialogId
            aChat.value.push(item)
        }
    } catch (e: any) {
        message.error('获取失败')
        console.log(e.msg)
    }
}
function aChat2JSON(content: string) {
    let regex = /```json([\s\S]*?)```/
    let match = content.match(regex)

    if (match) {
        let json = match[1]
        let resume = JSON.parse(json)
        resume.education.forEach((element: EducationExperience) => {
            element.range = [dayjs(element.range[0] || dayjs()), dayjs(element.range[1] || dayjs())]
        })
        resume.work.forEach((element: WorkExperience) => {
            element.range = [dayjs(element.range[0] || dayjs()), dayjs(element.range[1] || dayjs())]
        })
        resume.project.forEach((element: ProjectExperience) => {
            element.range = [dayjs(element.range[0] || dayjs()), dayjs(element.range[1] || dayjs())]
        })
        message.info('简历解析完成')
        resumeInfo.value = resume
    }
}

onMounted(async () => {
    printLogo()
    //获取屏幕宽高
    const screenWidth = document.body.clientWidth
    const screenHeight = document.body.clientHeight

    if (screenHeight <= screenWidth) {
        isComputer.val = true
    }

    try {
        isLinking.value = true
        const data: any = await http('config', {}, 'GET')
        const res = await data.json()

        if (res.status === 1) {
            localStorage.setItem('config', JSON.stringify(res.data))
        }
    } catch (e: any) {
        message.error('获取配置失败')
        console.log(e.message)

        historyDialogue.value = []
    } finally {
        isLinking.value = false
    }

    if (localStorage.getItem('token')) {
        ifLogin.val = true

        await getUserInfo()
        await initChat()
    } else {
        ifLogin.val = false

        aChat.value = [
            {
                chatId: 0,
                avatar: '',
                content: kgContent.content,
                dialogId: 0,
                isEffect: true,
                model: choseModel.value[0],
                resourceId: null,
                role: 'assistant',
                subModel: choseModel.value[1]
            }
        ]
    }
})

watch(generating, (newValue, oldValue) => {
    if (newValue === false && oldValue === true) {
        aChat2JSON(aChat.value.slice().reverse()[0].content)
    }
})
</script>

<style lang="scss" scoped>
.upload-mask {
    position: fixed;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    backdrop-filter: blur(10px);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px;

    .upload-container {
        width: 90vw;
        margin-left: 5vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .img-container {
            font-size: '160px';
            color: '#080603';
            display: 'flex';
            flex-direction: 'column';
            justify-content: 'center';
            align-items: 'center';

            .file-logo {
                height: 200px;
                border-radius: 30px;
                margin-bottom: 30px;
            }
        }

        .upload-title {
            margin-top: 20px;
            font-size: 30px;
            font-weight: 600;
        }

        .upload-msg {
            color: #505050;
            font-size: 20px;
            margin-top: 17px;
        }
    }
}
</style>
