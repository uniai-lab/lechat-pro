<template>
    <!-- <div class="flex-1">
      <textarea class="w-full h-full border border-gray-400" v-model="value" />
    </div> -->
    <div style="width: 100%;">
    <svg class="flex-1 " style="width: 100%;" height="100%" ref="svgRef" ></svg>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUpdated, } from 'vue';
  import { Transformer } from 'markmap-lib';
  import { Markmap } from 'markmap-view';

  const transformer = new Transformer();
  const initValue = `# 122
  
  - beautiful
  - useful
  - easy
  - interactive
  `;
  
  export default {
    name: 'App',
    props:['tree'],
    setup(props) {
      const svgRef = ref();
      const value = ref(props.tree);
      let mm;
  
      const update = () => {
        const { root } = transformer.transform(value.value);
        
        mm.setData(root);
        mm.fit();
      };
  
      onMounted(() => {
        mm = Markmap.create(svgRef.value);
        console.log(props);

        update();
      });
      onUpdated(update);
      return {
        svgRef,
        value,
      };
    },
  };
  </script>
  