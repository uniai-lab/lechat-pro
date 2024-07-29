<!-- @format -->

<template>
    <a-modal
        :width="!props.isComputer ? '80%' : '800px'"
        :footer="null"
        v-model:open="isChargeOpen"
        title="充值"
        :afterClose="handleChargeOk"
    >
        <a-row :gutter="{ lg: 30, md: 10, sm: 10, xs: 5 }" align="middle" justify="center" class="basic-row">
            <a-col v-for="(item, index) in props.shopList" :key="index" :xs="24" :sm="24" :md="12" :lg="6">
                <div @click="choseItem(item)" class="cols">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="price">￥{{ item.price }}</div>
                    <br />
                    <div class="description" v-for="role in item.description">
                        <div class="logo">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                height="30px"
                                width="30px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <div>
                                {{ role }}
                            </div>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>

        <div class="tips">
            *注意：文件上传消耗
            <b>1</b>
            次对话，图片生成消耗
            <b>10</b>
            次对话。
            <b>不同模型消耗的次数不同！</b>
            <br />
            <a-button @click="emitCloseChargeOpenCost" type="link">购买前请点此查询模型消费对照表</a-button>
        </div>
        <div>如果您遇到了问题，请联系《AI乐聊》微信小程序客服</div>
    </a-modal>

    <CostTable v-if="isCostTableOpen" @close="handleCloseCost" />
    <PayModal
        :selected-good="selectedGood"
        :is-pay-result-open="isPayResultOpen"
        :last-transaction-id="lastTransactionId"
        @charge-ok="handchargecodeleOk"
        @test="afterPaySucces"
        v-model:shop-qrcode="shopQRcode"
        v-model:is-pay-modal-open="isPayModalOpen"
    >
        <canvas class="canvas" ref="canvasConfetti"></canvas>
    </PayModal>
</template>

<script lang="ts" setup>
import confetti from 'canvas-confetti'
import { httppay } from '@/common/request'
import CostTable from './CostTable.vue'
import PayModal from './PayModal.vue'
import type { ShopList } from '@/types/interfaces'
import { onBeforeUnmount, ref } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps<{ isComputer: boolean; shopList: ShopList[] }>()
const emit = defineEmits<{ closeCharge: []; getUserInfo: [] }>()

const isChargeOpen = defineModel<boolean>({ required: true })

const selectedGood = ref<ShopList>({ id: 0, price: 0, title: '', rolelist: [], description: '' })
const canvasConfetti = ref<HTMLCanvasElement>()
const lastTransactionId = ref<string>('')

const isPayModalOpen = ref<boolean>(false)
const isPayResultOpen = ref<boolean>(false)
const shopQRcode = ref<string>('')

const isCostTableOpen = ref<boolean>(false)

const stopMonitoringFunction = ref<Function>()

function emitGetUserInfo() {
    emit('getUserInfo')
}

function emitCloseChargeOpenCost() {
    emit('closeCharge')
    isCostTableOpen.value = true
}

async function choseItem(e: ShopList) {
    isPayModalOpen.value = true
    isChargeOpen.value = false

    // change selected goods
    const choseItemIntoE = JSON.parse(JSON.stringify(e))
    selectedGood.value = e

    try {
        const getShopQRcodeIMG: any = await httppay('create', { type: 'wechat', id: choseItemIntoE.id }, 'POST')
        const getShopQRcodeIMGRes = await getShopQRcodeIMG.json()

        if (getShopQRcodeIMGRes.status == 1) {
            shopQRcode.value = getShopQRcodeIMGRes.data.base64

            lastTransactionId.value = getShopQRcodeIMGRes.data.transactionId

            // Open a listening thread to see if the payment is complete
            stopMonitoringFunction.value = monitorPayment(getShopQRcodeIMGRes.data.id)
        }
    } catch (e: any) {
        message.error('获取二维码失败')
        console.error(e)
    }
}

function monitorPayment(paymentId: string) {
    // Set a timer to check the payment status
    const intervalId = setInterval(async () => {
        try {
            const response: any = await httppay(`check?id=${paymentId}`, 'get')
            const payRes = await response.json()

            if (payRes && payRes.data.status === 1) {
                // paid and stop timer
                clearInterval(intervalId)
                await afterPaySucces()

                // here should be a async function but emits is not
                emitGetUserInfo()
            }
        } catch (error) {
            console.error('Error monitoring payment:', error)
        }
    }, 3000)

    // Returns a function to stop listening if needed.
    return () => clearInterval(intervalId)
}

async function afterPaySucces() {
    requestAnimationFrame(() => {
        const canvasScan = confetti.create(canvasConfetti.value)

        function start(canvasScan: confetti.CreateTypes) {
            let end = Date.now() + 0.5 * 1000

            let shapes: ['circle', 'circle', 'square']

            function frame() {
                canvasScan({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: {
                        x: 0
                    },
                    shapes: shapes
                })
                canvasScan({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: {
                        x: 1
                    },
                    shapes: shapes
                })

                if (Date.now() < end) {
                    requestAnimationFrame(frame)
                }
            }

            frame()
        }

        start(canvasScan)
    })
}

async function handchargecodeleOk() {
    if (isPayResultOpen.value == false) {
        isChargeOpen.value = true
    }
    isPayResultOpen.value = false
    shopQRcode.value = ''

    if (stopMonitoringFunction.value) {
        stopMonitoringFunction.value()
    }
}

function handleCloseCost() {
    isCostTableOpen.value = false
    isChargeOpen.value = true
}

function handleChargeOk() {}

onBeforeUnmount(() => {
    if (stopMonitoringFunction.value) {
        stopMonitoringFunction.value()
    }
})
</script>

<style lang="scss" scoped>
.canvas {
    z-index: 999999;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.basic-row {
    width: 100%;
    margin: 30px auto;

    .cols {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-bottom: 20px;
        border-radius: 10px;
        border: 2px solid #cfcfcf;
        cursor: pointer;
        align-items: center;
        position: relative;
        overflow: hidden;
        margin: 0.25rem;

        .title {
            font-size: 16px;
            margin-top: 25px;
        }

        .price {
            font-size: 22px;
            margin-top: 12px;
            color: rgb(226 180 96);
            font-weight: 500;
        }

        .description {
            font-size: 12px;
            width: 85%;
            height: auto;

            .logo {
                display: flex;
                flex-direction: row;
                margin-top: 0.25rem /* 4px */;
                justify-content: start;
                align-items: start;

                svg {
                    height: 1rem /* 16px */;
                    color: rgb(21 128 61);
                }

                div {
                    width: 95%;
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    align-items: start;
                }
            }
        }
    }
    .cols:lhover {
        border: 2px solid #e2b460;
    }
}

.tips {
    text-align: center;
    margin-top: 20px;
}
.tips + div {
    text-align: center;
    margin-top: 5px;
}
</style>
