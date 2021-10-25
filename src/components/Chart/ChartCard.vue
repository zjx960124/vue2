<template>
  <div class="card">
    <div class="cardHeader">
      <img
        class="leftImg"
        src="../../assets/other_images/xiaobiaoti_jianbian.png"
      />
      <img
        v-if="showRightImg"
        class="rightImg"
        src="../../assets/other_images/zhuangshi_xiejiaojuxing.png"
      />
      <div :class="`title ${titleClass}`">{{ title }}</div>
    </div>
    <slot name="chart" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    showRightImg: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
