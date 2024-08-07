<!-- @format -->

<template>
    <div v-if="props.generating" @click="emitStop" class="stop-container">
        <div class="stop">
            <div class="icon-container">
                <svg
                    t="1708590117036"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4223"
                    width="26"
                    height="26"
                >
                    <path
                        d="M512 170.7008a341.3504 341.3504 0 1 0 0 682.6496 341.3504 341.3504 0 0 0 0-682.6496zM85.3504 512a426.6496 426.6496 0 1 1 853.3504 0 426.6496 426.6496 0 0 1-853.3504 0z m341.3504-149.2992c-35.328 0-64 28.672-64 64v170.6496c0 35.328 28.672 64 64 64h170.6496c35.328 0 64-28.672 64-64V426.7008c0-35.328-28.672-64-64-64H426.7008z"
                        p-id="4224"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>
            <div>停止响应</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ generating: boolean }>()
const emit = defineEmits<{ stopChating: [] }>()

function emitStop() {
    emit('stopChating')
}
</script>

<style lang="scss" scoped>
.stop-container {
    z-index: 999;
    background-color: (0, 0, 0, 0);
    left: 0px;
    right: 0px;
    position: fixed;
    bottom: 70px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 0%;
    flex-direction: row;
    margin-bottom: 0.5rem /* 8px */;
    margin-top: 1rem /* 16px */;
    margin-bottom: 1rem /* 16px */;
    color: rgb(71 85 105);
    line-height: 1.625;

    .stop {
        background-color: rgba(41, 41, 41, 0.811);
        font-size: 15px;
        border-radius: 6px;
        color: white;
        padding: 0.25rem 2.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .icon-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 0.5rem /* 8px */;
        }
    }
}
</style>
