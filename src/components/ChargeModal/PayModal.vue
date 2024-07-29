<!-- @format -->

<template>
    <a-modal
        :footer="null"
        class="pay-modal"
        v-model:open="isPayModalOpen"
        :title="props.selectedGood.title"
        :afterClose="emitChargeOk"
    >
        <div v-if="!isPayResultOpen" class="modal-body">
            <div class="left-body">
                <div class="left-title">您正在购买《LeChatPro》{{ props.selectedGood.title }}</div>

                <div class="price">支付金额:￥{{ props.selectedGood.price }}</div>
                <div class="benefit-title">解锁权益：</div>

                <div v-for="arole in props.selectedGood.description">
                    <div class="qrcode">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>
                            {{ arole }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="right-body">
                <div class="wx-pay-title">
                    <div>
                        <img
                            src="data:image/png;base64,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"
                            alt="qrcode"
                        />
                        <span>微信支付</span>
                    </div>
                </div>

                <div class="wx-pay-qrcode">
                    <a-spin :spinning="!shopQRcode">
                        <img :src="shopQRcode" />
                    </a-spin>
                </div>
            </div>
        </div>

        <a-result
            class="modal-result"
            v-show="isPayResultOpen"
            status="success"
            title="支付成功"
            :sub-title="`订单编号:${lastTransactionId} , 可能存在1-3分钟的延迟，如长时间没有到账，请联系客服`"
        >
            <slot></slot>
        </a-result>
    </a-modal>
</template>

<script lang="ts" setup>
import type { ShopList } from '@/types/interfaces'

const props = defineProps<{
    selectedGood: ShopList
    isPayResultOpen: boolean
    lastTransactionId: string
}>()
const emit = defineEmits<{ chargeOk: [] }>()

const shopQRcode = defineModel<string>('shopQrcode', { required: true })
const isPayModalOpen = defineModel<boolean>('isPayModalOpen', { required: true })

function emitChargeOk() {
    emit('chargeOk')
}
</script>

<style lang="scss" scoped>
.pay-modal {
    height: 400px;

    .modal-body {
        display: flex;
        flex-direction: row;
        padding: 10px;
        justify-content: space-between;

        .left-body {
            display: flex;
            flex-direction: column;

            .left-title {
                margin-top: 0.5rem /* 8px */;
                font-size: 16px;
            }

            .price {
                font-size: 20px;
                margin-top: 5px;
                color: rgb(1 176 133);
                font-weight: 500;
            }

            .benefit-title {
                margin-top: 0.5rem;
                margin-bottom: 0.25rem;
                font-size: 16px;
            }

            .qrcode {
                height: 2rem;
                gap: 0.25rem;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                font-size: 0.875rem /* 14px */;
                line-height: 1.25rem /* 20px */;

                svg {
                    height: 1.25rem /* 20px */;
                    width: 1.25rem /* 20px */;
                    color: rgb(21 128 61);
                }
            }
        }

        .right-body {
            display: flex;
            flex-direction: column;

            .wx-pay-title {
                display: flex;
                flex-direction: row;
                margin-top: 0.5rem /* 8px */;
                width: 200px;
                justify-content: center;
                align-items: center;

                div {
                    display: flex;

                    img {
                        width: 25px;
                        height: 25px;
                    }

                    span {
                        margin-left: 0.25rem /* 4px */;
                        font-size: 16px;
                        font-weight: 500;
                    }
                }
            }

            .wx-pay-qrcode {
                background-color: rgb(243 244 246);
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 200px;
                width: 200px;
                align-items: center;

                img {
                    height: 200px;
                    width: 200px;
                }
            }
        }
    }

    .modal-result {
        position: relative;
    }
}
</style>
