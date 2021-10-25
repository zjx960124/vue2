<template>
  <div class="teachers">
    <div class="header">师资力量</div>
    <div class="main">
      <div class="left">
        <div class="left-top">
          <view-title title="教职工工龄分布"></view-title>
          <div class="charts">
            <pie-chart
              ref="sxzyfb"
              title=""
              height="100%"
              show-legend-position="right"
              legend-right="75"
              legend-top="78"
              :graphic="jzgnlfbGraphic"
              :legend-data="jzgnlfbLegendData"
              :color="[
                        '#04E0E0',
                        '#039494',
                        '#D3DEE0',
                        '#D6731A',
                        '#048FFA',
                        '#D6961A'
                      ]"
              :series-data="jzgnlfbSeriesData"
            />
          </div>
        </div>
        <div class="left-center">
          <view-title title="教职工学历分布"></view-title>
          <div class="jzgxlfb-view">
            <div
              class="jzgxlfb-item"
              v-for="(item, index) in jzgxlfbData"
            >
              <div class="label">{{ item.education }}</div>
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
          <view-title title="教师来源分布"></view-title>
          <div class="charts">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[0, 15, 27, 47]"
              :color="['#04F9FA', '#D3DEE0', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="true"
              :y-axis-names="['']"
              :legend-data="gznjsfbLegend"
              :x-axis-label-wraps="true"
              :legend-bottom="16"
              show-legend-position="bottom"
              :x-axis-data="gznjsfbXAxisData"
              :series-data="gznjsfbSeriesData"
            ></bar-chart>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <view-title title="教职工基本状况"></view-title>
          <div class="view">
            <div
              v-for="(item, index) in jbqkData"
              :key="index"
              class="item"
            >
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ item.value | locale }}</div>
            </div>
          </div>
          <img src="../../assets/teachers/tree.png" class="tree" alt="">
          <div class="fruit1">
            <div class="label top">男教师</div>
            <div class="label">占比</div>
            <div class="value">{{ fruitData.nanbili }}<span>%</span></div>
          </div>
          <div class="fruit2">
            <div class="label top">教师</div>
            <div class="label">占比</div>
            <div class="value">{{ fruitData.jiaoshibili }}<span>%</span></div>
          </div>
          <div class="fruit3">
            <div class="label top">女教师</div>
            <div class="label">占比</div>
            <div class="value">{{ fruitData.nvbili }}<span>%</span></div>
          </div>
        </div>
        <div class="center-bottom">
          <view-title title="教师职称分布"></view-title>
          <div class="chart">
            <line-chart
              title=""
              height="100%"
              :grid="[35, 30, 38, 30]"
              :color="['#F28179']"
              :x-axis-label-wraps="true"
              :x-axis-data="jszcfbXAxisData"
              :y-axis-names="['']"
              :series-data="jszcfbSeriesData"
            ></line-chart>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
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
                  <div class="item-label">{{ item.type }}</div>
                  <div class="item-value">{{ item.countResult }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="right-bottom-top">
            <div class="extra-title">各专业教师分布</div>
            <div class="chart">
              <pie-chart
                ref="sxzyfb"
                title=""
                height="100%"
                show-legend-position="right"
                legend-right="55"
                legend-top="65"
                :color="['#04E0E0',
                        '#039494',
                        '#D3DEE0',
                        '#D6731A',]"
                :legend-data="gyxjsxqLegendData"
                :series-data="gyxjsxqSeriesData"
              />
            </div>
          </div>
          <div class="right-bottom-bottom">
            <div class="extra-title">各专业教师编制详情</div>
            <div class="charts">
              <bar-chart
                title=""
                height="100%"
                direction="vertical"
                :grid="[0, 20, 0, 48]"
                :color="['#04F9FA', '#D3DEE0', '#D6731A']"
                :axis-line-flag="false"
                :shwo-x-axis-split-line="false"
                :shwo-x-axis-line="false"
                :shwo-axis-line="false"
                :shwo-y-axis-split-line="true"
                :y-axis-names="['']"
                :legend-data="gzyjsfbLegendData"
                :legend-bottom="16"
                show-legend-position="bottom"
                :x-axis-data="gzyjsfbXAxisData"
                :series-data="gzyjsfbSeriesData"
              ></bar-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewTitle from './components/viewTitle';
  import LineChart from '../../components/Chart/LineChart';
  import echarts from 'echarts';
  import DynamicIcon from './components/dynamicIcon';
  import BarChart from '../../components/Chart/BarChart';
  import PieChart from '../../components/Chart/PieChart';
  import TextDescription from './components/textDescription';
  import {
    getTeacherData
  } from '@/api/build';
  export default {
    name: 'Teachers',
    components: { TextDescription, PieChart, BarChart, DynamicIcon, LineChart, ViewTitle },
    data() {
      return {
        // 教师职称分布
        jszcfbSeriesData: [],
        jszcfbXAxisData: [],
        jzgxlfbData: [],
        svgString: '',
        // 教职工年龄分布
        jzgnlfbGraphic: {
          elements: [
            {
              type: 'image',
              left: '13.1%',
              top: '26.5%',
              style: {
                image: require('../../assets/teachers/graphic.png'),
                width: 148 * document.documentElement.clientHeight / 1080,
                height: 148 * document.documentElement.clientHeight / 1080
              }
            }
          ]
        },
        jzgnlfbLegendData: [
          {
            name: '20-29'
          },
          {
            name: '30-39'
          },
          {
            name: '40-49'
          },
          {
            name: '50-59'
          },
          {
            name: '60-69'
          },
          {
            name: '70-79'
          }
        ],
        jzgnlfbSeriesData: [],
        // 教职工基本状况
        jbqkData: [],
        fruitData: '',
        // 各职能教师分布
        gznjsfbLegend: [],
        gznjsfbXAxisData: [],
        gznjsfbSeriesData: [],
        // 教师政治面貌
        jszzmmData: [],
        // 各专业教师分布
        gzyjsfbSeriesData: [],
        gzyjsfbXAxisData: [],
        gzyjsfbLegendData: [],
        // 各院系教师详情
        gyxjsxqSeriesData: [],
        gyxjsxqLegendData: []
      }
    },
    mounted() {
      this.setSvg();
      this.getTeacherData();
    },
    methods: {
      setSvg() {
        let x2 = 19 + Math.sin((2 * Math.PI / 360) * (3.6 * 15)) * 10;
        let y2 = 17 - Math.cos((2 * Math.PI / 360) * (3.6 * 15)) * 10;
        this.svgString = `
                      <circle cx="19" cy="17" r="10" fill="#134B50"></circle>
                      <path d="M19 17 L19 7 A 10 10, 0, 0, 1, ${x2} ${y2} L21 15 Z" fill="#04F9FA"></path>
                      <text x="39" y="20" font-size="12" text-anchor="middle" fill="#D6731A">15</text>
                      <text x="49" y="20" font-size="9" text-anchor="middle" fill="#D6731A">%</text>`
      },
      getTeacherData() {
        getTeacherData().then(res => {
          console.log(res);
          this.setGznjsfb(res.data.gznjsfb);
          this.setJszcfb(res.data.jszcfb);
          this.setJszzmm(res.data.jszzmm);
          this.setJbzk(res.data.jzgjbzk);
          this.setJzgxlfb(res.data.jzgxlfb);
          this.setGzyjsfb(res.data.gzyjsbzxq);
          this.setGyxjsxq(res.data.gyxjsxq);
          this.setJzgnlfb(res.data.jzgnlfb);
        })
      },
      /**
       * 各职能教师分布
       */
      setGznjsfb(data) {
        this.gznjsfbLegend = Object.keys(data);
        let xAxisData = [];
        for (let i = 0; i < Object.values(data).length; i++) {
          Object.values(data)[i].forEach((item, index) => { xAxisData.push(item.department) });
        }
        this.gznjsfbXAxisData = [...new Set(xAxisData)];
        console.log(this.gznjsfbXAxisData);
        // this.gznjsfbXAxisData = Object.values(data)[0].map((item, index) => { return item.department });
        this.gznjsfbSeriesData = Object.values(data).map((item, index) => {
          return {
            name: Object.keys(data)[index],
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: item.map((items, index) => { return items.countResult })
          }
        })
      },
      /**
       * 教师职称分布
       */
      setJszcfb(data) {
        this.jszcfbXAxisData = data.politicalOutlook;
        this.jszcfbSeriesData = [
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
        ]
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
       * 基本状况
       */
      setJbzk(data) {
        this.jbqkData = [
          {
            label: '教职工总人数',
            value: data.all
          },
          {
            label: '男教师',
            value: data.man
          },
          {
            label: '女教师',
            value: data.woman
          }
        ]
        this.fruitData = data;
      },
      /**
       * 教职工学历分布
       */
      setJzgxlfb(data) {
        let all = 0;
        data.all.forEach(item => { all += item.countResult });
        let baseNum = parseInt(all / data.all.length);
        data.all.forEach((item, index) => {
          item.backSize = 8;
          item.fullNum = parseInt(item.countResult / baseNum)
          item.halfNum = item.countResult % baseNum >= 0.5 ? 1 : 0;
          item.remainingNum = item.backSize - item.fullNum - item.halfNum;
        })
        this.jzgxlfbData = data.all;
      },
      /**
       * 各专业教师编制详情
       */
      setGzyjsfb(data) {
        this.gzyjsfbXAxisData = Object.keys(data);
        this.gzyjsfbLegendData = Object.values(data)[0].map((item, index) => { return item.type });
        this.gzyjsfbSeriesData = [];
        for (let i = 0; i < this.gzyjsfbLegendData.length; i++) {
          let datas = [];
          Object.values(data).forEach((item, index) => {
            Object.values(item).forEach((items, index) => {
              if (items.type === this.gzyjsfbLegendData[i]) datas.push(items.countResult);
            })
          })
          this.gzyjsfbSeriesData.push({
            name: this.gzyjsfbLegendData[i],
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: datas
          })
        }
      },
      /**
       * 各院系教师详情
       */
      setGyxjsxq(data) {
        this.gyxjsxqLegendData = data.department;
        let datas = [];
        for (let i = 0; i < data.department.length; i++) {
          datas.push(
            {
              name: data.department[i],
              value: data.countResult[i]
            }
          )
        }
        this.gyxjsxqSeriesData = [{
          name: '',
          type: 'pie',
          radius: ['35%', '60%'],
          center: ['35%', '50%'],
          roseType: 'radius',
          minShowLabelAngle: 60,
          label: {
            show: false,
            normal: {
              show: false,
              position: 'outside',
              fontSize: 12,
              formatter: '{c}%'
            }
          },
          labelLine: {
            show: false
          },
          data: datas
        }];
        console.log(this.gyxjsxqLegendData)
        console.log(this.gyxjsxqSeriesData)
      },
      /**
       * 教职工年龄分布
       */
      setJzgnlfb(data) {
        this.jzgnlfbLegendData = data.ageTypeList;
        let datas = [];
        for (let i = 0; i < data.ageTypeList.length; i++) {
          datas.push(
            {
              name: data.ageTypeList[i],
              value: data.all[i].countResult
            }
          )
        }
        this.jzgnlfbSeriesData = [
          {
            type: 'pie',
            radius: ["45%", "52%"],
            center: ['30%', '55%'],
            label: {
              show: false,
              formatter: '{d}'
            },
            labelLine: {
              show: false,
              lineStyle: {
                color: '#D3DEE0'
              }
            },
            data: datas
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .teachers {
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
          background: url("../../assets/teachers/xssj.png") no-repeat;
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
          background: url("../../assets/teachers/bqzs_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .jzgxlfb-view {
            flex: 1;
            margin-top: 54px;
            margin-bottom: 30px;
            max-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .jzgxlfb-item {
              position: relative;
              height: 40px;
              margin-left: .35rem;
              margin-right: .35rem;
              display: flex;
              align-items: center;
              .label {
                width: .48rem;
                flex-shrink: 0;
                font-size: 12px;
                color: #04F9FA;
                font-weight: 500;
                font-family: "PingFang SC";
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
                margin-right: .22rem;
                margin-left: .20rem;
                min-width: 2.61rem;
                .icon-view {
                  position: relative;
                }
                .icon-view::after {
                  content: '';
                  position: absolute;
                  background: url("../../assets/teachers/line.png") no-repeat;
                  background-size: 100% 100%;
                  height: 2px;
                  width: 100%;
                  bottom: 0;
                  left: 0;
                }
              }
              .value {
                font-size: 14px;
                color: #04E0E0;
                font-weight: 500;
                font-family: DIN-MEDIUM;
              }
            }
            .jzgxlfb-item:last-of-type {
              .icon {
                div.icon-view::after {
                  content: '';
                  width: 0;
                }
              }
            }
          }
        }
        .left-bottom {
          width: 100%;
          height: 0;
          flex: 279;
          background: url("../../assets/teachers/gyxxsqk_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          padding-left: .34rem;
          .charts {
            width: 100%;
            height: calc(100% - 45px);
            margin-top: 45px;
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
          background: url("../../assets/teachers/jzgjbzk_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .tree {
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            left: 0;
          }
          .fruit1 {
            position: absolute;
            width: 1.38rem;
            height: 1.38rem;
            background: url("../../assets/teachers/fruit1.png") no-repeat;
            background-size: 100% 100%;
            left: 50%;
            top: 35%;
            animation: spin 10s linear infinite;
            .top {
              margin-top: 38px;
            }
            .label {
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              text-align: center;
            }
            .value {
              color: #D2FAFA;
              font-size: 24px;
              font-family: DIN-MEDIUM;
              font-weight: 500;
              text-align: center;
              margin-top: 5px;
              span {
                font-size: 14px;
              }
            }
          }
          .fruit2 {
            position: absolute;
            width: 1.38rem;
            height: 1.38rem;
            background: url("../../assets/teachers/fruit2.png") no-repeat;
            background-size: 100% 100%;
            left: 23%;
            top: 55%;
            animation: spin2 10s linear infinite;
            .top {
              margin-top: 38px;
            }
            .label {
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              text-align: center;
            }
            .value {
              color: #D2FAFA;
              font-size: 24px;
              font-family: DIN-MEDIUM;
              font-weight: 500;
              text-align: center;
              margin-top: 5px;
              span {
                font-size: 14px;
              }
            }
          }
          .fruit3 {
            position: absolute;
            width: 1.38rem;
            height: 1.38rem;
            background: url("../../assets/teachers/fruit3.png") no-repeat;
            background-size: 100% 100%;
            left: 60%;
            top: 60%;
            animation: spin3 10s linear infinite;
            .top {
              margin-top: 38px;
            }
            .label {
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              text-align: center;
            }
            .value {
              color: #D2FAFA;
              font-size: 24px;
              font-family: DIN-MEDIUM;
              font-weight: 500;
              text-align: center;
              margin-top: 5px;
              span {
                font-size: 14px;
              }
            }
          }
          @keyframes spin {
            0% {
              margin-top: 0;
            }
            20% {
              margin-top: -10px;
            }
            40% {
              margin-top: 10px;
            }
            60% {
              margin-top: -10px;
            }
            80% {
              margin-top: 10px;
            }
            100% {
              margin-top: 0;
            }
          }
          @keyframes spin2 {
            0% {
              margin-top: 0;
            }
            20% {
              margin-top: 8px;
            }
            40% {
              margin-top: -6px;
            }
            60% {
              margin-top: 6px;
            }
            80% {
              margin-top: -8px;
            }
            100% {
              margin-top: 0;
            }
          }
          @keyframes spin3 {
            0% {
              margin-top: 0;
            }
            18% {
              margin-top: -8px;
            }
            36% {
              margin-top: 8px;
            }
            56% {
              margin-top: -6px;
            }
            72% {
              margin-top: 8px;
            }
            88% {
              margin-top: -6px;
            }
            100% {
              margin-top: 0;
            }
          }
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
                font-size: 14px;
                background: url("../../assets/build/xssj_sqzbyrs_img1.png") no-repeat;
                background-size: 100% 100%;
                width: 1.43rem;
                font-family: PingFangSC-Bold;
                font-style: italic;
                height: 20px;
                line-height: 20px;
                margin-bottom: 7px;
                text-align: center;
              }
              .value {
                font-size: 20px;
                color: #BCE0E0;
                background: url("../../assets/build/xssj_sqzbyrs_img2.png") no-repeat;
                background-size: 100% 100%;
                font-family: DIN-MEDIUM;
                font-weight: 500;
                width: 100%;
                height: 57px;
                text-align: center;
                line-height: 57px;
              }
            }
          }
        }
        .center-bottom {
          width: 100%;
          height: 0;
          flex: 277;
          background: url("../../assets/teachers/bxgm_img1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .chart {
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
          flex: 279;
          background: url("../../assets/teachers/jszzmm_img1.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          padding-left: .4rem;
          padding-right: .4rem;
          .zzmm-view {
            flex: 1;
            margin-top: 60px;
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
        .right-bottom {
          width: 100%;
          height: 0;
          flex: 610;
          margin-top: 20px;
          background: url("../../assets/teachers/gyxjsxq_img1.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          .right-bottom-top {
            width: 100%;
            height: 0;
            flex: 320;
            flex-shrink: 0;
            max-height: 320px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding: 0 .35rem;
            .extra-title {
              margin-top: 60px;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 20px;
              width: 1.3rem;
              height: 20px;
              line-height: 20px;
              background: url("../../assets/teachers/gyxjsxq_img2.png") no-repeat;
              background-size: 100% 100%;
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Bold;
              font-style: italic;
              text-align: center;
            }
            .chart {
              width: 100%;
              flex: 1;
              background: url("../../assets/teachers/gyxjsxq_img3.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .right-bottom-bottom {
            width: 100%;
            height: 0;
            flex: 291;
            display: flex;
            flex-direction: column;
            padding: 0 .35rem;
            .extra-title {
              margin-top: 30px;
              margin-left: auto;
              margin-right: auto;
              width: 1.7rem;
              height: 20px;
              line-height: 20px;
              background: url("../../assets/teachers/gyxjsxq_img4.png") no-repeat;
              background-size: 100% 100%;
              color: #D2FAFA;
              font-size: 14px;
              font-family: PingFangSC-Bold;
              font-style: italic;
              text-align: center;
            }
            .charts {
              width: 100%;
              flex: 1;
            }
          }
        }
      }
    }
  }
</style>
