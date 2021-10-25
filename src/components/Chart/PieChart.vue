<template>
  <div
    id="pieChart"
    ref="pieChart"
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
    /* 饼图类型 值：circularPie/normalPie */
        type: {
            type: String,
            default: 'circularPie'
        },
        title: {
            type: String | Number,
            default: ''
        },
        customTitle: {
            type: Array,
            default: () => []
        },
        subTitle: {
            type: String | Number,
            default: ''
        },
        legendData: {
            type: Array,
            default: () => []
        },
        color: {
            type: Array,
            default: () => EChartCommon.getDefaultColors()
        },
        showLegend: {
            type: Boolean,
            default: true
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
        titleTop: { type: Number | String, default: 'auto' },
        titleLeft: { type: Number | String, default: 'auto' },
        titleBottom: { type: Number | String, default: 'auto' },
        titleRight: { type: Number | String, default: 'auto' },
        // 默认取值：'left','right'
        showLegendPosition: {
            type: String,
            default: 'right'
        },
        legendTop: {
            type: Number | String,
            default: 30
        },
      legendBottom: {
        type: Number | String,
        default: 0
      },
      graphic: {
        type: Object | Function
      },
        tooltip: {
            type: String | Function
        },
        legendLeft: {
            type: Number | String,
            default: 0
        },
        legendRight: {
            type: Number | String,
            default: 0
        },
        showTooltip: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '240px'
        },
        grid: {
            type: Array,
            default: () => [10, 60, 10, 0]
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
            this.chart = echarts.init(this.$refs.pieChart, 'shine')
            const _this = this
            // 鼠标悬浮时触发事件
            this.chart.on('mouseover', function (param) {
                _this.$emit('mouseover', param)
            })
            // 鼠标离开时触发事件
            this.chart.on('mouseout', function (param) {
                _this.$emit('mouseout', param)
            })
            this.setOptions(this.seriesData)
        },
        setOptions(seriesData) {
            this.chart.setOption({
                title:
          this.customTitle.length > 0
              ? this.customTitle
              : this.type === 'circularPie'
                  ? EChartCommon.getDefaultCircularPieChartTitle(
                      this.title.toString(),
                      this.subTitle.toString(),
                      this.titleTop,
                      this.titleLeft,
                      this.titleBottom,
                      this.titleRight,
                  )
                  : this.type === 'circularPieShow'
                      ? EChartCommon.getDefaultCircularPieShowChartTitle(
                          this.title,
                          this.subTitle.toString()
                      )
                      : EChartCommon.getDefaultChartTitle(this.title),
                tooltip: this.showTooltip
                    ? EChartCommon.getDefaultPieTooltip(this.tooltip)
                    : { show: false },
                backgroundColor: 'transparent',
                graphic: this.graphic,
                color: this.color,
                grid: EChartCommon.getDefaultBarGrid(this.grid),
                legend: this.showLegend
                    ? this.showLegendPosition === 'left'
                        ? EChartCommon.getDefaultLeftScrollLegend(
                            this.legendData,
                            this.legendTop,
                            this.legendLeft
                        )
                        : this.showLegendPosition === 'bottom' ?
                      EChartCommon.getDefaultBottomScrollLegend(
                        this.legendData,
                        this.legendTop,
                        this.legendRight,
                        this.legendBottom
                      )
                         : EChartCommon.getDefaultRightScrollLegend(
                            this.legendData,
                            this.legendTop,
                            this.legendRight
                        )
                    : { show: false },
                series: seriesData
            })
        },
        setDispatchAction(type, seriesIndex, dataIndex) {
            this.chart.dispatchAction({
                type: type,
                seriesIndex: seriesIndex,
                dataIndex: dataIndex
            })
        }
    }
}
</script>
