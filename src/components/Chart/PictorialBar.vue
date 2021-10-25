<template>
  <div
    id="pictorialBarChart"
    ref="pictorialBarChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/shine"); // echarts theme
import resize from "./mixins/resize";
import { EChartCommon } from "@/utils/echart.common";

export default {
  mixins: [resize],
  props: {
    title: {
      type: String,
      default: "chart",
    },
    yAxisData: {
      type: Array,
      default: () => [],
    },
    seriesData: {
      type: Array,
      required: true,
      default: () => [],
    },
    grid: {
      type: Array,
      default: () => [10, 80, 10, 0],
    },
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "240px",
    },
    yAxisName: {
      type: Array,
      default: () => [],
    },
    maxData: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    seriesData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    const _this = this;
    window.onresize = function () {
      _this.chart.resize();
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.pictorialBarChart, "shine");
      this.setOptions(this.seriesData);
    },
    setOptions(seriesData) {
      this.chart.setOption({
        title: EChartCommon.getDefaultChartTitle(this.title),
        grid: EChartCommon.getCustomBarGrid(
          this.grid[0],
          this.grid[1],
          this.grid[2],
          this.grid[3]
        ),
        color: ["#757DE8", "#D88079"],
        xAxis: EChartCommon.getDefaultPictorialBarXAxis(this.maxData),
        yAxis: EChartCommon.getDefaultPictorialBarYAxisData(this.yAxisData),
        series: seriesData,
      });
    },
  },
};
</script>
