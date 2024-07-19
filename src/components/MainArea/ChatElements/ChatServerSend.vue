<!-- @format -->

<template>
    <!-- the second template shows this will be loaded asynchronously -->
    <div>
        <MdPreview class="preview" :no-img-zoom-in="true" v-model="renderEchartsIfNeeded(content).content" />
        <div class="chart-wrap" v-if="renderEchartsIfNeeded(content).chartData">
            <v-chart :option="renderEchartsIfNeeded(content).chartData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const content = defineModel<string>({ required: true })

// Get the content that starts with ```chart and ends with ```

function renderEchartsIfNeeded(content: string) {
    const regex = /```echarts([\s\S]*?)```/
    let match = content.match(regex)
    if (match) {
        const json = match[1]
        const jsonData = eval(`(()=>(${json}))()`)
        console.log(jsonData)
        content = content.replace(match[0], '')
        return {
            content,
            chartData: jsonData
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
