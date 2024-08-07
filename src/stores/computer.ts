/** @format */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComputerStore = defineStore('isComputer', () => {
    const val = ref<boolean>(false)

    return { val }
})
