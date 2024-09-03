/** @format */

import type { UserInfo } from '@/types/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const info = ref<UserInfo>({
        chance: { totalChatChance: 0, level: 0, levelExpiredAt: '' },
        name: '',
        phone: '',
        avatar: ''
    })

    return { info }
})
