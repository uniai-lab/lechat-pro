<template>
  <div class="flex-1">
    <textarea class="w-full h-full border border-gray-400" v-model="value" />
  </div>
  <svg class="flex-1" ref="svgRef" />
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const transformer = new Transformer();
const initValue = `# markmap

- beautiful
- useful
- easy
- interactive
`;

export default {
  name: 'App',
  data() {
    return {
      value: initValue,
    };
  },
  watch: {
    value: 'update',
  },
  methods: {
    update() {
      const { root } = transformer.transform(this.value);
      this.mm.setData(root);
      this.mm.fit();
    },
  },
  mounted() {
    this.mm = Markmap.create(this.$refs.svgRef);
    this.update();
  },
};
</script>
