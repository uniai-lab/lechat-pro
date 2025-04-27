<!-- @format -->

<template>
    <div class="cost" @click.self="close">
        <div class="cost-table" @click.stop>
            <span class="close-btn" @click="close">×</span>
            <table>
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
                            <td :class="item2.chance >= 10 ? 'red' : ''">{{ item2.model }}</td>
                            <td>
                                <span :class="item2.chance >= 10 ? 'badge-red' : 'badge'">{{ item2.chance }}</span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { http } from '@/common/request.js'
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const emit = defineEmits(['close'])

interface ModelItem {
    model: string
    chance: number
}

interface ProviderItem {
    provider: string
    model: ModelItem[]
}

type ProviderList = string[]
type ModelsMap = Record<string, ModelItem[]>

const provider = ref<ProviderList>([])
const models = ref<ModelsMap>({})

function close() {
    emit('close')
}

const providerItems = ref<ProviderItem[]>([])

async function load() {
    try {
        const res = await http('web/model-cost', {}, 'GET')
        if (res.status === 1) {
            providerItems.value = res.data as ProviderItem[]
            // 如果还需要 provider 和 models，可以这样赋值：
            provider.value = providerItems.value.map(item => item.provider)
            models.value = Object.fromEntries(
                providerItems.value.map(item => [item.provider, item.model.filter(m => m.chance > 1)])
            )
        } else {
            throw new Error(res.msg)
        }
    } catch (e: any) {
        message.error('请求查询价格失败')
        console.log(e.message)
    }
}

onMounted(() => {
    load()
})
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
    z-index: 999;

    .cost-table {
        position: relative;
        background: #fff;
        border-radius: 16px;
        padding: 32px 24px 24px 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        max-width: 820px;
        width: 90vw;
        max-height: 80vh;
        overflow: auto;
        transition: box-shadow 0.2s;

        .close-btn {
            position: absolute;
            top: 5px;
            right: 15px;
            font-size: 1.5em;
            color: #aaa;
            cursor: pointer;
            transition: color 0.2s;
            z-index: 10;
            &:hover {
                color: #ff4d4f;
            }
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

            thead {
                position: sticky;
                top: 0;
                background: #009879;
                color: #fff;
                z-index: 1;

                tr {
                    th {
                        padding: 14px 18px;
                        font-size: 1em;
                        font-weight: 600;
                        text-align: center;
                        background: #009879;
                        border-bottom: 2px solid #e0e0e0;
                        letter-spacing: 1px;
                    }
                }
            }

            tbody {
                font-size: 0.95em;

                tr {
                    transition: background 0.2s;
                    &:nth-child(even) {
                        background: #f6fafd;
                    }
                    &:hover {
                        background: #e6f7ff;
                    }
                    td {
                        padding: 12px 18px;
                        text-align: center;
                        border-bottom: 1px solid #f0f0f0;
                        font-size: 1em;
                        &.red {
                            color: #ff4d4f;
                            font-weight: bold;
                        }
                    }
                }
            }
        }

        .badge {
            display: inline-block;
            min-width: 32px;
            padding: 2px 10px;
            border-radius: 12px;
            background: #f0f0f0;
            color: #333;
            font-weight: 500;
            font-size: 0.95em;
        }
        .badge-red {
            @extend .badge;
            background: #fff1f0;
            color: #ff4d4f;
            font-weight: bold;
            border: 1px solid #ffccc7;
        }
    }
}
</style>
