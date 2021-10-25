<template>
  <div
    id="barChart"
    ref="barChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/shine') // echarts theme
import resize from './mixins/resize'
import { EChartCommon } from '@/utils/echart.common'

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
        /* 图例位置 值：top/right/bottom/topCenter */
        showLegendPosition: {
            type: String,
            default: 'topLeft'
        },
        xAxisLabelWraps: {
            type: Boolean,
            default: false
        },
      axisLineFlag: {
          type: Boolean,
          default: false
      },
      xAxisLabelRich: {
          type: Object,
          default: () => {}
      },
      xAxisLabelRichFlag: {
          type: Boolean,
          default: false
      },
        shwoXAxisSplitLine: {
            type: Boolean,
            default: true
        },
      shwoXAxisLine: {
        type: Boolean,
        default: true
      },
      showXAxisLabel: {
        type: Boolean,
        default: true
      },
        shwoYAxisSplitLine: {
            type: Boolean,
            default: false
        },
        shwoAxisLine: {
            type: Boolean,
            default: true
        },
        xAxisLabelWraps: {
            type: Boolean,
            default: false
        },
        color: {
            type: Array,
            default: () => EChartCommon.getDefaultColors()
        },
        xAxisData: {
            type: Array,
            default: () => []
        },
        yAxisData: {
            type: Array,
            default: () => []
        },
        yAxisNames: {
            type: Array,
            default: () => []
        },
        seriesData: {
            type: Array,
            required: true,
            default: () => []
        },
        /* 柱状图方向 值：horizontal/vertical*/
        direction: {
            type: String,
            default: 'horizontal'
        },
        grid: {
            type: Array,
            default: () => [10, 80, 10, 0]
        },
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '240px'
        },
        yAxisName: {
            type: Array,
            default: () => []
        },
        yAxisNamesPadding: {
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
        showDataZoom: {
            type: Boolean,
            default: false
        },
        legendBottom: {
            type: Number,
            default: 0
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
        tooltip: {
            type: Object | Boolean,
            default: false
        },
        legendTop: {
            type: Number | String,
            default: 35
        },
        legendRight: {
            type: Number | String,
            default: 0
        },
        showXAxis: {
            type: Boolean,
            default: true
        },
      showYAxis: {
        type: Boolean,
        default: true
      },
        dataZoomBottom: {
            type: Number,
            default: 10
        },
        nameLocation: {
            type: String
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
            this.chart = echarts.init(this.$refs.barChart, 'shine')
            this.setOptions(this.seriesData)
        },
        setOptions(seriesData) {
            this.chart.setOption({
                title: EChartCommon.getDefaultChartTitle(this.title),
                tooltip: this.tooltip || EChartCommon.getBarNoneAxisPointerTooltip(),
                color: this.color,
                legend:
          this.showLegendPosition === 'topLeft'
              ? EChartCommon.getBarLeftLegend(this.legendData)
              : this.showLegendPosition === 'right'
                  ? EChartCommon.getDefaultRightScrollLegend(this.legendData)
                  : this.showLegendPosition === 'topCenter'
                      ? EChartCommon.getCenterLegend(this.legendData, this.legendTop)
                      : this.showLegendPosition === 'topRight'
                          ? EChartCommon.getTopRightLegend(
                              this.legendData,
                              this.legendTop,
                              this.legendRight
                          )
                          : EChartCommon.getDefaultBottomScrollLegend(
                              this.legendData,
                              this.legendTop,
                              this.legendRight,
                              this.legendBottom
                          ),
                grid: EChartCommon.getCustomBarGrid(
                    this.grid[0],
                    this.grid[1],
                    this.grid[2],
                    this.grid[3]
                ),
                xAxis:
          this.showXAxis === false
              ? { show: false }
              : this.direction === 'horizontal'
                  ? EChartCommon.getDefaultHorizontalBarXAxis(
                      0,
                      this.shwoXAxisSplitLine,
                      this.shwoXAxisLine,
                      this.showXAxisLabel,
                      this.xAxisNames,
                      this.xAxisNamesPadding
                  )
                  : this.xAxisLabelWraps === true
                      ? EChartCommon.getLabelWrapsXAxis(this.xAxisData, 0, 6, this.xAxisNames, this.xAxisNamesPadding, this.nameLocation)
              : this.xAxisLabelRichFlag ?
                this.xAxisLabelRich
              : EChartCommon.getDefaultBarXAxis(this.xAxisData, 0, this.axisLineFlag),
                yAxis:
                  this.showYAxis === false ? { show: false } :
          this.direction === 'horizontal'
              ? EChartCommon.getDefaultHorizontalBarYAxis(
                  this.yAxisData,
                  this.shwoAxisLine
              )
              : this.direction === 'multipleHorizontal'
                  ? EChartCommon.getMultipleHorizontalBarYAxis(
                      this.yAxisData,
                      this.shwoAxisLine,
                      this.shwoYAxisSplitLine,
                      this.yAxisNames
                  )
                  : EChartCommon.getDefaultBarYAxis(this.yAxisNames, this.yAxisNamesPadding, this.shwoYAxisSplitLine),
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
