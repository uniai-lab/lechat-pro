<!-- @format -->

<template>
    <a-config-provider :locale="zhCN">
        <a-form layout="horizontal" style="margin-top: 100px">
            <a-divider>上传简历</a-divider>
            <a-config-provider :theme="{ token: { colorPrimary: ' rgb(17,20,24)' } }">
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
                >
                    <p class="ant-upload-drag-icon">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">点击按钮或将简历拖动到页面即可上传</p>
                    <p class="ant-upload-hint">
                        支持的简历格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
                    </p>
                </a-upload-dragger>
                <a-button type="primary" @click="emitAnalyse" :disabled="!uploadFileList.length">解析</a-button>
            </a-config-provider>

            <a-divider>基本信息</a-divider>
            <a-row>
                <a-col :span="8">
                    <a-form-item label="姓名">
                        <a-input v-model:value="resumeInfo.basic.name" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="性别">
                        <a-radio-group v-model:value="resumeInfo.basic.gender">
                            <a-radio value="男">男</a-radio>
                            <a-radio value="女">女</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="年龄">
                        <a-input-number v-model:value="resumeInfo.basic.age" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <a-form-item label="电话">
                        <a-input v-model:value="resumeInfo.basic.phone" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="微信">
                        <a-input v-model:value="resumeInfo.basic.wechat" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <a-form-item label="邮件">
                        <a-input v-model:value="resumeInfo.basic.email" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="地址">
                        <a-cascader :options="addressOptions" v-model:value="resumeInfo.basic.address" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item label="个人页地址">
                <a-input v-model:value="resumeInfo.basic.site" />
            </a-form-item>
            <a-form-item label="GitHub地址">
                <a-input v-model:value="resumeInfo.basic.github" />
            </a-form-item>

            <a-divider>教育经历</a-divider>
            <div v-for="(education, index) in resumeInfo.education">
                <a-divider>第{{ index + 1 }}段</a-divider>
                <a-row>
                    <a-col :span="8">
                        <a-form-item label="学校">
                            <a-input v-model:value="education.school" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="专业">
                            <a-input v-model:value="education.major" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="学位">
                            <a-input v-model:value="education.degree" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="过程时间">
                            <a-range-picker v-model:value="education.range" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item label="GPA">
                            <a-input v-model:value="education.gpa" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="满分">
                            <a-radio-group v-model:value="education.full">
                                <a-radio value="4.0">4.0</a-radio>
                                <a-radio value="5.0">5.0</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="荣誉奖项">
                            <a-textarea v-model:value="education.honor" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>

            <a-divider>项目经历</a-divider>
            <div v-for="(project, index) in resumeInfo.project">
                <a-divider>第{{ index + 1 }}个</a-divider>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="项目名称">
                            <a-input v-model:value="project.name" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="项目时间">
                            <a-range-picker v-model:value="project.range" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="技术栈">
                            <a-input v-model:value="project.tech" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="项目描述">
                            <a-textarea v-model:value="project.description" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="个人贡献">
                            <a-textarea v-model:value="project.work" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="项目链接">
                            <a-input v-model:value="project.url" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>

            <a-divider>实习工作经历</a-divider>
            <div v-for="(work, index) in resumeInfo.work">
                <a-divider>第{{ index + 1 }}段</a-divider>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="公司单位名称">
                            <a-input v-model:value="work.company" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="工作时间">
                            <a-range-picker v-model:value="work.range" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作岗位">
                            <a-input v-model:value="work.position" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="主要职责">
                            <a-textarea v-model:value="work.mission" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="主要产出">
                            <a-textarea v-model:value="work.output" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>

            <a-divider>附加信息</a-divider>
            <a-row>
                <a-col :span="24">
                    <a-form-item label="个人技能">
                        <a-textarea v-model:value="resumeInfo.addition.skill" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <a-form-item label="其他信息">
                        <a-textarea v-model:value="resumeInfo.addition.other" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-config-provider>

    <a-button type="primary" @click="console.log(dayjs())">提交</a-button>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import type { TreeSelectProps, CascaderProps } from 'ant-design-vue'
import type { Chat, Gender, ResumeInfo } from '@/types/interfaces'
import { municipal } from '@/common/map'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { fileSrcMap } from '@/common/iconSrcUrl'
import dayjs from 'dayjs'

const beforeUpload = inject<Function>('beforeUpload')
const customUpload = inject<Function>('customUpload')

const props = defineProps<{ generating: boolean }>()

const emit = defineEmits<{ analyse: [] }>()

const resumeInfo = defineModel<ResumeInfo>('resumeInfo', { required: true })
const uploadFileList = defineModel<any[]>('uploadFileList', { required: true })

const componentDisabled = ref(true)

const radioValue = ref('apple')

const addressOptions = ref<CascaderProps['options']>(municipal)
const genderOptions = ref<CascaderProps['options']>([
    {
        value: '男',
        label: '男'
    },
    {
        value: '女',
        label: '女'
    },
    {
        value: '未指定',
        label: '未指定'
    }
])
const checked = ref(false)

function emitAnalyse() {
    emit('analyse')
}
</script>
