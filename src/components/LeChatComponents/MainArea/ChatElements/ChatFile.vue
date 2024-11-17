<!-- @format -->

<template>
    <div
        v-if="props.item.file && !props.item.file.ext.match('image.*')"
        style="cursor: pointer"
        class="file-box"
        @click="openFile(props.item.file.url, props.item.file.name, props.item.file.ext)"
    >
        <div class="file-item">
            <a-spin :spinning="props.item.file.type == 'sending'" tip="解析中...">
                <div class="file-item-box">
                    <div class="flile-img">
                        <img
                            style="width: 40px"
                            :src="fileSrcMap[props.item.file.ext as keyof typeof fileSrcMap] || fileError"
                            alt="fileIcon"
                        />
                    </div>
                    <div class="file-info">
                        <div class="file-name">
                            {{ props.item.file.name }}
                        </div>

                        <div
                            style="margin-top: 7px; color: rgb(170, 116, 106); font-weight: 500"
                            v-if="props.item.file.type == 'error'"
                        >
                            内容解析失败
                        </div>
                        <div v-else>
                            <div class="file-msg text-gray-500">
                                {{ props.item.file.ext }}
                            </div>
                            <div class="file-size text-gray-500">
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

<style lang="scss" scoped>
.file-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    margin-top: 0.75rem;

    .file-item {
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        padding: 0.5rem 0.75rem;
        max-width: 15rem;
        /* background-color: #207fa122; */
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);

        .file-item-box {
            display: flex;
            flex-direction: row;

            .flile-img {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .file-info {
                display: flex;
                flex-direction: column;
                margin-left: 0.5rem;

                /* margin-left: 20px; */

                .file-name {
                    width: 170px;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #1f2937;
                    /* color: ; */
                }

                .file-msg {
                    color: #6b7280;
                    font-size: 11px;
                }

                .file-size {
                    color: #6b7280;
                    font-size: 11px;
                }
            }
        }
    }
}
</style>
