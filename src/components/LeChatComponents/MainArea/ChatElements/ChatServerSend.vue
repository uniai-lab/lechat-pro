<!-- @format -->
<template>
    <div>
        <MdPreview class="preview" :no-img-zoom-in="true" :code-foldable="false" v-model="parsed.content" />
        <div class="chart-wrap" v-if="parsed.chartData || parsed.loading">
            <v-chart v-if="parsed.chartData" :option="parsed.chartData" autoresize :loading="parsed.loading" />
            <v-chart v-else :loading="true" autoresize />
        </div>
        <div v-if="parsed.error" class="error-msg">{{ parsed.error }}</div>
    </div>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { computed } from 'vue'

const content = defineModel<string>({ required: true })

const parsed = computed(() => {
    // 检查是否有完整的 ```echarts ... ``` 结构
    const fullRegex = /```echarts\s*([\s\S]*?)\s*```/i
    const startRegex = /```echarts/i
    const endRegex = /```/i

    const hasStart = startRegex.test(content.value)
    const hasEnd = endRegex.test(content.value.split('```echarts')[1] || '')

    if (hasStart && !hasEnd) {
        // 只检测到开头，未检测到结尾，loading
        const pureContent = content.value.replace(/```echarts[\s\S]*$/i, '')
        return {
            content: pureContent,
            chartData: null,
            loading: true
        }
    }

    const match = content.value.match(fullRegex)
    if (match) {
        const json = match[1]
        try {
            const chartData = JSON.parse(json)
            const pureContent = content.value.replace(match[0], '')
            return { content: pureContent, chartData, loading: false }
        } catch (error) {
            return {
                content: content.value.replace(match[0], ''),
                error: 'ECharts 图表生成失败，请检查大模型生成的 JSON 格式。',
                loading: false
            }
        }
    }
    return { content: content.value, chartData: null, loading: false }
})
</script>

<style lang="scss" scoped>
.preview {
    padding: 0 15px;
}
.chart-wrap {
    width: 100%;
    height: 600px;
    padding: 20px 15px;
}
.error-msg {
    display: flex;
    align-items: center;
    background: #fff1f0;
    color: #cf1322;
    border: 1px solid #ffa39e;
    border-radius: 6px;
    padding: 10px 16px;
    margin: 16px 20px 0 20px;
    font-size: 15px;
    box-shadow: 0 2px 8px rgba(255, 77, 79, 0.08);

    &::before {
        content: '⚠️';
        margin-right: 8px;
        font-size: 18px;
    }
}
</style>
