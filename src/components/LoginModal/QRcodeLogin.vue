<!-- @format -->

<template>
    <a-form>
        <a-form-item name="qrcode" @click="qrcodeRefresh">
            <div class="title">请使用微信扫一扫</div>
            <div class="centralized-area">
                <QRCode
                    v-if="qrcodeStatus != 'active'"
                    :value="'this ant qrcode is the mask when the real qrcode is expired'"
                    :size="170"
                    :status="qrcodeStatus"
                    :onRefresh="qrcodeRefresh"
                />
                <img v-if="qrcodeStatus == 'active'" class="real-qrcode" :src="qrcodeSource" />
            </div>

            <div class="tail">
                <a-button :size="'small'">点击刷新</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message, QRCode } from 'ant-design-vue'
import { http } from '@/common/request'

const qrcodeToken = defineModel<string>('qrcodeToken', { required: true })
const startGlobalPollingTimer = defineModel<Function>('startGlobalPollingTimer', { required: true })
const qrcodeStatus = ref<'active' | 'loading' | 'expired'>('active')
const qrcodeSource = ref<string>('')
let refreshQRcode: NodeJS.Timeout

onMounted(async () => {
    await getQrcode()
})

const forbidSend = ref<boolean>(false)

async function getQrcode() {
    if (forbidSend.value == false) {
        forbidSend.value = true
        try {
            const res: any = await http('get-qr-code', 'GET')
            const qes = await res.json()

            if (qes.status == 1) {
                qrcodeToken.value = qes.data.token
                qrcodeSource.value = qes.data.code
                qrcodeStatus.value = 'active'
                startGlobalPollingTimer.value()
            } else {
                message.error('获取频繁，请十分钟后再试')
            }
        } catch (error) {
            console.log(error)
            message.error('二维码获取失败')
        } finally {
            forbidSend.value = false
            clearTimeout(refreshQRcode)
            refreshQRcode = setTimeout(() => {
                qrcodeStatus.value = 'expired'
                startGlobalPollingTimer.value(true)
            }, 45000)
        }
    }
}

async function qrcodeRefresh() {
    qrcodeStatus.value = 'loading'
    await getQrcode()
}
</script>

<style lang="scss" scoped>
.title {
    margin-top: 2%;
    text-align: center;
}

.centralized-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .real-qrcode {
        margin: 13px;
        height: 144px;
        width: 144px;
        filter: grayscale(1) brightness(0.6) contrast(500%);
    }
}

.tail {
    text-align: center;
}
</style>
