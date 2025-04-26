<!-- @format -->

<template>
    <a-modal
        :footer="null"
        class="pay-modal"
        :width="680"
        v-model:open="payModalVisible"
        :title="selectedGood.title"
        :afterClose="handleChargeOk"
    >
        <div v-if="!payResultVisible" class="modal-content">
            <section class="modal-left">
                <header class="modal-title">您正在购买《LeChat》{{ selectedGood.title }}</header>
                <div class="modal-price">
                    支付金额:
                    <span>￥{{ selectedGood.price }}</span>
                </div>
                <div class="modal-benefits-title">解锁权益：</div>
                <ul class="modal-benefits-list">
                    <li v-for="(benefit, idx) in selectedGood.description" :key="idx" class="modal-benefit-item">
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
                        <span>{{ benefit }}</span>
                    </li>
                </ul>
            </section>
            <section class="modal-right">
                <div class="pay-method">
                    <img
                        class="pay-method-icon"
                        src="data:image/png;base64,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"
                        alt="微信支付"
                    />
                    <span class="pay-method-label">微信支付</span>
                </div>
                <div class="pay-qrcode">
                    <a-spin :spinning="!shopQrcode">
                        <img v-if="shopQrcode" :src="shopQrcode" alt="支付二维码" />
                    </a-spin>
                </div>
            </section>
        </div>
        <a-result
            class="modal-result"
            v-show="payResultVisible"
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
import { computed } from 'vue'

const props = defineProps<{ selectedGood: ShopList; isPayResultOpen: boolean; lastTransactionId: string }>()

const emit = defineEmits<{ chargeOk: [] }>()

const shopQrcode = defineModel<string>('shopQrcode', { required: true })
const payModalVisible = defineModel<boolean>('isPayModalOpen', { required: true })

const payResultVisible = computed(() => props.isPayResultOpen)
const selectedGood = computed(() => props.selectedGood)
const lastTransactionId = computed(() => props.lastTransactionId)

function handleChargeOk() {
    emit('chargeOk')
}
</script>

<style lang="scss" scoped>
.pay-modal {
    .ant-modal-content {
        border-radius: 18px;
        overflow: hidden;
    }
    .ant-modal-header {
        border-radius: 18px 18px 0 0;
    }
    .ant-modal-body {
        padding: 0;
    }
    .modal-content {
        display: flex;
        flex-direction: row;
        padding: 24px 16px;
        gap: 24px;
        background: #f7fafc;
        border-radius: 0 0 18px 18px;
        min-height: 340px;
        @media (max-width: 600px) {
            flex-direction: column;
            gap: 0;
            padding: 16px 4px;
        }
    }
    .modal-left {
        flex: 1.2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-right: 16px;
        @media (max-width: 600px) {
            padding-right: 0;
        }
        .modal-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #222;
        }
        .modal-price {
            font-size: 1.3rem;
            color: #12b886;
            font-weight: 700;
            margin-bottom: 8px;
            span {
                font-size: 1.5rem;
            }
        }
        .modal-benefits-title {
            font-size: 1rem;
            margin: 10px 0 4px 0;
            color: #666;
        }
        .modal-benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
            .modal-benefit-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.98rem;
                color: #2d7a46;
                margin-bottom: 4px;
                svg {
                    color: #16a34a;
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
    .modal-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        @media (max-width: 600px) {
            margin-top: 18px;
        }
        .pay-method {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            .pay-method-icon {
                width: 28px;
                height: 28px;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(18, 184, 134, 0.08);
            }
            .pay-method-label {
                font-size: 1.1rem;
                font-weight: 500;
                color: #222;
            }
        }
        .pay-qrcode {
            background: #f3f4f6;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(18, 184, 134, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 200px;
            img {
                width: 180px;
                height: 180px;
                border-radius: 8px;
                object-fit: contain;
                background: #fff;
            }
            @media (max-width: 600px) {
                width: 100%;
                max-width: 260px;
                height: auto;
                img {
                    width: 100%;
                    max-width: 220px;
                    height: auto;
                    max-height: 220px;
                }
            }
        }
    }
    .modal-result {
        padding: 32px 0 0 0;
        .ant-result-title {
            font-size: 1.3rem;
            color: #16a34a;
        }
        .ant-result-subtitle {
            font-size: 1rem;
            color: #666;
        }
    }
}
</style>
