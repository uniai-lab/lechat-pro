<!-- @format -->

<template>
    <KGTopBar :user-info="user.info" :if-computer="isComputer.val"></KGTopBar>
    <div>1</div>
</template>

<script setup lang="ts">
import KGTopBar from '@/KGcomponents/TopBar/KGTopBar.vue'
import { useComputerStore } from '@/stores/isComputer'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const user = useUserStore()
const isComputer = useComputerStore()

// history dialogue
const isHistoryDrawerOpen = ref<boolean>(false)
const historyDialogue = ref<any[]>([])
const dialogueId = ref<number>(0)
const dialogueIndex = ref<number>(0)
const newDialogueClock = ref<boolean>(false)

function showHistroyDrawer() {
    isHistoryDrawerOpen.value = true
}
function closeHistoryDrawer() {
    isHistoryDrawerOpen.value = false
}
async function getHistoryDialogueList(lastId: number = 0, pageSize: number = 10, id: number | null = null) {
    let data = []
    try {
        if (upLoading.value) return
        upLoading.value = true

        const adata: any = await http('list-dialog', { lastId, pageSize, id }, 'POST')
        const res = await adata.json()

        if (res.status == -1) {
            message.error('获取对话失败')
            console.log(res.msg)

            return clearInfo()
        }

        if (res.status === 1) {
            data = res.data
        } else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('获取对话失败')
        console.log(e.msg)
    } finally {
        upLoading.value = false
    }
    return data
}
async function onDialogueLoadMore() {
    let lastdialgid = historyDialogue.value[historyDialogue.value.length - 1].id
    let data: any = await getHistoryDialogueList(lastdialgid, 10)
    if (data.length != 0) {
        historyDialogue.value = [...historyDialogue.value, ...data]
    } else {
        message.info('没有更多了')
    }
}
async function newDialogue() {
    if (newDialogueClock.value == false) {
        newDialogueClock.value = true
        try {
            const adata: any = await http('add-dialog', {}, 'GET')
            const res = await adata.json()

            if (res.status == -1) {
                message.error('新建对话失败')
                console.log(res.msg)
                clearInfo()
            } else if (res.status == 1) {
                message.success('新建对话成功')
                const dialogList = await getHistoryDialogueList()
                historyDialogue.value = dialogList
            }
            await toLatestDialogue(res.data.id, 0)
        } finally {
            newDialogueClock.value = false
        }
    }
}
async function toLatestDialogue(id: number, index: number) {
    dialogueId.value = id
    dialogueIndex.value = index

    try {
        aChat.value = []

        const data: any = await getChatList(0, 10, id)

        if (data.length === 0) {
            aChat.value = [
                {
                    chatId: 0,
                    avatar: '',
                    content: commonContent.content,
                    dialogId: 0,
                    isEffect: true,
                    model: choseModel.value[0],
                    resourceId: null,
                    role: 'assistant',
                    subModel: choseModel.value[1]
                }
            ]
        }
        for (const item of data) {
            dialogueId.value = item.dialogId
            aChat.value.push(item)
        }
        isHistoryDrawerOpen.value = false
        window.scrollTo(0, document.body.scrollHeight)
    } catch (e: any) {
        message.error('切换对话失败')
        console.log(e.msg)
    } finally {
        ifFirstLoad.value = false
        allFinished.value = false
    }
}
async function delDialogue(id: number) {
    try {
        const adata: any = await http(`del-dialog?id=${id}`, {}, 'GET')
        const res = await adata.json()

        if (res.status == -1) {
            message.error('删除对话失败')
            console.log(res.msg)

            clearInfo()
            refreshData()
        } else if (res.status == 1) {
            message.success('删除对话成功')

            historyDialogue.value = await getHistoryDialogueList()

            if (id == dialogueId.value) {
                dialogueId.value = historyDialogue.value[0].id

                toLatestDialogue(dialogueId.value, 0)
            }

            refreshData()
        } else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('删除对话失败')
        console.log(e.msg)
    }
}
</script>
