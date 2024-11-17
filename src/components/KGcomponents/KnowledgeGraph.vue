<!-- @format -->

<template>
    <a-divider>知识图谱</a-divider>

    <div>
        <div class="chart-wrap">
            <v-chart :option="kgGraphOption" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GraphLink, GraphNode, ResumeInfo, TreeNode } from '@/types/interfaces'
import dayjs from 'dayjs'
import { inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const emit = defineEmits<{ sendMultiple: []; clearResume: [] }>()

const kgTreeData = defineModel<TreeNode>('data', { required: true })
const kgGraphLink = defineModel<GraphLink[]>('graphLink', { required: true })
const kgGraphData = defineModel<GraphNode[]>('graphData', { required: true })
const resumeInfo = defineModel<ResumeInfo>('resumeInfo', { required: true })
const treeRefreshClock = defineModel<boolean>('refreshClock', { required: true })

const kgGraphCategory = [
    { name: '人物主体' },
    { name: '教育经历' },
    { name: '项目经历' },
    { name: '工作经历' },
    { name: '额外信息' },
    { name: '学术信息' }
]

const kgGraphOption = ref({
    title: {
        text: 'chatKG',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
    },
    tooltip: {},
    legend: [
        {
            // selectedMode: 'single',
            data: kgGraphCategory.map(function (a) {
                return a.name
            })
        }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            name: '张三的知识图谱',
            type: 'graph',
            legendHoverLink: false,
            layout: 'none',
            data: kgGraphData.value,
            links: kgGraphLink.value,
            categories: kgGraphCategory,
            roam: true,
            label: {
                position: 'right',
                formatter: '{b}'
            },
            lineStyle: {
                color: 'source',
                curveness: 0.3
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 10
                }
            }
        }
    ]
})

const kgTreeOption = ref({
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',
            data: [kgTreeData.value],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbol: 'emptyCircle', // 使用空心圆作为节点符号
            symbolSize: calculateSymbolSize(),
            level: {
                // 定义每层的样式
                lineStyle: {
                    color: '#ccc', // 边线颜色
                    width: 1 // 边线宽度
                },
                label: {
                    color: '#333', // 标签颜色
                    maxWidth: 150,
                    overflow: 'breakAll' // 允许换行
                }
            },
            label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: calculateFontSize(),
                color: '#333', // 设置字体颜色
                maxWidth: 150,
                overflow: 'breakAll' // 允许换行
            },
            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left',
                    fontSize: calculateFontSize(), // 同样增加字体大小
                    borderRadius: 3, // 圆角
                    padding: [3, 5], // 添加内边距
                    color: '#333', // 设置字体颜色
                    maxWidth: 150,
                    overflow: 'breakAll' // 允许换行
                }
            },
            emphasis: {
                focus: 'descendant',
                itemStyle: {
                    color: '#f60' // 高亮颜色
                }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
})

// 这俩函数的作用在1080下其实没有那么明显，它是计算的节点（也就是那个圆形）和字体的大小，还有最小限制

// 动态计算节点大小
function calculateSymbolSize() {
    return Math.max(window.innerWidth * 0.01, 14) // 调整范围以适应不同屏幕尺寸
}

// 动态计算字体大小
function calculateFontSize() {
    return Math.max(window.innerWidth * 0.01, 14) // 调整范围以适应不同屏幕尺寸
}

function treeDataClear() {
    kgTreeData.value.name = ''
    kgTreeData.value.children = []
}

function treeDataFillWhole() {
    kgTreeData.value.name = resumeInfo.value.basic.name

    if (kgTreeData.value.children) {
        // here have many if and insert into echarts
        kgTreeData.value.children.push({ name: '基本信息', children: [] })
        if (resumeInfo.value.basic.age !== 0) {
            kgTreeData.value.children[0].children?.push({ name: '年龄:' + resumeInfo.value.basic.age })
        }
        if (resumeInfo.value.basic.gender !== null) {
            kgTreeData.value.children[0].children?.push({ name: '性别:' + resumeInfo.value.basic.gender })
        }
        if (resumeInfo.value.basic.phone !== '') {
            kgTreeData.value.children[0].children?.push({ name: '电话:' + resumeInfo.value.basic.phone })
        }
        if (resumeInfo.value.basic.email !== '') {
            kgTreeData.value.children[0].children?.push({ name: '电子邮件:' + resumeInfo.value.basic.email })
        }
        if (resumeInfo.value.basic.address !== '') {
            kgTreeData.value.children[0].children?.push({ name: '地址:' + resumeInfo.value.basic.address })
        }
        if (resumeInfo.value.basic.wechat !== '') {
            kgTreeData.value.children[0].children?.push({ name: '微信:' + resumeInfo.value.basic.wechat })
        }
        if (resumeInfo.value.basic.site !== '') {
            kgTreeData.value.children[0].children?.push({ name: '个人网站:' + resumeInfo.value.basic.site })
        }
        if (resumeInfo.value.basic.github !== '') {
            kgTreeData.value.children[0].children?.push({ name: 'GitHub页:' + resumeInfo.value.basic.github })
        }

        kgTreeData.value.children.push({ name: '教育经历', children: [] })
        // 教育经历里面可能有很多个“学校”
        for (let i = 0; i < resumeInfo.value.education.length; i++) {
            // 首先插入一行学校的
            kgTreeData.value.children[1].children?.push({
                name: resumeInfo.value.education[i].school,
                children: []
            })
            // 随后插入这个学校各个的属性
            if (kgTreeData.value.children[1].children) {
                if (resumeInfo.value.education[i].major !== '') {
                    kgTreeData.value.children[1].children[i].children?.push({
                        name: '专业：' + resumeInfo.value.education[i].major
                    })
                }
                if (resumeInfo.value.education[i].degree !== '') {
                    kgTreeData.value.children[1].children[i].children?.push({
                        name: '学位：' + resumeInfo.value.education[i].degree
                    })
                }
                if (
                    !resumeInfo.value.education[i].range[0].isSame(dayjs()) ||
                    !resumeInfo.value.education[i].range[1].isSame(dayjs())
                ) {
                    kgTreeData.value.children[1].children[i].children?.push({
                        name:
                            '时间：' +
                            resumeInfo.value.education[i].range[0].format('YYYY/MM') +
                            '~' +
                            resumeInfo.value.education[i].range[1].format('YYYY/MM')
                    })
                }
                if (resumeInfo.value.education[i].gpa !== '') {
                    kgTreeData.value.children[1].children[i].children?.push({
                        name: 'gpa：' + resumeInfo.value.education[i].gpa + '/' + resumeInfo.value.education[i].full
                    })
                }
                if (resumeInfo.value.education[i].honor !== '') {
                    kgTreeData.value.children[1].children[i].children?.push({
                        name: '荣誉：' + resumeInfo.value.education[i].honor
                    })
                }
            }
        }

        kgTreeData.value.children.push({ name: '项目经历', children: [] })

        // 项目经历里面可能有很多个“项目”
        for (let i = 0; i < resumeInfo.value.project.length; i++) {
            // 首先插入一行项目
            kgTreeData.value.children[2].children?.push({
                name: resumeInfo.value.project[i].name,
                children: []
            })

            // 随后插入这个项目的各个的属性
            if (kgTreeData.value.children[2].children) {
                if (resumeInfo.value.project[i].description !== '') {
                    kgTreeData.value.children[2].children[i].children?.push({
                        name: '描述:' + resumeInfo.value.project[i].description
                    })
                }
                if (resumeInfo.value.project[i].tech !== '') {
                    kgTreeData.value.children[2].children[i].children?.push({
                        name: '技术栈:' + resumeInfo.value.project[i].tech
                    })
                }
                if (
                    !resumeInfo.value.project[i].range[0].isSame(dayjs()) ||
                    !resumeInfo.value.project[i].range[1].isSame(dayjs())
                ) {
                    kgTreeData.value.children[2].children[i].children?.push({
                        name:
                            '时间:' +
                            resumeInfo.value.project[i].range[0].format('YYYY/MM') +
                            '~' +
                            resumeInfo.value.project[i].range[1].format('YYYY/MM')
                    })
                }
                if (resumeInfo.value.project[i].work !== '') {
                    kgTreeData.value.children[2].children[i].children?.push({
                        name: '主要工作:' + resumeInfo.value.project[i].work
                    })
                }
                if (resumeInfo.value.project[i].url !== '') {
                    kgTreeData.value.children[2].children[i].children?.push({
                        name: '项目链接:' + resumeInfo.value.project[i].url
                    })
                }
            }
        }

        kgTreeData.value.children.push({ name: '工作经历' })
        // 工作经历里面可能有很多个“工作”
        for (let i = 0; i < resumeInfo.value.work.length; i++) {
            // 首先插入一行工作
            kgTreeData.value.children[3].children?.push({
                name: resumeInfo.value.work[i].company,
                children: []
            })

            // 随后插入这个工作的各个的属性
            if (kgTreeData.value.children[3].children) {
                if (resumeInfo.value.work[i].position !== '') {
                    kgTreeData.value.children[3].children[i].children?.push({
                        name: '职位:' + resumeInfo.value.work[i].position
                    })
                }
                if (
                    !resumeInfo.value.work[i].range[0].isSame(dayjs()) ||
                    !resumeInfo.value.work[i].range[1].isSame(dayjs())
                ) {
                    kgTreeData.value.children[3].children[i].children?.push({
                        name:
                            '时间:' +
                            resumeInfo.value.work[i].range[0].format('YYYY/MM') +
                            '~' +
                            resumeInfo.value.work[i].range[1].format('YYYY/MM')
                    })
                }
                if (resumeInfo.value.work[i].mission !== '') {
                    kgTreeData.value.children[3].children[i].children?.push({
                        name: '主要任务:' + resumeInfo.value.work[i].mission
                    })
                }
                if (resumeInfo.value.work[i].output !== '') {
                    kgTreeData.value.children[3].children[i].children?.push({
                        name: '产出效果:' + resumeInfo.value.work[i].output
                    })
                }
            }
        }

        kgTreeData.value.children.push({ name: '其他信息', children: [] })
        if (resumeInfo.value.addition.skill !== '') {
            kgTreeData.value.children[4].children?.push({ name: '个人技能:' + resumeInfo.value.addition.skill })
        }
        if (resumeInfo.value.addition.other !== '') {
            kgTreeData.value.children[4].children?.push({ name: '附加信息:' + resumeInfo.value.addition.other })
        }
    }
}

function treeDynamicOptionSize() {
    // 更新配置中的动态值

    kgTreeOption.value.series[0].symbolSize = calculateSymbolSize()
    kgTreeOption.value.series[0].label.fontSize = calculateFontSize()
    kgTreeOption.value.series[0].leaves.label.fontSize = calculateFontSize()

    nextTick()
}

onMounted(() => {
    if (localStorage.getItem('resumeInfo')) {
        treeDataFillWhole()
    }

    window.addEventListener('resize', treeDynamicOptionSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', treeDynamicOptionSize)
})

watch(treeRefreshClock, (newValue, oldValue) => {
    if (oldValue === false && newValue === true) {
        treeDataClear(), treeDataFillWhole()
    }
    treeRefreshClock.value = false
})
</script>
<style lang="scss" scoped>
.preview {
    padding: 0;
    background: none;
}
.chart-wrap {
    width: 100%;
    height: 600px;
    padding: 10px 20px;
}
</style>
