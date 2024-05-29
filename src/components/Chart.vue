<template>
  <div class="chart-wrap" ref="chartRef"></div>
</template>

<script setup lang=ts>
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{ option: object }>();
const chartRef = ref<HTMLElement | null>();
let chart: ReturnType<typeof echarts.init> | null = null;


function initChart(data?: any, clearCache = false) {
  const opt = data || props.option;
  if (data || props.option) {
    chart?.setOption(data || props.option, clearCache);
  }
}

function resizeChart() {
  chart?.resize({});
}

watch(() => props.option, val => val && initChart(val), { deep: true });

onMounted(() => {
  chart = echarts.init(chartRef.value as HTMLElement);
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  chart?.dispose();
  chart = null;
});
// defineExpose()
// expose({
//   chartRef,
//   initChart
// });

</script>

<style scoped lang="scss">
.chart-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
