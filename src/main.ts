/** @format */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/dark.css'
import Antd from 'ant-design-vue'
import EChart from './libs/echarts'
import 'ant-design-vue/dist/reset.css'

// import VueOfficePreview from 'vue-office-preview';

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(Antd).use(EChart).mount('#app')
