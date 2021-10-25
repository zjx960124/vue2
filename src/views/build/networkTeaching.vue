<template>
  <div class="network-teaching">
    <div class="header">网络教学</div>
    <div class="main">
      <div class="left">
        <div class="left-top">
          <view-title title="学校使用情况"></view-title>
          <div class="chart-view">
            <div class="chart-item">
              <div class="info">
                <div class="info-item">
                  <div class="label">教师数</div>
                  <div class="value">383</div>
                  <div class="util">人</div>
                </div>
                <div class="info-item">
                  <div class="label">建课教师数</div>
                  <div class="value">326</div>
                  <div class="util">人</div>
                </div>
              </div>
              <div class="title">
                <div class="title-info">建课教师数占比</div>
                <div class="title-value">
                  80
                  <span class="title-util">%</span>
                </div>
              </div>
              <div class="charts" ref="charts"></div>
            </div>
            <div class="chart-item">
              <div class="info">
                <div class="info-item">
                  <div class="label">教师数</div>
                  <div class="value">383</div>
                  <div class="util">人</div>
                </div>
                <div class="info-item">
                  <div class="label">建课教师数</div>
                  <div class="value">326</div>
                  <div class="util">人</div>
                </div>
              </div>
              <div class="title">
                <div class="title-info">建课教师数占比</div>
                <div class="title-value">
                  80
                  <span class="title-util">%</span>
                </div>
              </div>
              <div class="charts" ref="charts2"></div>
            </div>
          </div>
        </div>
        <div class="left-center">
          <view-title title="七天各院系访问TOP10"></view-title>
          <div class="charts">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[35, 30, 10, 45]"
              :color="['#04F9FA', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="true"
              :y-axis-names="['']"
              :legend-data="['历年平均流程发起数', '今年流程发起数']"
              :legend-bottom="12"
              show-legend-position="bottom"
              :x-axis-data="ghjdfxqXAxisData"
              :series-data="ghjdfxqSeriesData"
            ></bar-chart>
          </div>
        </div>
        <div class="left-bottom">
          <view-title title="较频繁的活动类型"></view-title>
          <div class="ranking-view">
            <div class="ranking-item-view">
              <div class="ranking-left">
                <div
                  class="ranking-item"
                  v-for="(item, index) in rankingData[0]"
                  :key="index"
                >
                  <div class="item-left">
                    <!--<div class="item-icon" :class="index < 3 ? `icon${index}` : ''">{{ index + 1}}</div>-->
                    <img style="width: 16px; height: 16px" :src="require('../../assets/network/num' + (index + 1) + '.png')" alt="">
                    <div class="item-label">{{ item.type }}</div>
                  </div>
                  <div class="item-value">{{ item.countResult }}<span>个</span></div>
                </div>
              </div>
              <div class="ranking-right">
                <div
                  class="ranking-item"
                  v-for="(item, index) in rankingData[1]"
                  :key="index"
                >
                  <div class="item-left">
                    <!--<div class="item-icon">{{ index + 6}}</div>-->
                    <img style="width: 16px; height: 16px" :src="require('../../assets/network/num' + (index + 6) + '.png')" alt="">
                    <div class="item-label">{{ item.type }}</div>
                  </div>
                  <div class="item-value">{{ item.countResult }}<span>个</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <view-title title="资源详情"></view-title>
          <div class="view">
            <div
              class="item"
            >
              <div class="label"><span class="spans">网络课程数</span></div>
              <div class="value">{{ 8526 | locale}}</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">视频数</span></div>
              <div class="value">{{ 3541 | locale}}</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">音频数</span></div>
              <div class="value">{{ 5526 | locale}}</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">其他</span></div>
              <div class="value">{{ 2239 | locale}}</div>
            </div>
          </div>
          <div class="title">各院系资源建设占比<span class="triangle"></span></div>
          <div class="back"></div>
          <div class="chart-item position1" ref="chart1"></div>
          <div class="chart-item position2" ref="chart2"></div>
          <div class="chart-item position3" ref="chart3"></div>
          <div class="chart-item position4" ref="chart4"></div>
        </div>
        <div class="center-bottom">
          <view-title title="近七日使用情况"></view-title>
          <div class="charts">
            <line-chart
              title=""
              height="100%"
              :grid="[35, 30, 38, 30]"
              :color="['#F28179']"
              :x-axis-label-wraps="true"
              :x-axis-data="jqrsyqkXAxisData"
              :y-axis-names="['']"
              :series-data="jqrsyqkSeriesData"
            ></line-chart>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <view-title title="最受欢迎课程TOP5"></view-title>
          <div class="right-top-view">
            <div class="right-top-view-top">
              <div class="item">
                <div class="rank"><span>TOP01</span></div>
                <div class="label">仪器分析</div>
                <div class="value">{{ 5200 | locale}}</div>
                <div class="util">访问量</div>
              </div>
              <div class="item">
                <div class="rank" style="color: #04C7C7"><span>TOP02</span></div>
                <div class="label">仪器分析</div>
                <div class="value">{{ 5200 | locale}}</div>
                <div class="util">访问量</div>
              </div>
              <div class="item">
                <div class="rank" style="color: #039494"><span>TOP03</span></div>
                <div class="label">仪器分析</div>
                <div class="value">{{ 5200 | locale}}</div>
                <div class="util">访问量</div>
              </div>
            </div>
            <div class="right-top-view-bot">
              <div class="item">
                <div class="rank"><span>TOP04</span></div>
                <div class="label">仪器分析</div>
                <div class="value">{{ 5200 | locale}}</div>
                <div class="util">访问量</div>
              </div>
              <div class="item">
                <div class="rank"><span>TOP05</span></div>
                <div class="label">仪器分析</div>
                <div class="value">{{ 5200 | locale}}</div>
                <div class="util">访问量</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-center">
          <view-title title="教学统计"></view-title>
          <div class="table-view">
            <table-view :data="table"></table-view>
          </div>
        </div>
        <div class="right-bottom">
          <view-title title="使用端占比"></view-title>
          <div class="charts">
            <pie-chart
              ref="sxzyfb"
              title=""
              height="100%"
              show-legend-position="right"
              legend-right="118"
              legend-top="75"
              :color="['#04E0E0', '#134B50', '#D6731A', '#D3DEE0']"
              :legend-data="sydLegendData"
              :series-data="sydSeriesData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewTitle from './components/viewTitle';
  import BarChart from '../../components/Chart/BarChart';
  import LineChart from '../../components/Chart/LineChart';
  import echarts from 'echarts';
  import PieChart from '../../components/Chart/PieChart'
  import TableView from './components/tableView'
  export default {
    name: 'NetworkTeaching',
    components: { TableView, PieChart, LineChart, BarChart, ViewTitle },
    data() {
      return {
        // 七天各院系访问TOP10
        ghjdfxqXAxisData: ['林琳1', '林琳2', '林琳3', '林琳4', '林琳5'],
        ghjdfxqSeriesData: [
          {
            name: '历年平均流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: [60, 80, 60, 60, 60]
          },
          {
            name: '今年流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: [30, 30, 30, 10, 30]
          }
        ],
        // 较频繁的活动类型
        rankingData: [
          [
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            }
          ],
          [
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            },
            {
              type: '11',
              countResult: '22'
            }
          ]
        ],
        // 近七日使用情况
        jqrsyqkSeriesData: [
          {
            name: '',
            type: 'line',
            // symbol: function (value, params) {
            //   return params.dataIndex === 0 ? 'circle' : 'none';
            // },
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 6,
            smooth: true,
            lineStyle: {
              normal: {
                width: 3,
                color: "#04F9FA", // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
              color: '#001926',
              borderColor: "#04F9FA",
              borderWidth: 2,
              opacity: 1,
            },
            emphasis: {
              scale: false,
              itemStyle: {
                color: '#001926',
                borderColor: "#04F9FA",
                borderWidth: 2,
                opacity: 1,
              },
            },
            tooltip: {
              show: true
            },
            areaStyle: { //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(4, 249, 250,.48)"
                },
                  {
                    offset: 1,
                    color: "rgba(4, 249, 250, 0)"
                  }
                ], false),
                // shadowColor: 'rgba(10,219,250, 0.5)',
                // shadowBlur: 20
              }
            },
            data: [2, 5, 6, 5, 1, 9, 4]
          }
        ],
        jqrsyqkXAxisData: ['林琳', '林琳', '林琳', '林琳', '林琳', '林琳', '林琳'],
        // 教学统计
        table: {
          fields: [
            {
              name: '姓名',
              key: 'scoreType',
            },
            {
              name: '教授课程数',
              key: 'level',
            },
            {
              name: '教授班级数',
              key: 'countResult',
            },
            {
              name: '教授学生数',
              key: 'bili',
            }
          ],
          data: [
            {
              scoreType: '李雪琴',
              level: 25,
              countResult: 25,
              bili: 25
            },
            {
              scoreType: '李雪琴',
              level: 25,
              countResult: 25,
              bili: 25
            },
            {
              scoreType: '李雪琴',
              level: 25,
              countResult: 25,
              bili: 25
            },
            {
              scoreType: '李雪琴',
              level: 25,
              countResult: 25,
              bili: 25
            },
            {
              scoreType: '李雪琴',
              level: 25,
              countResult: 25,
              bili: 25
            }
          ]
        },
        // 使用端占比
        sydSeriesData: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['30%', '50%'],
            roseType: 'radius',
            minShowLabelAngle: 60,
            label: {
              show: false,
              normal: {
                show: false,
                position: 'outside',
                fontSize: 12,
                formatter: '{d}%'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                name: '土木工程',
                value: 25
              },
              {
                name: '机电工程',
                value: 25
              },
              {
                name: '环境与艺术设计',
                value: 25
              },
              {
                name: '工程经济与管理',
                value: 25
              }
            ]
          }
        ],
        sydLegendData: ['土木工程', '机电工程', '环境与艺术设计', '工程经济与管理']
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setC();
      })
    },
    methods: {
      setC() {
        let option = {
          background: '#000211',
          title: {
            text: 50 + '%',
            subtext: '',
            left: '45%',
            top: '35%',
            textAlign: 'center',
            itemGap: 0,
            z: 6,
            zlevel: 6,
            textStyle: {
              fontWeight: 'normal',
              fontSize: this.fitChartSize(16),
              color: '#04E0E0',
              textAlign: 'center',
              fontFamily: 'DIN-MEDIUM, sans-serif',
              fontStyle: 'italic'
            },
            subtextStyle: {
              fontWeight: 'normal',
              fontSize: this.fitChartSize(12),
              color: '#04E0E0',
              textAlign: 'center',
              fontFamily: 'DIN-MEDIUM, sans-serif',
              fontStyle: 'italic'
            }
          } ,
          legend: [],
          series: [
            {
              name: '背景',
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['85%', '67%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",
                }
              },
              data: [
                {
                value: 100,
                name: "",
                itemStyle: {
                  normal: {
                    // color: { // 完成的圆环的颜色
                    //   colorStops: [{
                    //     offset: 0,
                    //     color: '#4FADFD' // 0% 处的颜色
                    //   }, {
                    //     offset: 1,
                    //     color: '#28E8FA' // 100% 处的颜色
                    //   }]
                    // },
                    color: '#131414'
                  }
                }
              },
                /*{
                  value: 100-50,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }*/
              ]
            },
            {
              name: '',
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['85%', '67%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 1,
              zlevel: 1,
              label: {
                normal: {
                  position: "center",
                }
              },
              data: [
                {
                  value: 80,
                  name: "",
                  itemStyle: {
                    normal: {
                      // color: { // 完成的圆环的颜色
                      //   colorStops: [{
                      //     offset: 0,
                      //     color: '#4FADFD' // 0% 处的颜色
                      //   }, {
                      //     offset: 1,
                      //     color: '#28E8FA' // 100% 处的颜色
                      //   }]
                      // },
                      color: '#a3acad'
                    }
                  }
                },
                {
                  value: 20,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#131414"
                    }
                  }
                }
              ]
            },
            {
              name: "",
              type: "gauge",
              radius: "60%",
              center: ['50%', '50%'],
              startAngle: 0,
              endAngle: 359.9,
              splitNumber: 32,
              hoverAnimation: true,
              z: 2,
              zlevel: 2,
              axisTick: {
                show: false
              },
              splitLine: {
                length: 80,
                lineStyle: {
                  width: 1,
                  color: "#000211"
                  // color: 'red'
                }
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  opacity: 0
                }
              },
              detail: {
                show: false
              },
              data: [{
                value: 0,
                name: ""
              }]
            },
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              z: 3,
              zlevel: 3,
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: 1 * Math.PI / 180,
                    endAngle: 360 * Math.PI / 180
                  },
                  style: {
                    stroke: "rgba(91, 96, 97, .6)",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true,
                };
              },
              data: [100]
            },
            {
              name: "ring6",
              type: 'custom',
              coordinateSystem: "none",
              z: 3,
              zlevel: 3,
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.95,
                    startAngle: 1 * Math.PI / 180,
                    endAngle: 360 * Math.PI / 180
                  },
                  style: {
                    stroke: "rgba(91, 96, 97, .6)",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true,
                };
              },
              data: [100]
            }
          ]
        };
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.charts, 'shine');
          this.zszyChart.setOption(option);
        });
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.charts2, 'shine');
          this.zszyChart.setOption(option);
        });
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.chart1, 'shine');
          this.zszyChart.setOption(option);
        });
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.chart2, 'shine');
          this.zszyChart.setOption(option);
        });
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.chart3, 'shine');
          this.zszyChart.setOption(option);
        });
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.chart4, 'shine');
          this.zszyChart.setOption(option);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .network-teaching {
    width: 100%;
    height: 100%;
    /*background: #99a9bf;*/
    background: #000211;
    display: flex;
    flex-direction: column;
    .header {
      flex-shrink: 0;
      height: 75px;
      padding-bottom: 10px;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-size: 34px;
      font-family: PMZD;
      color: #D2FAFA;
      background: url("../../assets/build/header.png") no-repeat;
      background-position: center bottom;
    }
    .main {
      flex: 1;
      height: calc(100% - 75px);
      display: flex;
      align-items: center;
      padding-top: 33px;
      padding-left: .4rem;
      padding-right: .4rem;
      padding-bottom: 60px;
      .left {
        flex: 597;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        .left-top {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/xssj.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .chart-view {
            width: 100%;
            height: calc(100% - 86px);
            margin-top: 60px;
            padding: 0 .35rem;
            display: flex;
            flex-direction: column;
            .chart-item {
              flex: 1;
              background: url("../../assets/network/xxsyqk_img1.png") no-repeat;
              background-size: 100% 100%;
              padding-left: .4rem;
              display: flex;
              align-content: center;
              .info {
                width: 1.7rem;
                display: flex;
                flex-direction: column;
                align-content: center;
                .info-item {
                  display: flex;
                  align-items: flex-end;
                  position: relative;
                  .label {
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: bold;
                    font-style: italic;
                    color: #A7C7C7;
                    flex: 1;
                    margin-left: 4px;
                  }
                  .value {
                    font-size: 16px;
                    font-family: DIN;
                    font-weight: 500;
                    font-style: italic;
                    color: #04E0E0;
                    margin-right: 9px;
                  }
                  .util {
                    font-size: 10px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    font-style: italic;
                    color: #677A7A;
                    margin-right: 4px;
                  }
                }
                .info-item:first-of-type {
                  margin-top: 12px;
                  margin-bottom: 30px;
                }
                .info-item::after {
                  content: '';
                  position: absolute;
                  width: 100%;
                  height: 3px;
                  left: 0;
                  bottom: -8px;
                  background: url("../../assets/campus/jxzl_img3.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              .title {
                margin-left: 90px;
                margin-right: 25px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .title-info {
                  font-size: 12px;
                  font-family: PingFang SC;
                  font-weight: 500;
                  font-style: italic;
                  color: #A7C7C7;
                  margin-bottom: 8px;
                }
                .title-value {
                  font-size: 16px;
                  font-family: DIN;
                  font-weight: 500;
                  font-style: italic;
                  color: #04E0E0;
                  position: relative;
                  .title-util {
                    font-size: 12px;
                  }
                }
                .title-value::after {
                  content: '';
                  position: absolute;
                  width: 0;
                  height: 0;
                  border: 5px solid;
                  border-color: transparent transparent #D6731A;
                  left: 40px;
                  top: 5px;
                }
              }
              .charts {
                width: 80px;
                height: 80px;
                margin-top: 10px;
                background: #000211;
              }
            }
            .chart-item:first-of-type {
              margin-bottom: 10px;
            }
          }
        }
        .left-center {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/qtgyxfwtop10.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          margin-top: 22px;
          margin-bottom: 20px;
          .charts {
            width: 100%;
            height: calc(100% - 30px);
            margin-top: 30px;
          }
        }
        .left-bottom {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/jpfdhdlx.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .ranking-view {
            width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            padding-top: 55px;
            padding-bottom: 45px;
            padding-left: .38rem;
            padding-right: .56rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
            align-content: flex-start;
            .ranking-item-view {
              flex: 1;
              display: flex;
              flex-direction: row;
              .ranking-left {
                flex: 1;
                text-align: center;
              }
              .ranking-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              }
            }
            .ranking-item {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 2.12rem;
              max-height: 32px;
              margin-bottom: 25px;
              .item-left {
                display: flex;
                align-items: center;
                .item-icon {
                  font-size: 14px;
                  color: #ffffff;
                  font-family: DIN-BOLD;
                  margin-right: 5px;
                  width: .16rem;
                  height: .16rem;
                  border-radius: 50%;
                  background: #025757;
                  text-align: center;
                  line-height: .16rem;
                }
                .icon0 {
                  background: #04E0E0 !important;
                }
                .icon1 {
                  background: #03ADAD !important;
                }
                .icon2 {
                  background: #027A7A !important;
                }
                .item-label {
                  font-size: 12px;
                  color: #A7C7C7;
                  font-family: PingFangSC-Medium;
                  margin-left: 5px;
                  font-style: italic;
                }
              }
              .item-value {
                font-size: 16px;
                color: #04E0E0;
                font-family: DIN-MEDIUM;
                font-style: italic;
                span {
                  font-size: 11px;
                  color: #677A7A;
                  margin-left: 2px;
                  font-style: italic;
                }
              }
            }
            .ranking-item::after {
              content: '';
              background: url("../../assets/network/jpfdhdlx_img1.png");
              width: 100%;
              height: 2px;
              position: absolute;
              left: 0;
              bottom: -5px;
            }
          }
        }
      }
      .center {
        height: 100%;
        width: 0;
        flex: 598;
        margin-left: .25rem;
        margin-right: .25rem;
        display: flex;
        flex-direction: column;
        .center-top {
          width: 100%;
          height: 0;
          flex: 598;
          background: url("../../assets/network/zyxq.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          margin-bottom: 20px;
          .view {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 55px;
            margin-bottom: 18px;
            padding-left: .3rem;
            padding-right: .3rem;
            .item {
              width: 1rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              .label {
                color: #D2FAFA;
                font-size: 14px;
                font-style: italic;
                font-family: "PingFang SC";
                width: 1.43rem;
                height: 20px;
                line-height: 24px;
                margin-bottom: 7px;
                text-align: center;
                position: relative;
                .spans {
                  position: relative;
                }
                .spans::after {
                  content: '';
                  position: absolute;
                  background: url("../../assets/network/xxkqxq_img2.png");
                  width: .05rem;
                  height: 11px;
                  top: 4px;
                  left: -.11rem;
                }
                .spans::before {
                  content: '';
                  position: absolute;
                  background: url("../../assets/network/xxkqxq_img2.png");
                  width: .05rem;
                  height: 11px;
                  top: 4px;
                  right: -.11rem;
                }
              }
              .value {
                font-size: 20px;
                color: #04E0E0;
                font-family: DIN-MEDIUM;
                font-weight: 500;
                background: url("../../assets/oa/oalcqkyl_img2.png") no-repeat;
                background-size: 100% 100%;
                width: 1rem;
                height: 60px;
                text-align: center;
                line-height: 60px;
              }
            }
          }
          .title {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #D2FAFA;
            margin-top: 11px;
            padding-left: .35rem;
            position: relative;
            width: auto;
            .triangle {
              width: 0;
              height: 0;
              border: 5px solid;
              border-color: transparent transparent transparent #D6731A;
              display: inline-block;
              margin-left: 5px;
              margin-top: 2px;
            }
          }
          .back {
            width: 5.44rem;
            height: 3.47rem;
            position: absolute;
            left: 26px;
            bottom: 0;
            background: url("../../assets/network/zyxq_img3.png") no-repeat;
            background-size: 100% 100%;
          }
          .chart-item {
            width: 80px;
            height: 80px;
          }
          .position1 {
            position: absolute;
            left: .34rem;
            bottom: 215px;
          }
          .position1::after {
            content: '';
            position: absolute;
            width: .79rem;
            height: 13px;
            background: url("../../assets/network/zyxq_img7.png") no-repeat;
            background-size: 100% 100%;
            bottom: 30px;
            right: -.84rem;
          }
          .position1::before {
            content: '土木工程';
            position: absolute;
            bottom: 46px;
            right: -.6rem;
            font-size: 12px;
            color: #A7C7C7;
            font-style: italic;
            font-family: PingFangSC-Regular;
          }
          .position2 {
            position: absolute;
            left: 1.68rem;
            bottom: 281px;
          }
          .position2::after {
            content: '';
            position: absolute;
            width: 1.09rem;
            height: 13px;
            background: url("../../assets/network/zyxq_img5.png") no-repeat;
            background-size: 100% 100%;
            bottom: 30px;
            right: -1.14rem;
          }
          .position2::before {
            content: '工程经济与管理';
            position: absolute;
            bottom: 46px;
            right: -.98rem;
            font-size: 12px;
            font-style: italic;
            color: #A7C7C7;
            font-family: PingFangSC-Regular;
          }
          .position3 {
            position: absolute;
            right: .82rem;
            bottom: 330px;
          }
          .position3::after {
            content: '';
            position: absolute;
            width: 112px;
            height: 13px;
            background: url("../../assets/network/zyxq_img4.png") no-repeat;
            background-size: 100% 100%;
            bottom: 30px;
            left: -1.14rem;
          }
          .position3::before {
            content: '环境与艺术设计';
            position: absolute;
            bottom: 46px;
            left: -.92rem;
            font-size: 12px;
            font-style: italic;
            color: #A7C7C7;
            font-family: PingFangSC-Regular;
          }
          .position4 {
            position: absolute;
            right: .36rem;
            bottom: 230px;
          }
          .position4::after {
            content: '';
            position: absolute;
            width: 82px;
            height: 13px;
            background: url("../../assets/network/zyxq_img6.png") no-repeat;
            background-size: 100% 100%;
            bottom: 30px;
            left: -.88rem;
          }
          .position4::before {
            content: '机电工程';
            position: absolute;
            bottom: 46px;
            left: -.62rem;
            font-size: 12px;
            font-style: italic;
            color: #A7C7C7;
            font-family: PingFangSC-Regular;
          }
        }
        .center-bottom {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/jqrsyqk.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .charts {
            width: 100%;
            height: calc(100% - 30px);
            margin-top: 30px;
          }
        }
      }
      .right {
        flex: 597;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        .right-top {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/zshy.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .right-top-view {
            width: 100%;
            padding: 0 .35rem;
            height: calc(100% - 86px);
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            .right-top-view-top {
              margin-bottom: 10px;
              flex: 1;
              width: 100%;
              display: flex;
              flex-direction: row;
              .item {
                flex: 1;
                background: url("../../assets/network/zshykctop5.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                .rank {
                  margin-top: 17px;
                  margin-bottom: 11px;
                  margin-left: .2rem;
                  color: #05FAFA;
                  font-family: PMZD;
                  font-size: 16px;
                  font-style: italic;
                  span {
                    position: relative;
                  }
                  span::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border: 5px solid;
                    border-color: transparent transparent transparent #D6731A;
                    right: -18px;
                    top: 3px;
                  }
                }
                .label {
                  color: #A7C7C7;
                  font-size: 14px;
                  font-family: PingFangSC-Medium;
                  margin-left: .2rem;
                }
                .value {
                  position: absolute;
                  right: .2rem;
                  bottom: 33px;
                  color: #E9EDED;
                  font-size: 20px;
                  font-family: DIN-MEDIUM;
                  font-weight: 500;
                }
                .util {
                  position: absolute;
                  right: .2rem;
                  bottom: 16px;
                  color: #677A7A;
                  font-size: 12px;
                  font-family: PingFangSC-Regular;
                }
              }
              & > div:not(:first-child) {
                margin-left: 10px;
              }
            }
            .right-top-view-bot {
              flex: 1;
              width: 100%;
              display: flex;
              flex-direction: row;
              .item {
                flex: 1;
                background: url("../../assets/network/zshykctop4.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                .rank {
                  margin-top: 17px;
                  margin-bottom: 11px;
                  margin-left: .2rem;
                  color: #026161;
                  font-family: PMZD;
                  font-size: 16px;
                  font-style: italic;
                  position: relative;
                  span {
                    position: relative;
                  }
                  span::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border: 5px solid;
                    border-color: transparent transparent transparent #D6731A;
                    right: -18px;
                    top: 3px;
                  }
                }
                .label {
                  color: #A7C7C7;
                  font-size: 14px;
                  font-family: PingFangSC-Medium;
                  margin-left: .2rem;
                }
                .value {
                  position: absolute;
                  right: .2rem;
                  bottom: 33px;
                  color: #E9EDED;
                  font-size: 20px;
                  font-family: DIN-MEDIUM;
                  font-weight: 500;
                }
                .util {
                  position: absolute;
                  right: .2rem;
                  bottom: 16px;
                  color: #677A7A;
                  font-size: 12px;
                  font-family: PingFangSC-Regular;
                }
              }
              & > div:not(:first-child) {
                margin-left: 10px;
              }
            }
          }
        }
        .right-center {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/jxtj.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          position: relative;
          .table-view {
            width: 100%;
            margin-top: 60px;
            padding-left: .35rem;
            padding-right: .35rem;
            height: calc(100% - 88px);
            ::v-deep.table-views {
              .main {
                padding-top: 16px;
              }
            }
          }
        }
        .right-bottom {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/network/sydzb.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .charts {
            width: 100%;
            height: calc(100% - 30px);
            margin-top: 30px;
          }
        }
      }
    }
  }
</style>
