/** @format */

// /src/libs/echarts.js

import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'

// 注册必须的组件
use([SVGRenderer, PieChart, BarChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

export default {
    install: (app: any) => {
        app.component('v-chart', ECharts)
    }
}
