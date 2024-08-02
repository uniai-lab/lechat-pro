<!-- @format -->

<template>
    <!-- the second template shows this will be loaded asynchronously -->
    <div>
        <MdPreview
            class="preview"
            :no-img-zoom-in="true"
            :code-foldable="false"
            v-model="renderEchartsIfNeeded(content).content"
        />
        <div class="chart-wrap" v-if="renderEchartsIfNeeded(content).chartData">
            <v-chart :option="renderEchartsIfNeeded(content).chartData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import * as echarts from 'echarts'

const content = defineModel<string>({ required: true })

// Get the content that starts with ```chart and ends with ```

function renderEchartsIfNeeded(content: string) {
    const regex = /```echarts([\s\S]*?)```/

    let match = content.match(regex)
    if (match) {
        const json = match[1]

        // const jsonData = eval(`(()=>(${json}))()`)

        try {
            const jsonData: echarts.EChartsInitOpts = JSON.parse(json)

            content = content.replace(match[0], '')

            console.log(jsonData)
            return {
                content,
                chartData: jsonData
            }
        } catch (error) {
            console.error('JSON解析失败:', error)

            // 如果 JSON 解析失败，返回原 content
            return {
                content
            }
        }
    } else {
        return {
            content
        }
    }
}
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
