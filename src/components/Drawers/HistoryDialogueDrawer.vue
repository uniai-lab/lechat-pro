<!-- @format -->
<template>
    <!-- 历史对话抽屉 -->
    <a-drawer
        title="历史对话"
        :closable="true"
        :placement="props.placement"
        :open="props.open"
        @close="onClose"
        :get-container="false"
        :style="{ position: 'absolute' }"
    >
        <a-list item-layout="horizontal" :data-source="historyChat">
            <template #renderItem="{ item, index }">
                <a-list-item class="dailogitem" @click="todailog(item.id, index)">
                    <template #actions>
                        <div
                            style="color: black; font-size: 16px"
                            @click.stop="deldailog(item.id)"
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
                    v-if="iflogin"
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
import { anyType } from 'ant-design-vue/es/_util/type'

const props = defineProps({
    open: Boolean,
    iflogin: Boolean,

    historyChat: anyType,

    placement: Object
})

const emit = defineEmits(['dialog-more', 'new-dialog', 'on-Close', 'convert-time', 'to-dialog', 'del-dialog'])

const onClose = () => {
    emit('on-Close')
}

const dialogMore = () => {
    emit('dialog-more')
}

const newDailog = () => {
    emit('new-dialog')
}

const todailog = (event: DragEvent, index: any) => {
    console.log(index)
    emit('to-dialog', DragEvent, index)
}

const deldailog = (DragEvent: any) => {
    emit('del-dialog', DragEvent)
}

const convertTimestamp = (isoString: any) => {
    emit('convert-time', isoString)
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
