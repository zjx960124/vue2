<template>
  <div class="student-development">
    <div class="header">学生发展</div>
    <div class="main">
      <div class="left">
        <div class="left-top">
          <view-title title="历年招生趋势"></view-title>
          <div class="charts">
            <line-chart
              title=""
              height="100%"
              :grid="[30, 65, 30, 20]"
              :color="['#F28179']"
              :x-axis-label-wraps="true"
              :x-axis-data="lnzsqsXAxisData"
              :y-axis-names="['']"
              :series-data="lnzsqsSeriesData"
            ></line-chart>
          </div>
        </div>
        <div class="left-center">
          <view-title title="学生年龄分布"></view-title>
          <div class="xsnlfb-view">
            <div
              class="xsnlfb-item"
              v-for="(item, index) in xsnlfbData"
            >
              <div class="label">{{ item.age }}岁</div>
              <div class="icon">
                <dynamic-icon
                  class="icon-view"
                  :half-num="item.halfNum"
                  :full-num="item.fullNum"
                  :remaining-num="item.remainingNum"
                  :back-size="item.backSize"
                  :half-icon="require('../../assets/build/mao2.png')"
                  :full-icon="require('../../assets/build/mao1.png')"
                  :back-icon="require('../../assets/build/backicon.png')"
                ></dynamic-icon>
              </div>
              <div class="value">{{ item.countResult }}</div>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <view-title title="学生院系分布"></view-title>
          <div class="charts">
            <pie-chart
              ref="sxzyfb"
              title=""
              height="100%"
              show-legend-position="right"
              legend-right="88"
              legend-top="65"
              :color="['#04E0E0', '#134B50', '#D6731A', '#D3DEE0']"
              :legend-data="xsyxfbLegendData"
              :series-data="xsyxfbSeriesData"
            />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <view-title title="学生基本状况"></view-title>
          <div class="view">
            <div
              class="item"
            >
              <div class="label">在册学生数</div>
              <div class="value">{{ xsjbzkData.zongshu | locale }}</div>
            </div>
            <div
              class="item"
            >
              <div class="label">男生人数</div>
              <div class="value">{{ xsjbzkData.boy | locale }}</div>
            </div>
            <div
              class="item"
            >
              <div class="label">女生人数</div>
              <div class="value">{{ xsjbzkData.girl | locale }}</div>
            </div>
          </div>
          <div class="main">
            <div class="extra-title">全校各年级学生人数</div>
            <div class="chart">
              <div class="chart-left">
                <div
                  class="chart-item"
                  v-for="(item, index) in xsjbzkData.left"
                  :key="index"
                >
                  <div class="chart-item-title">
                    <img src="../../assets/students/xsjbzk_img5.png" alt="">
                    <span>{{ item.grade }}级</span>
                  </div>
                  <div class="chart-item-main">
                    <div class="woman">
                      <div class="number">{{ item.girlCount | locale }}</div>
                      <div class="label">女生人数</div>
                    </div>
                    <div class="man">
                      <div class="number">{{ item.boyCount | locale }}</div>
                      <div class="label">男生人数</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-right">
                <div
                  class="chart-item"
                  v-for="(item, index) in xsjbzkData.all"
                  :key="index"
                >
                  <div class="chart-item-title">
                    <img src="../../assets/students/xsjbzk_img5.png" alt="">
                    <span>{{ item.grade }}级</span>
                  </div>
                  <div class="chart-item-main">
                    <div class="woman">
                      <div class="number">{{ item.girlCount | locale }}</div>
                      <div class="label">女生人数</div>
                    </div>
                    <div class="man">
                      <div class="number">{{ item.boyCount | locale }}</div>
                      <div class="label">男生人数</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center-bottom">
          <view-title title="学生专业分布"></view-title>
          <div class="charts">
            <line-chart
              title=""
              height="100%"
              :grid="[30, 40, 30, 30]"
              :color="['#F28179']"
              :x-axis-label-wraps="true"
              :x-axis-data="xszyfbXAxisData"
              :legend-data="['']"
              :show-data-zoom="true"
              :data-zoom-start-value="0"
              :data-zoom-end-value="4"
              :data-zoom-bottom="15"
              :y-axis-names="['']"
              :series-data="xszyfbSeriesData"
            ></line-chart>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <view-title title="学生量化周评TOP10"></view-title>
          <div class="ranking-view">
            <div class="ranking-tip">
              <span class="scale"></span>
              <span>数据最近更新{{ nowData }}</span>
            </div>
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
                    <div class="item-label">{{ item.stuName }}</div>
                  </div>
                  <div class="item-value">{{ item.score }}<span>分</span></div>
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
                    <div class="item-label">{{ item.stuName }}</div>
                  </div>
                  <div class="item-value">{{ item.score }}<span>分</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-center">
          <view-title title="学生政治面貌"></view-title>
          <div class="charts">
            <!--<bar-chart
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
            ></bar-chart>-->
            <div class="zzmm-view">
              <div
                class="zzmm-item"
                v-for="item in jszzmmData"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg_draw"
                    class="svg-draw"
                    width="61px"
                    height="34px"
                    baseProfile="full"
                    version="1.1"
                    style="display: block"
                    v-html="item.svgString"
                  >
                  </svg>
                </div>
                <div class="item-child">
                  <div class="item-icon"></div>
                  <div class="item-info">
                    <div class="item-label">{{ item.major }}</div>
                    <div class="item-value">{{ item.countResult }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <view-title title="学生学业成绩"></view-title>
          <div class="search-view">
            <div class="search-select grade">
              <el-select v-model="grade" @change="setTableData">
                <el-option
                  v-for="(item, index) in gradeOption"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
            <div class="search-select major">
              <el-select
                v-model="course"
                @change="setTableData"
                popper-class='roleSelect'
              >
                <el-option
                  v-for="(item, index) in courseOption"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="table-view">
            <table-view :data="table"></table-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import ViewTitle from './components/viewTitle'
  import LineChart from '../../components/Chart/LineChart'
  import DynamicIcon from './components/dynamicIcon'
  import PieChart from '../../components/Chart/PieChart'
  import BarChart from '../../components/Chart/BarChart'
  import TableView from './components/tableView'
  import {
    getStudentData,
    getStudentGrade,
    getStudentXsxycj
  } from '../../api/build';
  import moment from 'moment';
  export default {
    name: 'StudentDevelopment',
    components: { TableView, BarChart, PieChart, DynamicIcon, LineChart, ViewTitle },
    data() {
      return {
        nowData: moment().format('YYYY.MM.DD'),
        // 下拉框数据
        gradeOption: [],
        grade: '',
        courseOption: [],
        course: '',
        // 历年招生趋势
        lnzsqsSeriesData: [],
        lnzsqsXAxisData: [],
        // 学生年龄分布
        xsnlfbData: [],
        // 学生院系分布
        xsyxfbLegendData: ['土木工程', '机电工程', '环境与艺术设计', '工程与经济管理'],
        xsyxfbSeriesData: [],
        // 学生专业分布
        xszyfbSeriesData: [],
        xszyfbXAxisData: [],
        // 学生基本情况
        xsjbzkData: [],
        // 学生量化周评
        rankingData: [],
        // 本周考勤异常
        bzkqycXAxisData: [],
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
        bzjqycTooltip: {},
        // 教师政治面貌
        jszzmmData: [],
        // 学生学业成绩
        table: {
          fields: [
            {
              name: '成绩',
              key: 'scoreType',
            },
            {
              name: '等级',
              key: 'level',
            },
            {
              name: '人数',
              key: 'countResult',
            },
            {
              name: '比例',
              key: 'bili',
            }
          ],
          data: [
          ]
        }
      }
    },
    mounted() {
      this.getStudentData();
    },
    methods: {
      getStudentData() {
        Promise.all([getStudentData(), getStudentGrade()]).then(([v1, v2,]) => {
          console.log(v1)
          this.setGrade(v2.data.lnzsqs);
          this.setLnzsqs(v1.data.lnzsqs);
          this.setXsnlfb(v1.data.xsnlfb);
          this.setXsyxfb(v1.data.xsyxfb);
          this.setXszyfb(v1.data.xszyfb);
          // this.setBzkqyc(v1.data.bzkqyc); // 本周考勤异常
          this.setJszzmm(v1.data.bzkqyc)
          this.setXslhzp(v1.data.xslhzpTop10);
          this.setXsjbzk(v1.data.xsjbzk);
        },(err) => {
          console.log(err)
        })
      },
      /**
       * 下拉框数据
       */
      setGrade(data) {
        this.gradeOption = data.grade;
        this.courseOption = data.course;
        this.grade = data.grade[0];
        this.course = data.course[0];
        this.setTableData();
      },
      /**
       * 学生学业成绩
       * @param data
       */
      setTableData() {
        let param = {
          grade: this.grade,
          course: this.course
        }
        getStudentXsxycj(param).then(res => {
          this.table.data = res.data.lnzsqs;
        })
      },
      /**
       * 历年招生趋势
       */
      setLnzsqs(data) {
        this.lnzsqsXAxisData = data.yearList;
        this.lnzsqsSeriesData = [
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
            data: data.countResult
          }
        ];
      },
      /**
       * 学生年龄分布
       */
      setXsnlfb(data) {
        let all = 0;
        data.all.forEach(item => { all += item.countResult });
        let baseNum = parseInt(all / data.all.length);
        data.all.forEach((item, index) => {
          item.backSize = 8;
          item.fullNum = parseInt(item.countResult / baseNum)
          item.halfNum = item.countResult % baseNum >= 0.5 ? 1 : 0;
          item.remainingNum = item.backSize - item.fullNum - item.halfNum;
        })
        this.xsnlfbData = data.all;
      },
      /**
       * 学生院系分布
       */
      setXsyxfb(data) {
        this.xsyxfbLegendData = data.departmentList;
        let datas = [];
        data.all.forEach((item, index) => {
          datas.push(
            {
              name: item.department,
              value: item.countResult
            }
          )
        })
        this.xsyxfbSeriesData = [{
          name: '',
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['30%', '50%'],
          roseType: 'radius',
          minShowLabelAngle: 60,
          label: {
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
          data: datas
        }]
      },
      /**
       * 学生专业分布
       */
      setXszyfb(data) {
        this.xszyfbXAxisData = data.majorList;
        this.xszyfbSeriesData = [
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
            data: data.countResult
          }
        ];
      },
      /**
       * 本周考勤异常
       */
      setBzkqyc(data) {
        this.bzkqycXAxisData = data.majorList;
        /*this.bzkqycSeriesData.push({
          // 分隔
          type: "pictorialBar",
          itemStyle: {
            normal: {
              color: "#04F9FA"
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              offset: [0, 2],
              textStyle: {
                color: '#04E0E0',
                fontSize: 12,
              },
            },
          },
          symbolRepeat: "fixed",
          symbolMargin: 4,
          symbol: "rect",
          symbolClip: true,
          symbolSize: [32, 2],
          symbolPosition: "start",
          symbolOffset: [0, -1],
          data:  data.countResult,
          width: 1,
          z: 0,
          zlevel: 1
        })*/
        let max = 0;
        data.countResult.forEach((item) => {
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
          // data:  data.data.bzkqyc.countResult,
          data: [
            {
              value: data.countResult[0],
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
            data.countResult[1],
            data.countResult[2],
            data.countResult[3]
          ],
          width: 1,
          z: 99,
          zlevel: 99
        };
        this.bzkqycSeriesData.push(bzkqData);
        let bzkqDatas = data.countResult;
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
      },
      /**
       * 教师政治面貌
       */
      setJszzmm(data) {
        data.all.forEach((item, index) => {
          let x2 = 19 + Math.sin((2 * Math.PI / 360) * (3.6 * data.bili[index] )) * 10;
          let y2 = 17 - Math.cos((2 * Math.PI / 360) * (3.6 * data.bili[index] )) * 10;
          item.svgString = `
                      <circle cx="19" cy="17" r="10" fill="#134B50"></circle>
                      <path d="M19 17 L19 7 A 10 10, 0, 0, 1, ${parseInt(x2)} ${parseInt(y2)} L21 17 Z" fill="#04F9FA"></path>
                      <text x="39" y="21" font-size="12" font-family="DIN-MEDIUM" font-weight="500" text-anchor="middle" fill="#D6731A">${parseInt(data.bili[index])}</text>
                      <text x="49" y="21" font-size="9" font-family="DIN-MEDIUM" font-weight="500" text-anchor="middle" fill="#D6731A">%</text>`
        });
        this.jszzmmData = data.all;
      },
      /**
       * 学生量化周评
       */
      setXslhzp(data) {
        // this.rankingData = data;
        this.rankingData = [
          data.slice(0, 5),
          data.slice(5, data.length)
        ]
        console.log(this.rankingData)
      },
      /**
       * 学生基本情况
       */
      setXsjbzk(data) {
        let datas = data;
        datas.left = datas.all.splice(0, 3);
        this.xsjbzkData = datas;
        console.log(this.xsjbzkData);
      }
    }
  }
</script>

<style lang="scss" scoped>
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
      padding-top: 30px;
      padding-left: .4rem;
      padding-right: .4rem;
      padding-bottom: 60px;
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
                background: url("../../assets/students/xsjbzk_img1.png") no-repeat;
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
                font-family: DIN-MEDIUM;
                font-weight: 500;
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
                        font-family: DIN-MEDIUM;
                        font-weight: 500;
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
                        font-family: DIN-MEDIUM;
                        font-weight: 500;
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
                        font-family: DIN-MEDIUM;
                        font-weight: 500;
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
                        font-family: DIN-MEDIUM;
                        font-weight: 500;
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
          flex: 320;
          background: url("../../assets/students/xslhzptop10.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .ranking-view {
            width: 100%;
            height: 100%;
            padding-top: 40px;
            padding-bottom: 30px;
            padding-left: .24rem;
            padding-right: .24rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .ranking-tip {
              width: 100%;
              text-align: right;
              color: #677A7A;
              font-size: 12px;
              font-family: "PingFang SC";
              max-height: 20px;
              margin-bottom: 15px;
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
              height: calc(100% - 35px);
              .ranking-left {
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: column;
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
              /*max-height: 36px;*/
              height: 0;
              flex: 1;
              margin-bottom: 20px;
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
            .ranking-item:last-of-type {
              margin-bottom: 0;
            }
            .ranking-item::after {
              content: '';
              background: url("../../assets/students/xslhzptop10_img1.png");
              width: 100%;
              height: 2px;
              position: absolute;
              left: 0;
              bottom: -4px;
            }
          }
        }
        .right-center {
          width: 100%;
          height: 0;
          flex: 270;
          background: url("../../assets/students/bzkqyc.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          position: relative;
          .charts {
            margin-top: 20px;
            height: calc(100% - 20px);
            padding-left: .4rem;
            padding-right: .4rem;
            display: flex;
            .zzmm-view {
              flex: 1;
              margin-top: 30px;
              margin-bottom: 10px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              flex-wrap: wrap;
              .zzmm-item {
                /*width: 33%;*/
                min-width: 25%;
                height: 80px;
                .svg-draw {
                  background: url("../../assets/teachers/jszzmm_img2.png") no-repeat;
                  background-size: 100% 100%;
                }
                .item-child {
                  height: 38px;
                  display: flex;
                  align-items: center;
                  flex: 1;
                  flex-shrink: 0;
                  justify-content: flex-start;
                  margin-top: 8px;
                  .item-icon {
                    background: url("../../assets/teachers/jszzmm_img3.png") no-repeat;
                    width: .09rem;
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
                      color: #ffffff;
                    }
                    .item-value {
                      /*background: url("../../assets/build/bxgm_img3.png") no-repeat;*/
                      /*background-size: 100% 100%;*/
                      background: #134B50;
                      height: 16px;
                      line-height: 16px;
                      text-align: center;
                      min-width: .53rem;
                      width: .53rem;
                      padding: 0 .1rem;
                      color: #04F9FA;
                      font-size: 14px;
                      font-family: DIN-MEDIUM;
                    }
                  }
                }
              }
              /*.zzmm-item:nth-child(2),.zzmm-item:nth-child(5) {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .zzmm-item:nth-child(3n) {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              }
              .zzmm-item:nth-child(4),.zzmm-item:nth-child(5),.zzmm-item:nth-child(6) {
                align-self: flex-end;
              }*/
            }
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
              width: 1.54rem;
              height: .22rem;
              background: url("../../assets/teachers/xsxycj_img2.png") no-repeat;
              background-size: 100% 100%;
              ::v-deep.el-select {
                width: 1.4rem;
                height: .22rem;
              }
            }
          }
          .table-view {
            width: 100%;
            margin-top: 1px;
            padding-left: .35rem;
            padding-right: .35rem;
            height: calc(100% - 112px);
            ::v-deep.table-views {
              .main {
                padding-top: 13px;
              }
            }
          }
        }
      }
    }
  }
</style>
