<template>
  <div
    id="raDarChart"
    ref="raDarChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/shine"); // echarts theme
import { EChartCommon } from "@/utils/echart.common";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    title: {
      type: String | Array,
      default: "chart",
    },
    legendData: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Array,
      default: () => EChartCommon.getDefaultColors(),
    },
    indicatorData: {
      type: Array,
      required: true,
      default: () => [],
    },
    seriesData: {
      type: Array,
      required: true,
      default: () => [],
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
    autoResize: {
      type: Boolean,
      default: true,
    },
    onlyOne: {
      type: Boolean,
      default: true,
    },
    grid: {
      type: Array,
      default: () => [10, 60, 10, 0],
    },
    legendBottom: {
      type: Number,
      default: 0,
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
      this.chart = echarts.init(this.$refs.raDarChart, "shine");
      this.setOptions(this.seriesData);
    },
    setOptions(seriesData) {
      this.chart.setOption({
        title: this.onlyOne
          ? EChartCommon.getDefaultChartTitle(this.title)
          : EChartCommon.getDefaultRadarsTitle(this.title),
        tooltip: EChartCommon.getDefaultRadarTooltip(),
        color: this.color,
        legend:
          this.legendData.length > 0
            ? EChartCommon.getDefaultBottomScrollLegend(
                this.legendData,
                this.legendBottom
              )
            : { show: false },
        grid: EChartCommon.getCustomBarGrid(
          this.grid[0],
          this.grid[1],
          this.grid[2],
          this.grid[3]
        ),
        radar: this.onlyOne
          ? EChartCommon.getDefaultRadar(this.indicatorData)
          : EChartCommon.getDefaultRadars(this.indicatorData),
        series: seriesData,
      });
    },
  },
};
</script>
