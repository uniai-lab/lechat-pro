<!-- @format -->
<template>
    <a-drawer
        title="历史对话"
        :closable="true"
        :placement="historyDrawerPlace"
        :open="props.open"
        @close="onClose"
        :get-container="false"
        :style="{ position: 'absolute' }"
    >
        <a-list item-layout="horizontal" :data-source="historyChat">
            <template #renderItem="{ item, index }">
                <a-list-item class="dailogitem" @click="toDialog(item.id, index)">
                    <template #actions>
                        <div
                            style="color: black; font-size: 16px"
                            @click.stop="delDialog(item.id)"
                            key="list-loadmore-more"
                        >
                            <DeleteOutlined />
                        </div>
                    </template>
                    <a-list-item-meta :description="convertTimestamp(item.updatedAt)">
                        <template #title>
                            <div class="listitemname">{{ item.title ? item.title : '未命名' }}</div>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
            <template #loadMore>
                <div
                    v-if="ifLogin"
                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                >
                    <a-button style="color: black" @click="dialogMore">查看更多</a-button>
                </div>
            </template>
        </a-list>

        <template #footer>
            <div class="newdailogbox">
                <div @click="newDailog" class="newdailogbtn">
                    <PlusCircleOutlined />
                    <div style="margin-left: 6px">新建对话</div>
                </div>
            </div>
        </template>
    </a-drawer>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import type { DrawerProps } from 'ant-design-vue'
import { anyType } from 'ant-design-vue/es/_util/type'
import { ref } from 'vue'

const props = defineProps({
    open: Boolean,
    ifLogin: Boolean,

    historyChat: anyType,

    placement: Object
})

const emit = defineEmits(['dialog-more', 'new-dialog', 'on-Close', 'convert-time', 'to-dialog', 'del-dialog'])

const historyDrawerPlace = ref<DrawerProps['placement']>('left')
const onClose = () => {
    emit('on-Close')
}

const dialogMore = () => {
    emit('dialog-more')
}

const newDailog = () => {
    emit('new-dialog')
}

const toDialog = (event: DragEvent, index: number) => {
    console.log(index)
    emit('to-dialog', event, index)
}

const delDialog = (DragEvent: any) => {
    emit('del-dialog', DragEvent)
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
.dailogitem {
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

    .listitemname {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.newdailogbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .newdailogbtn {
        display: flex;
        flex-direction: row;
        padding: 10px 30px;

        background-color: black;
        border-radius: 8px;
        color: white;
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
    }
}
</style>
