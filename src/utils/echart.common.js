// echart通用模板
export var EChartCommon = {

  /* 默认主题文字设置*/
  getDefaultChartTitle: function (chartTitle, subtext) {
    return {
      text: chartTitle,
      subtext: subtext || '',
      textStyle: { // 正标题文字样式
        fontSize: 14,
        fontWeight: 500,
        color: '#303133',
        lineHeight: 20,
        fontFamily: 'PingFangSC-Medium,sans-serif'
      },
      subtextStyle: { // 副标题文字样式
        fontSize: 12,
        fontWeight: 500,
        color: '#ddd',
        lineHeight: 20,
        fontFamily: 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif'
      },
      left: 0,
      top: 0
    }
  },

  /* 默认饼环图主题文字设置*/
  getDefaultCircularPieChartTitle: function (chartTitle, subtext) {
    return {
      text: chartTitle,
      subtext: subtext || '',
      itemGap: 10,
      textStyle: {
        width: 120,
        fontSize: 14,
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 400,
        lineHeight: 20,
        fontFamily: 'PingFangSC-Medium,sans-serif',
        overflow: 'truncate'

      },
      subtextStyle: {
        width: 120,
        fontSize: 20,
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: 20,
        fontFamily: 'Roboto-Regular',
        overflow: 'truncate'

      },
      textAlign: 'center',
      left: '175',
      top: '80'
    }
  },

  /* 默认饼环图主题文字设置*/
  getDefaultCircularPieShowChartTitle: function (chartTitle, subtext) {
    return {
      text: chartTitle,
      subtext: subtext || '',
      itemGap: 10,
      textStyle: {
        width: 120,
        fontSize: 14,
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 400,
        lineHeight: 20,
        fontFamily: 'PingFangSC-Medium,sans-serif',
        overflow: 'truncate'
      },
      subtextStyle: {
        width: 120,
        fontSize: 20,
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: 20,
        fontFamily: 'Roboto-Regular',
        overflow: 'truncate'
      },
      textAlign: 'center',
      left: '67',
      top: '62'
    }
  },

  getDefaultPieSeries: function (chartName, data, showPercent) {
    return [{
      name: chartName,
      type: 'pie',
      label: {
        normal: {
          show: false,
          formatter: showPercent === false ? '{b}' : '{b}\n{d}%'
        }
      },
      labelLine: {
        normal: {
          length: 5,
          length2: 5
        }
      },
      radius: '55%',
      center: ['50%', '60%'],
      data: data
    }]
  },

  getDefaultRingSeries: function (charName, data) {
    return [{
      name: charName,
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true,
            textStyle: {
              fontSize: '15',
              fontWeight: 'bold'
            }
          }
        }
      },
      data: data
    }]
  },

  getDefaultPieTooltip: function (customTip) {
    return {
      trigger: 'item',
      confine: true,
      formatter: customTip || '{a} <br/>{b} : {c} ({d}%)'
    }
  },

  getDefaultLineTooltip: function () {
    return {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    }
  },

  getDefaultBarTooltip: function (showShadow) {
    return {
      trigger: 'axis',
      confine: true,
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: showShadow === false ? 'line' : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    }
  },

  getBarNoneAxisPointerTooltip: function () {
    return {
      trigger: 'axis',
      confine: true,
      axisPointer: {
        type: 'none'
      }
    }
  },

  getDefaultScatterTooltip: function () {
    return {
      confine: true,
      trigger: 'item',
      formatter: function (p) {
        return p.seriesName + ' ' + p.value[0] + ':' + p.value[1]
      }
    }
  },

  getDefaultRadarTooltip: function () {
    return {
      confine: true,
      trigger: 'axis'
    }
  },

  getDefaultBarTooltipPoint: function (color) {
    return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>'
  },

  getDefaultLegend: function (dataLegend) {
    return {
      selectedMode: true,
      textStyle: {
        padding: [0, 0, 0, 2],
        fontSize: 11,
        color: '#fff',
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      x: 'right',
      data: dataLegend
    }
  },

  getCenterLegend: function (dataLegend) {
    return {
      selectedMode: true,
      borderRadius: 0,
      textStyle: {
        padding: [0, 0, 0, 2],
        color: 'rgba(255,255,255,0.65)',
        fontSize: 11,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      top: 35,
      x: 'center',
      y: 'top',
      itemWidth: 8,
      itemHeight: 8,
      icon: 'rect',
      data: dataLegend
    }
  },

  getBarLeftLegend: function (dataLegend) {
    return {
      selectedMode: true,
      borderRadius: 0,
      textStyle: {
        padding: [0, 0, 0, 2],
        color: 'rgba(255,255,255,0.65)',
        fontSize: 11,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      top: 40,
      left: 0,
      y: 'top',
      itemWidth: 8,
      itemHeight: 8,
      icon: 'rect',
      data: dataLegend
    }
  },

  getLineLeftLegend: function (dataLegend) {
    return {
      selectedMode: true,
      borderRadius: 0,
      textStyle: {
        padding: [0, 0, 0, 2],
        color: 'rgba(255,255,255,0.65)',
        fontSize: 11,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      top: 40,
      left: 0,
      y: 'top',
      itemWidth: 12,
      itemHeight: 4,
      icon: 'rect',
      data: dataLegend
    }
  },

  /* 设置底部图例过多可滚动*/
  getDefaultBottomScrollLegend: function (dataLegend, bottom = 0) {
    return {
      orient: 'horizontal',
      type: 'scroll',
      bottom: bottom || 0,
      itemHeight: 8,
      itemWidth: 8,
      itemGap: 10,
      icon: 'rect',
      selectedMode: true,
      textStyle: {
        padding: [0, 0, 0, 2],
        color: '#303133',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      tooltip: {
        show: true
      },
      borderRadius: 0,
      pageIconColor: '#303133',
      pageIconInactiveColor: 'transparent',
      pageTextStyle: {
        color: '#303133'
      },
      data: dataLegend
    }
  },

  /* 设置右侧图例过多可滚动*/
  getDefaultRightScrollLegend: function (dataLegend) {
    return {
      orient: 'vertical',
      type: 'scroll',
      selectedMode: true,
      right: 0,
      top: 30,
      bottom: 0,
      itemHeight: 8,
      itemWidth: 8,
      itemGap: 10,
      icon: 'rect',
      textStyle: {
        padding: [0, 0, 0, 2],
        color: '#303133',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      tooltip: {
        show: true
      },
      borderRadius: 0,
      pageIconColor: '#303133',
      pageIconInactiveColor: 'transparent',
      pageTextStyle: {
        color: '#303133'
      },
      data: dataLegend
    }
  },

  // 设置默认区域数据缩放组件
  getDefaultDataZoom: function (start, end, nameArray) {
    var zArray = []
    nameArray.forEach(item => {
      zArray.push({
        show: true,
        type: 'slider',
        realtime: true,
        height: 8, // 组件高度
        bottom: 10,
        textStyle: {
          color: '#303133',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal'
        },
        backgroundColor: 'rgba(255, 255, 255, 0)',
        fillerColor: '#00CDE5',
        borderColor: '#00CDE5',
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        filterMode: 'filter',
        handleSize: 20, // 滑动条的 左右2个滑动条的大小
        handleColor: '#00CDE5', // h滑动图标的颜色
        handleStyle: {
          color: '#fff'
        },
        start: start,
        end: end
      })
    })
    return zArray
  },

  getDefaultBarXAxis: function (xData, rotate) {
    return [{
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: EChartCommon.getDefaultAxisLabel(rotate),
      axisLine: EChartCommon.getDefaultAxisLine(true),
      data: xData
    }]
  },

  getDefaultLineXAxis: function (xData, rotate) {
    return [{
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: EChartCommon.getDefaultAxisLabel(rotate),
      axisLine: EChartCommon.getDefaultAxisLine(),
      data: xData
    }]
  },

  getDefaultAxisLabel: function (rotate) {
    return {
      show: true,
      rotate: rotate || 0,
      interval: 0, // {number}
      margin: 8,
      textStyle: {
        color: '#303133',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'PingFangSC-Regular,sans-serif'
      }
    }
  },

  getDefaultAxisLine: function (show = true) {
    return {
      lineStyle: {
        show: show,
        color: '#d2d2d2',
        width: 1
      }
    }
  },

  getDefaultScatterAxis: function (name, data) {
    return {
      name: name,
      nameTextStyle: {
        color: '#ddd',
        fontSize: 12
      },
      data: data,
      boundaryGap: false,
      axisLabel: EChartCommon.getDefaultAxisLabel(),
      axisLine: EChartCommon.getDefaultAxisLine(),
      splitLine: {
        show: true
      }
    }
  },

  getDefaultBarYAxis: function (nameArray) {
    var yArray = []
    nameArray.forEach((item, index) => {
      yArray.push({
        type: 'value',
        name: item,
        offset: 0,
        splitNumber: 5,
        nameTextStyle: {
          color: '#303133',
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular,sans-serif'
        },
        axisLabel: EChartCommon.getDefaultAxisLabel(),
        splitLine: {
          show: index == 0,
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#ebeef5'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#d2d2d2',
            width: 1
          }
        }
      })
    })
    return yArray
  },

  getDefaultLineYAxis: function (nameArray) {
    var yArray = []
    nameArray.forEach((item, index) => {
      yArray.push({
        type: 'value',
        name: item,
        offset: 0,
        splitNumber: 5,
        nameTextStyle: {
          color: '#303133',
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular,sans-serif'
        },
        axisLabel: EChartCommon.getDefaultAxisLabel(),
        splitLine: {
          show: index == 0,
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#ebeef5'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#d2d2d2',
            width: 1
          }
        }

      })
    })

    return yArray
  },

  /* 默认颜色设置*/
  getDefaultColors: function () {
    return ['#FF4A42', '#00CDE5', '#FDE300', '#A32EFF', '#2787fc', '#FF435E', '#7CDEEB', '#5E5EFE', '#FDE300', '#4343FF']
  },

  getDefaultBackground: function () {
    return 'rgba(255,255,255,0)'
  },

  getDefaultScatterGrid: function () {
    return EChartCommon.getCustomBarGrid(10, 60, 40, 0)
  },

  getDefaultBarGrid: function () {
    return EChartCommon.getCustomBarGrid(10, 60, 10, 0)
  },

  getCustomBarGrid: function (x, y, x2, y2) {
    return {
      x: x,
      y: y,
      x2: x2,
      y2: y2,
      borderWidth: 1,
      containLabel: true
    }
  },

  getDefaultScatterSeries: function (originData) {
    originData.forEach(item => {
      item.symbolSize = 10
      item.type = 'scatter'
    })

    return originData
  },

  getDefaultBarSeries: function (originData) {
    originData.forEach(item => {
      if (item.type == 'bar') {
        item.barMaxWidth = '25'
      } else if (item.type == 'line') {
        item.smooth = true
      }
    })
    return originData
  },

  getDefaultVerticalBarSeries: function (name, data, color) {
    return [{
      name: name,
      type: 'bar',
      barMaxWidth: '25',
      data: data,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: color ? color[0] : '#FF4A42'
          }, {
            offset: 1,
            color: color ? color[1] : '#FF4A42'
          }])
        }
      }
    }]
  },

  getDefaultVerticalBarTooltip: function () {
    return {
      trigger: 'axis',
      confine: true,
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    }
  },

  getDefaultVerticalBarGrid: function () {
    return {
      left: 0,
      right: 10,
      bottom: 0,
      top: 40,
      containLabel: true
    }
  },

  getDefaultHorizontalBarYAxis: function (data, yAxisName = '') {
    return [{
      type: 'category',
      name: yAxisName,
      nameTextStyle: {
        color: '#303133',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular,sans-serif'
      },
      data: data,
      offset: 8,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#303133',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'PingFangSC-Regular,sans-serif'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#d2d2d2',
          width: 1
        }
      }
    }]
  },

  /* 限制y轴文本长度*/
  getHorizontalBarLimitYAxisLength: function (data, maxlength) {
    return [{
      type: 'category',
      data: data,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        formatter: function (value) {
          value = value.toString()
          if (value.length > maxlength) {
            return value.substring(0, maxlength - 1) + '...'
          } else {
            return value
          }
        },
        textStyle: {
          color: '#303133',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'PingFangSC-Regular,sans-serif'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#d2d2d2',
          width: 1
        }
      }
    }]
  },

  /* 限制x轴文本长度*/
  getLimitBarXAxisLength: function (xData, maxlength, rotate) {
    var obj = {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: EChartCommon.getDefaultAxisLabel(rotate),
      axisLine: EChartCommon.getDefaultAxisLine(),
      data: xData
    }
    obj.axisLabel.formatter = function (params) {
      params = params.toString()
      if (params.length > maxlength) {
        return params.substring(0, maxlength - 1) + '...'
      } else {
        return params
      }
    }
    return [obj]
  },

  /* 限制x轴文本长度,中间省略号代替*/
  getLimitXAxisLength: function (xData, len = 0, tail = 0, rotate) {
    var obj = {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: EChartCommon.getDefaultAxisLabel(rotate),
      axisLine: EChartCommon.getDefaultAxisLine(true),
      data: xData
    }
    obj.axisLabel.formatter = function (params) {
      const value = params.toString()
      var all = value.length
      var fisrt = value.substring(0, len)
      var last = all - tail
      var limit = len + tail
      if (all > limit) {
        return fisrt + '...' + value.substring(last, all)
      }
      return value
    }
    return [obj]
  },

  getDefaultHorizontalBarXAxis: function (rotate) {
    return [{
      type: 'value',
      axisLabel: {
        show: true,
        rotate: rotate || 0, // 倾斜度 -90 至 90 默认为0
        textStyle: {
          color: '#303133',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#d2d2d2',
          width: 1
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#ebeef5'
        }
      }
    }]
  },

  /* x轴文本内容换行*/
  getLabelWrapsXAxis: function (xData, rotate, rowLength) {
    var obj = {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: EChartCommon.getDefaultAxisLabel(rotate),
      axisLine: EChartCommon.getDefaultAxisLine(),
      data: xData
    }
    obj.axisLabel.formatter = function (params) {
      var newParamsName = '' // 最终拼接成的字符串
      var paramsNameNumber = params.length // 实际标签的个数
      var provideNumber = rowLength || 9 // 每行能显示的字的个数
      var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
      /**
             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
             */
      // 条件等同于rowNumber>1
      if (paramsNameNumber > provideNumber) {
        /** 循环每一行,p表示行 */
        for (var p = 0; p < rowNumber; p++) {
          var tempStr = '' // 表示每一次截取的字符串
          var start = p * provideNumber // 开始截取的位置
          var end = start + provideNumber // 结束截取的位置
          // 此处特殊处理最后一行的索引值
          if (p == rowNumber - 1) {
            // 最后一次不换行
            tempStr = params.substring(start, paramsNameNumber)
          } else {
            // 每一次拼接字符串并换行
            tempStr = params.substring(start, end) + '\n'
          }
          newParamsName += tempStr // 最终拼成的字符串
        }
      } else {
        // 将旧标签的值赋给新标签
        newParamsName = params
      }
      // 将最终的字符串返回
      return newParamsName
    }
    return [obj]
  },

  getDefaultRadar: function (data) {
    return [{
      indicator: data,
      center: ['50%', '50%'],
      radius: 80,
      name: { // (圆外的标签)雷达图每个指示器名称的配置项。
        formatter: '{value}',
        textStyle: {
          fontSize: 12,
          color: '#00CDE5',
          fontFamily: 'PingFangSC-Regular,sans-serif'
        }
      },
      axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
        lineStyle: {
          color: '#0095c2', // 坐标轴线线的颜色。
          width: 1, // 坐标轴线线宽。
          type: 'solid' // 坐标轴线线的类型。
        }
      },
      splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
        lineStyle: {
          color: '#0095c2', // 分隔线颜色
          width: 1 // 分隔线线宽
        }
      },
      splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: { // 分隔区域的样式设置。
          color: ['transparent'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      }
    }]
  },

  getDefaultRadarSeries: function (data) {
    var resultData = []
    $.each(data, function (index, item) {
      resultData.push({
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: item.data.length == 0 ? [] : [{
          name: item.name,
          value: item.data,
          itemStyle: { // 单个拐点标志的样式设置。
            normal: {
              borderWidth: 2 // 拐点的描边宽度，默认不描边。[ default: 0 ]
            }
          },
          lineStyle: { // 单项线条样式。
            normal: {
              opacity: 0.5 // 图形透明度
            }
          }
        }]
      })
    })

    return resultData
  },

  getBaseOption: function (dataScroll, dataLegend, xData, seriesData, yName) {
    return {
      timeline: {
        // y: 0,
        axisType: 'category',
        // realtime: false,
        // loop: false,
        autoPlay: true,
        // currentIndex: 2,
        playInterval: 2000,
        lineStyle: {
          show: true,
          color: '#00CDE5'
        },
        label: {
          show: true,
          color: '#00CDE5',
          fontSize: 12
        },
        itemStyle: {
          color: '#00CDE5'
        },
        controlStyle: {
          normal: {
            show: true,
            color: '#00CDE5',
            borderColor: '#00CDE5',
            borderWidth: {
              color: '#00CDE5',
              borderWidth: 1,
              borderColor: '#00CDE5'
            }
          }
        },

        // controlStyle: {
        //     position: 'left'
        // },
        data: dataScroll
      },
      tooltip: {},
      legend: EChartCommon.getCenterLegend(dataLegend),
      color: EChartCommon.getDefaultColors(),
      calculable: true,
      grid: {
        top: 60,
        bottom: 80,
        left: 30,
        right: 30,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              formatter: function (params) {
                return params.value.replace('\n', '')
              }
            }
          }
        }
      },
      xAxis: EChartCommon.getDefaultBarXAxis(xData),
      yAxis: EChartCommon.getDefaultBarYAxis([yName]),
      series: seriesData
    }
  },

  getDefaultPieInBar: function (pieName, left) {
    return {
      name: pieName,
      type: 'pie',
      center: [(left ? '25%' : '85%'), '35%'],
      radius: '28%',
      labelLine: {
        normal: {
          length: 5,
          length2: 5
        }
      },
      z: 100
    }
  }
}
