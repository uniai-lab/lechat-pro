<!-- @format -->
<template>
    <a-modal
        v-model:open="isChargeOpen"
        :width="props.isComputer ? '960px' : '90%'"
        :afterClose="handleChargeOk"
        :footer="null"
        title="充值"
        class="charge-modal"
    >
        <a-row :gutter="{ lg: 32, md: 16, sm: 8, xs: 4 }" class="basic-row">
            <a-col v-for="(item, index) in props.shopList" :key="index" :xs="24" :sm="24" :md="12" :lg="6">
                <div @click="selectItem(item)" class="cols">
                    <div class="title">{{ item.title }}</div>
                    <div class="price">￥{{ item.price }}</div>
                    <div v-for="(role, roleIndex) in item.description" :key="roleIndex" class="description">
                        <div class="logo">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>{{ role }}</span>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>

        <div class="tips">
            <span>*注意：</span>
            文件上传消耗
            <b>1</b>
            次对话，图片生成消耗
            <b>10</b>
            次对话。
            <b>不同模型消耗的次数不同！</b>
            <br />
            <a-button @click="openCostTable" type="link">购买前请点此查询模型消费对照表</a-button>
        </div>
        <div class="contact">如果您遇到了问题，请联系《AI乐聊》微信小程序客服</div>
    </a-modal>

    <CostTable v-if="isCostTableOpen" @close="handleCloseCost" />
    <PayModal
        :selected-good="selectedGood"
        :is-pay-result-open="isPayResultOpen"
        :last-transaction-id="lastTransactionId"
        @charge-ok="handlePaymentComplete"
        v-model:shop-qrcode="shopQRcode"
        v-model:is-pay-modal-open="isPayModalOpen"
    >
        <canvas ref="canvasConfetti" class="canvas"></canvas>
    </PayModal>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, defineProps, defineEmits, defineModel } from 'vue'
import { message } from 'ant-design-vue'
import confetti from 'canvas-confetti'
import { httppay } from '@/common/request'
import CostTable from './CostTable.vue'
import PayModal from './PayModal.vue'
import type { ShopList } from '@/types/interfaces'

interface PaymentResponse {
    status: number
    data: { base64: string; transactionId: string; id: string; status?: number }
}

const props = defineProps<{ isComputer: boolean; shopList: ShopList[] }>()

const emit = defineEmits<{ closeCharge: []; getUserInfo: [] }>()

const isChargeOpen = defineModel<boolean>({ required: true })
const selectedGood = ref<ShopList>({ id: 0, price: 0, title: '', rolelist: [], description: '' })
const canvasConfetti = ref<HTMLCanvasElement | null>(null)
const lastTransactionId = ref<string>('')
const isPayModalOpen = ref<boolean>(false)
const isPayResultOpen = ref<boolean>(false)
const shopQRcode = ref<string>('')
const isCostTableOpen = ref<boolean>(false)
const stopMonitoringFunction = ref<(() => void) | undefined>(undefined)

function getUserInfo() {
    emit('getUserInfo')
}

function openCostTable() {
    emit('closeCharge')
    isCostTableOpen.value = true
}

async function selectItem(item: ShopList) {
    isPayModalOpen.value = true
    isChargeOpen.value = false
    selectedGood.value = item

    try {
        const res = await httppay('create', { type: 'wechat', id: item.id }, 'POST')
        const data = (await res.json()) as PaymentResponse

        if (data.status === 1) {
            shopQRcode.value = data.data.base64
            lastTransactionId.value = data.data.transactionId
            stopMonitoringFunction.value = monitorPayment(data.data.id)
        }
    } catch (error) {
        message.error('获取二维码失败')
        console.error(error)
    }
}

function monitorPayment(paymentId: string) {
    const intervalId = setInterval(async () => {
        try {
            const response = await httppay(`check?id=${paymentId}`, 'get')
            const payRes = (await response.json()) as PaymentResponse

            if (payRes?.data?.status === 1) {
                clearInterval(intervalId)
                await triggerPaymentSuccess()
                isPayModalOpen.value = false
                isPayResultOpen.value = false
                isChargeOpen.value = false
                isCostTableOpen.value = false
                getUserInfo()
            }
        } catch (error) {
            console.error('Error monitoring payment:', error)
        }
    }, 3000)

    return () => clearInterval(intervalId)
}

async function triggerPaymentSuccess() {
    requestAnimationFrame(() => {
        if (!canvasConfetti.value) return

        const canvasScan = confetti.create(canvasConfetti.value)
        const shapes: ('circle' | 'square')[] = ['circle', 'circle', 'square']
        const end = Date.now() + 500 // 0.5 seconds

        function frame() {
            canvasScan({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, shapes })
            canvasScan({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, shapes })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        frame()
    })
}

function handlePaymentComplete() {
    if (!isPayResultOpen.value) {
        isChargeOpen.value = true
    }
    isPayResultOpen.value = false
    shopQRcode.value = ''
    stopMonitoringFunction.value?.()
}

function handleCloseCost() {
    isCostTableOpen.value = false
    isChargeOpen.value = true
}

function handleChargeOk() {
    // Function preserved for future implementation
}

onBeforeUnmount(() => {
    stopMonitoringFunction.value?.()
})
</script>

<style lang="scss" scoped>
.charge-modal {
    .ant-modal-content {
        border-radius: 18px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        background: linear-gradient(135deg, #fffbe6 0%, #f7f7fa 100%);
        @media (max-width: 768px) {
            padding: 12px 4px 18px 4px;
        }
    }
    .ant-modal-header {
        border-radius: 18px 18px 0 0;
        background: transparent;
        border-bottom: none;
        text-align: center;
    }
    .ant-modal-title {
        font-size: 22px;
        font-weight: 700;
        color: #e2b460;
        letter-spacing: 1px;
        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
}

.canvas {
    z-index: 999999;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.basic-row {
    .cols {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(135deg, #fffbe6 60%, #f7f7fa 100%);
        border-radius: 16px;
        border: 2px solid #f0e6d2;
        box-shadow: 0 2px 12px 0 rgba(226, 180, 96, 0.07);
        padding: 28px 18px 22px 18px;
        margin: 0.5rem 0.25rem;
        cursor: pointer;
        transition:
            box-shadow 0.2s,
            border-color 0.2s,
            transform 0.15s,
            background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        min-height: 180px;

        &:hover {
            border-color: #e2b460;
            box-shadow: 0 4px 24px 0 rgba(226, 180, 96, 0.18);
            transform: translateY(-2px) scale(1.07);
            background: linear-gradient(135deg, #fffbe6 0%, #ffe9b6 100%);
        }

        .title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 8px 0 6px 0;
            letter-spacing: 0.5px;
            @media (max-width: 768px) {
                font-size: 16px;
            }
        }
        .price {
            font-size: 26px;
            margin: 6px 0 10px 0;
            color: #e2b460;
            font-weight: 700;
            letter-spacing: 1px;
            text-shadow: 0 1px 0 #fffbe6;
            @media (max-width: 768px) {
                font-size: 20px;
            }
        }
        .description {
            font-size: 13px;
            width: 92%;
            margin: 0 auto 2px auto;
            color: #666;

            .logo {
                display: flex;
                align-items: center;
                margin-top: 0.25rem;
                gap: 0.5em;

                svg {
                    height: 1.2rem;
                    width: 1.2rem;
                    color: #16a34a;
                    flex-shrink: 0;
                }
                span {
                    flex: 1;
                    font-size: 13px;
                    color: #444;
                    word-break: break-all;
                }
            }
        }
        @media (max-width: 768px) {
            padding: 18px 8px 14px 8px;
            min-height: 140px;
        }
    }
}

.tips {
    text-align: center;
    margin-top: 28px;
    font-size: 14px;
    color: #b48a2c;
    background: #fffbe6;
    border-radius: 10px;
    padding: 10px 0 8px 0;
    box-shadow: 0 1px 6px 0 rgba(226, 180, 96, 0.06);

    b {
        color: #e2b460;
        font-weight: 700;
        margin: 0 2px;
    }
    span {
        color: #b48a2c;
        font-weight: 500;
    }
    .ant-btn-link {
        color: #e2b460;
        font-weight: 600;
        margin-top: 4px;
        font-size: 13px;
    }
    @media (max-width: 768px) {
        font-size: 13px;
        padding: 7px 0 6px 0;
    }
}

.contact {
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
    color: #888;
    letter-spacing: 0.2px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
}
</style>
