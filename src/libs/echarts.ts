/** @format */

// /src/libs/echarts.js

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import {
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    SunburstChart,
    BoxplotChart,
    CandlestickChart,
    EffectScatterChart,
    LinesChart,
    HeatmapChart,
    GraphChart,
    ParallelChart,
    FunnelChart,
    GaugeChart,
    PictorialBarChart,
    ThemeRiverChart,
    SankeyChart
} from 'echarts/charts'
import {
    GridComponent,
    PolarComponent,
    GeoComponent,
    SingleAxisComponent,
    ParallelComponent,
    CalendarComponent,
    GraphicComponent,
    ToolboxComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DataZoomComponent,
    VisualMapComponent,
    TimelineComponent,
    MarkPointComponent,
    MarkLineComponent,
    MarkAreaComponent,
    DatasetComponent,
    TransformComponent,
    AxisPointerComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    SVGRenderer,
    // 图表类型
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    SunburstChart,
    BoxplotChart,
    CandlestickChart,
    EffectScatterChart,
    LinesChart,
    HeatmapChart,
    GraphChart,
    ParallelChart,
    FunnelChart,
    GaugeChart,
    PictorialBarChart,
    ThemeRiverChart,
    SankeyChart,
    // 组件
    GridComponent,
    PolarComponent,
    GeoComponent,
    SingleAxisComponent,
    ParallelComponent,
    CalendarComponent,
    GraphicComponent,
    ToolboxComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DataZoomComponent,
    VisualMapComponent,
    TimelineComponent,
    MarkPointComponent,
    MarkLineComponent,
    MarkAreaComponent,
    DatasetComponent,
    TransformComponent,
    AxisPointerComponent
])

export default {
    install: (app: any) => {
        app.component('v-chart', ECharts)
    }
}
