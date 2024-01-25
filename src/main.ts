import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import "@icon-park/vue-next/styles/index.css";
import "highlight.js/styles/dark.css";
import Dxui from 'vue3-dxui' // 导入
import 'vue3-dxui/dxui/dxui.css' // 全局样式导入
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { LoadingOutlined  } from '@ant-design/icons';

const app = createApp(App);

app.use(router).use(Dxui).use(Antd).use(LoadingOutlined).mount("#app");
