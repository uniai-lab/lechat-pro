/** @format */

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home.vue')
        },
        {
            path: '/chatKG',
            name: 'chatKG',
            component: () => import('@/views/chatKG.vue')
        }
    ]
})

export default router
