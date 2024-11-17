/** @format */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('ifLogin', () => {
    const val = ref<boolean>(false)

    return { val }
})
