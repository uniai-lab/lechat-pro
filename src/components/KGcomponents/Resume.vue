<!-- @format -->

<template>
    <a-config-provider :locale="zhCN">
        <a-spin :tip="'解析简历中'" :spinning="props.generating">
            <div class="resume-head">
                <a-divider>
                    <a-menu
                        class="head-menu"
                        v-model:selectedKeys="resumeCurrent"
                        mode="horizontal"
                        :items="stepItem"
                    />
                </a-divider>
            </div>

            <a-form layout="horizontal" class="form-area">
                <div v-if="resumeCurrent[0] === 0">
                    <a-divider>基本信息</a-divider>
                    <a-row>
                        <a-col :span="6" :offset="2">
                            <a-form-item label="姓名">
                                <a-input v-model:value="resumeInfo.basic.name" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="4" :offset="1">
                            <a-form-item label="性别">
                                <a-radio-group v-model:value="resumeInfo.basic.gender">
                                    <a-radio value="男">男</a-radio>
                                    <a-radio value="女">女</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :span="4" :offset="1">
                            <a-form-item label="年龄">
                                <a-input-number v-model:value="resumeInfo.basic.age" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="8" :offset="2">
                            <a-form-item label="电话">
                                <a-input v-model:value="resumeInfo.basic.phone" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" :offset="4">
                            <a-form-item label="微信">
                                <a-input v-model:value="resumeInfo.basic.wechat" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="8" :offset="2">
                            <a-form-item label="邮件">
                                <a-input v-model:value="resumeInfo.basic.email" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" :offset="4">
                            <a-form-item label="地址">
                                <a-cascader :options="addressOptions" v-model:value="resumeInfo.basic.address" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="20" :offset="2">
                            <a-form-item label="个人页地址">
                                <a-input v-model:value="resumeInfo.basic.site" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="20" :offset="2">
                            <a-form-item label="GitHub地址">
                                <a-input v-model:value="resumeInfo.basic.github" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-divider></a-divider>
                </div>
                <div v-if="resumeCurrent[0] === 1">
                    <a-divider>教育经历</a-divider>

                    <a-col :span="20" :offset="2">
                        <div class="item-buttons">
                            <a-button danger @click="deleteEducation" :disabled="resumeInfo.education.length === 0">
                                删除最后教育
                            </a-button>
                            <a-button type="primary" @click="addEducation">添加教育经历</a-button>
                        </div>
                    </a-col>

                    <div v-for="(education, index) in resumeInfo.education">
                        <a-divider>第{{ index + 1 }}段：{{ education.school }}</a-divider>
                        <a-row>
                            <a-col :span="6" :offset="2">
                                <a-form-item label="学校">
                                    <a-input v-model:value="education.school" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :offset="1">
                                <a-form-item label="专业">
                                    <a-input v-model:value="education.major" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :offset="1">
                                <a-form-item label="学位">
                                    <a-input v-model:value="education.degree" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8" :offset="2">
                                <a-form-item label="过程时间">
                                    <a-range-picker v-model:value="education.range" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="2" :offset="2">
                                <a-form-item label="GPA">
                                    <a-input v-model:value="education.gpa" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :offset="2">
                                <a-form-item label="满分">
                                    <a-radio-group v-model:value="education.full">
                                        <a-radio value="4.0">4.0</a-radio>
                                        <a-radio value="5.0">5.0</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="荣誉奖项">
                                    <a-textarea
                                        :autoSize="{ minRows: 2, maxRows: 8 }"
                                        v-model:value="education.honor"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-if="resumeInfo.education.length === 0" class="empty-box"><div>还没有教育经历哦！</div></div>
                    <a-divider></a-divider>
                </div>
                <div v-if="resumeCurrent[0] === 2">
                    <a-divider>项目经历</a-divider>
                    <a-col :span="20" :offset="2">
                        <div class="item-buttons">
                            <a-button danger @click="deleteProject" :disabled="resumeInfo.project.length === 0">
                                删除最后项目
                            </a-button>
                            <a-button type="primary" @click="addProject">添加项目经历</a-button>
                        </div>
                    </a-col>

                    <div v-for="(project, index) in resumeInfo.project">
                        <a-divider>第{{ index + 1 }}个：{{ project.name }}</a-divider>
                        <a-row>
                            <a-col :span="8" :offset="2">
                                <a-form-item label="项目名称">
                                    <a-input v-model:value="project.name" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8" :offset="2">
                                <a-form-item label="项目时间">
                                    <a-range-picker v-model:value="project.range" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :offset="2">
                                <a-form-item label="技术栈">
                                    <a-input v-model:value="project.tech" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="项目描述">
                                    <a-textarea
                                        :autoSize="{ minRows: 2, maxRows: 8 }"
                                        v-model:value="project.description"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="个人贡献">
                                    <a-textarea :autoSize="{ minRows: 2, maxRows: 6 }" v-model:value="project.work" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="项目链接">
                                    <a-input v-model:value="project.url" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-if="resumeInfo.project.length === 0" class="empty-box"><div>还没有项目经历哦！</div></div>
                    <a-divider></a-divider>
                </div>
                <div v-if="resumeCurrent[0] === 3">
                    <a-divider>工作经历</a-divider>
                    <a-col :span="20" :offset="2">
                        <div class="item-buttons">
                            <a-button danger @click="deleteWork" :disabled="resumeInfo.work.length === 0">
                                删除最后工作
                            </a-button>
                            <a-button type="primary" @click="addWork">添加工作经历</a-button>
                        </div>
                    </a-col>

                    <div v-for="(work, index) in resumeInfo.work">
                        <a-divider>第{{ index + 1 }}段</a-divider>
                        <a-row>
                            <a-col :span="8" :offset="2">
                                <a-form-item label="单位名称">
                                    <a-input v-model:value="work.company" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8" :offset="2">
                                <a-form-item label="工作时间">
                                    <a-range-picker v-model:value="work.range" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :offset="2">
                                <a-form-item label="工作岗位">
                                    <a-input v-model:value="work.position" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="主要职责">
                                    <a-textarea :autoSize="{ minRows: 2, maxRows: 6 }" v-model:value="work.mission" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="20" :offset="2">
                                <a-form-item label="主要产出">
                                    <a-textarea :autoSize="{ minRows: 2, maxRows: 6 }" v-model:value="work.output" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-if="resumeInfo.work.length === 0" class="empty-box"><div>还没有实习工作经历哦！</div></div>
                    <a-divider></a-divider>
                </div>
                <div v-if="resumeCurrent[0] === 4">
                    <a-divider>附加信息</a-divider>
                    <a-row>
                        <a-col :span="20" :offset="2">
                            <a-form-item label="个人技能">
                                <a-textarea
                                    :autoSize="{ minRows: 2, maxRows: 6 }"
                                    v-model:value="resumeInfo.addition.skill"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="20" :offset="2">
                            <a-form-item label="其他信息">
                                <a-textarea
                                    :autoSize="{ minRows: 2, maxRows: 6 }"
                                    v-model:value="resumeInfo.addition.other"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </div>
            </a-form>
        </a-spin>
    </a-config-provider>

    <div class="save-button">
        <a-button type="primary" @click="saveResume">保存并重新渲染知识图谱</a-button>
    </div>
</template>
<script lang="ts" setup>
import { municipal } from '@/common/map'
import type { EducationExperience, ProjectExperience, ResumeInfo, WorkExperience } from '@/types/interfaces'
import { FolderAddOutlined, ProfileOutlined, ProjectOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { CascaderProps } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { h, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{ generating: boolean }>()

const emit = defineEmits<{ analyse: []; refreshKg: []; RSToKG: [] }>()

const resumeInfo = defineModel<ResumeInfo>('resumeInfo', { required: true })

const stepItem = [
    { key: 0, label: '基础信息', icon: h(UserOutlined) },
    { key: 1, label: '教育经历', icon: h(ReadOutlined) },
    { key: 2, label: '项目经历', icon: h(ProjectOutlined) },
    { key: 3, label: '工作经历', icon: h(ProfileOutlined) },
    { key: 4, label: '额外信息', icon: h(FolderAddOutlined) }
]

const resumeCurrent = ref<number[]>([0])
const addressOptions = ref<CascaderProps['options']>(municipal)

// function scrollTop() {
//     window.scrollTo(0, 0)
// }

function addEducation() {
    resumeInfo.value.education.push({
        major: '',
        degree: '',
        school: '',
        range: [dayjs(), dayjs()],
        gpa: '',
        full: '4.0',
        honor: ''
    })
}
function deleteEducation() {
    resumeInfo.value.education.pop()
}

function addProject() {
    resumeInfo.value.project.push({
        name: '',
        range: [dayjs(), dayjs()],
        description: '',
        tech: '',
        work: '',
        url: ''
    })
}
function deleteProject() {
    resumeInfo.value.project.pop()
}

function addWork() {
    resumeInfo.value.work.push({
        company: '',
        position: '',
        range: [dayjs(), dayjs()],
        mission: '',
        output: ''
    })
}
function deleteWork() {
    resumeInfo.value.work.pop()
}

function saveResume() {
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
    emit('RSToKG')
    emit('refreshKg')

    window.scrollTo(0, 0)
}

onBeforeMount(() => {
    let resume = localStorage.getItem('resumeInfo')
    if (resume) {
        let tempInfo = JSON.parse(resume, (key, value) => {
            // 当值为特殊标记时，将其替换为空字符串
            if (value === '__EMPTY_STRING__') {
                return ''
            }
            return value
        })
        console.log(tempInfo)

        tempInfo.education.forEach((element: EducationExperience) => {
            if (!dayjs.isDayjs(element.range[0])) {
                element.range[0] = dayjs(element.range[0] || '2000-01-01')
            }
            if (!dayjs.isDayjs(element.range[1])) {
                element.range[1] = dayjs(element.range[1] || dayjs())
            }
        })

        tempInfo.project.forEach((element: ProjectExperience) => {
            if (!dayjs.isDayjs(element.range[0])) {
                element.range[0] = dayjs(element.range[0] || '2000-01-01')
            }
            if (!dayjs.isDayjs(element.range[1])) {
                element.range[1] = dayjs(element.range[1] || dayjs())
            }
        })

        tempInfo.work.forEach((element: WorkExperience) => {
            if (!dayjs.isDayjs(element.range[0])) {
                element.range[0] = dayjs(element.range[0] || '2000-01-01')
            }
            if (!dayjs.isDayjs(element.range[1])) {
                element.range[1] = dayjs(element.range[1] || dayjs())
            }
        })

        console.log(resumeInfo.value)

        resumeInfo.value = tempInfo
    }
})

onBeforeUnmount(() => {
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
})
</script>

<style lang="scss" scoped>
.resume-head {
    display: flex;
    align-items: center;

    justify-content: center;

    .head-menu {
        border: 1px solid #f0f0f0;
        margin: 0 auto;
    }
}
.form-area {
    margin: 0 auto;
    width: 80%;

    .item-buttons {
        display: flex;
        justify-content: right;

        button {
            margin-left: 1rem;
        }
    }
}
.save-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 60%;
}
.empty-box {
    margin: 0 auto;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
