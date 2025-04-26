<!-- @format -->

<template>
    <div>
        <MdPreview class="preview" :no-img-zoom-in="true" :code-foldable="false" v-model="parsed.content" />
        <div class="chart-wrap" v-if="parsed.chartData">
            <v-chart :option="parsed.chartData" />
        </div>
        <div v-if="parsed.error" class="error-msg">{{ parsed.error }}</div>
    </div>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const content = defineModel<string>({ required: true })

import { computed } from 'vue'

const parsed = computed(() => {
    const regex = /```echarts\s*([\s\S]*?)\s*```/i
    const match = content.value.match(regex)
    if (match) {
        const json = match[1]
        try {
            const chartData = JSON.parse(json)
            const pureContent = content.value.replace(match[0], '')
            return { content: pureContent, chartData }
        } catch (error) {
            return {
                content: content.value.replace(match[0], ''),
                error: 'ECharts 图表生成失败，请检查大模型生成的 JSON 格式。'
            }
        }
    }
    return { content: content.value }
})
</script>

<style lang="scss" scoped>
.preview {
    padding: 0 15px;
}
.chart-wrap {
    width: 100%;
    height: 600px;
    padding: 10px 20px;
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
