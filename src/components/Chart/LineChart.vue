<template>
  <div
    id="lineChart"
    ref="lineChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/shine') // echarts theme
import { EChartCommon } from '@/utils/echart.common'
import resize from './mixins/resize'

export default {
    mixins: [resize],
    props: {
        title: {
            type: String,
            default: 'chart'
        },
        legendData: {
            type: Array,
            default: () => []
        },
        color: {
            type: Array,
            default: () => EChartCommon.getDefaultColors()
        },
        xAxisData: {
            type: Array,
            default: () => []
        },
        yAxisNames: {
            type: Array,
            default: () => []
        },
        xAxisNames: {
            type: String,
            default: ''
        },
        xAxisNamesPadding: {
            type: Array,
            default: () => []
        },
        yAxisNamesPadding: {
            type: Array,
            default: () => []
        },
        seriesData: {
            type: Array,
            required: true,
            default: () => []
        },
        className: {
            type: String,
            default: 'chart'
        },
        xAxisLabelWraps: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '240px'
        },
        dataZoomStart: {
            type: Number,
            default: 0
        },
        dataZoomEnd: {
            type: Number,
            default: 30
        },
        dataZoomStartValue: {
            type: Number | Boolean,
            default: false
        },
        dataZoomEndValue: {
            type: Number | Boolean,
            default: false
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        showDataZoom: {
            type: Boolean,
            default: false
        },
        grid: {
            type: Array,
            default: () => [10, 60, 10, 0]
        },
        legendTop: {
            type: Number,
            default: 0
        },
        legendRight: {
            type: Number,
            default: 0
        },
      legendBottom: {
        type: Number,
        default: 0
      },
      tooltip: {
          type: Object,
          default: () => {}
      },
      dataZoomBottom: {
          type: Number,
          default: 10
      }
    },
    data() {
        return {
            chart: null
        }
    },
    watch: {
        seriesData: {
            deep: true,
            handler(val) {
                this.setOptions(val)
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
        const _this = this
        window.onresize = function () {
            _this.chart.resize()
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.lineChart, 'shine')
            this.setOptions(this.seriesData)
        },
        setOptions(seriesData) {
            this.chart.setOption({
                title: EChartCommon.getDefaultChartTitle(this.title),
                tooltip: this.tooltip ? this.tooltip : EChartCommon.getDefaultLineTooltip(),
                color: this.color,
                legend:
          this.legendData.length > 0
              ? EChartCommon.getDefaultBottomScrollLegend(
                  this.legendData,
                  this.legendTop,
                  this.legendRight,
                  this.legendBottom
              )
              : { show: false },
                grid: EChartCommon.getCustomBarGrid(
                    this.grid[0],
                    this.grid[1],
                    this.grid[2],
                    this.grid[3]
                ),
                xAxis:
          this.xAxisLabelWraps === true
              ? EChartCommon.getLabelWrapsXAxis(this.xAxisData, 0, 10, this.xAxisNames, this.xAxisNamesPadding)
              : EChartCommon.getDefaultLineXAxis(this.xAxisData, this.xAxisNames),
                yAxis: EChartCommon.getDefaultLineYAxis(this.yAxisNames, this.yAxisNamesPadding),
                dataZoom: this.showDataZoom
                    ? this.dataZoomEndValue ? EChartCommon.getValueDataZoom(
                        this.legendData,
                        this.dataZoomBottom,
                        this.dataZoomStartValue,
                        this.dataZoomEndValue
                    ) : EChartCommon.getDefaultDataZoom(
                        this.dataZoomStart,
                        this.dataZoomEnd,
                        this.legendData,
                        this.dataZoomBottom
                    )
                    : [],
                series: seriesData
            })
        }
    }
}
</script>
