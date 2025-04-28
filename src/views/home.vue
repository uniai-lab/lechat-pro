<!-- @format -->

<template>
    <div @dragenter.prevent="handleOver" @dragleave.prevent="handleLeave" @drop="handleDrop" class="page">
        <!-- 上传遮罩 -->
        <!-- here should be divide into a component -->
        <!-- but there are bugs that can't show thumbnail of pictures -->
        <!-- so finally just make this in home.vue -->

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
                    <div class="upload-title">文件拖动到此处即可上传</div>
                    <div class="upload-msg">
                        支持的文件格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
                    </div>
                </div>
            </a-upload-dragger>
        </div>

        <!-- 顶栏 -->
        <TopBar
            :user-info="user.info"
            :if-login="ifLogin.val"
            :if-computer="isComputer.val"
            :switch-login-visible="switchLoginVisible"
            @show-personal-drawer="showPersonalDrawer"
            @show-charge-modal="showChargeModal"
            @logout="logout"
        ></TopBar>

        <!-- 登录模态框 -->
        <LoginModal
            v-if="loginVisible"
            @custom-event="handleLoginCustomEvent"
            @hideModal="switchLoginVisible"
        ></LoginModal>

        <!-- 密码修改模态框（未使用） -->
        <UnusePassWordEditModal
            :is-password-edit-modal-open="isPasswordEditModalOpen"
            @clear-info="clearInfo"
            @close="closePasswordEditModal"
            @get-user-info="getUserInfo"
        ></UnusePassWordEditModal>

        <!-- 角色扮演 -->
        <RoleSetFloatBtn :is-computer="isComputer.val" @show-role-set="showRoleSet" />

        <RoleSetModal
            :destroyOnClose="false"
            @close-role-set="closeRoleSet"
            @on-submit="onRoleSetSubmit"
            v-model:role-set-form="roleSetForm"
            v-model:open-role-set="isRoleSetOpen"
        ></RoleSetModal>

        <!-- 充值模态框 -->
        <ChargeModal
            :isComputer="isComputer.val"
            v-model="isChargeOpen"
            :shopList="shopList"
            @close-charge="closeChargeModal"
            @get-user-info="getUserInfo"
        ></ChargeModal>

        <!-- 个人信息抽屉 -->
        <PersonalDrawer
            :personalDrawerVisible="personalDrawerVisible"
            :savePersonalInfoClock="savePersonalInfoClock"
            @close-personal-drawer="closePersonalDrawer"
            @save-personal-info="savePersonalInfo"
            v-model:personal-info-form="personalInfoForm"
            v-model:image-url="avatarUrl"
        ></PersonalDrawer>

        <!-- 历史对话抽屉 -->
        <HistoryDialogueDrawer
            :open="isHistoryDrawerOpen"
            :if-login="ifLogin.val"
            :history-chat="historyDialogue"
            @dialog-more="onDialogueLoadMore"
            @new-dialog="newDialogue"
            @on-close="closeHistoryDrawer"
            @to-dialog="toLatestDialogue"
            @del-dialog="delDialogue"
        ></HistoryDialogueDrawer>

        <!-- 中心区域 -->
        <MainArea
            :isLinking="isLinking"
            @time-to-refresh="refreshJudge"
            v-model:up-loading="upLoading"
            v-model:a-chat="aChat"
            v-model:generating="generating"
        ></MainArea>

        <!-- 底栏 -->
        <BottomBar
            :if-login="ifLogin.val"
            :if-computer="isComputer.val"
            :generating="generating"
            :options="options"
            :user-info="user.info"
            :lead-open="leadOpen"
            @show-history-drawer="showHistroyDrawer"
            @show-role-set="showRoleSet"
            @send-message="sendMessage"
            @close-lead="handleLead(false)"
            v-model:text="textInput"
            v-model:file-list="uploadFileList"
            v-model:chose-model="choseModel"
            v-model:is-dragging="isDragging"
            v-model:output-type="outputType"
        ></BottomBar>
    </div>
</template>

<script setup lang="ts">
import '@vue-office/docx/lib/index.css'
import { message } from 'ant-design-vue'
import { EventSourceParserStream } from 'eventsource-parser/stream'
import 'md-editor-v3/lib/preview.css'
import { onMounted, ref } from 'vue'

import BottomBar from '@/components/LeChatComponents/BottomBar/BottomBar.vue'
import ChargeModal from '@/components/LeChatComponents/ChargeModal/ChargeModal.vue'
import HistoryDialogueDrawer from '@/components/LeChatComponents/Drawers/HistoryDialogueDrawer.vue'
import PersonalDrawer from '@/components/LeChatComponents/Drawers/PersonalDrawer.vue'
import LoginModal from '@/components/LeChatComponents/LoginModal/LoginModal.vue'
import MainArea from '@/components/LeChatComponents/MainArea/MainArea.vue'
import RoleSetFloatBtn from '@/components/LeChatComponents/RoleSetFloatBtn.vue'
import RoleSetModal from '@/components/LeChatComponents/RoleSetModal.vue'
import TopBar from '@/components/LeChatComponents/TopBar/TopBar.vue'
import UnusePassWordEditModal from '@/components/LeChatComponents/UnusePassWordEditModal.vue'

import commonContent from '@/common/commoncontent'
import { fileSrcMap } from '@/common/iconSrcUrl'
import { http, sse, type HttpResponse } from '@/common/request.ts'

import type { Chat, ModelCascader, Option, PersonalInfoForm, RoleSetForm, ShopList } from '@/types/interfaces'

import { useComputerStore } from '@/stores/computer'
import { useLoginStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'

//  settings

const ifLogin = useLoginStore()
const ifFirstOpen = ref<boolean>(false)
const ifFirstLoad = ref<boolean>(false)

const isComputer = useComputerStore()

const defaultConfig = ref()

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

// userInfo
const user = useUserStore()

async function clearInfo() {
    localStorage.clear()
    ifLogin.val = false
    aChat.value = [
        {
            avatar: '',
            chatId: 0,
            content: commonContent.content,
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
        const res = await http('web/userinfo', {}, 'GET')
        if (res.status === -1) {
            clearInfo()
            return
        }
        if (res.status == 1) {
            user.info = res.data
            localStorage.setItem('userinfo', JSON.stringify(res.data))
            options.value = res.data.models

            if (res.data.avatar) avatarUrl.value = res.data.avatar

            if (res.data.name) personalInfoForm.value.name = res.data.name

            if (res.data.phone) personalInfoForm.value.phone = res.data.phone
        } else throw new Error(res.msg)
    } catch (e: any) {
        message.error('获取用户信息失败')
        console.log(e.msg)
    }
}

// login
const loginVisible = ref<boolean>(false)

function switchLoginVisible() {
    loginVisible.value = !loginVisible.value
}
async function handleLoginCustomEvent() {
    await getUserInfo()
    await initChat()

    ifLogin.val = true

    chatListDom.value?.scrollTo({
        top: chatListDom.value.scrollHeight,
        behavior: 'smooth' // 可选，使滚动平滑进行
    })
}
async function logout() {
    await clearInfo()
    location.reload()
    message.success('已退出登录')
}

// role set
const isRoleSetOpen = ref<boolean>(false)
const roleSetForm = ref<RoleSetForm>({ name: '', delivery: false, type: [], resource: '', desc: '', startmsg: '' })

function showRoleSet() {
    isRoleSetOpen.value = true
}
function closeRoleSet() {
    isRoleSetOpen.value = false
}
function onRoleSetSubmit() {
    localStorage.setItem('role', roleSetForm.value.name)
    localStorage.setItem('startmsg', roleSetForm.value.startmsg)
    localStorage.setItem('prompt', roleSetForm.value.desc)

    isRoleSetOpen.value = false
    message.success('已保存')
}

// charge and pay
const isChargeOpen = ref<boolean>(false)
const shopList = ref<ShopList[]>([])

function closeChargeModal() {
    isChargeOpen.value = false
}
async function showChargeModal() {
    try {
        const res = await http('pay/list', {}, 'get')

        if (res.status === 1) {
            shopList.value = res.data
        } else {
            message.error('获取商品列表失败')
            console.log(res.msg)
        }
    } catch (e: any) {
        message.error('获取商品列表失败')
        console.log(e.msg)
    } finally {
        upLoading.value = false
    }
    isChargeOpen.value = true
}

// personal info
const personalDrawerVisible = ref<boolean>(false)
const savePersonalInfoClock = ref<boolean>(false)
const avatarUrl = ref<string>('')
const personalInfoForm = ref<PersonalInfoForm>({ name: '', phone: '' })

function showPersonalDrawer() {
    personalDrawerVisible.value = true
}

function closePersonalDrawer() {
    personalDrawerVisible.value = false
}
async function savePersonalInfo() {
    let changeImageUrl: null | string = null

    if (!savePersonalInfoClock.value) {
        if (avatarUrl.value.slice(0, 4) == 'http') {
            changeImageUrl = null
        } else {
            changeImageUrl = avatarUrl.value
        }

        try {
            savePersonalInfoClock.value = true
            const res = await http('web/update-user', { avatar: changeImageUrl, name: personalInfoForm.value.name })

            if (res.status == -1) {
                message.error('保存失败')
                console.log(res.msg)
                clearInfo()
                return
            } else {
                message.success('保存成功')
                closePersonalDrawer()
                getUserInfo()
            }
        } finally {
            savePersonalInfoClock.value = false
        }
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
        if (upLoading.value) return []
        upLoading.value = true

        const res = await http<any[]>('web/list-dialog', { lastId, pageSize, id })

        if (res.status == -1) {
            message.error('登录已实效，请重新登录')
            clearInfo()
            return []
        }
        if (res.status == 0 || !res.data) throw new Error(res.msg)

        if (res.status === 1) data = res.data
    } catch (e: any) {
        message.error(e.message)
    } finally {
        upLoading.value = false
    }
    return data
}
async function onDialogueLoadMore() {
    const lastdialgid = historyDialogue.value[historyDialogue.value.length - 1].id
    const data = await getHistoryDialogueList(lastdialgid, 10)
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
            const res = await http('web/add-dialog', {}, 'GET')

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

        const data = await getChatList(0, 10, id)

        if (data.length === 0) {
            aChat.value = [
                {
                    chatId: 0,
                    avatar: '',
                    content: commonContent.content,
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
        window.scrollTo(0, document.body.scrollHeight)
    } catch (e: any) {
        message.error('切换对话失败')
        console.log(e.msg)
    } finally {
        ifFirstLoad.value = false
        allFinished.value = false
    }
}
async function delDialogue(id: number) {
    try {
        const res = await http(`web/del-dialog`, { id }, 'GET')

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
const textInput = ref<string>('')
const uploadFileList = ref<any[]>([])
const choseModel = ref<ModelCascader>([null, null])
const outputType = ref<string>('1')
// this is the default options, and will later be filled by the backend
const options = ref<Option[]>([
    {
        value: null,
        label: '选择模型',
        disabled: false,
        children: [{ value: null, label: '智能选择模型', disabled: false }]
    }
])
async function sendMessage() {
    try {
        // check login
        if (!ifLogin.val) return switchLoginVisible()
        // is generating
        if (generating.value) return

        // check input (text or file should have one)
        if (!textInput.value.trim() && uploadFileList.value.length == 0) return

        if (!user.info.chance.totalChatChance) {
            message.error('您的次数已用尽')
            message.info('点击右上角充值按钮')
            return
        }

        const input = textInput.value
        textInput.value = ''

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
                    avatar: user.info.avatar || defaultConfig.value.DEFAULT_AVATAR_USER,
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
                    http('web/upload', formData)
                        .then((res: any) => {
                            res.data.file.type = 'done'
                            aChat.value[aindex - 1]!.file = res.data.file
                        })
                        .catch((e: any) => {
                            aChat.value[aindex - 1]!.file!.type = 'error'
                            console.error(e)
                        })
                )
            }
            uploadFileList.value = []

            // send user message
            if (input) {
                // user
                aChat.value.push({
                    avatar: user.info.avatar || defaultConfig.value.DEFAULT_AVATAR_USER,
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
                    avatar: user.info.avatar || defaultConfig.value.DEFAULT_AVATAR_USER,
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
            const qes = await getHistoryDialogueList(0, 10, dialogueId.value)

            // cover chat
            if (qes.length > 0) historyDialogue.value[dialogueIndex.value] = qes[0]
        } else {
            // user
            aChat.value.push({
                chatId: 0,
                avatar: user.info.avatar || defaultConfig.value.DEFAULT_AVATAR_USER,
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
                avatar: user.info.avatar || defaultConfig.value.DEFAULT_AVATAR_USER,
                content: '',
                role: 'assistant',
                dialogId: dialogueId.value,
                model: choseModel.value[0],
                resourceId: null,
                subModel: choseModel.value[1],
                isEffect: false
            })

            await getChatStream(input)
            await getUserInfo()

            const qes = await getHistoryDialogueList(0, 10, dialogueId.value)

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
const aChat = ref<Array<Chat>>([])
const allFinished = ref<boolean>(false)
const generating = ref<boolean>(false)
const upLoading = ref<boolean>(false)
const refreshClock = ref<boolean>(false)

async function refreshData() {
    if (!aChat.value.length) {
        upLoading.value = false
        return
    }

    const nowList = aChat.value[0]

    if (refreshClock.value == false) {
        refreshClock.value = true
        const data = await getChatList(nowList.chatId as number, 10, dialogueId.value)
        if (data.length == 0) allFinished.value = true

        for (const i in data) dialogueId.value = data[i].dialogId

        for (const item of data.reverse()) aChat.value.unshift(item)

        setTimeout(() => (upLoading.value = false), 1000)

        refreshClock.value = false
    }
}
async function getChatStream(input: string = '') {
    //创建sse流式传输
    try {
        generating.value = true
        const response = await sse('web/chat-stream', {
            input,
            sse: true,
            dialogId: dialogueId.value,
            provider: choseModel.value[0],
            model: choseModel.value[1],
            assistant: roleSetForm.value.startmsg,
            system: roleSetForm.value.desc,
            mode: Number(outputType.value) * 1
        })
        if (!response.body) throw new Error('流式传输失败')

        const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(new EventSourceParserStream())
            .getReader()

        while (generating.value) {
            const chunk = await reader.read()

            if (chunk.done || !chunk.value) break

            const res = JSON.parse(chunk.value.data) as HttpResponse<any>
            const data = res.data
            if (!res.status) throw new Error(res.msg)

            if (!data || data.dialogId !== dialogueId.value) break

            const end = aChat.value.length - 1
            // first chunk
            if (!aChat.value[end].isEffect) aChat.value[end] = data
            // middle chunk
            else aChat.value[end].content += data.content
            // use chatId to judge if it is the last chunk
            if (data.chatId) aChat.value[end].chatId = data.chatId
        }
    } catch (e: any) {
        console.error(e)
        message.error(e.message)
    } finally {
        generating.value = false
    }
}

async function getChatList(lastId: number = 0, pageSize: number = 10, dialogId: number | null = null) {
    let data = []
    try {
        if (upLoading.value) return []
        upLoading.value = true

        const res = await http('web/list-chat', { lastId, pageSize, dialogId })

        if (res.status == -1) {
            message.error('获取聊天失败')
            historyDialogue.value = []
            clearInfo()
            return []
        }
        if (res.status === 1) data = res.data
        else throw new Error(res.msg)
    } catch (e: any) {
        message.error(e.message)
    } finally {
        upLoading.value = false
    }
    return data
}

async function initChat() {
    ifFirstLoad.value = true
    try {
        aChat.value = []

        const dialogList = await getHistoryDialogueList()
        historyDialogue.value = dialogList

        dialogueId.value = dialogList[0].id
        dialogueIndex.value = 0

        const data = await getChatList(0, 10, dialogueId.value)

        if (data.length === 0) {
            aChat.value = [
                {
                    avatar: '',
                    chatId: 0,
                    content: commonContent.content,
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

        window.scrollTo(0, document.body.scrollHeight)
    } finally {
        ifFirstLoad.value = false
    }
}

// Tour
const leadOpen = ref<boolean>(false)
function handleLead(val: boolean) {
    leadOpen.value = val
}

// Password Edit Modal(Unuse)
const isPasswordEditModalOpen = ref<boolean>(false)
function closePasswordEditModal() {
    isPasswordEditModalOpen.value = false
}

onMounted(async () => {
    //获取屏幕宽高
    const screenWidth = document.body.clientWidth
    const screenHeight = document.body.clientHeight

    if (screenHeight <= screenWidth) {
        isComputer.val = true
    }

    if (localStorage.getItem('prompt')) {
        roleSetForm.value.desc = localStorage.getItem('prompt') as string
    }

    //第一次打开，需要加载引导框
    if (!localStorage.getItem('ifFirstopen')) {
        ifFirstOpen.value = true
        handleLead(true)
    }

    localStorage.setItem('ifFirstopen', 'false')

    try {
        isLinking.value = true
        const res = await http('web/config', {}, 'GET')

        if (res.status === 1) localStorage.setItem('config', JSON.stringify(res.data))
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
                content: commonContent.content,
                dialogId: 0,
                isEffect: true,
                model: choseModel.value[0],
                resourceId: null,
                role: 'assistant',
                subModel: choseModel.value[1]
            }
        ]
    }

    ifFirstLoad.value = false
})
</script>

<style>
.upload-list .ant-upload-list-item-container .ant-upload-list-item {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
    border: none !important;
}

/* 针对所有元素 */
*::-webkit-scrollbar {
    width: 0;
    height: 0;
}

/* 针对Firefox浏览器 */
* {
    scrollbar-width: none;
}

/* 针对Chrome、Safari和Edge浏览器 */
body::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
<style scoped lang="scss">
pre {
    font-family:
        -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans',
        'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN',
        'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp',
        sans-serif;
}

.page {
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

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
