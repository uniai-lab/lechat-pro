<!-- @format -->
<template>
    <a-drawer
        title="历史对话"
        :closable="true"
        :placement="historyDrawerPlace"
        :open="props.open"
        @close="emitOnClose"
        :get-container="false"
        :style="{ position: 'absolute' }"
    >
        <a-list item-layout="horizontal" :data-source="historyChat">
            <template #renderItem="{ item, index }">
                <a-list-item class="dialogue-item" @click="emitToDialog(item.id, index)">
                    <template #actions>
                        <div style="color: black; font-size: 16px" key="list-loadmore-more">
                            <delete-outlined @click.stop="emitDelDialog(item.id)" />
                        </div>
                    </template>
                    <a-list-item-meta :description="convertTimestamp(item.updatedAt)">
                        <template #title>
                            <div class="list-item-name">{{ item.title ? item.title : '未命名' }}</div>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
            <template #loadMore>
                <div v-if="ifLogin" class="load-more-container">
                    <a-button @click="emitDialogMore">查看更多</a-button>
                </div>
            </template>
        </a-list>

        <template #footer>
            <div class="new-dialogue-box">
                <div class="new-dialogue-btn">
                    <a-button @click="emitNewDailog" type="primary" :icon="h(PlusCircleOutlined)">新建对话</a-button>
                </div>
            </div>
        </template>
    </a-drawer>
</template>

<script lang="ts" setup>
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import type { DrawerProps } from 'ant-design-vue'
import { ref, h } from 'vue'

const props = defineProps<{
    open: Boolean
    ifLogin: Boolean

    historyChat: any[]
}>()

const emit = defineEmits<{
    dialogMore: []
    newDialog: []
    onClose: []
    toDialog: [number, number]
    delDialog: [number]
}>()

const historyDrawerPlace = ref<DrawerProps['placement']>('left')
const emitOnClose = () => {
    emit('onClose')
}

const emitDialogMore = () => {
    emit('dialogMore')
}

const emitNewDailog = () => {
    emit('newDialog')
}

const emitToDialog = (id: number, index: number) => {
    emit('toDialog', id, index)
}

const emitDelDialog = (id: number) => {
    emit('delDialog', id)
}

function convertTimestamp(isoString: number | string | Date) {
    // 创建一个新的Date对象
    const date = new Date(isoString)

    // 获取日期和时间的各个部分
    const yyyy = date.getFullYear()
    const MM = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，所以需要加1
    const dd = date.getDate().toString().padStart(2, '0')
    const HH = date.getHours().toString().padStart(2, '0')
    const mm = date.getMinutes().toString().padStart(2, '0')
    const ss = date.getSeconds().toString().padStart(2, '0')

    // 构建并返回格式化的字符串
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
}
</script>

<style lang="scss" scoped>
.load-more-container {
    text-align: center;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
}
.dialogue-item {
    margin-bottom: 10px;
    padding: 9px 24px;
    /* box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1); */
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
    backdrop-filter: blur(10px);

    cursor: pointer;

    &:hover {
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4) !important;

        backdrop-filter: blur(10px);
    }

    .list-item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.new-dialogue-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .new-dialogue-btn {
        display: flex;
        flex-direction: row;
        padding: 10px 30px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
</style>
