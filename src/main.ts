/** @format */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/dark.css'
import Antd from 'ant-design-vue'
import EChart from './libs/echarts'
import 'ant-design-vue/dist/reset.css'
import Icon from 'ant-design-vue'
// import VueOfficePreview from 'vue-office-preview';

const app = createApp(App)

app.use(router).use(Antd).use(EChart).mount('#app')
