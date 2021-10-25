<template>
  <div
    id="raDarChart"
    ref="raDarChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
require('echarts/theme/shine') // echarts theme
import { EChartCommon } from '@/utils/echart.common'
import resize from './mixins/resize'
const fjJson = require('@/assets/mapData/fj.json')

export default {
    mixins: [resize],
    props: {
        title: {
            type: String,
            default: '地图'
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
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '240px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        grid: {
            type: Array,
            default: () => [10, 60, 10, 0]
        },
        mapName: {
            type: String,
            default: 'china'
        },
        geoJson: {
            type: Object,
            required: true,
            default: () => {}
        },
        showVisualMap: {
            type: Boolean,
            default: false
        },
        visualMapMin: {
            type: Number,
            default: 0
        },
        visualMapMax: {
            type: Number,
            default: 1000
        },
        provinceData: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            chart: null,
            type: 'china',
            timer: null
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
        clearInterval(this.timer)
        this.timer = null
    },
    methods: {
        initChart() {
            echarts.registerMap('fj', fjJson)
            this.chart = echarts.init(this.$refs.raDarChart, 'shine')
            this.setOptions(this.seriesData, this.provinceData)
        },
        setOptions(seriesData, provinceData) {
            // echarts.registerMap(this.mapName, this.geoJson)
            this.chart.setOption({
                title: EChartCommon.getDefaultChartTitle(this.title),
                tooltip: {
                    show: true,
                    formatter: function (params) {
                        // console.log(params)
                        // const value = isNaN(params.value) ? '0' : params.value
                        // console.log(value)
                        return (
                            '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + (isNaN(params.value) ? '0' : params.value) + '人&nbsp;&nbsp;'
                        )
                    }
                },
                grid: EChartCommon.getCustomBarGrid(
                    this.grid[0],
                    this.grid[1],
                    this.grid[2],
                    this.grid[3]
                ),
                geo: {
                    map: this.mapName,
                    // map: 'fj',
                    backgroundColor: 'transparent',
                    center: [105.185312, 35.116778], // 中国
                    // center: [118.316239, 26.075302], // 福建
                    zoom: 1.2,
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: { show: true, fontSize: '12', color: 'rgba(0,0,0,0.7)' }
                    },
                    itemStyle: {
                        normal: {
                          borderWidth: 1,//边际线大小
                          borderType: 'solid',
                          borderColor: '#00ffff',//边界线颜色
                          areaColor: 'rgba(19, 75, 80, .5)'//默认区域颜色
                        },
                      emphasis: {
                        color: '#04E0E0', //悬浮背景
                        borderType: 'solid',
                      }
                        // emphasis: {
                        //     areaColor: '#f2d5ad',
                        //     shadowOffsetX: 0,
                        //     shadowOffsetY: 0,
                        //     borderWidth: 0
                        // }
                    }
                },
                visualMap: {
                    show: this.showVisualMap,
                    type: 'piecewise',
                    min: this.visualMapMin,
                    max: this.visualMapMax,
                    splitNumber: 4,
                    right: 20,
                    bottom: 30,
                    itemGap: 10,
                    textGap: 4,
                    itemWidth: 10,
                    itemHeight: 10,
                    itemSymbol: 'rect',
                    showLabel: true,
                    // text: ['高', '低'],
                    textStyle: {
                      color: '#039494',
                      fontSize: '10',
                      fontFamily: "DINPro-Medium"
                    },
                    calculable: true,
                    align: 'left',
                    inRange: {
                        color: ['#00cdd4', '#00a2ad', '#007a87', '#005461']
                    },
                    pieces: [
                        // { value: 0, label: '0', color: '#ffffff' },
                        { min: 1, max: 200, label: '0-200', color: 'rgba(0, 205, 212, .6)' },
                        /*{ min: 201, max: 400, label: '201 到 400', color: '#00a2ad' },
                        { min: 401, max: 600, label: '401 到 600', color: '#007a87' },*/
                        { min: 201, label: '>200', color: '#04F9FA' }
                    ]
                },
                series: seriesData
            })
            const _this = this
            if (_this.timer) {
                clearInterval(_this.timer)
                _this.timer = null
            }
             _this.timer = setInterval(() => {
                if (_this.type === 'china') {
                    _this.chart.setOption({
                        title: EChartCommon.getDefaultChartTitle(this.title),
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                // console.log(params)
                                // const value = isNaN(params.value) ? '0' : params.value
                                // console.log(value)
                                return (
                                    '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + (isNaN(params.value) ? '0' : params.value) + '人&nbsp;&nbsp;'
                                )
                            }
                        },
                        grid: EChartCommon.getCustomBarGrid(
                            _this.grid[0],
                            _this.grid[1],
                            _this.grid[2],
                            _this.grid[3]
                        ),
                        geo: {
                            // map: this.mapName,
                            map: 'fj',
                            backgroundColor: 'transparent',
                            // center: [105.185312, 35.116778], // 中国
                            center: [118.316239, 25.765302], // 福建
                            zoom: 1,
                            roam: false,
                            label: {
                            normal: {
                              show: false
                            },
                            emphasis: { show: true, fontSize: '12', color: 'rgba(0,0,0,0.7)' }
                          },
                            itemStyle: {
                            normal: {
                              borderWidth: 1,//边际线大小
                              borderType: 'solid',
                              borderColor:'#00ffff',//边界线颜色
                              areaColor:'rgba(19, 75, 80, .5)'//默认区域颜色
                            },
                            emphasis: {
                              color: '#04E0E0', //悬浮背景
                              borderType: 'solid',
                            }
                            // emphasis: {
                            //     areaColor: '#f2d5ad',
                            //     shadowOffsetX: 0,
                            //     shadowOffsetY: 0,
                            //     borderWidth: 0
                            // }
                          }
                        },
                        visualMap: {
                        show: this.showVisualMap,
                        type: 'piecewise',
                        min: this.visualMapMin,
                        max: this.visualMapMax,
                        splitNumber: 4,
                        right: 20,
                        bottom: 30,
                        itemGap: 10,
                        textGap: 4,
                        itemWidth: 10,
                        itemHeight: 10,
                        itemSymbol: 'rect',
                        showLabel: true,
                        // text: ['高', '低'],
                        textStyle: {
                          color: '#039494',
                          fontSize: '10',
                          fontFamily: "DINPro-Medium"
                        },
                        calculable: true,
                        align: 'left',
                        inRange: {
                          color: ['#00cdd4', '#00a2ad', '#007a87', '#005461']
                        },
                        pieces: [
                          // { value: 0, label: '0', color: '#ffffff' },
                          { min: 1, max: 200, label: '0-200', color: 'rgba(0, 205, 212, .6)' },
                          /*{ min: 201, max: 400, label: '201 到 400', color: '#00a2ad' },
                          { min: 401, max: 600, label: '401 到 600', color: '#007a87' },*/
                          { min: 201, label: '>200', color: '#04F9FA' }
                        ]
                      },
                        series: _this.provinceData
                    })
                } else {
                    _this.chart.setOption({
                        title: EChartCommon.getDefaultChartTitle(this.title),
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                // console.log(params)
                                // const value = isNaN(params.value) ? '0' : params.value
                                // console.log(value)
                                return (
                                    '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + (isNaN(params.value) ? '0' : params.value) + '人&nbsp;&nbsp;'
                                )
                            }
                        },
                        grid: EChartCommon.getCustomBarGrid(
                            this.grid[0],
                            this.grid[1],
                            this.grid[2],
                            this.grid[3]
                        ),
                        geo: {
                            map: this.mapName,
                            // map: 'fj',
                            backgroundColor: 'transparent',
                            center: [105.185312, 35.116778], // 中国
                            // center: [118.316239, 26.075302], // 福建
                            zoom: 1.2,
                            roam: false,
                            label: {
                            normal: {
                              show: false
                            },
                            emphasis: { show: true, fontSize: '12', color: 'rgba(0,0,0,0.7)' }
                          },
                            itemStyle: {
                            normal: {
                              borderWidth: 1,//边际线大小
                              borderType: 'solid',
                              borderColor:'#00ffff',//边界线颜色
                              areaColor:'rgba(19, 75, 80, .5)'//默认区域颜色
                            },
                            emphasis: {
                              color: '#04E0E0', //悬浮背景
                              borderType: 'solid',
                            }
                            // emphasis: {
                            //     areaColor: '#f2d5ad',
                            //     shadowOffsetX: 0,
                            //     shadowOffsetY: 0,
                            //     borderWidth: 0
                            // }
                          }
                        },
                        visualMap: {
                        show: this.showVisualMap,
                        type: 'piecewise',
                        min: this.visualMapMin,
                        max: this.visualMapMax,
                        splitNumber: 4,
                        right: 20,
                        bottom: 30,
                        itemGap: 10,
                        textGap: 4,
                        itemWidth: 10,
                        itemHeight: 10,
                        itemSymbol: 'rect',
                        showLabel: true,
                        // text: ['高', '低'],
                        textStyle: {
                          color: '#039494',
                          fontSize: '10',
                          fontFamily: "DINPro-Medium"
                        },
                        calculable: true,
                        align: 'left',
                        inRange: {
                          color: ['#00cdd4', '#00a2ad', '#007a87', '#005461']
                        },
                        pieces: [
                          // { value: 0, label: '0', color: '#ffffff' },
                          { min: 1, max: 200, label: '0-200', color: 'rgba(0, 205, 212, .6)' },
                          /*{ min: 201, max: 400, label: '201 到 400', color: '#00a2ad' },
                          { min: 401, max: 600, label: '401 到 600', color: '#007a87' },*/
                          { min: 201, label: '>200', color: '#04F9FA' }
                        ]
                      },
                        series: _this.seriesData
                    })
                }
                _this.type = _this.type === 'fj' ? 'china' : 'fj'
            }, 3000)
            _this.chart.on('mouseover', function(a) {
                if (_this.timer) {
                    clearInterval(_this.timer)
                    _this.timer = null
                }
            })
            _this.chart.on('mouseout', function() {
                if (_this.timer === null) {
                    _this.timer = setInterval(() => {
                        if (_this.type === 'china') {
                            _this.chart.setOption({
                                title: EChartCommon.getDefaultChartTitle(this.title),
                                tooltip: {
                                    show: true,
                                    formatter: function (params) {
                                        // console.log(params)
                                        // const value = isNaN(params.value) ? '0' : params.value
                                        // console.log(value)
                                        return (
                                            '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + (isNaN(params.value) ? '0' : params.value) + '人&nbsp;&nbsp;'
                                        )
                                    }
                                },
                                grid: EChartCommon.getCustomBarGrid(
                                    _this.grid[0],
                                    _this.grid[1],
                                    _this.grid[2],
                                    _this.grid[3]
                                ),
                                geo: {
                                    // map: this.mapName,
                                    map: 'fj',
                                    backgroundColor: 'transparent',
                                    // center: [105.185312, 35.116778], // 中国
                                    center: [118.316239, 25.765302], // 福建
                                    zoom: 1,
                                    roam: false,
                                    label: {
                                    normal: {
                                      show: false
                                    },
                                    emphasis: { show: true, fontSize: '12', color: 'rgba(0,0,0,0.7)' }
                                  },
                                    itemStyle: {
                                    normal: {
                                      borderWidth: 1,//边际线大小
                                      borderType: 'solid',
                                      borderColor:'#00ffff',//边界线颜色
                                      areaColor:'rgba(19, 75, 80, .5)'//默认区域颜色
                                    },
                                    emphasis: {
                                      color: '#04E0E0', //悬浮背景
                                      borderType: 'solid',
                                    }
                                    // emphasis: {
                                    //     areaColor: '#f2d5ad',
                                    //     shadowOffsetX: 0,
                                    //     shadowOffsetY: 0,
                                    //     borderWidth: 0
                                    // }
                                  }
                                },
                                visualMap: {
                                show: this.showVisualMap,
                                type: 'piecewise',
                                min: this.visualMapMin,
                                max: this.visualMapMax,
                                splitNumber: 4,
                                right: 20,
                                bottom: 30,
                                itemGap: 10,
                                textGap: 4,
                                itemWidth: 10,
                                itemHeight: 10,
                                itemSymbol: 'rect',
                                showLabel: true,
                                // text: ['高', '低'],
                                textStyle: {
                                  color: '#039494',
                                  fontSize: '10',
                                  fontFamily: "DINPro-Medium"
                                },
                                calculable: true,
                                align: 'left',
                                inRange: {
                                  color: ['#00cdd4', '#00a2ad', '#007a87', '#005461']
                                },
                                pieces: [
                                  // { value: 0, label: '0', color: '#ffffff' },
                                  { min: 1, max: 200, label: '0-200', color: 'rgba(0, 205, 212, .6)' },
                                  /*{ min: 201, max: 400, label: '201 到 400', color: '#00a2ad' },
                                  { min: 401, max: 600, label: '401 到 600', color: '#007a87' },*/
                                  { min: 201, label: '>200', color: '#04F9FA' }
                                ]
                              },
                                series: _this.provinceData
                            })
                        } else {
                            _this.chart.setOption({
                                title: EChartCommon.getDefaultChartTitle(this.title),
                                tooltip: {
                                    show: true,
                                    formatter: function (params) {
                                        // console.log(params)
                                        // const value = isNaN(params.value) ? '0' : params.value
                                        // console.log(value)
                                        return (
                                            '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + (isNaN(params.value) ? '0' : params.value) + '人&nbsp;&nbsp;'
                                        )
                                    }
                                },
                                grid: EChartCommon.getCustomBarGrid(
                                    _this.grid[0],
                                    _this.grid[1],
                                    _this.grid[2],
                                    _this.grid[3]
                                ),
                                geo: {
                                    map: 'china',
                                    // map: 'fj',
                                    backgroundColor: 'transparent',
                                    center: [105.185312, 35.116778], // 中国
                                    // center: [118.316239, 26.075302], // 福建
                                    zoom: 1.2,
                                    roam: false,
                                    label: {
                                    normal: {
                                      show: false
                                    },
                                    emphasis: { show: true, fontSize: '12', color: 'rgba(0,0,0,0.7)' }
                                  },
                                    itemStyle: {
                                    normal: {
                                      borderWidth: 1,//边际线大小
                                      borderType: 'solid',
                                      borderColor:'#00ffff',//边界线颜色
                                      areaColor:'rgba(19, 75, 80, .5)'//默认区域颜色
                                    },
                                    emphasis: {
                                      color: '#04E0E0', //悬浮背景
                                      borderType: 'solid',
                                    }
                                    // emphasis: {
                                    //     areaColor: '#f2d5ad',
                                    //     shadowOffsetX: 0,
                                    //     shadowOffsetY: 0,
                                    //     borderWidth: 0
                                    // }
                                  }
                                },
                                visualMap: {
                                show: this.showVisualMap,
                                type: 'piecewise',
                                min: this.visualMapMin,
                                max: this.visualMapMax,
                                splitNumber: 4,
                                right: 20,
                                bottom: 30,
                                itemGap: 10,
                                textGap: 4,
                                itemWidth: 10,
                                itemHeight: 10,
                                itemSymbol: 'rect',
                                showLabel: true,
                                // text: ['高', '低'],
                                textStyle: {
                                  color: '#039494',
                                  fontSize: '10',
                                  fontFamily: "DINPro-Medium"
                                },
                                calculable: true,
                                align: 'left',
                                inRange: {
                                  color: ['#00cdd4', '#00a2ad', '#007a87', '#005461']
                                },
                                pieces: [
                                  // { value: 0, label: '0', color: '#ffffff' },
                                  { min: 1, max: 200, label: '0-200', color: 'rgba(0, 205, 212, .6)' },
                                  /*{ min: 201, max: 400, label: '201 到 400', color: '#00a2ad' },
                                  { min: 401, max: 600, label: '401 到 600', color: '#007a87' },*/
                                  { min: 201, label: '>200', color: '#04F9FA' }
                                ]
                              },
                                series: _this.seriesData
                            })
                        }
                        _this.type = _this.type === 'fj' ? 'china' : 'fj'
                    }, 3000)
                }
            })
        }
    }
}
</script>
