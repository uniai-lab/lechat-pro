<!-- @format -->

<template>
    <div class="page">
        <KGTopBar
            :user-info="user.info"
            :if-computer="isComputer.val"
            v-model:now-module="nowModule"
            v-model:file-list="uploadFileList"
        ></KGTopBar>

        <Upload
            v-if="nowModule !== 'CT'"
            @clear-resume="clearResume"
            @send-multiple="sendMultiple"
            v-model:upload-file-list="uploadFileList"
        ></Upload>

        <KnowledgeGraph
            v-if="nowModule === 'KG'"
            @clear-resume="clearResume"
            @send-multiple="sendMultiple"
            v-model:data="kgData"
            v-model:resume-info="resumeInfo"
            v-model:refresh-clock="kgRefreshClock"
            v-model:graph-data="kgGraphData"
            v-model:graph-link="kgGraphLink"
            v-model:upload-file-list="uploadFileList"
        ></KnowledgeGraph>

        <Resume
            v-if="nowModule === 'RS'"
            :generating="generating"
            @analyse="sendMultiple"
            @refresh-kg="refreshKG"
            @RSToKG="switchModule('KG')"
            v-model:resume-info="resumeInfo"
            v-model:upload-file-list="uploadFileList"
        ></Resume>

        <!-- chatKG的数字人聊天界面导入的是老的主界面，实质上需要更改的aChat里面的一些类型定义以匹配新的接口所需要的类型 -->
        <MainArea
            v-if="nowModule === 'CT'"
            :isLinking="isLinking"
            @time-to-refresh="refreshJudge"
            v-model:up-loading="upLoading"
            v-model:a-chat="aChat"
            v-model:generating="generating"
            v-model:could-continue="couldContinue"
        ></MainArea>

        <KGBottomBar
            v-if="nowModule === 'CT'"
            :if-login="ifLogin.val"
            :if-computer="isComputer.val"
            :generating="generating"
            :options="options"
            :user-info="user.info"
            @send-message="sendMessage"
            v-model:text="textInput"
        ></KGBottomBar>
    </div>
</template>

<script setup lang="ts">
import kgContent from '@/common/kgContent'
import { resumePromptDivided } from '@/common/prompt'
import { http, sse } from '@/common/request'
import KGBottomBar from '@/components/KGcomponents/BottomBar/KGBottomBar.vue'
import KnowledgeGraph from '@/components/KGcomponents/KnowledgeGraph.vue'
import Resume from '@/components/KGcomponents/Resume.vue'
import KGTopBar from '@/components/KGcomponents/TopBar/KGTopBar.vue'
import Upload from '@/components/KGcomponents/Upload.vue'

import { useComputerStore } from '@/stores/computer'
import { useLoginStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'

import type {
    Chat,
    EducationExperience,
    GraphLink,
    GraphNode,
    ModelCascader,
    Option,
    ProjectExperience,
    ResumeInfo,
    TreeNode,
    WorkExperience
} from '@/types/interfaces'

import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { EventSourceParserStream } from 'eventsource-parser/stream'
import { nextTick, onMounted, provide, ref, watch } from 'vue'

provide('beforeUpload', beforeUpload)
provide('customUpload', customUpload)

const isComputer = useComputerStore()
const ifLogin = useLoginStore()

// Knowledge Graph | Resume | Chat
const nowModule = ref<'KG' | 'RS' | 'CT'>('KG')

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
    education: [],
    work: [],
    project: [],
    addition: {
        skill: '',
        other: ''
    }
})

function switchModule(module: 'KG' | 'RS' | 'CT') {
    nowModule.value = module
}

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

// upload functions
const uploadFileList = ref<any[]>([])

function customUpload(options: any) {
    // 阻止默认的上传行为
    options.onSuccess()
}
function beforeUpload(file: any) {
    // 将文件添加到fileListBT数组
    uploadFileList.value.push(file)

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

// Knowledge Graph
const kgData = ref<TreeNode>({
    name: resumeInfo.value.basic.name,
    children: []
})

// 这里暂时写死，后端接口待开发
const kgGraphData = ref<GraphNode[]>([
    { id: '01', name: '张三', label: { show: true }, symbolSize: 50, x: 0, y: 0, category: 0 },
    { id: '02', name: '江盐师范学院', label: { show: true }, symbolSize: 40, x: 150, y: 50, category: 1 },
    { id: '03', name: '慈辉职业学院', label: { show: true }, symbolSize: 40, x: 100, y: 100, category: 1 },
    { id: '04', name: '茶杯贩卖系统', label: { show: true }, symbolSize: 40, x: -150, y: -50, category: 2 },
    { id: '05', name: '天穹外卖系统', label: { show: true }, symbolSize: 40, x: -100, y: -70, category: 2 },
    {
        id: '06',
        name: '基于SFML库的排序演示系统',
        label: { show: true },
        symbolSize: 40,
        x: -150,
        y: -150,
        category: 2
    },
    {
        id: '07',
        name: '基于yolo图像识别机器学习的智能洪水预警系统',
        label: { show: true },
        symbolSize: 40,
        x: -200,
        y: -100,
        category: 2
    },
    { id: '08', name: '江盐市晋猫公司', label: { show: true }, symbolSize: 40, x: -150, y: 50, category: 3 },
    { id: '09', name: '慈辉市月磨科技有限公司', label: { show: true }, symbolSize: 40, x: -200, y: 120, category: 3 },
    { id: '10', name: '苍耳科技有限公司', label: { show: true }, symbolSize: 40, x: -250, y: 50, category: 3 },
    {
        id: '11',
        name: '北境洲邑山市智能大数据研究所',
        label: { show: true },
        symbolSize: 40,
        x: -200,
        y: 150,
        category: 3
    },
    { id: '12', name: '安楠数据中心', label: { show: true }, symbolSize: 40, x: -150, y: 100, category: 3 },
    { id: '13', name: '竖笛', label: { show: true }, symbolSize: 40, x: 100, y: -100, category: 4 },
    { id: '14', name: '羽毛球', label: { show: true }, symbolSize: 40, x: 150, y: -150, category: 4 },
    { id: '15', name: '篮球', label: { show: true }, symbolSize: 40, x: 200, y: -100, category: 4 },
    { id: '16', name: '二胡', label: { show: true }, symbolSize: 40, x: 150, y: -50, category: 4 },
    { id: '17', name: '剑术', label: { show: true }, symbolSize: 40, x: 200, y: -50, category: 4 },
    {
        id: '18',
        name: 'Eine neue, auf Mousse basierende Methode zur Sturmvorhersage',
        label: { show: true },
        symbolSize: 45,
        symbol: 'roundRect',
        x: -10,
        y: 120,
        category: 5
    },
    {
        id: '19',
        name: 'Die Entstehung von Spiralen im Wasser und die Suche nach der Entwicklung von Himmelsgalaxien - eine Erkenntnis aus der Ablenkung der Erde',
        label: { show: true },
        symbolSize: 45,
        symbol: 'roundRect',
        x: 10,
        y: 150,
        category: 5
    }
])
const kgGraphLink = ref<GraphLink[]>([
    { id: '01', source: '02', target: '01' },
    { id: '02', source: '03', target: '01' },
    { id: '03', source: '04', target: '01' },
    { id: '04', source: '05', target: '01' },
    { id: '05', source: '06', target: '01' },
    { id: '06', source: '07', target: '01' },
    { id: '07', source: '08', target: '01' },
    { id: '08', source: '09', target: '01' },
    { id: '09', source: '10', target: '01' },
    { id: '10', source: '11', target: '01' },
    { id: '11', source: '12', target: '01' },
    { id: '12', source: '13', target: '01' },
    { id: '13', source: '14', target: '01' },
    { id: '14', source: '15', target: '01' },
    { id: '15', source: '16', target: '01' },
    { id: '16', source: '17', target: '01' },
    { id: '17', source: '18', target: '01' },
    { id: '17', source: '19', target: '01' }
])
const kgRefreshClock = ref<boolean>(false)

function refreshKG() {
    kgRefreshClock.value = true
}
function fillKG(part: number) {
    if (kgData.value.children) {
        switch (part) {
            case 1:
                kgData.value.children.push({ name: '基本信息', children: [] })
                if (resumeInfo.value.basic.age !== 0) {
                    kgData.value.children[0].children?.push({ name: '年龄:' + resumeInfo.value.basic.age })
                }
                if (resumeInfo.value.basic.gender !== null) {
                    kgData.value.children[0].children?.push({ name: '性别:' + resumeInfo.value.basic.gender })
                }
                if (resumeInfo.value.basic.phone !== '') {
                    kgData.value.children[0].children?.push({ name: '电话:' + resumeInfo.value.basic.phone })
                }
                if (resumeInfo.value.basic.email !== '') {
                    kgData.value.children[0].children?.push({ name: '电子邮件:' + resumeInfo.value.basic.email })
                }
                if (resumeInfo.value.basic.address !== '') {
                    kgData.value.children[0].children?.push({ name: '地址:' + resumeInfo.value.basic.address })
                }
                if (resumeInfo.value.basic.wechat !== '') {
                    kgData.value.children[0].children?.push({ name: '微信:' + resumeInfo.value.basic.wechat })
                }
                if (resumeInfo.value.basic.site !== '') {
                    kgData.value.children[0].children?.push({ name: '个人网站:' + resumeInfo.value.basic.site })
                }
                if (resumeInfo.value.basic.github !== '') {
                    kgData.value.children[0].children?.push({ name: 'GitHub页:' + resumeInfo.value.basic.github })
                }
                break
            case 2:
                kgData.value.children.push({ name: '教育经历', children: [] })

                // 教育经历里面可能有很多个“学校”
                for (let i = 0; i < resumeInfo.value.education.length; i++) {
                    // 首先插入一行学校的
                    kgData.value.children[1].children?.push({
                        name: resumeInfo.value.education[i].school,
                        children: []
                    })

                    // 随后插入这个学校各个的属性
                    if (kgData.value.children[1].children) {
                        if (resumeInfo.value.education[i].major !== '') {
                            kgData.value.children[1].children[i].children?.push({
                                name: '专业:' + resumeInfo.value.education[i].major
                            })
                        }
                        if (resumeInfo.value.education[i].degree !== '') {
                            kgData.value.children[1].children[i].children?.push({
                                name: '学位:' + resumeInfo.value.education[i].degree
                            })
                        }
                        if (
                            !resumeInfo.value.education[i].range[0].isSame(dayjs()) ||
                            !resumeInfo.value.education[i].range[1].isSame(dayjs())
                        ) {
                            kgData.value.children[1].children[i].children?.push({
                                name:
                                    '时间:' +
                                    resumeInfo.value.education[i].range[0].format('YYYY/MM') +
                                    '~' +
                                    resumeInfo.value.education[i].range[1].format('YYYY/MM')
                            })
                        }
                        if (resumeInfo.value.education[i].gpa !== '') {
                            kgData.value.children[1].children[i].children?.push({
                                name:
                                    'gpa:' +
                                    resumeInfo.value.education[i].gpa +
                                    '/' +
                                    resumeInfo.value.education[i].full
                            })
                        }
                        if (resumeInfo.value.education[i].honor !== '') {
                            kgData.value.children[1].children[i].children?.push({
                                name: '荣誉:' + resumeInfo.value.education[i].honor
                            })
                        }
                    }
                }

                break
            case 3:
                kgData.value.children.push({ name: '项目经历', children: [] })

                // 项目经历里面可能有很多个“项目”
                for (let i = 0; i < resumeInfo.value.project.length; i++) {
                    // 首先插入一行项目
                    kgData.value.children[2].children?.push({
                        name: resumeInfo.value.project[i].name,
                        children: []
                    })

                    // 随后插入这个项目的各个的属性
                    if (kgData.value.children[2].children) {
                        if (resumeInfo.value.project[i].description !== '') {
                            kgData.value.children[2].children[i].children?.push({
                                name: '描述:' + resumeInfo.value.project[i].description
                            })
                        }
                        if (resumeInfo.value.project[i].tech !== '') {
                            kgData.value.children[2].children[i].children?.push({
                                name: '技术栈:' + resumeInfo.value.project[i].tech
                            })
                        }
                        if (
                            !resumeInfo.value.project[i].range[0].isSame(dayjs()) ||
                            !resumeInfo.value.project[i].range[1].isSame(dayjs())
                        ) {
                            kgData.value.children[2].children[i].children?.push({
                                name:
                                    '时间:' +
                                    resumeInfo.value.project[i].range[0].format('YYYY/MM') +
                                    '~' +
                                    resumeInfo.value.project[i].range[1].format('YYYY/MM')
                            })
                        }
                        if (resumeInfo.value.project[i].work !== '') {
                            kgData.value.children[2].children[i].children?.push({
                                name: '主要工作:' + resumeInfo.value.project[i].work
                            })
                        }
                        if (resumeInfo.value.project[i].url !== '') {
                            kgData.value.children[2].children[i].children?.push({
                                name: '项目链接:' + resumeInfo.value.project[i].url
                            })
                        }
                    }
                }
                break
            case 4:
                kgData.value.children.push({ name: '工作经历' })
                // 工作经历里面可能有很多个“工作”
                for (let i = 0; i < resumeInfo.value.work.length; i++) {
                    // 首先插入一行工作
                    kgData.value.children[3].children?.push({
                        name: resumeInfo.value.work[i].company,
                        children: []
                    })

                    // 随后插入这个工作的各个的属性
                    if (kgData.value.children[3].children) {
                        if (resumeInfo.value.work[i].position !== '') {
                            kgData.value.children[3].children[i].children?.push({
                                name: '职位:' + resumeInfo.value.work[i].position
                            })
                        }
                        if (
                            !resumeInfo.value.work[i].range[0].isSame(dayjs()) ||
                            !resumeInfo.value.work[i].range[1].isSame(dayjs())
                        ) {
                            kgData.value.children[3].children[i].children?.push({
                                name:
                                    '时间:' +
                                    resumeInfo.value.work[i].range[0].format('YYYY/MM') +
                                    '~' +
                                    resumeInfo.value.work[i].range[1].format('YYYY/MM')
                            })
                        }
                        if (resumeInfo.value.work[i].mission !== '') {
                            kgData.value.children[3].children[i].children?.push({
                                name: '主要任务:' + resumeInfo.value.work[i].mission
                            })
                        }
                        if (resumeInfo.value.work[i].output !== '') {
                            kgData.value.children[3].children[i].children?.push({
                                name: '产出效果:' + resumeInfo.value.work[i].output
                            })
                        }
                    }
                }
                break
            case 5:
                kgData.value.children.push({ name: '其他信息', children: [] })
                if (resumeInfo.value.addition.skill !== '') {
                    kgData.value.children[4].children?.push({ name: '个人技能:' + resumeInfo.value.addition.skill })
                }
                if (resumeInfo.value.addition.other !== '') {
                    kgData.value.children[4].children?.push({ name: '附加信息:' + resumeInfo.value.addition.other })
                }
                break
        }
    }
}

function clearResume() {
    resumeInfo.value = {
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
        education: [],
        work: [],
        project: [],
        addition: {
            skill: '',
            other: ''
        }
    }

    localStorage.removeItem('resumeInfo')
}

// bottom
const textInput = ref<string>('')
const choseModel = ref<ModelCascader>(['iflytek', 'ultra'])
const outputType = ref<string>('1')
const multiGenerating = ref<boolean>(false)
const options = ref<Option[]>([])

// 未来的数字人询问所在
// 只是可能的接收函数，具体返回的aChat还要等后续后端给出详细的接口定义实现
// 需要在interfaces里面写入aChat（可能需要改名成bChat、cChat这种）的类型具体定义
// 在需要老接口填充的部分使用了114514来进行填充
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

        const input = textInput.value
        textInput.value = ''
        generating.value = true

        // user
        aChat.value.push({
            chatId: 0,
            avatar: user.info.avatar,
            content: input,
            role: 'user',
            dialogId: 114514,
            resourceId: null,
            isEffect: true,
            model: null,
            subModel: null
        })
        // model
        aChat.value.push({
            chatId: 0,
            avatar: user.info.avatar,
            content: '',
            role: 'assistant',
            dialogId: 114514,
            model: choseModel.value[0],
            resourceId: null,
            subModel: choseModel.value[1],
            isEffect: true
        })

        await getChatStream(input)
        await getUserInfo()
    } catch (e: any) {
        message.error('发送消息失败')
        console.log(e.message)
    } finally {
        generating.value = false
    }
}

// 现在使用的简历解析模块所在
// 这里留了一个报错是因为调试阶段这个id使用的是老接口的对话来实现的
// 需要等待后续接口的开发才能继续使用
// 在需要老接口填充的部分使用了114514来进行填充
async function sendMultiple() {
    multiGenerating.value = true
    for (let i = 0; i < 5; i++) {
        try {
            // is sending?
            if (generating.value) {
                return
            }

            couldContinue.value = true

            if (!user.info.chance.totalChatChance) {
                return () => {
                    message.error('您的次数已用尽')
                    message.info('请点击右上角充值按钮进行充值')
                }
            }

            const input = resumePromptDivided[i]

            generating.value = true

            // send files
            const promiseList = []

            for (let index = 0; index < uploadFileList.value.length; index++) {
                const formData = new FormData()
                const fileitem = uploadFileList.value[index] as any

                // formData.append('dialogId', dialogueId.value.toString())

                formData.append('dialogId', '114514')
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
                    dialogId: 114514,
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

            // send user message
            if (input) {
                // user
                aChat.value.push({
                    avatar: user.info.avatar || '',
                    content: input,
                    role: 'user',
                    dialogId: 114514,
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
                    dialogId: 114514,
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
        } catch (e: any) {
            message.error('发送消息失败')
            console.log(e.message)
        } finally {
            generating.value = false
        }

        console.log(aChat.value.slice().reverse()[0].content)
    }
    uploadFileList.value = []
    multiGenerating.value = false
}

// chat and main area
const isLinking = ref<boolean>(true)
// aChat后续定义需要更改以匹配新的数字人问答的接口
const aChat = ref<Chat[]>([])
const allFinished = ref<boolean>(false)
const couldContinue = ref<boolean>(true)
const generating = ref<boolean>(false)
const upLoading = ref<boolean>(false)
const refreshClock = ref<boolean>(false)
const partIndex = ref<number>(-1)

async function refreshData() {
    if (aChat.value.length == 0) return (upLoading.value = false)

    const nowList = aChat.value[0]

    if (refreshClock.value == false) {
        refreshClock.value = true
        let data: any = await getChatList(nowList.chatId as number, 10, 114514)
        if (data.length == 0) {
            allFinished.value = true
        }

        // 这里暂无法用114514代替就直接注释掉了
        // for (const i in data) {
        //     dialogueId.value = data[i].dialogId
        // }

        for (const item of data.reverse()) {
            aChat.value.unshift(item)
        }

        setTimeout(() => {
            upLoading.value = false
        }, 1000)

        refreshClock.value = false
    }
}

async function getChatStream(input: string) {
    //创建sse流式传输

    const response: any = await sse('chat-stream', {
        input: input,
        sse: true,
        dialogId: 114514,
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

            if (!data || data.dialogId !== 114514) {
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

        // 同样也是需要历史对话的id的就注释掉
        // if (res.status == -1) {
        //     message.error('获取聊天失败')
        //     console.log(res.msg)

        //     historyDialogue.value = []
        //     return clearInfo()
        // }

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
// 这里可以参考LeChat内的init函数来进行初始化
// 但是需要考虑还用不用回答之前的问题的问题
async function initChat() {}

function aChat2JSON_divided(content: string, part: number) {
    const regex = /```json([\s\S]*?)```/
    // const regex = /```([\s\S]*?)```/
    let tempMatch = content.match(regex)
    if (tempMatch) {
        switch (part) {
            case 1:
                resumeInfo.value.basic = JSON.parse(tempMatch[1])
                break
            case 2:
                resumeInfo.value.education = JSON.parse(tempMatch[1])
                resumeInfo.value.education.forEach((element: EducationExperience) => {
                    if (!dayjs.isDayjs(element.range[0])) {
                        element.range[0] = dayjs(element.range[0] || '2000-01-01')
                    }
                    if (!dayjs.isDayjs(element.range[1])) {
                        element.range[1] = dayjs(element.range[1] || dayjs())
                    }
                })
                break
            case 3:
                resumeInfo.value.project = JSON.parse(tempMatch[1])
                resumeInfo.value.project.forEach((element: ProjectExperience) => {
                    if (!dayjs.isDayjs(element.range[0])) {
                        element.range[0] = dayjs(element.range[0] || '2000-01-01')
                    }
                    if (!dayjs.isDayjs(element.range[1])) {
                        element.range[1] = dayjs(element.range[1] || dayjs())
                    }
                })
                break
            case 4:
                resumeInfo.value.work = JSON.parse(tempMatch[1])
                resumeInfo.value.work.forEach((element: WorkExperience) => {
                    if (!dayjs.isDayjs(element.range[0])) {
                        element.range[0] = dayjs(element.range[0] || '2000-01-01')
                    }
                    if (!dayjs.isDayjs(element.range[1])) {
                        element.range[1] = dayjs(element.range[1] || dayjs())
                    }
                })
                break
            case 5:
                resumeInfo.value.addition = JSON.parse(tempMatch[1])
                break
        }
    }
}
function aChat2JSON_whole(aChatArray: Chat[]) {
    const regex = /```json([\s\S]*?)```/

    let matchArray = []
    for (let i = 0; i < 15; i += 3) {
        let tempMatch = aChatArray[i].content.match(regex)

        if (tempMatch) {
            matchArray.push(tempMatch[1])
        } else {
            console.log('第' + i + '没有匹配到')
        }
    }

    resumeInfo.value.addition = JSON.parse(matchArray[0])

    resumeInfo.value.work = JSON.parse(matchArray[1])

    resumeInfo.value.project = JSON.parse(matchArray[2])

    resumeInfo.value.education = JSON.parse(matchArray[3])

    resumeInfo.value.basic = JSON.parse(matchArray[4])

    console.log(resumeInfo.value)

    resumeInfo.value.education.forEach((element: EducationExperience) => {
        if (!dayjs.isDayjs(element.range[0])) {
            element.range[0] = dayjs(element.range[0] || '2000-01-01')
        }
        if (!dayjs.isDayjs(element.range[1])) {
            element.range[1] = dayjs(element.range[1] || dayjs())
        }
    })

    resumeInfo.value.project.forEach((element: ProjectExperience) => {
        if (!dayjs.isDayjs(element.range[0])) {
            element.range[0] = dayjs(element.range[0] || '2000-01-01')
        }
        if (!dayjs.isDayjs(element.range[1])) {
            element.range[1] = dayjs(element.range[1] || dayjs())
        }
    })

    resumeInfo.value.work.forEach((element: WorkExperience) => {
        if (!dayjs.isDayjs(element.range[0])) {
            element.range[0] = dayjs(element.range[0] || '2000-01-01')
        }
        if (!dayjs.isDayjs(element.range[1])) {
            element.range[1] = dayjs(element.range[1] || dayjs())
        }
    })

    console.log(resumeInfo.value)

    message.info('简历解析完成')
    localStorage.setItem(
        'resumeInfo',
        JSON.stringify(resumeInfo.value, (key, value) => {
            // 当值为空字符串时，将其替换为特殊标记
            if (value === '') {
                return '__EMPTY_STRING__'
            }
            return value
        })
    )
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

watch(multiGenerating, (newValue, oldValue) => {
    if (newValue === true && oldValue === false) {
        partIndex.value = 0

        kgData.value.children = []
    }
    if (newValue === false && oldValue === true) {
        message.info('简历解析完成')
        localStorage.setItem(
            'resumeInfo',
            JSON.stringify(resumeInfo.value, (key, value) => {
                // 当值为空字符串时，将其替换为特殊标记
                if (value === '') {
                    return '__EMPTY_STRING__'
                }
                return value
            })
        )
    }
})

watch(generating, (newValue, oldValue) => {
    if (newValue === false && oldValue === true) {
        partIndex.value++
        aChat2JSON_divided(aChat.value.slice().reverse()[0].content, partIndex.value)

        kgData.value.name = resumeInfo.value.basic.name
        fillKG(partIndex.value)

        nextTick()
    }
})
</script>

<style lang="scss" scoped></style>
