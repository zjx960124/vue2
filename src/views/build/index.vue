<template>
  <div class="build">
    <div class="header">福建建筑学校一览</div>
    <div class="main">
      <div class="left">
        <div class="first">
          <view-title title="学生数据"></view-title>
          <div class="first-top">
            <text-description :data="xssjData"></text-description>
          </div>
          <div class="first-bot">
            <div class="first-bot-left">
              <bar-chart
                ref="xssj"
                direction="vertical"
                title=""
                height="100%"
                :grid="[15, 30, 40, 15]"
                :color="['#04E0E0', '#D6731A']"
                :x-axis-label-wraps="false"
                :show-y-axis="false"
                :x-axis-data="xssjThreeXAxisData"
                :y-axis-names="['']"
                :series-data="xssjThreeSeriesData"
              ></bar-chart>
            </div>
            <div class="first-bot-right">
              <bar-chart
                ref="xssj"
                direction="vertical"
                title=""
                height="100%"
                :grid="[15, 30, 40, 15]"
                :color="['#04E0E0', '#D6731A']"
                :x-axis-label-wraps="false"
                :axis-line-flag="false"
                :show-y-axis="false"
                :x-axis-data="xssjFiveXAxisData"
                :y-axis-names="['']"
                :series-data="xssjFiveSeriesData"
              ></bar-chart>
            </div>
          </div>
        </div>
        <div class="second">
          <view-title title="本期招生"></view-title>
          <div class="second-top">
            <text-description :data="bqzsData"></text-description>
          </div>
          <div class="second-bot">
            <div class="extra-title">招生专业TOP5</div>
            <!--<bar-chart
              ref="xssj"
              direction="vertical"
              title=""
              height="100%"
              :grid="[-35, 50, 10, 0]"
              :color="['#67E0E3', '#FD666D']"
              :show-y-axis="false"
              :x-axis-label-wraps="false"
              :x-axis-data="bqzsXaxisData"
              :x-axis-label-rich-flag="true"
              :x-axis-label-rich="xAxisLabelRich"
              :y-axis-names="['人']"
              :y-axis-names-padding="[25, 35, 0, 0]"
              :series-data="bqzsSeriesData"
            ></bar-chart>-->
            <div id="zszy" ref="zszy" style="height: 100%"></div>
          </div>
        </div>
        <div class="third">
          <div class="left">
            <view-title title="各院系学生情况"></view-title>
            <bar-chart
              title=""
              height="100%"
              direction="horizontal"
              :grid="[10, 45, 45, 40]"
              :color="['#04E0E0', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :legend-data="['男生', '女生']"
              :legend-bottom="15"
              show-legend-position="bottom"
              :y-axis-data="gyxxsqkXAxisData"
              :series-data="gyxxsqkSeriesData"
            ></bar-chart>
          </div>
          <div class="right">
            <view-title title="学生性别年龄分布"></view-title>
            <pie-chart
              ref="sxzyfb"
              title=""
              height="100%"
              show-legend-position="bottom"
              legend-bottom="16"
              :graphic="graphic"
              :legend-data="xsxbnlfbLegendData"
              :color="['#04E0E0', '#D3DEE0', '#D6731A']"
              :series-data="xsxbnlfbSeriesData"
            />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="map">
          <view-title title="学生生源情况"></view-title>
          <map-chart
            id="mapChart"
            ref="mapChart"
            class="mapChart"
            title=""
            width="95%"
            height="100%"
            class-name="mapChart"
            :show-visual-map="true"
            :geo-json="geoJson"
            :visual-map-max="visualMapMax"
            :series-data="mapSeriesData"
            :province-data="mapProvinceData"
          />
          <div class="map-tip">
            <div class="tip-top">
              <span>在校学生数</span>
              <span class="value">{{ mapTjData.zongshu | locale }}</span>
            </div>
            <div class="tip-center">
              <div>
                <span>福建籍学生</span>
                <span class="value">{{ mapTjData.fujian | locale }}</span>
              </div>
              <div class="progress">
                <el-progress
                  :percentage="mapTjData.fujianzhanbi"
                  color="rgba(214,115,26, 0.4)"
                ></el-progress>
              </div>
            </div>
            <div class="tip-bottom">
              <div>
                <span>其他籍学生</span>
                <span class="value">{{ mapTjData.qita | locale }}</span>
              </div>
              <div class="progress">
                <el-progress :percentage="mapTjData.qitazhanbi" color="rgba(214,115,26, 0.4)"></el-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="center-bot">
          <view-title title="办学规模"></view-title>
          <div class="center-bot-top" >
            <div
              class="item"
              v-for="(item, index) in bxgm1"
            >
              <div class="item-icon"></div>
              <div class="item-info">
                <div class="item-label" :data-title="item.type">{{ item.type }}</div>
                <div class="item-value">{{ item.countResult | locale }}</div>
              </div>
            </div>
          </div>
          <div class="center-bot-bot">
            <div
              class="item"
              v-for="(item, index) in bxgm2"
            >
              <div class="item-icon"></div>
              <div class="item-info">
                <div class="item-label">{{ item.type }}</div>
                <div class="item-value">{{ item.countResult | locale}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="right-top-left">
            <view-title title="师资结构"></view-title>
            <div class="jsbzzk-chart">
              <pie-chart
                ref="sxzyfb"
                title=""
                height="100%"
                show-legend-position="bottom"
                legend-bottom="0"
                :graphic="jsbzzkGraphic"
                :legend-data="jsbzzkLegendData"
                :color="[
                        '#04E0E0',
                        '#039494',
                        '#D3DEE0',
                        '#D6731A',
                        '#048FFA',
                        '#D6961A'
                      ]"
                :series-data="jsbzzkSeriesData"
              />
            </div>
            <div class="jsbzzk-info">
              <div class="jsbzzk-info-left">
                <div
                  class="item"
                  v-for="(item, index) in jsbzzkInfoData1"
                >
                  <div class="item-icon"></div>
                  <div class="item-info">
                    <div class="item-label" :data-title="item.type">{{ item.type }}</div>
                    <div class="item-value">{{ item.countResult }}</div>
                  </div>
                  <div class="item-chart" style="width: 42px; height: 42px;">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_draw"
                      width="42"
                      height="42"
                      baseProfile="full"
                      version="1.1"
                      style="position: absolute"
                      v-html="item.svgString"
                    >
                    </svg>
                  </div>
                </div>
              </div>
              <div class="jsbzzk-info-right">
                <div
                  class="item"
                  v-for="(item, index) in jsbzzkInfoData2"
                >
                  <div class="item-icon"></div>
                  <div class="item-info">
                    <div class="item-label" :data-title="item.type">{{ item.type }}</div>
                    <div class="item-value">{{ item.countResult }}</div>
                  </div>
                  <div class="item-chart" style="width: 42px; height: 42px;">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_draw"
                      width="42px"
                      height="42px"
                      baseProfile="full"
                      version="1.1"
                      style="position: absolute"
                      v-html="item.svgString"
                    >
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-top-right">
            <view-title title="教师学历分布"></view-title>
            <div
              class="jsxlfb-item"
              v-for="(item, index) in jsxlfbData"
            >
              <div class="label">{{ item.education }}</div>
              <div class="icon">
                <dynamic-icon
                  :half-num="item.halfNum"
                  :full-num="item.fullNum"
                  :remaining-num="item.remainingNum"
                  :half-icon="require('../../assets/build/mao2.png')"
                  :full-icon="require('../../assets/build/mao1.png')"
                  :back-icon="require('../../assets/build/backicon.png')"
                ></dynamic-icon>
              </div>
              <div class="value">{{ item.countResult }}</div>
            </div>
          </div>
        </div>
        <div class="bot">
          <div class="bot-left">
            <view-title title="教师院系分布"></view-title>
            <div class="scroll-view">
              <div class="yx-scroll">
                <div>
                  <div
                    class="jsyxfb-item"
                    v-for="(item, index) in jsyxfbSeriesData"
                    :key="index"
                  >
                    <pie-chart
                      ref="sxzyfb"
                      :title="jsyxfbTitle[index]"
                      title-left="50%"
                      title-bottom="26"
                      height="100%"
                      show-legend-position="bottom"
                      :legend-bottom="6"
                      :graphic="jsyxfbGraphic[index]"
                      :legend-data="jsyxfbLegendData"
                      :color="[
                        '#D6731A',
                        '#04E0E0'
                    ]"
                      :series-data="item"
                    />
                  </div>
                </div>
                <div>
                  <div
                    class="jsyxfb-item"
                    v-for="(item, index) in jsyxfbSeriesData"
                    :key="index"
                  >
                    <pie-chart
                      ref="sxzyfb"
                      :title="jsyxfbTitle[index]"
                      title-left="50%"
                      title-bottom="26"
                      height="100%"
                      show-legend-position="bottom"
                      :legend-bottom="6"
                      :graphic="jsyxfbGraphic[index]"
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
              <!--<div class="yx-scrolls">
                <div
                  class="jsyxfb-item"
                  v-for="(item, index) in jsyxfbSeriesData"
                  :key="index"
                >
                  <pie-chart
                    ref="sxzyfb"
                    :title="jsyxfbTitle[index]"
                    title-left="50%"
                    title-bottom="26"
                    height="100%"
                    show-legend-position="bottom"
                    :legend-bottom="6"
                    :graphic="jsyxfbGraphic[index]"
                    :legend-data="jsyxfbLegendData"
                    :color="[
                        '#D6731A',
                        '#04E0E0'
                    ]"
                    :series-data="item"
                  />
                </div>
              </div>-->
              <!--<vue-seamless-scroll
                :data="jsyxfbSeriesData"
                :class-option="classOption"
                class="seamless-warp"
              >
                <div
                  class="jsyxfb-item"
                  v-for="(item, index) in jsyxfbSeriesData"
                  :key="index"
                >
                  <pie-chart
                    ref="sxzyfb"
                    :title="jsyxfbTitle[index]"
                    title-left="50%"
                    title-bottom="26"
                    height="100%"
                    show-legend-position="bottom"
                    :legend-bottom="6"
                    :graphic="jsyxfbGraphic[index]"
                    :legend-data="jsyxfbLegendData"
                    :color="[
                        '#D6731A',
                        '#04E0E0'
                    ]"
                    :series-data="item"
                  />
                </div>
              </vue-seamless-scroll>-->
            </div>
          </div>
          <div class="bot-right">
            <view-title title="热门课程TOP10"></view-title>
            <!--<div class="bot-right-row">
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_xskc.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  线上课程
                </div>
                <div class="wljxtj-value">{{ onlineCourse | locale }}</div>
              </div>
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_kckcl.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  课程开出率
                </div>
                <div class="wljxtj-value">{{ classOpeningRate | locale }}</div>
              </div>
            </div>
            <div class="bot-right-row">
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_kkbj.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  开课班级
                </div>
                <div class="wljxtj-value">{{ openClass | locale }}</div>
              </div>
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_ljcyjs.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  累计参与教师
                </div>
                <div class="wljxtj-value">{{ participatingTeachers | locale }}</div>
              </div>
            </div>
            <div class="bot-right-row">
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_xsskrs.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  学生上课人数
                </div>
                <div class="wljxtj-value">{{ studentNum | locale }}</div>
              </div>
              <div class="wljxtj-item">
                <img src="../../assets/build/wljxtj_xscql.png" alt="" class="wljxtj-img">
                <div class="wljxtj-label">
                  学生出勤率
                </div>
                <div class="wljxtj-value">{{ studentAttendance | locale }}</div>
              </div>
            </div>-->
            <div class="wljxtj-scroll">
              <!--<div class="wljxtj-view scroll">
                <div
                  class="wljxtj-item"
                  v-for="(item, index) in wljxtjData"
                >
                  <div class="rank" :class="'rank' + index"><span>{{ 'TOP0' + (index + 1)}}</span></div>
                  <div class="label">{{ item.courseName }}</div>
                </div>
              </div>
              <div class="wljxtj-view scrolls">
                <div
                  class="wljxtj-item"
                  v-for="(item, index) in wljxtjData"
                >
                  <div class="rank" :class="'rank' + index"><span>{{ 'TOP0' + (index + 1)}}</span></div>
                  <div class="label">{{ item.courseName }}</div>
                </div>
              </div>-->
              <div class="wljxtj-view rotatex">
                <div
                  class="wljxtj-item"
                  v-for="(item, index) in wljxtjData[0]"
                >
                  <div class="rank" :class="'rank' + index"><span>{{ 'TOP0' + (index + 1)}}</span></div>
                  <div class="label" :data-title="item.courseName">{{ item.courseName }}</div>
                </div>
              </div>
              <div class="wljxtj-view rotatey">
                <div
                  class="wljxtj-item"
                  v-for="(item, index) in wljxtjData[1]"
                >
                  <div class="rank" :class="'rank' + index"><span>{{ 'TOP0' + (index + 9)}}</span></div>
                  <div class="label" :data-title="item.courseName">{{ item.courseName }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MapChart from '@/components/Chart/MapChart'
  import TextDescription from './components/textDescription'
  import BarChart from '../../components/Chart/BarChart'
  import PieChart from '../../components/Chart/PieChart'
  import ViewTitle from './components/viewTitle'
  import LineChart from '../../components/Chart/LineChart'
  const geoJson = require('@/assets/mapData/china.json');
  require('echarts/theme/shine') // echarts theme
  import  {
    getHomeData,
    getMapData,
    getProvinceMapData
  } from '@/api/build'
  import echarts from 'echarts';
  import DynamicIcon from './components/dynamicIcon'
  export default {
    name: 'index',
    components: {
      DynamicIcon,
      LineChart,
      ViewTitle,
      PieChart,
      BarChart,
      TextDescription,
      MapChart
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
      }
    },
    data() {
      return {
        visualMapMax: 0,
        // 学生数据
        xssjData: [],
        xssjThreeXAxisData: ['三年制', '五年制'],
        xssjThreeSeriesData: [],
        xssjFiveXAxisData: ['三年制', '五年制'],
        xssjFiveSeriesData: [],
        // 本期招生
        bqzsData: [],
        bqzsSeriesData: [
          {
            data: [],
            type: 'bar',
            barWidth: 14,
            itemStyle: {
              barBorderRadius: [2, 2, 2, 2]
            }
          }
        ],
        bqzsColor: ['#D6731A', '#04E0E0', '#D3DEE0', '#039494', '#039494'],
        bqzsXaxisData: [],
        xAxisLabelRich: [{
          type: 'category',
          data: [],
          axisLine: {
            show: false,
            lineStyle: {
              // color: 'rgba(0, 0, 0, 0)',
              show: false
            }
          },
          axisLabel: {
            formatter: function (value, index) {
              console.log(index);
              return '{value|' + value + '}';
              // return '{value|' + value + '}' + '{' + index + '|' + index + '}';
            },
            rich: {
              value: {
                color: '#677A7A',
                align: 'center'
              },
              0: {
                height: 40,
                align: 'center',
                backgroundColor: {
                  // image: require('../../assest/build/label1.png'),
                  image: '../../assest/build/label1.png'
                }
              },
              1: {
                height: 40,
                align: 'center',
                backgroundColor: {
                  // image: require('../../assest/build/label2.png')
                  image: '../../assest/build/label1.png'
                }
              },
              2: {
        height: 40,
          align: 'center',
          backgroundColor: {
          // image: require('../../assest/build/label3.png')
          image: '../../assest/build/label1.png'
        }
      },
              4: {
                height: 40,
                align: 'center',
                backgroundColor: {
                  // image: require('../../assest/build/label3.png')
                  image: '../../assest/build/label1.png'
                }
              },
            }
          }
        }],
        zszyChart: null,
        // 各院系学生情况
        gyxxsqkSeriesData: [],
        gyxxsqkXAxisData: [],
        // 学生性别年龄分布
        xsxbnlfbSeriesData: [],
        xsxbnlfbLegendData: ['<14', '14-17', '>17'],
        graphic: {
          elements: [
            {
              type: 'image',
              left: '42%',
              top: '36%',
              style: {
                image: require('../../assets/build/man.png'),
                font: 'italic bolder 44px cursive',
                fontSize: '44px',
                fill: '#D6731A',
                width: 14 * document.documentElement.clientWidth / 1920,
                height: 26 * document.documentElement.clientHeight / 1080,
              }
            },
            {
              type: 'image',
              left: '42%',
              top: '53%',
              style: {
                image: require('../../assets/build/woman.png'),
                font: 'italic bolder 44px cursive',
                fontSize: '44px',
                fill: '#D6731A',
                width: 14 * document.documentElement.clientWidth / 1920,
                height: 26 * document.documentElement.clientHeight / 1080,
              }
            },
            {
              type: 'image',
              left: 'center',
              top: 'center',
              style: {
                image: require('../../assets/build/peiback2.png'),
                width: 150 * document.documentElement.clientWidth / 1920,
                height: 150 * document.documentElement.clientWidth / 1920
              }
            }
          ]
        },
        // 办学规模
        bxgm1: [],
        bxgm2: [],
        // 教师编制状况
        jsbzzkGraphic: {
          elements: [
            {
              type: 'image',
              left: 'center',
              top: '2%',
              style: {
                image: require('../../assets/build/pieback.png'),
                width: 148 * document.documentElement.clientHeight / 1080,
                height: 148 * document.documentElement.clientHeight / 1080,
                /*width: this.fitChartSize(148),
                height: this.fitChartHeight(148)*/
              }
            }
          ]
        },
        jsbzzkLegendData: [
          {
            left: 'auto',
            bottom: 28,
            data: [
              {
                name: '20-29'
              },
              {
                name: '30-39'
              },
              {
                name: '40-49'
              }
            ]
          },
          {
            left: 'auto',
            bottom: 10,
            data: [
              {
                name: '50-59'
              },
              {
                name: '60-69'
              },
              {
                name: '70-79'
              }
            ]
          }
        ],
        jsbzzkSeriesData: [],
        jsbzzkInfoData1: [],
        jsbzzkInfoData2: [],
        // 教师院系分布
        jsyxfbLegendData: ['女性'],
        jsyxfbSeriesData: [],
        jsyxfbTitle: [],
        jsyxfbGraphic: [],
        // 教师学历分布
        jsxlfbData: [
          {
            halfNum: 1,
            fullNum: 2,
            remainingNum: 2,
            label: '博士',
            value: 25
          },
          {
            halfNum: 1,
            fullNum: 2,
            remainingNum: 2,
            label: '硕士',
            value: 25
          },
          {
            halfNum: 1,
            fullNum: 2,
            remainingNum: 2,
            label: '本科',
            value: 25
          },
          {
            halfNum: 1,
            fullNum: 0,
            remainingNum: 4,
            label: '高职',
            value: 25
          },
          {
            halfNum: 1,
            fullNum: 1,
            remainingNum: 3,
            label: '高中以下',
            value: 25
          }
        ],
        // 网络教学统计
        studentAttendance: '',
        studentNum: '',
        participatingTeachers: '',
        openClass: '',
        onlineCourse: '',
        classOpeningRate: '',
        wljxtjData: [],
        // 地图数据
        mapSeriesData: [
          {
            name: '生源分布',
            type: 'map',
            geoIndex: 0,
            itemStyle: {
              normal: {
                borderWidth: 2,//边际线大小
                borderColor:'#00ffff',//边界线颜色
                areaColor:'#09295b'//默认区域颜色
              },
            },
            data: []
          }
        ],
        mapProvinceData: [
          {
            name: '省内生源分布',
            type: 'map',
            geoIndex: 0,
            data: []
          }
        ],
        mapTjData: ''
      }
    },
    mounted() {
      this.getHomeData();
    },
    created() {
    },
    methods: {
      getHomeData() {
        getHomeData().then(res => {
          this.setXssj(res.data.xssj);
          this.setBqzs(res.data.bqzs);
          this.setBqzsChart(res.data.bqzstop5);
          this.setGYXXSQKChart(res.data.gyxxsqk);
          this.setBXGM(res.data.bxgm);
          this.setJSBZZKChart(res.data.jsnl);
          this.setJSBZZKInfoData(res.data.jsbzzk);
          this.setJSYXFBChart(res.data.jsyxfb);
          this.setWLJXTJ(res.data.rmkctop10);
          this.setXSXBNLFBChart(res.data.xsnlfb, res.data.xsxbfb);
          this.setJSXLFBData(res.data.jsxlfb);
          this.setMapTjData(res.data.syqktj);
        });
        getMapData().then(res => {
          this.setMapSeriesData(res.data);
        });
        getProvinceMapData().then(res => {
          this.setMapProvinceData(res.data);
        })
      },
      /**
       * 绑定地图数据
       */
      setMapSeriesData(data) {
        // 学生生源地
        const originList = data
        const newOriginList = originList.sort(function (a, b) {
          return a.countResult - b.countResult
        })
        originList.reverse()
        const originData = []
        let total = 0
        newOriginList.forEach((item) => {
          originData.push({ name: item.origin, value: isNaN(item.countResult) ? 0 : item.countResult })
          total += item.countResult
        })
        this.visualMapMax = total
        // this.originData = originData
        if (originData.length > 0) {
          // this.mainData = originData[0]
          if (originData.length > 1) {
            // this.secData = originData[1]
          }
        }
        this.mapSeriesData[0].data = originData
      },
      /**
       * 绑定省内地图数据
       */
      setMapProvinceData(data) {
        // 省内地图数据
        const newOriginList = data.sort(function (a, b) {
          return a.countResult - b.countResult
        })
        newOriginList.reverse()
        const originData = []
        newOriginList.forEach((item) => {
          originData.push({ name: item.origin, value: isNaN(item.countResult) ? 0 : item.countResult })
        })
        console.log(originData)
        this.mapProvinceData[0].data = originData
      },
      /**
       * 地图统计数据
       */
      setMapTjData(data) {
        console.log(data);
        this.mapTjData = data;
      },
      /**
       * 学生数据
       */
      setXssj(data) {
        this.xssjData = [
          {
            label: '总在籍人数',
            value: data.zaiji
          },
          {
            label: '上学期毕业人数',
            value: data.biye
          }
        ];
        this.xssjThreeSeriesData = [
          {
            data: [
              {
                value: data.sannianzaiji,
                itemStyle: {
                  color: '#04E0E0',
                  barBorderRadius: [2, 2, 2, 2]
                }
              },
              {
                value: data.wunianzaiji,
                itemStyle: {
                  color: '#D6731A',
                  barBorderRadius: [2, 2, 2, 2]
                }
              },
            ],
            name: '',
            type: 'bar',
            barWidth: 14,
            label: {
              show: true,
              distance: 6,
              position: 'top',
              fontSize: this.fitChartSize(12),
              fontFamily: "DIN-Medium",
              fontWeight: 500,
              formatter: function (params) {
                return params.value.toLocaleString('zh', { style: 'decimal' });
              }
            }
          }
        ];
        this.xssjFiveSeriesData = [
          {
            data: [
              {
                value: data.sannianbiye,
                itemStyle: {
                  color: '#04E0E0',
                  barBorderRadius: [2, 2, 2, 2]
                }
              },
              {
                value: data.wunianbiye,
                itemStyle: {
                  color: '#D6731A',
                  barBorderRadius: [2, 2, 2, 2]
                }
              },
            ],
            name: '',
            type: 'bar',
            barWidth: 14,
            label: {
              show: true,
              distance: 6,
              position: 'top',
              fontSize: this.fitChartSize(12),
              fontFamily: "DIN-Medium",
              fontWeight: 500,
              formatter: function (params) {
                return params.value.toLocaleString('zh', { style: 'decimal' });
              }
            }
          }
        ];
      },
      /**
       * 本期招生
       */
      setBqzs(data) {
        this.bqzsData = [
          {
            label: '三年制',
            value: data.sannianzhi
          },
          {
            label: '五年制',
            value: data.wunianzhi
          }
        ];
      },
      /**
       * 本期招生图表
       */
      setBqzsChart(data) {
        console.log(data)
        data.forEach((item, index) => {
          this.bqzsXaxisData.push(item.major);
          this.xAxisLabelRich[0].data.push(item.major);
          this.bqzsSeriesData[0].data.push(
            {
              value: item.count,
              itemStyle: {
                color: this.bqzsColor[index]
              },
              label: {
                show: true,
                distance: 6,
                position: 'top',
                fontSize: 12,
                fontFamily: "DIN-Medium",
                fontWeight: 500,
                color: this.bqzsColor[index],
                formatter: function (params) {
                  return params.value.toLocaleString('zh', { style: 'decimal' });
                }
              }
            }
          );
        });
        let icon1 = require('../../assets/build/label1.png');
        let icon2 = require('../../assets/build/label2.png');
        let icon3 = require('../../assets/build/label3.png');
        let data1 = JSON.parse(JSON.stringify(this.bqzsXaxisData));
        let option = {
          color: this.bqzsColor,
          grid: {
            x: this.fitChartSize(10),
            y: this.fitChartHeight(50),
            x2: this.fitChartSize(40),
            y2: this.fitChartHeight(10),
            borderWidth: 1,
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: data1,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              showMaxLabel: true,
              hideOverlap: false,
              fontFamily: 'PingFangSC-Regular,sans-serif',
              textStyle: {
                fontFamily: 'PingFangSC-Regular,sans-serif',
                color: 'rgba(167, 199, 199, .6)',
                fontSize: this.fitChartSize(12),
                fontWeight: 'bold',
              },
              normal: {
                showMaxLabel: true,
                hideOverlap: false,
              },
              formatter: function (value, index) {
                if (index < 3) {
                  let paramsNameNumber = value.length; //获取显示文字长度
                  let number = 5; //超过多少字换行
                  let newParamsName = '';
                  if (paramsNameNumber > number) {
                    //如果长度大于每行最多显示的字数
                    for (var p = 0; p < 2; p++) {
                      //循环次数就是行数
                      var tempStr = ""; //每次截取的字符
                      var start = p * number; //截取的起点
                      var end = start + number; //截取的终点
                      if (p === 1) {
                        //最后一行就不换行了
                        tempStr = tempStr = '...';;
                      } else {
                        tempStr = value.substring(start, end);
                      }
                      newParamsName += tempStr; //拼接字符串
                    }
                  } else {
                    newParamsName = value; //如果小于每行最多显示的字数就返回原来的字符串
                  }
                  return `{value|${newParamsName}}{${index}|}`;
                } else {
                  let paramsNameNumber = value.length; //获取显示文字长度
                  let number = 5; //超过多少字换行
                  let newParamsName = '';
                  if (paramsNameNumber > number) {
                    //如果长度大于每行最多显示的字数
                    for (var p = 0; p < 2; p++) {
                      //循环次数就是行数
                      let tempStr = ""; //每次截取的字符
                      var start = p * number; //截取的起点
                      var end = start + number; //截取的终点
                      if (p === 1) {
                        //最后一行就不换行了
                        tempStr = '...';
                      } else {
                        tempStr = value.substring(start, end);
                      }
                      newParamsName += tempStr; //拼接字符串
                    }
                  } else {
                    newParamsName = value; //如果小于每行最多显示的字数就返回原来的字符串
                  }
                  return newParamsName;
                }
              },
              rich: {
                value: {
                  color: 'rgba(167, 199, 199, .6)',
                  fontWeight: 'bold',
                  fontSize: this.fitChartSize(12),
                  fontFamily: 'PingFangSC-Regular',
                  padding: [0, this.fitChartSize(4), 0, this.fitChartSize(32)]
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
          yAxis: {
            show: false
          },
          series: this.bqzsSeriesData
        }
        this.$nextTick(() => {
          this.zszyChart = echarts.init(this.$refs.zszy, 'shine');
          this.zszyChart.setOption(option);
        });
      },
      /**
       * 各院系学生情况
       */
      setGYXXSQKChart(data) {
        this.gyxxsqkXAxisData = data.yuanxi;
        this.gyxxsqkSeriesData = [
          {
            name: '男生',
            type: 'bar',
            barWidth: 4,
            barGap: '200%',
            label: {
              show: true,
              distance: 5,
              position: 'right',
              fontSize: this.fitChartSize(11),
              fontFamily: "DIN-Medium",
              color: '#04E0E0',
              fontWeight: 500,
              formatter: function (params) {
                return params.value.toLocaleString('zh', { style: 'decimal' });
              }
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: 'red'
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: "#001313" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#04E0E0" // 100% 处的颜色
                }]),
                barBorderRadius: 2
              }
            },
            data: data.nansheng,
          },
          {
            name: '女生',
            type: 'bar',
            barWidth: 4,
            barGap: '200%',
            label: {
              show: true,
              position: 'right',
              color: '#D6731A',
              distance: 5,
              fontSize: this.fitChartSize(11),
              fontFamily: "DIN-Medium",
              fontWeight: 500,
              lineHeight: 14,
              formatter: function (params) {
                return params.value.toLocaleString('zh', { style: 'decimal' });
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: "#001313" // 0% 处的颜色
                },{
                  offset: 1,
                  color: "#D6731A" // 100% 处的颜色
                }]),
                barBorderRadius: 2
              }
            },
            data: data.nvsheng,
          }
        ];
      },
      /**
       * 办学规模
       */
      setBXGM(data) {
        this.bxgm1 = data.slice(0, 4);
        this.bxgm2 = data.slice(4, 8);
      },
      /**
       * 教师编制状况图表
       */
      setJSBZZKChart(data) {
        let datas = [];
        data.all.forEach((item, index) => {
          datas.push(
            {
              name: data.age[index],
              value: item.countResult
            }
          )
        })
        this.jsbzzkSeriesData = [{
          type: 'pie',
          radius: ["55%", "63%"],
          center: ['50%', '38%'],
          label: {
            show: false,
            formatter: '{d}%'
          },
          labelLine: {
            show: false,
            length: 10,
            length2: 10,
            lineStyle: {
              color: '#a7c7c7',
            }
          },
          data: datas
        }]
      },
      /**
       * 教师编制状况数据
       */
      setJSBZZKInfoData(data) {
        data.forEach((item, index) => {
          let x2 = 21 + Math.sin((2 * Math.PI / 360) * (3.6 * item.bili)) * 10;
          let y2 = 15 - Math.cos((2 * Math.PI / 360) * (3.6 * item.bili)) * 10;
          item.svgString = `
                      <circle cx="21" cy="15" r="10" fill="#134B50"></circle>
                      <path d="M21 15 L21 5 A 10 10, 0, 0, 1, ${x2} ${y2} L21 15 Z" fill="#04E0E0"></path>
                      <text x="18" y="38" font-size="12" font-family="DIN-MEDIUM" font-weight="500" text-anchor="middle" fill="#D6731A">${parseInt(item.bili)}</text>
                      <text x="28" y="37" font-size="9" font-family="DIN-MEDIUM" font-weight="500" text-anchor="middle" fill="#D6731A">%</text>
                      <animateTransform attributeType="XML"
                         attributeName="transform" type="scale"
                         from="0" to="1"
                         begin="0s" dur="1s" additive="sum" repeatCount="1"/>
`
        });
        this.jsbzzkInfoData1 = data.slice(0, 3);
        this.jsbzzkInfoData2 = data.slice(3, 6);
      },
      /**
       * 教师院系分布
       */
      setJSYXFBChart(data) {
        data.all.forEach((item, index) => {
          let arr = [
            {
              type: 'pie',
              radius: ["51%", "59%"],
              center: ['50%', '37%'],
              hoverAnimation: false,
              labelLine: {
                show: false,
                length: 5,
                length2: 5
              },
              data: [
                {
                  name: '女性',
                  value: item.woman,
                  type: 'pie',
                  label: {
                    show: false,
                    formatter: '{d}%{c}',
                    fontSize: 8
                  },
                  itemStyle: {
                    color: '#D6731A'
                  },
                },
                /*{
                  name: '男性',
                  value: item.man,
                  type: 'pie',
                  label: {
                    show: true,
                    formatter: '{d}%{a}'
                  },
                  labelLine: {
                    length: 8,
                    length2: 8
                  },
                  itemStyle: {
                    color: '#D6731A'
                  },
                },*/
                {
                  //画剩余的刻度圆环
                  name: '男性',
                  value: item.man,
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
              name: '男性',
              type: 'pie',
              radius: ["53%", "57%"],
              center: ['50%', '37%'],
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
          let graphic = {
            elements: [
              {
                type: 'text',
                left: `${40 - ((item.woman.toString().length - 2) * 5)}%`,
                top: '30%',
                style: {
                  text: item.woman,
                  // font: 'italic 500 22 DIN-MEDIUM',
                  font: 'bolder 22 "DIN-MEDIUM", sans-serif',
                  fontSize: this.fitChartSize(22),
                  fontFamily: 'DIN-MEDIUM, sans-serif',
                  fontWeight: 500,
                  fill: '#04E0E0'
                }
              },
              {
                type: 'image',
                left: '21.5%',
                top: '17%',
                style: {
                  image: require('../../assets/build/jsyxfb_img2.png'),
                  width: 81 * document.documentElement.clientWidth / 1920,
                  height: 81 * document.documentElement.clientHeight / 1080,
                  font: 'italic bolder 44px DIN-MEDIUM',
                  fontSize: '44px',
                  fontFamily: 'DIN-MEDIUM',
                  fill: '#D6731A'
                }
              },
            ]
          }
          this.jsyxfbSeriesData.push(arr);
          this.jsyxfbTitle.push(item.department);
          this.jsyxfbGraphic.push(graphic);
        });
      },
      /**
       * 教师学历分布
       */
      setJSXLFBData(data) {
        let all = 0;
        data.all.forEach(item => { all += item.countResult });
        let baseNum = parseInt(all / data.all.length);
        data.all.forEach((item, index) => {
          item.backSize = 5;
          item.fullNum = parseInt(item.countResult / baseNum)
          item.halfNum = item.countResult % baseNum >= 0.5 ? 1 : 0;
          item.remainingNum = item.backSize - item.fullNum - item.halfNum;
        })
        this.jsxlfbData = data.all;
      },
      /**
       * 网络教学统计
       */
      setWLJXTJ(data) {
        /*this.studentAttendance = data[0].studentAttendance;
        this.studentNum = data[0].studentNum;
        this.participatingTeachers = data[0].participatingTeachers;
        this.openClass = data[0].openClass;
        this.onlineCourse = data[0].onlineCourse;
        this.classOpeningRate = data[0].classOpeningRate;*/
        // this.wljxtjData = data;
        // 翻页动画
        this.wljxtjData.push(data.slice(0, 8));
        this.wljxtjData.push(data.slice(0, 2));
      },
      /**
       * 学生年龄性别分布
       */
      setXSXBNLFBChart(nlData, xbData) {
        this.xsxbnlfbLegendData = nlData.age;
        let data = [];
        nlData.all.forEach((item, index) => {
          data.push(
            {
              name: nlData.age[index],
              value: item.countResult
            }
          )
        })
        this.xsxbnlfbSeriesData = [
          {
            name: '学生性别年龄分布',
            type: 'pie',
            radius: ["45%", "52%"],
            center: ['50%', '50%'],
            label: {
              show: false,
              formatter: '{d}%',
              fontFamily: 'DIN-MEDIUM',
            },
            labelLine: {
              show: false,
              lineStyle: {
                color: '#a7c7c7'
              }
            },
            data: data
          }
        ];
        this.graphic.elements.push(
          {
            type: 'text',
            left: '52%',
            top: '38%',
            style: {
              text: parseInt(xbData.nan) + '%',
              font: 'italic bolder 16 DIN-MEDIUM',
              fontSize: this.fitChartSize(16),
              fontFamily: 'DIN-MEDIUM',
              fontWeight: 'bold',
              fill: '#04E0E0'
            }
          }
        )
        this.graphic.elements.push(
          {
            type: 'text',
            left: '52%',
            top: '55%',
            style: {
              text: parseInt(xbData.nv) + '%',
              font: 'italic bolder 44 DIN-MEDIUM',
              fontSize: this.fitChartSize(16),
              fontFamily: 'DIN-MEDIUM',
              fontWeight: 'bold',
              fill: '#C22359'
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .build {
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
      padding-bottom: 65px;
      .left {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .first {
          flex: 288;
          height: 0;
          padding: 0 .3rem 0;
          background: url("../../assets/build/xssj.png") no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          position: relative;
          .first-top {
            position: relative;
          }
          .first-bot {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .first-bot-left {
              width: 2.22rem;
              height: 10.2vh;
              background: url("../../assets/build/xssj_sqzbyrs_img3.png") no-repeat;
              background-size: 100% 100%;
            }
            .first-bot-right {
              width: 2.22rem;
              height: 10.2vh;
              background: url("../../assets/build/xssj_sqzbyrs_img3.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .second {
          flex: 318;
          height: 0;
          margin: 20px 0;
          padding: 0 .3rem 0;
          background: url("../../assets/build/bqzs_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .second-bot {
            width: 100%;
            height: 142px;
            margin-bottom: 20px;
            background: url("../../assets/build/bqzs_zszytop5.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            .extra-title {
              position: absolute;
              top: 0;
              left: 50%;
              margin-left: -.65rem;
              width: 1.3rem;
              height: 20px;
              background: url("../../assets/build/xssj_sqzbyrs_img1.png") no-repeat;
              background-size: 100% 100%;
              color: #D2FAFA;
              font-size: 14px;
              line-height: 18px;
              font-style: italic;
              text-align: center;
              font-family: "PingFang SC";
              font-weight: bold;
            }
          }
        }
        .third {
          flex: 263;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .left {
            flex: 1;
            margin-right: .25rem;
            background: url("../../assets/build/gyxxsqk_img1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
          }
          .right {
            flex: 1;
            background: url("../../assets/build/xsxbnlfb_img1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
          }
        }
      }
      .center{
        flex: 1;
        height: 100%;
        margin: 0 .25rem;
        display: flex;
        flex-direction: column;
        .map {
          flex: 626;
          margin-bottom: 25px;
          background: url("../../assets/build/xssyqk_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .mapChart {
            width: 92%;
            margin-left: 4%;
          }
          .map-tip {
            position: absolute;
            width: 2.23rem;
            height: 129px;
            background: url("../../assets/build/xssyqk_img2.png") no-repeat;
            background-size: 100% 100%;
            left: 22px;
            bottom: 38px;
            padding-left: .24rem;
            .tip-top {
              margin-top: 19px;
              margin-bottom: 10px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #A7C7C7;
              .value {
                color: #04F9FA;
                margin-left: 8px;
                font-size: 14px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
              }
            }
            .tip-center {
              margin-bottom: 10px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #A7C7C7;
              display: flex;
              flex-direction: column;
              .value {
                color: #04F9FA;
                margin-left: 8px;
                font-size: 14px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
              }
              .progress {
                width: 1.1rem;
                float: right;
                align-self: flex-end;
                margin-right: 24px;
                ::v-deep .el-progress {
                  .el-progress__text {
                    font-size: 12px !important;
                    color: #D6731A;
                    font-family: DIN-MEDIUM;
                  }
                  .el-progress-bar__outer {
                    background: rgba(4,249,250, .1);
                  }
                }
              }
            }
            .tip-bottom {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #A7C7C7;
              display: flex;
              flex-direction: column;
              .value {
                color: #04F9FA;
                margin-left: 8px;
                font-size: 14px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
              }
              .progress {
                width: 1.1rem;
                align-self: flex-end;
                margin-right: 24px;
                ::v-deep .el-progress {
                  .el-progress__text {
                    font-size: 12px !important;
                    color: #D6731A;
                    font-family: DIN-MEDIUM;
                  }
                  .el-progress-bar__outer {
                    background: rgba(4,249,250, .1);
                  }
                }
              }
            }
          }
        }
        .center-bot {
          flex: 261;
          background: url("../../assets/build/bxgm_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-between;
          .center-bot-top {
            padding: 0 .22rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 79px;
            .item {
              height: 40px;
              display: flex;
              align-items: center;
              flex: 1;
              flex-shrink: 0;
              padding-left: 30px;
              justify-content: flex-start;
              .item-icon {
                background: url("../../assets/build/bxgm_img2.png") no-repeat;
                width: .15rem;
                height: 27px;
                background-size: 100% 100%;
              }
              .item-info {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .item-label {
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  font-weight: 400;
                  color: #A7C7C7;
                }
                .item-value {
                  background: url("../../assets/build/bxgm_img3.png") no-repeat;
                  background-size: 100% 100%;
                  height: 16px;
                  line-height: 16px;
                  text-align: center;
                  min-width: .53rem;
                  padding: 0 .15rem;
                  color: #04E0E0;
                  font-size: 14px;
                  font-family: DIN-MEDIUM;
                }
              }
            }
          }
          .center-bot-bot {
            padding: 0 .22rem;
            margin-bottom: 52px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .item {
              height: 40px;
              display: flex;
              align-items: center;
              flex: 1;
              flex-shrink: 0;
              padding-left: 30px;
              justify-content: flex-start;
              .item-icon {
                background: url("../../assets/build/bxgm_img2.png") no-repeat;
                width: .15rem;
                height: 27px;
                background-size: 100% 100%;
              }
              .item-info {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .item-label {
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  font-weight: 400;
                  color: #A7C7C7;
                }
                .item-value {
                  background: url("../../assets/build/bxgm_img3.png") no-repeat;
                  background-size: 100% 100%;
                  height: 16px;
                  line-height: 16px;
                  text-align: center;
                  min-width: .53rem;
                  padding: 0 .15rem;
                  color: #04E0E0;
                  font-size: 14px;
                  font-family: DIN-MEDIUM;
                }
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .right-top {
          flex: 486;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          .right-top-left {
            flex: 1;
            height: 100%;
            width: 0;
            margin-right: .23rem;
            background: url("../../assets/build/jsbzzk_img4.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            .jsbzzk-chart {
              margin-top: 40px;
              width: 100%;
              height: 228px;
            }
            .jsbzzk-info {
              width: 100%;
              height: calc(100% - 228px);
              display: flex;
              padding-bottom: 40px;
              .jsbzzk-info-left {
                flex: 1;
                flex-shrink: 0;
                margin-left: 5px;
                margin-right: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .item {
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex: 1;
                  flex-shrink: 0;
                  flex-grow: 0;
                  position: relative;
                  display: flex;
                  .item-icon {
                    background: url("../../assets/build/jsbzzk_img2.png") no-repeat;
                    width: .15rem;
                    height: 27px;
                    background-size: 100% 100%;
                  }
                  .item-info {
                    height: 100%;
                    display: flex;
                    flex: 1;
                    max-width: .48rem;
                    flex-direction: column;
                    justify-content: space-between;
                    .item-label {
                      font-family: PingFangSC-Regular;
                      font-size: 12px;
                      font-weight: 400;
                      color: #ffffff;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      max-width: .48rem;
                    }
                    .item-label:hover::after {
                      content: attr(data-title);    //取到data-title属性的值
                      padding: 2px 3px;
                      background: black;
                      border-radius: 5px;
                      position: absolute;
                      top: 15px;
                      left: -.2rem;
                      width: 1rem;
                      word-wrap: break-word;
                    }
                    .item-value {
                      text-align: left;
                      color: #04E0E0;
                      font-size: 14px;
                      font-family: DIN-MEDIUM;
                      font-weight: 500;
                    }
                  }
                  .item-chart {
                    background: url("../../assets/build/jsbzzk_img3.png") no-repeat;
                    background-size: 100% 100%;
                    margin-left: .08rem;

                  }
                }
              }
              .jsbzzk-info-right {
                flex: 1;
                flex-shrink: 0;
                margin-left: 5px;
                margin-right: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .item {
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex: 1;
                  flex-shrink: 0;
                  flex-grow: 0;
                  position: relative;
                  display: flex;
                  .item-icon {
                    background: url("../../assets/build/jsbzzk_img2.png") no-repeat;
                    width: .15rem;
                    height: 27px;
                    background-size: 100% 100%;
                  }
                  .item-info {
                    height: 100%;
                    display: flex;
                    max-width: .48rem;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    .item-label {
                      font-family: PingFangSC-Regular;
                      font-size: 12px;
                      font-weight: 400;
                      color: #ffffff;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      max-width: .48rem;
                    }
                    .item-label:hover::after {
                      content: attr(data-title);    //取到data-title属性的值
                      padding: 2px 3px;
                      background: black;
                      border-radius: 5px;
                      position: absolute;
                      top: 15px;
                      left: -.2rem;
                      width: 1rem;
                      word-wrap: break-word;
                    }
                    .item-value {
                      text-align: left;
                      color: #04E0E0;
                      font-size: 14px;
                      font-family: DIN-MEDIUM;
                    }
                  }
                  .item-chart {
                    width: .42rem;
                    height: .42rem;
                    background: url("../../assets/build/jsbzzk_img3.png") no-repeat;
                    background-size: 100% 100%;
                    margin-left: .08rem;

                  }
                }
              }
            }
          }
          .right-top-right {
            flex: 1;
            height: 100%;
            width: 0;
            background: url("../../assets/build/jsxlfb_img1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding-top: 55px;
            padding-bottom: 45px;
            display: flex;
            flex-direction: column;
            .jsxlfb-item {
              height: 66px;
              background: url("../../assets/build/jsxlfb_img2.png") no-repeat;
              background-size: 100% 100%;
              margin-left: .13rem;
              margin-right: .13rem;
              padding: 0 .25rem;
              display: flex;
              align-items: center;
              .label {
                width: .28rem;
                flex-shrink: 0;
                font-size: 12px;
                color: #04F9FA;
                font-weight: 500;
                font-family: "PingFang SC";
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                .student-development {
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
                  padding-top: 10px;
                  padding-left: .4rem;
                  padding-right: .4rem;
                  padding-bottom: 80px;
                  .left {
                    flex: 442;
                    width: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .left-top {
                      width: 100%;
                      height: 0;
                      flex: 261;
                      background: url("../../assets/students/lnzsqs.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
                      .charts {
                        width: 100%;
                        height: 100%;
                      }
                    }
                    .left-center {
                      width: 100%;
                      height: 0;
                      flex: 329;
                      margin-top: 20px;
                      margin-bottom: 20px;
                      background: url("../../assets/students/xsnlfb.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                      .xsnlfb-view {
                        flex: 1;
                        margin-top: 45px;
                        margin-bottom: 45px;
                        max-height: 100%;
                        display: flex;
                        flex-direction: column;
                        .xsnlfb-item{
                          position: relative;
                          height: 50px;
                          margin-left: .1rem;
                          margin-right: .1rem;
                          padding: 0 .25rem;
                          display: flex;
                          align-items: center;
                          .label {
                            width: .48rem;
                            flex-shrink: 0;
                            font-size: .12rem;
                            color: #04F9FA;
                            font-weight: 500;
                            font-family: PingFangSC-Medium;
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          }
                          .label::after {
                            content: '';
                            position: absolute;
                            background: url("../../assets/teachers/dashed.png") no-repeat;
                            background-size: 100% 100%;
                            width: .35rem;
                            height: 4px;
                            bottom: -8px;
                            left: .06rem;
                          }
                          .icon {
                            flex: 1;
                            height: 100%;
                            margin-right: .30rem;
                            margin-left: .25rem;
                            .icon-view {
                              position: relative;
                            }
                            .icon-view::after {
                              content: '';
                              position: absolute;
                              background: url("../../assets/teachers/line.png") no-repeat;
                              background-size: 100% 100%;
                              height: 2px;
                              width: 2.66rem;
                              bottom: 0;
                              left: -.07rem;
                            }
                          }
                          .value {
                            font-size: 16px;
                            color: #04E0E0;
                            font-weight: 500;
                            font-family: DIN-MEDIUM;
                          }
                        }
                      }
                    }
                    .left-bottom {
                      width: 100%;
                      height: 0;
                      flex: 279;
                      background: url("../../assets/students/xsyxfb.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
                      padding-left: .35rem;
                      .charts {
                        width: 100%;
                        height: calc(100% - 45px);
                        margin-top: 35px;
                      }
                    }
                  }
                  .center {
                    height: 100%;
                    width: 0;
                    flex: 908;
                    margin-left: .25rem;
                    margin-right: .25rem;
                    display: flex;
                    flex-direction: column;
                    .center-top {
                      width: 100%;
                      height: 0;
                      flex: 610;
                      margin-bottom: 20px;
                      background: url("../../assets/students/xsjbzk.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
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
                          width: 2.22rem;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          .label {
                            color: #D2FAFA;
                            font-style: italic;
                            font-size: 14px;
                            background: url("../../assets/build/xssj_sqzbyrs_img1.png") no-repeat;
                            background-size: 100% 100%;
                            width: 1.43rem;
                            height: 20px;
                            line-height: 20px;
                            margin-bottom: 7px;
                            text-align: center;
                            font-family: PingFangSC-Bold;
                          }
                          .value {
                            font-size: 20px;
                            font-family: DIN;
                            font-weight: bold;
                            color: #BCE0E0;
                            background: url("../../assets/build/xssj_sqzbyrs_img2.png") no-repeat;
                            background-size: 100% 100%;
                            width: 100%;
                            height: 57px;
                            text-align: center;
                            line-height: 57px;
                          }
                        }
                      }
                      .main {
                        width: 100%;
                        height: calc(100% - 174px);
                        margin-top: 17px;
                        display: flex;
                        flex-direction: column;
                        padding: 0 .35rem;
                        .extra-title {
                          margin-left: auto;
                          margin-right: auto;
                          margin-bottom: 20px;
                          width: 1.7rem;
                          height: 20px;
                          line-height: 20px;
                          background: url("../../assets/students/xsjbzk_img2.png") no-repeat;
                          background-size: 100% 100%;
                          color: #D2FAFA;
                          font-size: 14px;
                          text-align: center;
                          font-family: PingFangSC-Bold;
                          font-style: italic;
                        }
                        .chart {
                          width: 100%;
                          flex: 1;
                          background: url("../../assets/students/xsjbzk_img4.png") no-repeat;
                          background-size: 100% 100%;
                          padding-left: .44rem;
                          padding-right: .44rem;
                          display: flex;
                          .chart-left {
                            flex: 1;
                            margin-right: 1rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding-top: 32px;
                            padding-bottom: 25px;
                            .chart-item {
                              width: 2.9rem;
                              .chart-item-title {
                                width: 100%;
                                color: #D2FAFA;
                                font-family: PingFangSC-Bold;
                                font-style: italic;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                position: relative;
                                margin-bottom: 13px;
                                & > img {
                                  margin-right: 6px;
                                }
                              }
                              .chart-item-title::after {
                                position: absolute;
                                content: '';
                                background: url("../../assets/students/xsjbzk_img6(1).png") no-repeat;
                                background-size: 100% 100%;
                                width: 100%;
                                height: 9px;
                                left: 0;
                                bottom: -5px;
                              }
                              .chart-item-main {
                                height: 68px;
                                .man {
                                  float: right;
                                  width: 1.07rem;
                                  height: 68px;
                                  background: url("../../assets/students/xsjbzk_img6.png") no-repeat;
                                  background-size: 100% 100%;
                                  display: flex;
                                  justify-content: center;
                                  align-self: center;
                                  flex-direction: column;
                                  .number {
                                    color: #04E1E1;
                                    font-size: 18px;
                                    text-align: center;
                                    margin-bottom: 5px;
                                    font-family: DIN;
                                    font-weight: bold;
                                  }
                                  .label {
                                    color: #A7C7C7;
                                    font-size: 12px;
                                    text-align: center;
                                  }
                                }
                                .woman {
                                  float: right;
                                  width: 1.07rem;
                                  height: 68px;
                                  background: url("../../assets/students/xsjbzk_img7.png") no-repeat;
                                  background-size: 100% 100%;
                                  display: flex;
                                  justify-content: center;
                                  align-self: center;
                                  flex-direction: column;
                                  .number {
                                    color: #D6731A;
                                    font-size: 18px;
                                    text-align: center;
                                    margin-bottom: 5px;
                                    font-family: DIN;
                                    font-weight: bold;
                                  }
                                  .label {
                                    color: #A7C7C7;
                                    font-size: 12px;
                                    text-align: center;
                                  }
                                }
                              }
                            }
                            .chart-item:first-of-type {
                              align-self: flex-start;
                            }
                            .chart-item:nth-child(2) {
                              align-self: center;
                            }
                            .chart-item:last-of-type {
                              align-self: flex-end;
                            }
                          }
                          .chart-right {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            /*justify-content: space-around;*/
                            padding-top: 32px;
                            padding-bottom: 25px;
                            .chart-item {
                              width: 2.9rem;
                              .chart-item-title {
                                width: 100%;
                                color: #D2FAFA;
                                font-family: PingFangSC-Bold;
                                font-style: italic;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                position: relative;
                                margin-bottom: 13px;
                                & > img {
                                  margin-right: 6px;
                                }
                              }
                              .chart-item-title::after {
                                position: absolute;
                                content: '';
                                background: url("../../assets/students/xsjbzk_img6(1).png") no-repeat;
                                background-size: 100% 100%;
                                width: 100%;
                                height: 9px;
                                left: 0;
                                bottom: -5px;
                              }
                              .chart-item-main {
                                height: 68px;
                                .man {
                                  float: right;
                                  width: 1.07rem;
                                  height: 68px;
                                  background: url("../../assets/students/xsjbzk_img6.png") no-repeat;
                                  background-size: 100% 100%;
                                  display: flex;
                                  justify-content: center;
                                  align-self: center;
                                  flex-direction: column;
                                  .number {
                                    color: #04E1E1;
                                    font-size: 18px;
                                    text-align: center;
                                    margin-bottom: 5px;
                                    font-family: DIN;
                                    font-weight: bold;
                                  }
                                  .label {
                                    color: #A7C7C7;
                                    font-size: 12px;
                                    text-align: center;
                                  }
                                }
                                .woman {
                                  float: right;
                                  width: 1.07rem;
                                  height: 68px;
                                  background: url("../../assets/students/xsjbzk_img7.png") no-repeat;
                                  background-size: 100% 100%;
                                  display: flex;
                                  justify-content: center;
                                  align-self: center;
                                  flex-direction: column;
                                  .number {
                                    color: #D6731A;
                                    font-size: 18px;
                                    text-align: center;
                                    margin-bottom: 5px;
                                    font-family: DIN;
                                    font-weight: bold;
                                  }
                                  .label {
                                    color: #A7C7C7;
                                    font-size: 12px;
                                    text-align: center;
                                  }
                                }
                              }
                            }
                            .chart-item:first-of-type {
                              align-self: flex-start;
                              margin-top: 65px;
                              margin-bottom: 24px;
                            }
                            .chart-item:nth-child(2) {
                              align-self: center;
                            }
                            .chart-item:last-of-type {
                              align-self: flex-end;
                            }
                          }
                        }
                      }
                    }
                    .center-bottom {
                      width: 100%;
                      height: 0;
                      flex: 277;
                      background: url("../../assets/students/xszyfb.png") no-repeat;
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
                    flex: 442;
                    width: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .right-top {
                      width: 100%;
                      height: 0;
                      flex: 347;
                      background: url("../../assets/students/xslhzptop10.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
                      .ranking-view {
                        width: 100%;
                        max-height: 100%;
                        box-sizing: border-box;
                        padding-top: 55px;
                        padding-bottom: 45px;
                        padding-left: .24rem;
                        padding-right: .24rem;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: flex-start;
                        align-content: flex-start;
                        .ranking-tip {
                          width: 100%;
                          text-align: right;
                          color: #677A7A;
                          font-size: 12px;
                          font-family: "PingFang SC";
                          max-height: 20px;
                          margin-bottom: 29px;
                          .scale {
                            width: 4px;
                            height: 4px;
                            background: #04F9FA;
                            opacity: 0.8;
                            position: relative;
                          }
                          .scale::after {
                            width: 4px;
                            height: 4px;
                            background: #04F9FA;
                            position: absolute;
                            content: '';
                            left: -8px;
                            top: 8px;
                          }
                        }
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
                          width: 1.74rem;
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
                            }
                          }
                        }
                        .ranking-item::after {
                          content: '';
                          background: url("../../assets/students/xslhzptop10_img1.png");
                          width: 100%;
                          height: 2px;
                          position: absolute;
                          left: 0;
                          bottom: -5px;
                        }
                      }
                    }
                    .right-center {
                      width: 100%;
                      height: 0;
                      flex: 243;
                      background: url("../../assets/students/bzkqyc.png") no-repeat;
                      background-size: 100% 100%;
                      margin-top: 20px;
                      margin-bottom: 20px;
                      position: relative;
                      .charts {
                        margin-top: 40px;
                        height: calc(100% - 40px);
                      }
                    }
                    .right-bottom {
                      width: 100%;
                      height: 0;
                      flex: 277;
                      background: url("../../assets/students/xsxycj.png") no-repeat;
                      background-size: 100% 100%;
                      position: relative;
                      .search-view {
                        flex-shrink: 0;
                        height: 83px;
                        display: flex;
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
                        .search-select + .search-select {
                          margin-left: 16px;
                        }
                        .grade {
                          width: .77rem;
                          height: .22rem;
                        }
                        .major {
                          width: .98rem;
                          height: .22rem;
                          ::v-deep.el-select {
                            width: .82rem;
                            height: .22rem;
                          }
                        }
                      }
                      .table-view {
                        width: 100%;
                        margin-top: 5px;
                        padding-left: .35rem;
                        padding-right: .35rem;
                        height: calc(100% - 108px);
                      }
                    }
                  }
                }
              }
              }
              .label::after {
                content: '';
                position: absolute;
                background: url("../../assets/build/jsxlicon.png") no-repeat;
                background-size: 100% 100%;
                width: .23rem;
                height: 4px;
                bottom: -8px;
                left: 0;
              }
              .icon {
                flex: 1;
                height: 100%;
                padding-left: .18rem;
                padding-right: .2rem;
              }
              .value {
                font-size: 16px;
                color: #04E0E0;
                font-weight: 500;
                font-family: DIN-MEDIUM;
                min-width: .22rem;
                text-align: right;
              }
            }
          }
        }
        .bot {
          flex: 403;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .bot-left {
            flex: 1;
            height: 100%;
            margin-right: .23rem;
            background: url("../../assets/build/jsyxfb_img1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding-top: 60px;
            padding-bottom: 15px;
            .scroll-view {
              width: 100%;
              height: 100%;
              overflow: hidden;
              .yx-scroll {
                width: 100%;
                display: flex;
                height: fit-content;
                flex-wrap: wrap;
                animation: scrollyx 30s linear infinite;
                cursor: pointer;
                & > div {
                  display: flex;
                  flex-wrap: wrap;
                  height: fit-content;
                  .jsyxfb-item {
                    width: 1.43rem;
                    height: 163px;
                  }
                }
              }
              .yx-scrolls {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-wrap: wrap;
                animation: scrollyy 30s linear infinite;
                .jsyxfb-item {
                  width: 1.43rem;
                  height: 163px;
                  float: left;
                }
              }
              .yx-scroll:hover {
                animation-play-state:paused;
              }
              .yx-scrolls:hover {
                animation-play-state:paused;
              }
              .seamless-warp {
                width: 100%;
                height: 100%;
                overflow: hidden;
                .jsyxfb-item {
                  width: 1.43rem;
                  height: 163px;
                  float: left;
                }
              }
            }
            @keyframes scrollyx {
              0% {
                transform: translate3d(0, 0%, 0);
              }
              100% {
                transform: translate3d(0, -50%, 0);
              }
            }
            @keyframes scrollyy {
              0% {
                transform: translate3d(0, 15%, 0);
              }
              100% {
                transform: translate3d(0, -105%, 0);
              }
            }
          }
          .bot-right {
            flex: 1;
            height: 100%;
            background: url("../../assets/build/wljxtj_img1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding-top: 54px;
            padding-bottom: 34px;
            display: flex;
            flex-direction: column;
            .bot-right-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-left: .4rem;
              margin-right: .4rem;
              .wljxtj-item {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                min-width: .7rem;
                .wljxtj-img {
                  width: .48rem;
                  height: .48rem;
                }
                .wljxtj-label {
                  color: #A7C7C7;
                  font-size: 12px;
                  font-family: PingFangSC-Regular;
                  font-style: italic;
                  position: relative;
                  margin-top: 6px;
                  margin-bottom: 6px;
                }
                .wljxtj-label::after {
                  content: '';
                  position: absolute;
                  background: url("../../assets/build/juxing.png");
                  width: .05rem;
                  height: 11px;
                  top: 2px;
                  left: -.08rem;
                }
                .wljxtj-label::before {
                  content: '';
                  position: absolute;
                  background: url("../../assets/build/juxing.png");
                  width: .05rem;
                  height: 11px;
                  top: 2px;
                  right: -.08rem;
                }
                .wljxtj-value {
                  font-family: DIN-MEDIUM;
                  font-size: 20px;
                  color: #04E0E0;
                  font-weight: 500;
                  text-align: center;
                  margin-bottom: 16px;
                }
              }
            }
            .wljxtj-scroll:hover {
              .rotatex {
                animation-play-state:paused;
              }
              .rotatey {
                animation-play-state:paused;
              }
            }
            .wljxtj-scroll {
              width: 100%;
              height: 100%;
              overflow-y: hidden;
              overflow-x: hidden;
              -webkit-transform-style: preserve-3d;
              perspective: 800px;
              position: relative;
              cursor: pointer;
              .wljxtj-view {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding: 0 .21rem;
                left: 0;
                top: 0;
                backface-visibility: hidden;
                .wljxtj-item {
                  width: 1.18rem;
                  max-width: calc(50% - 5px);
                  height: 66px;
                  background: url("../../assets/build/wljxtj_item.png") no-repeat;
                  background-size: 100% 100%;
                  position: relative;
                  .rank {
                    margin-top: 14px;
                    margin-bottom: 7px;
                    margin-left: .1rem;
                    color: #026161;
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
                    font-size: 12px;
                    font-family: PingFangSC-Medium;
                    margin-left: .1rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  }
                  .label:hover::after {
                    content: attr(data-title);    //取到data-title属性的值
                    padding: 2px 3px;
                    /*border: 1px solid #ddd;*/
                    background: black;
                    border-radius: 5px;
                    position: absolute;
                    top: 15px;
                    left: -.2rem;
                    width: 1rem;
                    word-wrap: break-word;
                    z-index: 999;
                  }
                  div.rank0 {
                    color: #04E0E0;
                  }
                  div.rank1 {
                    color: #04C7C7;
                  }
                  div.rank2 {
                    color: #039494;
                  }
                }
                .wljxtj-item:nth-child(2n) {
                  margin-left: 10px;
                  margin-bottom: 10px;
                }
              }
              .rotatex {
                transition: 1s ease-in-out;
                transform-style: preserve-3d;
                position: absolute;
                animation: scrollChild 10s linear infinite;
              }
              .rotatey {
                transform: rotateY(0.5turn);
                transition: 1s ease-in-out;
                transform-style: preserve-3d;
                position: absolute;
                animation: scrollChilds 10s linear infinite;
                .wljxtj-item {
                  .rank {
                    color: #026161 !important;
                  }
                }
              }
              .scroll {
                animation: scroll 10s linear infinite;
              }
              .scrolls {
                animation: scrolls 10s linear infinite;
                padding-top: 10px;
              }
              @keyframes scrollChild {
                0% {
                  transform: rotateY(0turn);
                }
                20% {
                  transform: rotateY(0turn);
                }
                40% {
                  transform: rotateY(0.5turn);
                }
                60% {
                  transform: rotateY(0.5turn);
                }
                80% {
                  transform: rotateY(0turn);
                }
                100% {
                  transform: rotateY(0turn);
                }
              }
              @keyframes scrollChilds {
                0% {
                  transform: rotateY(0.5turn);
                }
                20% {
                  transform: rotateY(0.5turn);
                }
                40% {
                  transform: rotateY(1turn);
                }
                60% {
                  transform: rotateY(1turn);
                }
                80% {
                  transform: rotateY(0.5turn);
                }
                100% {
                  transform: rotateY(0.5turn);
                }
              }
              @keyframes scroll {
                0% {
                  transform: translate3d(0, 0, 0);
                }
                100% {
                  transform: translate3d(0, -118%, 0);
                }
              }
              @keyframes scrolls {
                0% {
                  transform: translate3d(0, 19%, 0);
                }
                100% {
                  transform: translate3d(0, -99%, 0);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
