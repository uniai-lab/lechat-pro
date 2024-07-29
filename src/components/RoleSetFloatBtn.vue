<!-- @format -->

<template>
    <a-float-button v-if="!props.isComputer" @click="emitShowRoleSet" type="default" class="role-set-float-btn">
        <template #icon>
            <div class="btn-icon">
                <svg
                    t="1709611594182"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="19888"
                    width="20"
                    height="20"
                >
                    <path
                        d="M582.464 228.202667L490.666667 192l91.797333-36.202667L618.666667 64l36.202666 91.797333L746.666667 192l-91.797334 36.202667L618.666667 320l-36.202667-91.797333z m213.333333-64L704 128l91.797333-36.202667L832 0l36.202667 91.797333L960 128l-91.797333 36.202667L832 256l-36.202667-91.797333z m64 213.333333L768 341.333333l91.797333-36.202666L896 213.333333l36.202667 91.797334L1024 341.333333l-91.797333 36.202667L896 469.333333l-36.202667-91.797333zM512 42.666667v85.333333C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384h85.333333c0 259.2-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m-181.013333 670.165333l60.330666-60.330667a170.666667 170.666667 0 0 0 241.365334 0l60.330666 60.330667c-99.968 99.989333-262.058667 99.989333-362.026666 0zM362.666667 533.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m298.666666 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                        fill="#000000"
                        p-id="19889"
                    ></path>
                </svg>
            </div>
        </template>
    </a-float-button>
</template>

<script setup lang="ts">
const props = defineProps<{ isComputer: boolean }>()
const emit = defineEmits<{ showRoleSet: [] }>()

function emitShowRoleSet() {
    emit('showRoleSet')
}
</script>

<style lang="scss" scoped>
.role-set-float-btn {
    margin-bottom: 70px;
    margin-right: 0px;

    .btn-icon {
        font-size: '20px';
        display: 'flex';
        flex-direction: 'row';
        justify-content: 'center';
    }
}
</style>
