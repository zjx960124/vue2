<template>
  <div class="campus">
    <div class="header">校园管理</div>
    <div class="main">
      <div class="left">
        <view-title title="教学质量"></view-title>
        <div class="search-view">
          <div class="search-select grade">
            <el-select v-model="gradeJx" @change="setJxzl">
              <el-option
                v-for="(item, index) in gradeOption"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="search-select time">
            <el-date-picker
              v-model="jxzlTime"
              type="month"
              placeholder="选择月"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="setJxzl"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="left-top">
          <div class="extra-title">班级月评对比</div>
          <div class="chart">
            <line-chart
              title=""
              height="100%"
              :grid="[10, 10, 10, 30]"
              :color="['#F28179']"
              :x-axis-label-wraps="true"
              :x-axis-data="bjypdbXAxisData"
              :y-axis-names="['']"
              :legend-data="['']"
              :show-data-zoom="true"
              :data-zoom-start-value="0"
              :data-zoom-end-value="4"
              :series-data="bjypdbSeriesData"
            ></line-chart>
          </div>
        </div>
        <div class="left-center">
          <div class="extra-title">本月班主任考核TOP5</div>
          <div class="chart" id="bybzrkh" ref="bybzrkh">
            <!--<bar-chart
              title=""
              height="100%"
              direction="horizontal"
              :grid="[0, 15, 25, 15]"
              :color="['#04F9FA', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :show-x-axis-label="false"
              :shwo-axis-line="false"
              :legend-data="['']"
              :legend-bottom="15"
              show-legend-position="bottom"
              :y-axis-data="bybzrkhXAxisData"
              :series-data="bybzrkhSeriesData"
            ></bar-chart>-->
          </div>
        </div>
        <div class="left-bottom">
          <div class="extra-title">各环节得分详情</div>
          <div class="chart">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[0, 5, 25, 50]"
              :color="['#04F9FA', '#D3DEE0', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="true"
              :y-axis-names="['']"
              :legend-data="['常规工作', '班级管理', '加分项']"
              :legend-bottom="22"
              :show-data-zoom="true"
              :data-zoom-start-value="0"
              :data-zoom-end-value="4"
              :data-zoom-bottom="15"
              show-legend-position="bottom"
              :x-axis-data="ghjdfxqXAxisData"
              :series-data="ghjdfxqSeriesData"
            ></bar-chart>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <view-title title="校园学生实时情况"></view-title>
          <div class="center-main">
            <div class="percent">
              <div
                class="percent-item"
                v-for="(item, index) in xyssqkBing"
                :key="index"
              >
                <div class="label">
                  <img src="../../assets/campus/xyxssszk_img2.png" alt="">
                  {{ item.type }}
                </div>
                <div class="value">{{ item.bili }}%</div>
              </div>
            </div>
            <div class="circle-out"></div>
            <div class="circle-center"></div>
            <div class="circle-in"></div>
            <div class="left-view">
              <vue-seamless-scroll
                :data="transLeft"
                :class-option="classOption"
                class="seamless-warp"
              >
                <div
                  class="trans-item"
                  v-for="(item, index) in transLeft"
                  :key="index"
                  :class="item.type === 1 ? 'bad' : 'fine'"
                  :style="{marginLeft: item.x + 'px', marginTop: item.y + 'px'}"
                >
                  <div class="trans-item-time">{{ item.activeTime }}</div>
                  <div class="trans-item-info">
                    <span class="trans-item-name">{{ item.name }}</span>
                    <span class="trans-item-type">【{{ item.behavior }}】</span>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
            <div class="right-view">
              <vue-seamless-scroll
                :data="transRight"
                :class-option="classOptions"
                class="seamless-warps"
              >
                <div
                  class="trans-item"
                  v-for="(item, index) in transRight"
                  :key="index"
                  :class="item.type === 1 ? 'bad' : 'fine'"
                  :style="{marginLeft: item.x + 'px', marginTop: item.y + 'px'}"
                >
                  <div class="trans-item-time">{{ item.activeTime }}</div>
                  <div class="trans-item-info">
                    <span class="trans-item-name">{{ item.name }}</span>
                    <span class="trans-item-type">【{{ item.behavior }}】</span>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div class="center-bot">
          <view-title title="班级评分TOP5"></view-title>
          <div class="search-view">
            <div class="search-select grade">
              <el-select v-model="gradeBj" @change="setBjpf">
                <el-option
                  v-for="(item, index) in gradeOption"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
            <div class="search-select time">
              <el-date-picker
                v-model="bjpfTime"
                type="month"
                placeholder="选择月"
                format="yyyy-MM"
                value-format="yyyy-MM"
                @change="setBjpf"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="center-bot-main">
            <div
              class="main-item"
              v-for="(item, index) in bjpfData"
              :key="index"
            >
              <div class="item-label">{{ item.className }}</div>
              <div class="item-value">{{ item.score }}</div>
              <div class="item-icon">
                <dynamic-icon
                  :half-num="0"
                  :full-num="item.fullNum"
                  :remaining-num="5 - item.fullNum"
                  :half-icon="require('../../assets/campus/bjpftop5_img5.png')"
                  :full-icon="require('../../assets/campus/bjpftop5_img4.png')"
                  :back-icon="require('../../assets/campus/bjpftop5_img5.png')"
                ></dynamic-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <view-title title=""></view-title>
          <div class="percent-view">
            <div class="percent-item">
              <div class="item-label">本学期出勤率</div>
              <div class="item-value">{{ xxkqxq.semester }}%</div>
            </div>
            <div class="percent-item">
              <div class="item-label">本月出勤率</div>
              <div class="item-value">{{ xxkqxq.week }}%</div>
            </div>
            <div class="percent-item">
              <div class="item-label">本日出勤率</div>
              <div class="item-value">{{ xxkqxq.today }}%</div>
            </div>
          </div>
          <div class="statistical-view">
            <div class="extra-title">今日异常统计</div>
            <div class="charts">
              <div
                class="jrtj-item"
                v-for="(item, index) in jsyxfbSeriesData"
                :key="index"
              >
                <pie-chart
                  ref="sxzyfb"
                  :title="jsyxfbTitle[index]"
                  title-left="50%"
                  title-bottom="0"
                  height="100%"
                  show-legend-position="bottom"
                  legend-bottom="0"
                  :graphic="jsyxfbGraphic[index]"
                  :show-legend="false"
                  :legend-data="jsyxfbLegendData"
                  :color="[
                        '#D6731A',
                        '#04E0E0'
                      ]"
                  :series-data="item"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="right-center">
          <view-title title="本周考勤异常"></view-title>
          <div class="chart">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[0, 30, 25, 20]"
              :color="['#04F9FA', '#D3DEE0', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="false"
              :show-y-axis="false"
              :y-axis-names="['']"
              :legend-data="[]"
              show-legend-position="bottom"
              :tooltip="bzjqycTooltip"
              :x-axis-data="bzkqycXAxisData"
              :series-data="bzkqycSeriesData"
            ></bar-chart>
          </div>
        </div>
        <div class="right-bot">
          <view-title title="近十日请假趋势"></view-title>
          <div class="chart">
            <line-chart
              title=""
              height="100%"
              :grid="[10, 30, 10, 45]"
              :color="['#04F9FA', '#D3DEE0', '#D6731A']"
              :x-axis-label-wraps="true"
              :x-axis-data="jsrqjqsXAxisData"
              :legend-data="jsrqjqsLegendData"
              :legend-bottom="16"
              :y-axis-names="['']"
              :series-data="jsrqjqsSeriesData"
            ></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import TextDescription from './components/textDescription'
  import ViewTitle from './components/viewTitle'
  import LineChart from '../../components/Chart/LineChart'
  import BarChart from '../../components/Chart/BarChart'
  import DynamicIcon from './components/dynamicIcon'
  import PieChart from '../../components/Chart/PieChart'
  import {
    getCampusGet,
    getCampusYear,
    getCampusJxzl,
    getCampusTop
  } from '@/api/build';
  import moment from 'moment';
  export default {
    name: 'CampusManagement',
    components: { PieChart, DynamicIcon, BarChart, LineChart, ViewTitle, TextDescription },
    data() {
      return {
        // 教学质量
        gradeJx: '',
        gradeOption: ['2019级', '2018级', '2017级'],
        jxzlTime: moment().format('YYYY-MM'),
        // 班级月评
        bjypdbSeriesData: [],
        bjypdbXAxisData: [],
        // 本月班主任考核top5
        bybzrkh: null,
        bybzrkhColor: ['#67E0E3', '#FD666D', '#D3DEE0', '#134B50', '#134B50'],
        bybzrkhXAxisData: [],
        bybzrkhSeriesData: [],
        // 各环节得分详情
        ghjdfxqXAxisData: [],
        ghjdfxqSeriesData: [],
        // 近十日请假趋势
        jsrqjqsSeriesData: [],
        jsrqjqsXAxisData: [],
        jsrqjqsLegendData: ['请假'],
        jsrqjqsColor: ['#04F9FA', '#D3DEE0', '#D6731A'],
        // 本周考勤异常
        bzjqycTooltip: {},
        bzkqycSeriesData: [
          {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#001414"
              }
            },
            symbolRepeat: "fixed",
            symbolMargin: 4,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [32, 2],
            symbolPosition: "start",
            symbolOffset: [0, 5],
            data:  [10,10,10,10],
            width: 1,
            z: 0,
            zlevel: 1
          },
          {
            type: "bar",
            barGap: "-101%", // 设置外框粗细
            data: [10, 10, 10, 10],
            barWidth: 42,
            emphasis: {
              label: {
                show: false
              },
            },
            itemStyle: {
              normal: {
                color: "transparent", // 填充色
                borderColor: '#002E2E',
                borderWidth: 1,
                label: {
                  show: false,
                }
              }
            },
            z: 0
          },
        ],
        bzkqycXAxisData: ['土木工程', '机电工程', '环境与艺术设计', '工程经济与管理'],
        // 教师院系分布
        jsyxfbLegendData: [''],
        jsyxfbSeriesData: [],
        jsyxfbTitle: [],
        jsyxfbGraphic: {
          elements: [
            {
              type: 'text',
              left: `40%`,
              top: '40%',
              style: {
                text: 30,
                font: 'italic bolder 24 cursive',
                fontSize: '24',
                fill: '#04F9FA'
              }
            },
            {
              type: 'image',
              left: '14%',
              top: '22%',
              style: {
                image: require('../../assets/build/jsyxfb_img2.png'),
                width: 101,
                height: 101,
                font: 'italic bolder 44px cursive',
                fontSize: '44px',
                fill: '#D6731A'
              }
            },
          ]
        },
        // 班级评分
        gradeBj: '',
        bjpfData: [],
        bjpfTime: moment().format('YYYY-MM'),
        // 学校考勤详情
        xxkqxq: '',
        // 今日异常统计
        // 校园学生实时情况
        xyssqkBing: [],
        animationLeft: [],
        animationRight: [],
        leftTimer: 0,
        rightTimer: 0,
        transLeft: [],
        transRight: []
      };
    },
    computed: {
      classOption() {
        return {
          step: 0.32,
          limitMoveNum: 3,
          hoverStop: true,
          direction: 1,
          singleHeight: 0,
          singleWidth: 0,
          waitTime: 1000
        };
      },
      classOptions() {
        return {
          step: 0.32,
          limitMoveNum: 3,
          hoverStop: true,
          direction: 1,
          singleHeight: 0,
          singleWidth: 0,
          waitTime: 1000
        };
      },
    },
    mounted() {
      // 获取页面数据
      this.getCampusData();
    },
    methods: {
      /**
       * 获取页面数据
       */
      getCampusData() {
        Promise.all([getCampusGet(), getCampusYear()]).then(([v1, v2]) => {
          this.$nextTick(() => {
            this.setKq(v1);
            this.setGrade(v2.data.yearMonthList.grade);
          });
        },(err) => {
          console.log(err)
        })
      },
      /**
       * 班级评分
       */
      setBjpf() {
        let param = {
          grade: this.gradeBj,
          year: this.bjpfTime.split('-')[0],
          month: this.bjpfTime.split('-')[1]
        };
        getCampusTop(param).then(res => {
          let datas = res.data.bjpfTop5.all;
          datas.forEach((item, index) => {
            item.fullNum = parseInt(item.score / 20) > 5 ? 5 : parseInt(item.score / 20) ;
          })
          this.bjpfData = datas;
        })
      },
      /**
       * 教学质量
       */
      setJxzl() {
        let param = {
          grade: this.gradeJx,
          year: this.jxzlTime.split('-')[0],
          month: this.jxzlTime.split('-')[1]
        };
        getCampusJxzl(param).then(res => {
          // 班级月评对比
          this.bjypdbXAxisData = res.data.bjypdb.teacherNameList;
          this.bjypdbSeriesData = [
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
              data: res.data.bjypdb.scoreList
            }
          ];
          // 本月班主任考核TOP5
          this.bybzrkhXAxisData = res.data.bybzrkhtop5.teacherNameList;
          this.bybzrkhSeriesData = [
            {
              name: '成绩',
              type: 'bar',
              zlevel: 1,
              itemStyle: {
                normal: {
                  barBorderRadius: 40,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#52d8da'
                  }, {
                    offset: 1,
                    color: '#57dcde'
                  }]),
                  shadowBlur:0,
                  shadowColor:'rgba(87,220,222,0.7)'
                },
              },
              barWidth: 6,
              data: res.data.bybzrkhtop5.scoreList
            },
            {
              name: '背景',
              type: 'bar',
              barWidth: 6,
              barGap: '-100%',
              data: [100, 100, 100, 100, 100],
              itemStyle: {
                normal: {
                  color: 'rgba(24,31,68,1)',
                  barBorderRadius: 30,
                  borderColor: '#67E0E3',
                  borderWidth: 2
                }
              },
            },
          ];
          let scoreData = [];
          let gradientOption = [
            {
              normal: {
                barBorderRadius: 40,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#011A1A'
                }, {
                  offset: 1,
                  color: '#04F9FA'
                }]),
                shadowBlur:0,
                shadowColor:'rgba(87,220,222,0.7)'
              }
            },
            {
              normal: {
                barBorderRadius: 40,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#241304'
                }, {
                  offset: 1,
                  color: '#D6731A'
                }]),
                shadowBlur:0,
                shadowColor:'rgba(87,220,222,0.7)'
              }
            },
            {
              normal: {
                barBorderRadius: 40,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#2B2D2E'
                }, {
                  offset: 1,
                  color: '#D3DEE0'
                }]),
                shadowBlur:0,
                shadowColor:'rgba(87,220,222,0.7)'
              }
            },
            {
              normal: {
                barBorderRadius: 40,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#012E2E'
                }, {
                  offset: 1,
                  color: '#039494'
                }]),
                shadowBlur:0,
                shadowColor:'rgba(87,220,222,0.7)'
              }
            },
            {
              normal: {
                barBorderRadius: 40,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#012E2E'
                }, {
                  offset: 1,
                  color: '#039494'
                }]),
                shadowBlur:0,
                shadowColor:'rgba(87,220,222,0.7)'
              }
            }
          ];
          let labelOption = ['#04F9FA', '#D6731A', '#D3DEE0', '#039494', '#039494'];
          let max = 0;
          res.data.bybzrkhtop5.scoreList.forEach((item, index) => {
            scoreData.push({
              value: item,
              itemStyle: gradientOption[index]
            })
            if (item > max) max = item;
          });
          let scoreOption = [10, 100, 1000, 10000];
          let icon1 = require('../../assets/build/label1.png');
          let icon2 = require('../../assets/build/label2.png');
          let icon3 = require('../../assets/build/label3.png');
          let option = {
            color: this.bybzrkhColor,
            grid: {
              x: 22,
              y: 29,
              x2: 55,
              y2: 5,
              borderWidth: 1,
              containLabel: true
            },
            yAxis: [{
              type: 'category',
              data: res.data.bybzrkhtop5.teacherNameList,
              inverse: true,
              boundaryGap: false,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                showMaxLabel: true,
                hideOverlap: false,
                fontFamily: 'PingFangSC-Regular,sans-serif',
                textStyle: {
                  fontFamily: 'PingFangSC-Regular,sans-serif',
                  color: 'rgba(167, 199, 199, .6)',
                  fontWeight: 'bold',
                  fontSize: this.fitChartSize(14),
                },
                normal: {
                  showMaxLabel: true,
                  hideOverlap: false,
                },
                formatter: function (value, index) {
                  if (index < 3) {
                    return `{value|${value}}\n{${index}|}`;
                  } else {
                    return value;
                  }
                },
                rich: {
                  value: {
                    color: 'rgba(167, 199, 199, .6)',
                    fontWeight: 'bold',
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: this.fitChartSize(14),
                    lineHeight: this.fitChartSize(32),
                    padding: [0, 0, this.fitChartSize(12), 0]
                  },
                  '0': {
                    width: 33 * document.documentElement.clientWidth / 1920,
                    height: 12 * document.documentElement.clientHeight / 1080,
                    padding: [0, 0, 0, 0],
                    backgroundColor: {
                      image: require('../../assets/build/label1.png')
                    }
                  },
                  '1': {
                    width: 33 * document.documentElement.clientWidth / 1920,
                    height: 12 * document.documentElement.clientHeight / 1080,
                    backgroundColor: {
                      image: icon2
                    }
                  },
                  '2': {
                    width: 33 * document.documentElement.clientWidth / 1920,
                    height: 12 * document.documentElement.clientHeight / 1080,
                    backgroundColor: {
                      image: icon3
                    }
                  }
                }
              }
            }],
            xAxis: {
              show: false
            },
            series: [
              {
                name: '成绩',
                type: 'bar',
                zlevel: 2,
                itemStyle: {
                  normal: {
                    barBorderRadius: 40,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0,
                      color: '#52d8da'
                    }, {
                      offset: 1,
                      color: '#57dcde'
                    }]),
                    shadowBlur:0,
                    shadowColor:'rgba(87,220,222,0.7)'
                  },
                },
                barWidth: 4,
                data: scoreData
              },
              {
                name: '背景',
                type: 'bar',
                barWidth: 8,
                barGap: '-150%',
                data: [
                  {
                    value: res.data.bybzrkhtop5.max,
                    itemStyle: {
                      normal: {
                        color: 'rgba(4,249,250, .1)',
                        barBorderRadius: 30,
                        borderColor: 'rgba(4, 249, 250, .2)',
                        borderWidth: 2
                      }
                    },
                    label: {
                      show: true,
                      position: 'right',
                      color: '#04F9FA',
                      distance: 5,
                      fontSize: 14,
                      fontFamily: "DIN-Medium",
                      fontWeight: 500,
                      lineHeight: 14,
                      formatter: function (params) {
                        return scoreData[params.dataIndex].value;
                      }
                    },
                  },
                  {
                    // value: scoreOption[max.toString().length - 1],
                    value: res.data.bybzrkhtop5.max,
                    itemStyle: {
                      normal: {
                        color: 'rgba(20, 11, 2)',
                        barBorderRadius: 30,
                        borderColor: '#3D2007',
                        borderWidth: 2
                      }
                    },
                    label: {
                      show: true,
                      position: 'right',
                      color: '#D6731A',
                      distance: 5,
                      fontSize: 14,
                      fontFamily: "DIN-Medium",
                      fontWeight: 500,
                      lineHeight: 14,
                      formatter: function (params) {
                        return scoreData[params.dataIndex].value;
                      }
                    },
                  },
                  {
                    // value: scoreOption[max.toString().length - 1],
                    value: res.data.bybzrkhtop5.max,
                    itemStyle: {
                      normal: {
                        color: 'rgba(211,222,224, .1)',
                        barBorderRadius: 30,
                        borderColor: '#2B2D2E',
                        borderWidth: 2
                      }
                    },
                    label: {
                      show: true,
                      position: 'right',
                      color: '#D3DEE0',
                      distance: 5,
                      fontSize: 14,
                      fontFamily: "DIN-Medium",
                      fontWeight: 500,
                      lineHeight: 14,
                      formatter: function (params) {
                        return scoreData[params.dataIndex].value;
                      }
                    },
                  },
                  {
                    // value: scoreOption[max.toString().length - 1],
                    value: res.data.bybzrkhtop5.max,
                    itemStyle: {
                      normal: {
                        color: 'rgba(4,249,250, .1)',
                        barBorderRadius: 30,
                        borderColor: '#012E2E',
                        borderWidth: 2
                      }
                    },
                    label: {
                      show: true,
                      position: 'right',
                      color: '#039494',
                      distance: 5,
                      fontSize: 14,
                      fontFamily: "DIN-Medium",
                      fontWeight: 500,
                      lineHeight: 14,
                      formatter: function (params) {
                        return scoreData[params.dataIndex].value;
                      }
                    },
                  },
                  {
                    // value: scoreOption[max.toString().length - 1],
                    value: res.data.bybzrkhtop5.max,
                    itemStyle: {
                      normal: {
                        color: 'rgba(4,249,250, .1)',
                        barBorderRadius: 30,
                        borderColor: '#012E2E',
                        borderWidth: 2
                      }
                    },
                    label: {
                      show: true,
                      position: 'right',
                      color: '#039494',
                      distance: 5,
                      fontSize: 14,
                      fontFamily: "DIN-Medium",
                      fontWeight: 500,
                      lineHeight: 14,
                      formatter: function (params) {
                        return scoreData[params.dataIndex].value;
                      }
                    },
                  }
                ],
              },
            ]
          }
          this.$nextTick(() => {
            this.bybzrkhChart = echarts.init(this.$refs.bybzrkh, 'shine');
            this.bybzrkhChart.setOption(option);
          });
          // 各环节得分详情
          // this.ghjdfxqXAxisData = data.data.ghjdfxq.teacherNameList;
          this.ghjdfxqXAxisData = Object.values(res.data.ghjdfxq)[0].map((item, index) => {
            return item.teacherName
          })
          let ghjdfxqSeriesData = [];
          Object.keys(res.data.ghjdfxq).forEach(function(key){
            ghjdfxqSeriesData.push({
              name: key,
              type: 'bar',
              barWidth: 6,
              barGap: '66%',
              data: res.data.ghjdfxq[key].map((value, index) => { return value.score})
            })
          });
          this.ghjdfxqSeriesData = ghjdfxqSeriesData;
        })
      },
      /**
       * 考勤情况
       */
      setKq(data) {
        // 本周考勤异常
        this.bzkqycXAxisData = data.data.bzkqyc.department;
        let max = 0;
        data.data.bzkqyc.countResult.forEach((item) => {
          if ( item > max) max = item;
        })
        let maxs = Math.ceil(max / 100) * 100;
        this.bzkqycSeriesData[0].data = [maxs, maxs, maxs, maxs];
        this.bzkqycSeriesData[1].data = [maxs, maxs, maxs, maxs];
        let bzkqData = {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#026161"
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 10,
                offset: [0, 0],
                textStyle: {
                  color: '#026161',
                  fontFamily: 'DIN-MEDIUM'
                },
              },
            },
            emphasis: {
              itemStyle: {
                color: "#04F9FA"
              },
              label: {
                color: '#04F9FA',
                normal: {
                  color: '#04F9FA'
                }
              }
            },
            symbolRepeat: "fixed",
            symbolMargin: 4,
            symbol: "rect",
            symbolClip: true,
            fontSize: 12,
            symbolSize: [32, 2],
            symbolPosition: "start",
            symbolOffset: [0,5],
            data: [
              {
                value: data.data.bzkqyc.countResult[0],
                itemStyle: {
                  normal: {
                    color: "#04F9FA"
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    distance: 10,
                    offset: [0, 0],
                    textStyle: {
                      color: '#04F9FA',
                      fontFamily: 'DIN-MEDIUM'
                    },
                  },
                }
              },
              data.data.bzkqyc.countResult[1],
              data.data.bzkqyc.countResult[2],
              data.data.bzkqyc.countResult[3]
            ],
            width: 1,
            z: 99,
            zlevel: 99
          };
        this.bzkqycSeriesData.push(bzkqData);
        let bzkqDatas = data.data.bzkqyc.countResult;
        this.bzjqycTooltip = {
          trigger: 'axis',
          confine: true,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          },
          formatter: (params) => {
            if (params.name !== '') {
              return params[2].name + ' : ' + bzkqDatas[params[2].dataIndex];
            }
          }
        }
        // 今日异常统计
        let all = 0;
        let jrtj = [];
        let jrtjGraphic = [];
        data.data.jrtj.countResult.forEach((item, index) => {
          all += Number(item);
        });
        data.data.jrtj.all.forEach((item, index) => {
          jrtj.push(
            [
              {
                type: 'pie',
                radius: ["54%", "64%"],
                center: ['50%', '50%'],
                hoverAnimation: false,
                data: [
                  {
                    name: data.data.jrtj.type[index],
                    value: item.countResult,
                    type: 'pie',
                    label: {
                      show: false,
                      formatter: '{d}%{b}',
                      fontSize: 8
                    },
                    labelLine: {
                      show: false,
                      length: 4,
                      length2: 4
                    },
                    itemStyle: {
                      color: '#D6731A'
                    },
                  },
                  {
                    //画剩余的刻度圆环
                    name: '',
                    value: all - item.countResult,
                    type: 'pie',
                    itemStyle: {
                      color: 'rgba(255,255,255,0)',
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                    emphasis: {
                      labelLine: {
                        show: false,
                      },
                      itemStyle: {
                        color: 'rgba(255,255,255,0)',
                      },
                    },
                  },
                ]
              },
              {
                name: '',
                type: 'pie',
                radius: ["57%", "61%"],
                center: ['50%', '50%'],
                hoverAnimation: false,
                z: 1,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false
                },
                data: [
                  {
                    value: 100,
                    itemStyle: {
                      color: '#134B50',
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false
                      }
                    }
                  }
                ]
              }
            ]
          );
          jrtjGraphic.push(
            {
              elements: [
                {
                  type: 'text',
                  left: `${42 - ((item.countResult.toString().length - 2) * 4.2)}%`,
                  top: '42%',
                  style: {
                    text: item.countResult.toLocaleString('zh', { style: 'decimal' }),
                    font: 'italic bolder 24 cursive',
                    fontSize: this.fitChartSize(24),
                    fill: '#04F9FA',
                    fontFamily: 'DIN-MEDIUM',
                    fontWeight: '500',
                  }
                },
                {
                  type: 'image',
                  left: `22%`,
                  top: '22%',
                  style: {
                    image: require('../../assets/build/jsyxfb_img2.png'),
                    width: 101 * document.documentElement.clientWidth / 1920,
                    height: 101 * document.documentElement.clientHeight / 1080,
                    font: 'italic bolder 44px cursive',
                    fontSize: this.fitChartSize(44),
                    fill: '#D6731A'
                  }
                },
              ]
            }
          )
          this.jsyxfbTitle.push(data.data.jrtj.type[index]);
        })
        this.jsyxfbSeriesData = jrtj;
        this.jsyxfbGraphic = jrtjGraphic;
        // 近十日请假趋势
        /*for (let key in data.data.jsrqjqs) {
          if (key.toString() === '1') {
            data.data.jsrqjqs[key].forEach(items => {
              this.jsrqjqsXAxisData.push(items.activeTime);
            })
          }
          this.jsrqjqsLegendData.push(data.data.jsrqjqs[key.toString()][0].name);
          this.jsrqjqsSeriesData.push({
            name: data.data.jsrqjqs[key.toString()][0].name,
            type: 'line',
            symbol: 'none',
            showAllSymbol: true,
            symbolSize: 0,
            lineStyle: {
              normal: {
                width: 3,
                color: this.jsrqjqsColor[key - 1], // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)',
            },
            areaStyle: { //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(211, 222, 224, .2)"
                },
                  {
                    offset: 1,
                    color: "rgba(211, 222, 224, 0)"
                  }
                ], false),
              }
            },
            data: data.data.jsrqjqs[key].map((items) => { return items.countResult })
          })
        }*/
        data.data.jsrqjqs.forEach((item, index) => {
          this.jsrqjqsXAxisData.push(item.activeTime);
        });
        this.jsrqjqsSeriesData.push({
          name: '请假',
          type: 'line',
          symbol: 'none',
          showAllSymbol: true,
          symbolSize: 0,
          lineStyle: {
            normal: {
              width: 3,
              color: this.jsrqjqsColor[0], // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
          },
          areaStyle: { //区域填充样式
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(211, 222, 224, .2)"
              },
                {
                  offset: 1,
                  color: "rgba(211, 222, 224, 0)"
                }
              ], false),
            }
          },
          data: data.data.jsrqjqs.map((items) => { return items.countResult })
        })
        // 学校考勤详情
        this.xxkqxq = data.data.xxkqxq;
        // 校园学生实时情况
        this.xyssqkBing = data.data.xyssqkBing.all;
        let width = 236 * document.documentElement.clientWidth / 1920;
        // let width2 = this.$refs.transLeft.firstElementChild.clientWidth;
        let width2 = 186 * document.documentElement.clientWidth / 1920;
        let leftData = data.data.xyssqkxiaoxi.left;
        let rightData = data.data.xyssqkxiaoxi.right;
        leftData.forEach((item, index) => {
          let x = parseInt(Math.random()*(width - width2 + 1),10);
          item.x = x;
        })
        rightData.forEach((item, index) => {
          let x = parseInt(Math.random()*(width - width2 + 1),10);
          item.x = x;
        })
        this.transRight = leftData;
        this.transLeft = rightData;
       /* this.$nextTick(() => {
          this.setCampusAnimation();
        });*/
        /*data.data.xyssqkxiaoxi.left.forEach((item, index) => {
          item.x = 0;
          item.y = 0;
          left.push(item);
        })
        data.data.xyssqkxiaoxi.right.forEach((item, index) => {
          item.x = 0;
          item.y = 0;
          right.push(item);
        })
        let temp = parseInt(left.length / 3); // 组数量
        let last = left.length % 3 || null; // 最后一组数量
        for (let i = 0; i < temp; i++) {
          this.animationLeft.push(left.slice(i, i + 3));
        }
        let tempR = parseInt(left.length / 4); // 组数量
        let lastR = left.length % 4 || null; // 最后一组数量
        for (let i = 0; i < temp; i++) {
          this.animationRight.push(right.slice(i, i + 4));
        }
        this.setCampusAnimation()*/
      },
      /**
       * 校园情况动画
       */
      setCampusAnimation() {
        // this.transLeft = left;
        // this.transRight = right;
        // 首次加载动画
        this.$nextTick(() => {
          this.changeMarginLeft();
          this.changeMarginRight();
          this.setEventListeners();
        })
      },
      /**
       * 设置年级下拉框
       */
      setGrade(data) {
        this.gradeOption = data;
        this.gradeBj = data[1];
        this.gradeJx = data[1];
        this.setJxzl();
        this.setBjpf()
      },
      /**
       * 监听动画
       */
      setEventListeners() {
        // 监听动画
        let transitions = {
          // 兼容IE
          'transition': 'transitionend',
          // 兼容Opera
          'OTransition': 'oTransitionEnd',
          // 兼容Firefox
          'MozTransition': 'transitionend',
          // 兼容Google
          'WebkitTransition': 'webkitTransitionEnd'
        };
        let transLeft = document.getElementById('transLeft');
        transLeft.addEventListener('webkitAnimationIteration' , this.changeMarginLeft);
        let transRight = document.getElementById('transRight');
        transRight.addEventListener('webkitAnimationIteration' , this.changeMarginRight);
        // 移出监听动画，防止内存泄漏
        this.$once('hook:beforeDestory', () => {
          transLeft.removeEventListener('webkitAnimationIteration', this.changeMarginLeft);
          transRight.removeEventListener('webkitAnimationIteration', this.changeMarginRight);
        })
      },
      /**
       * 左侧动画
       */
      changeMarginLeft() {
        /*let leftData = this.animationLeft[this.leftTimer];
        this.leftTimer++;
        if (this.leftTimer === this.animationLeft.length - 1) this.leftTimer = 0;*/
        this.$nextTick(() => {
          let width = this.$refs.transLeft.clientWidth;
          let width2 = this.$refs.transLeft.firstElementChild.clientWidth;
          // let width2 = 186;
          this.transLeft.forEach((item, index) => {
            let x = parseInt(Math.random()*(width - width2 + 1),10);
            item.x = x;
          })
        })
      },
      /**
       * 右侧动画
       */
      changeMarginRight() {
        /*this.transRight = this.animationRight[this.rightTimer];
        this.rightTimer++;
        if (this.rightTimer === this.animationRight.length - 1) this.rightTimer = 0;*/
        this.$nextTick(() => {
          let width = this.$refs.transRight.clientWidth;
          let width2 = this.$refs.transRight.firstElementChild.clientWidth;
          this.transRight.forEach((item, index) => {
            let x = parseInt(Math.random()*(width - width2 + 1),10);
            item.x = x;
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .campus {
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
      color: #ffffff;
      background: url("../../assets/build/header.png") no-repeat;
      background-position: center bottom;
    }
    .main {
      flex: 1;
      height: calc(100% - 75px);
      display: flex;
      align-items: center;
      padding-top: 30px;
      padding-left: .4rem;
      padding-right: .4rem;
      padding-bottom: 60px;
      .left {
        flex: 442;
        width: 0;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background: url("../../assets/campus/jxzl.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .search-view {
          flex-shrink: 0;
          height: 83px;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: flex-end;
          position: relative;
          margin-left: .35rem;
          margin-right: .22rem;
          .search-select {
            background: url("../../assets/campus/jxzl_img1.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            ::v-deep.el-select {
              width: .61rem;
              height: .22rem;
              .el-input {
                height: 100%;
                .el-input__inner {
                  height: 100%;
                  background: transparent;
                  border-color: #026161;
                  padding-right: 0;
                  padding-left: 7px;
                  font-size: 10px;
                  color: #04F9FA;
                }
                .el-input__suffix {
                  right: -4px;
                  .el-icon-arrow-up:before {
                    content: '\e78f';
                    color: #04F9FA;
                  }
                  .el-input__icon {
                    line-height: 100%;
                  }
                }
              }
            }
          }
          .grade {
            width: .77rem;
            height: .22rem;
          }
          .time {
            width: .98rem;
            height: .22rem;
            margin-left: 8px;
            ::v-deep.el-date-editor--month {
              width: .82rem;
              height: .22rem;
              .el-input__inner {
                height: .22rem;
                background: transparent;
                border-color: #026161;
                padding-right: 0;
                padding-left: 30px;
                font-size: 10px;
                color: #04F9FA;
              }
              .el-input__prefix {
                .el-input__icon {
                  line-height: 22px;
                  color: #04E1E1;
                }
              }
              .el-input__suffix {
                display: none;
              }
            }
          }
        }
        .search-view::after {
          content: '';
          position: absolute;
          width: 100%;
          left: 0;
          height: 2px;
          bottom: -1px;
          background: url("../../assets/campus/jxzl_img3.png") no-repeat;
          background-size: 100% 100%;
        }
        .left-top {
          flex: 1;
          height: 0;
          margin-left: .35rem;
          margin-right: .35rem;
          margin-top: 15px;
          margin-bottom: 35px;
          .extra-title {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
            width: 1.3rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/campus/jxzl_bjypdb.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            font-family: PingFangSC-Bold;
            font-style: italic;
            text-align: center;
          }
        }
        .left-center {
          flex: 1;
          height: 0;
          margin-left: .35rem;
          margin-right: .35rem;
          margin-bottom: 35px;
          .extra-title {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
            width: 1.7rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/campus/jxzl_bybzrkhtop5_img1.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            font-family: PingFangSC-Bold;
            font-style: italic;
            text-align: center;
          }
          .chart {
            background: url("../../assets/campus/bybzrkhtop5_img2.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .left-bottom {
          flex: 1;
          height: 0;
          margin-left: .35rem;
          margin-right: .35rem;
          .extra-title {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 15px;
            width: 1.3rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/campus/jxzl_ghjdfxq.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            font-family: PingFangSC-Bold;
            font-style: italic;
            text-align: center;
          }
        }
        & > div {
          display: flex;
          flex-direction: column;
          .chart {
            width: 100%;
            flex: 1;
            height: 0;
          }
        }
      }
      .center {
        flex: 752;
        width: 0;
        height: 100%;
        margin: 0 .25rem;
        display: flex;
        flex-direction: column;
        .center-top {
          width: 100%;
          height: 0;
          flex: 610;
          margin-bottom: 20px;
          background: url("../../assets/campus/xyxssszk_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .center-main {
            width: 100%;
            height: calc(100% - 47px);
            margin-top: 35px;
            position: relative;
            background: url("../../assets/campus/xyxssszk_img6.png") no-repeat;
            background-size: 100% 100%;
            .percent {
              width: 1.8rem;
              height: 110px;
              position: absolute;
              top: 86px;
              left: .36rem;
              .percent-item {
                width: 1.5rem;
                height: 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                position: relative;
                .label {
                  font-size: 14px;
                  font-family: "PingFang SC";
                  width: 100px;
                  font-weight: bold;
                  font-style: italic;
                  color: #A7C7C7;
                  display: flex;
                  align-items: center;
                  img {
                    width: .11rem;
                    height: .13rem;
                    margin-right: 5px;
                  }
                }
                .value {
                  font-size: 18px;
                  font-family: DIN-MEDIUM;
                  font-weight: 500;
                  font-style: italic;
                  color: #04E1E1;
                }
              }
              .percent-item::after {
                content: '';
                position: absolute;
                background: url("../../assets/campus/xyxssszk_img3.png") no-repeat;
                background-size: 100% 100%;
                width: 100%;
                height: 2px;
                left: 0;
                bottom: -8px;
                display: block;
              }
              .percent-item:nth-child(2) {
                margin-left: .3rem;
              }
            }
            .circle-out {
              width: 3.24rem;
              height: 3.24rem;
              background: url("../../assets/campus/xyxssszk_img8.png");
              background-size: 100% 100%;
              position: absolute;
              left: 50%;
              margin-left: -1.62rem;
              top: 65px;
              animation: spin 4s linear infinite;
            }
            .circle-center {
              width: 3.06rem;
              height: 3.06rem;
              background: url("../../assets/campus/xyxssszk_img9.png");
              background-size: 100% 100%;
              position: absolute;
              left: 50%;
              margin-left: -1.53rem;
              top: 75px;
              animation: spin 3s linear infinite;
            }
            .circle-in {
              width: 2.82rem;
              height: 2.82rem;
              background: url("../../assets/campus/xyxssszk_img7.png");
              background-size: 100% 100%;
              position: absolute;
              left: 50%;
              margin-left: -1.41rem;
              top: 84px;
              animation: spin 2s linear infinite;
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
                transition: all 5s;
              }
            }
            .left-view {
              position: absolute;
              width: 2.36rem;
              height: 2.38rem;
              left: 0;
              bottom: 10px;
              .seamless-warp {
                height: 100%;
                width: 100%;
                overflow: hidden;
                .trans-item {
                  width: 1.86rem;
                  height: 46px;
                  display: flex;
                  flex-direction: column;
                  padding-left: .2rem;
                  margin-bottom: 35px;
                  /*animation: scale2 15s linear infinite;*/
                }
                .fine {
                  background: url("../../assets/campus/xyxssszk_img4.png") no-repeat;
                  background-size: 100% 100%;
                  .trans-item-time {
                    color: #038585;
                    font-size: 11px;
                    font-family: DIN-MEDIUM;
                    font-weight: 500;
                    font-style: italic;
                    margin-top: 8px;
                    margin-bottom: 5px;
                  }
                  .trans-item-info {
                    font-size: 16px;
                    display: flex;
                    flex-wrap: nowrap;
                    .trans-item-name {
                      color: #A2E0E0;
                      font-family: "PingFang SC";
                      font-style: italic;
                      font-size: 11px;
                      /*overflow: hidden;
                      white-space: nowrap;
                      text-overflow: clip;*/
                    }
                    .trans-item-type {
                      max-width: 1.05rem;
                      font-size: 11px;
                      font-family: PingFangSC-Medium;
                      font-style: italic;
                      color: #A2E0E0;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }
                }
                .bad {
                  background: url("../../assets/campus/xyxssszk_img5.png") no-repeat;
                  background-size: 100% 100%;
                  .trans-item-time {
                    color: #AD5C15;
                    font-size: 11px;
                    font-family: DIN-MEDIUM;
                    font-weight: 500;
                    font-style: italic;
                    margin-top: 8px;
                    margin-bottom: 5px;
                  }
                  .trans-item-info {
                    font-size: 16px;
                    display: flex;
                    flex-wrap: nowrap;
                    .trans-item-name {
                      color: #F0CCAD;
                      font-family: "PingFang SC";
                      font-style: italic;
                      font-size: 11px;
                      /*overflow: hidden;*/
                      /*white-space: nowrap;*/
                      /*text-overflow: clip;*/
                    }
                    .trans-item-type {
                      max-width: 1.05rem;
                      font-size: 11px;
                      font-family: PingFangSC-Medium;
                      color: #F08C35;
                      overflow: hidden;
                      font-style: italic;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }
                }
                @keyframes scale2{
                  0%{
                    transform: scale(0);
                    opacity: 0;
                    transform-origin: 50% 50%;
                  }
                  5%{
                    transform: scale(1);
                    opacity: 1;
                    transform-origin: 50% 50%;
                  }
                  95%{
                    transform: scale(1);
                    opacity: 1;
                    transform-origin: 50% 50%;
                  }
                  100%{
                    transform: scale(0);
                    opacity: 0;
                    transform-origin: 50% 50%;
                  }
                  /*20%{
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  33%{
                    -webkit-transform: scale(1);
                    transform: scale(1.2);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  42%{
                    -webkit-transform: scale(1);
                    transform: scale(.8);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  51%{
                    -webkit-transform: scale(1);
                    transform: scale(1.2);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  60%{
                    -webkit-transform: scale(1);
                    transform: scale(.8);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  66%{
                    -webkit-transform: scale(.2);
                    transform: scale(1);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  80%{
                    -webkit-transform: scale(.2);
                    transform: scale(1.4);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  100%{
                    transform: scale(1);
                    transform-origin: 50% 0%;
                  }*/
                }
              }
              .trans-view {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                top: 0%;
                /*animation: sliding 10s linear infinite;*/
                /*animation: scales 10s linear infinite;*/
              }
              @keyframes sliding {
                from {
                  transform: translate3d(0, 0%, 0);
                }
                to {
                  transform: translate3d(0, -100%, 0);
                }
              }
            }
            .right-view {
              position: absolute;
              width: 2.64rem;
              height: 2.38rem;
              right: 0;
              bottom: 10px;
              .seamless-warps {
                height: 100%;
                width: 100%;
                overflow: hidden;
                .trans-item {
                  width: 1.86rem;
                  height: 46px;
                  display: flex;
                  flex-direction: column;
                  padding-left: .2rem;
                  margin-bottom: 35px;
                  /*animation: scale2 15s linear infinite;*/
                }
                .fine {
                  background: url("../../assets/campus/xyxssszk_img4.png") no-repeat;
                  background-size: 100% 100%;
                  .trans-item-time {
                    color: #038585;
                    font-size: 11px;
                    font-family: DIN-MEDIUM;
                    font-weight: 500;
                    font-style: italic;
                    margin-top: 8px;
                    margin-bottom: 5px;
                  }
                  .trans-item-info {
                    font-size: 16px;
                    display: flex;
                    flex-wrap: nowrap;
                    .trans-item-name {
                      color: #A2E0E0;
                      font-family: "PingFang SC";
                      font-style: italic;
                      font-size: 11px;
                      /*overflow: hidden;*/
                      /*white-space: nowrap;*/
                      /*text-overflow: clip;*/
                    }
                    .trans-item-type {
                      max-width: 1.05rem;
                      font-size: 11px;
                      font-family: PingFangSC-Medium;
                      color: #A2E0E0;
                      overflow: hidden;
                      white-space: nowrap;
                      font-style: italic;
                      text-overflow: ellipsis;
                    }
                  }
                }
                .bad {
                  background: url("../../assets/campus/xyxssszk_img5.png") no-repeat;
                  background-size: 100% 100%;
                  .trans-item-time {
                    color: #AD5C15;
                    font-size: 11px;
                    font-family: DIN-MEDIUM;
                    font-weight: 500;
                    margin-top: 8px;
                    font-style: italic;
                    margin-bottom: 5px;
                  }
                  .trans-item-info {
                    font-size: 16px;
                    display: flex;
                    flex-wrap: nowrap;
                    .trans-item-name {
                      color: #F0CCAD;
                      font-family: "PingFang SC";
                      font-size: 11px;
                      /*overflow: hidden;*/
                      font-style: italic;
                      /*font-style: italic;*/
                      /*white-space: nowrap;*/
                      /*text-overflow: clip;*/
                    }
                    .trans-item-type {
                      max-width: 1.05rem;
                      font-size: 11px;
                      font-family: PingFangSC-Medium;
                      color: #F08C35;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-style: italic;
                    }
                  }
                }
                @keyframes scale2{
                  0%{
                    transform: scale(0);
                    opacity: 0;
                    transform-origin: 50% 50%;
                  }
                  5%{
                    transform: scale(1);
                    opacity: 1;
                    transform-origin: 50% 50%;
                  }
                  95%{
                    transform: scale(1);
                    opacity: 1;
                    transform-origin: 50% 50%;
                  }
                  100%{
                    transform: scale(0);
                    opacity: 0;
                    transform-origin: 50% 50%;
                  }
                  /*20%{
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  33%{
                    -webkit-transform: scale(1);
                    transform: scale(1.2);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  42%{
                    -webkit-transform: scale(1);
                    transform: scale(.8);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  51%{
                    -webkit-transform: scale(1);
                    transform: scale(1.2);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  60%{
                    -webkit-transform: scale(1);
                    transform: scale(.8);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  66%{
                    -webkit-transform: scale(.2);
                    transform: scale(1);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  80%{
                    -webkit-transform: scale(.2);
                    transform: scale(1.4);
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                  }
                  100%{
                    transform: scale(1);
                    transform-origin: 50% 0%;
                  }*/
                }
              }
              .trans-view {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                top: 0%;
              }
              @keyframes sliding {
                from {
                  top: 100%;
                }
                to {
                  top: -100%;
                  transition: all 10s;
                }
              }
            }
          }
        }
        .center-bot {
          width: 100%;
          height: 0;
          flex: 277;
          background: url("../../assets/campus/bjpftop5_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .search-view {
            flex-shrink: 0;
            height: 83px;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            position: relative;
            margin-left: .12rem;
            margin-right: .12rem;
            width: calc(100% - .24rem);
            .search-select {
              background: url("../../assets/campus/jxzl_img1.png") no-repeat;
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
              ::v-deep.el-select {
                width: .61rem;
                height: .22rem;
                .el-input {
                  height: 100%;
                  .el-input__inner {
                    height: 100%;
                    background: transparent;
                    border-color: #026161;
                    padding-right: 0;
                    padding-left: 7px;
                    font-size: 10px;
                    color: #04F9FA;
                  }
                  .el-input__suffix {
                    right: -4px;
                    .el-icon-arrow-up:before {
                      content: '\e78f';
                      color: #04F9FA;
                    }
                    .el-input__icon {
                      line-height: 100%;
                    }
                  }
                }
              }
            }
            .grade {
              width: .77rem;
              height: .22rem;
            }
            .time {
              width: .98rem;
              height: .22rem;
              margin-left: 8px;
              ::v-deep.el-date-editor--month {
                width: .82rem;
                height: .22rem;
                .el-input__inner {
                  height: .22rem;
                  background: transparent;
                  border-color: #026161;
                  padding-right: 0;
                  padding-left: 30px;
                  font-size: 10px;
                  color: #04F9FA;
                }
                .el-input__prefix {
                  .el-input__icon {
                    line-height: 22px;
                    color: #04E1E1;
                  }
                }
                .el-input__suffix {
                  display: none;
                }
              }
            }
          }
          .search-view::after {
            content: '';
            position: absolute;
            width: 100%;
            left: 0;
            height: 2px;
            bottom: -1px;
            background: url("../../assets/campus/bjpftop5_img2.png") no-repeat;
            background-size: 100% 100%;
          }
          .center-bot-main {
            width: 100%;
            height: calc(100% - 83px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: .38rem;
            padding-right: .38rem;
            .main-item {
              width: 1.1rem;
              height: 114px;
              background: url("../../assets/campus/bjpftop5_img3.png") no-repeat;
              background-size: 100% 100%;
              display: flex;
              flex-direction: column;
              align-content: space-between;
              padding-top: 14px;
              padding-bottom: 14px;
              .item-label {
                max-width: .67rem;
                font-size: 12px;
                color: #A7C7C7;
                text-align: center;
                align-self: center;
                font-family: "PingFang SC";
                /*margin-bottom: 18px;*/
                flex: 1;
                word-wrap: break-word;
                /*max-height: 30px;*/
                overflow-y: hidden;
                line-height: 16px;
              }
              .item-value {
                font-family: DIN-MEDIUM;
                font-weight: 500;
                font-size: 24px;
                color: #D6731A;
                text-align: center;
                margin-bottom: 10px;
              }
              .item-icon {
                margin: 0 .2rem;
                height: 10px;
                justify-self: flex-end;
                ::v-deep.dynamic-view {
                  .info {
                    img {
                      width: .1rem;
                      height: 9px;
                    }
                  }
                  .back {
                    img {
                      width: .1rem;
                      height: 9px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .right {
        flex: 597;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .right-top {
          width: 100%;
          height: 0;
          flex: 347;
          margin-bottom: 20px;
          background: url("../../assets/campus/jsbzzk_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .percent-view {
            height: 96px;
            margin-top: 60px;
            margin-bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            .percent-item {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .item-label {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: bold;
                font-style: italic;
                color: #D2FAFA;
                position: relative;
              }
              .item-label::after {
                content: '';
                position: absolute;
                background: url("../../assets/campus/xxkqxq_img1.png");
                width: .05rem;
                height: 11px;
                top: 3px;
                left: -.08rem;
              }
              .item-label::before {
                content: '';
                position: absolute;
                background: url("../../assets/campus/xxkqxq_img1.png");
                width: .05rem;
                height: 11px;
                top: 3px;
                right: -.1rem;
              }
              .item-value {
                width: 1rem;
                height: .6rem;
                line-height: .6rem;
                text-align: center;
                font-size: 18px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
                color: #04E0E0;
                background: url("../../assets/network/zyxq_img1.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          .statistical-view {
            width: calc(100% - .6rem);
            margin-left: .3rem;
            margin-bottom: 23px;
            height: calc(100% - 196px);
            background: url("../../assets/campus/xxkqxq_jrtj_img2.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            .extra-title {
              position: absolute;
              top: 0;
              left: 50%;
              margin-left: -.65rem;
              width: 1.3rem;
              height: 20px;
              line-height: 20px;
              background: url("../../assets/campus/xxkqxq_jrtj_img1.png") no-repeat;
              background-size: 100% 100%;
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Bold;
              font-style: italic;
              text-align: center;
            }
            .charts {
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              .jrtj-item {
                flex: 1;
                height: 100%;
              }
            }
          }
        }
        .right-center {
          width: 100%;
          height: 0;
          flex: 243;
          margin-bottom: 20px;
          background: url("../../assets/campus/bzkqyc.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          padding-left: .25rem;
          padding-right: .25rem;
          .chart {
            margin-top: 40px;
            height: calc(100% - 40px);
          }
        }
        .right-bot {
          width: 100%;
          height: 0;
          flex: 277;
          background: url("../../assets/campus/jsrqjqs.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          flex-shrink: 0;
          padding-left: .25rem;
          padding-right: .25rem;
          .chart {
            margin-top: 40px;
            height: calc(100% - 40px);
          }
        }
      }
    }
  }
</style>
