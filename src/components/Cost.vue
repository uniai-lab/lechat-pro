<!-- @format -->

<template>
    <div class="cost" @click="close">
        <table class="table-auto">
            <thead>
                <tr>
                    <th>供应商</th>
                    <th>模型</th>
                    <th>消耗次数</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, index) in provider" :key="index">
                    <tr v-for="(item2, index2) in models[item]" :key="index2">
                        <td v-if="index2 === 0" :rowspan="models[item].length">{{ item }}</td>
                        <td :class="item2.chance >= 20 ? 'red' : ''">{{ item2.model }}</td>
                        <td :class="item2.chance >= 20 ? 'red' : ''">{{ item2.chance }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { http } from '@/common/request.js'
import { onMounted, ref } from 'vue'
import { notification } from 'ant-design-vue'
const emit = defineEmits(['close'])
const provider = ref([])
const models = ref({})

function close() {
    emit('close')
}

async function load() {
    try {
        const res = await http('model-cost', {}, 'GET')
        const data = await res.json()
        if (data.status === 1) {
            for (const item of data.data) {
                provider.value.push(item.provider)
                models.value[item.provider] = []
                for (const item2 of item.model) if (item2.chance > 1) models.value[item.provider].push(item2)
            }
        } else throw new Error(data.message)
    } catch (e) {
        notification.error({ duration: 3000, description: 'Error', message: e.message })
    }
}

onMounted(load)
</script>
<style lang="scss" scoped>
.cost {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    table {
        max-width: 800px;
        width: 100%;
        border-collapse: collapse; /* 使表格线更清晰 */
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        thead {
            font-size: 0.9em;
            tr {
                background-color: #009879;
                color: #ffffff;
                text-align: center;
                th {
                    padding: 12px 15px;
                    text-align: center;
                }
            }
        }
        tbody {
            font-size: 0.75em;
            tr {
                border-bottom: 1px solid #dddddd;
                background-color: #f3f3f3;
                td {
                    padding: 12px 15px;
                    text-align: center;
                    &.red {
                        color: red;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
