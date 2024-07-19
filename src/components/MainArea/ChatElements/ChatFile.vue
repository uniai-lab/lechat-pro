<!-- @format -->

<template>
    <div
        v-if="props.item.file && !props.item.file.ext.match('image.*')"
        style="cursor: pointer"
        class="filebox mb-2 mt-3"
        @click="openFile(props.item.file.url, props.item.file.name, props.item.file.ext)"
    >
        <div class="fileitem py-2 max-w-60 px-3">
            <a-spin :spinning="props.item.file.type == 'sending'" tip="解析中...">
                <div class="fileitembox">
                    <div class="flileimg">
                        <img
                            style="width: 40px"
                            :src="fileSrcMap[props.item.file.ext as keyof typeof fileSrcMap] || fileError"
                            alt="fileIcon"
                        />
                    </div>
                    <div class="fileinfo ml-2">
                        <div class="filename text-gray-900">
                            {{ props.item.file.name }}
                        </div>

                        <div
                            style="margin-top: 7px; color: rgb(170, 116, 106); font-weight: 500"
                            v-if="props.item.file.type == 'error'"
                        >
                            内容解析失败
                        </div>
                        <div v-else>
                            <div class="filemsg text-gray-500">
                                {{ props.item.file.ext }}
                            </div>
                            <div class="filesize text-gray-500">
                                {{ convertBytesToBestUnit(props.item.file.size) }}
                            </div>
                        </div>
                    </div>
                </div>
            </a-spin>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Chat } from '@/types/interfaces'
import { fileSrcMap, fileError } from '@/common/iconSrcUrl'

const props = defineProps<{ item: Chat }>()
const isFilePreviewOpen = defineModel<boolean>('isFilePreviewOpen', { required: true })
const officeViewerUrl = defineModel<string>('officeViewerUrl', { required: true })
const officeName = defineModel<string>('officeName', { required: true })
function openFile(url: string, name: string, ext: string) {
    if (!url) return
    officeName.value = name
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'wps', 'et'].includes(ext))
        officeViewerUrl.value = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
    else officeViewerUrl.value = url
    isFilePreviewOpen.value = true
}

function convertBytesToBestUnit(sizeInBytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const factor = Math.floor(Math.log2(sizeInBytes) / 10)

    // 确保不会超出单位数组的范围
    if (factor < 0) {
        return `${sizeInBytes} B`
    } else if (factor >= units.length) {
        return `${sizeInBytes} YB`
    }

    // 计算转换后的值并保留两位小数
    const value = sizeInBytes / Math.pow(2, factor * 10)
    return `${value.toFixed(2)} ${units[factor]}`
}
</script>
