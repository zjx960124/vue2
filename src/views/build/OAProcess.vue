<template>
  <div class="oa">
    <div class="header">OA流程</div>
    <div class="main">
      <div class="left">
        <div class="left-top">
          <view-title title="各类别流程总占比"></view-title>
          <div class="charts">
            <div id="bubble" ref="bubble" class="bubble"></div>
          </div>
        </div>
        <div class="left-center">
          <view-title title="各科室发起数"></view-title>
          <div class="charts">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[0, 15, 35, 45]"
              :color="['#04F9FA', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="true"
              :y-axis-names="['']"
              :legend-data="gksfqsLegend"
              :legend-bottom="16"
              :show-data-zoom="true"
              :data-zoom-start-value="0"
              :data-zoom-end-value="4"
              :data-zoom-bottom="15"
              show-legend-position="bottom"
              :x-axis-data="gksfqsXAxisData"
              :series-data="gksfqsSeriesData"
            ></bar-chart>
          </div>
        </div>
        <div class="left-bottom">
          <view-title title="今年发起的流程TOP10"></view-title>
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
          <view-title title="OA流程情况一览"></view-title>
          <div class="view">
            <div
              class="item"
            >
              <div class="label"><span class="spans">发起数(个)</span></div>
              <div class="value">{{ oaBaseData.launch | locale }}</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">在途中(个)</span></div>
              <div class="value">{{ oaBaseData.underway | locale }}</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">完结数(个)</span></div>
              <div class="value">{{ oaBaseData.end | locale }}</div>
            </div>
          </div>
          <div class="back"></div>
          <div class="oa-circle"></div>
          <div class="views">
            <div
              class="item"
            >
              <div class="label"><span class="spans">完结率</span></div>
              <div class="value">{{ oaBaseData.endRate }}%</div>
            </div>
            <div
              class="item"
            >
              <div class="label"><span class="spans">平均完成时长(天)</span></div>
              <div class="value">{{ oaBaseData.averageEndTime }}</div>
            </div>
          </div>
        </div>
        <div class="center-bottom">
          <view-title title="每月发起的流程数"></view-title>
          <div class="charts">
            <bar-chart
              title=""
              height="100%"
              direction="vertical"
              :grid="[0, 15, 25, 35]"
              :color="['#04F9FA', '#D6731A']"
              :axis-line-flag="false"
              :shwo-x-axis-split-line="false"
              :shwo-x-axis-line="false"
              :shwo-axis-line="false"
              :shwo-y-axis-split-line="true"
              :y-axis-names="['']"
              :legend-data="myfqdlcsLegend"
              :legend-bottom="12"
              show-legend-position="bottom"
              :x-axis-data="myfqdlcsXAxisData"
              :series-data="myfqdlcsSeriesData"
            ></bar-chart>
          </div>
        </div>
      </div>
      <div class="right">
        <view-title title="响应效率"></view-title>
        <div class="right-top">
          <div class="extra-title">历史在途流程TOP10</div>
          <div class="ranking-view">
            <div class="ranking-item-view">
              <div class="ranking-left">
                <div
                  class="ranking-item"
                  v-for="(item, index) in rankingData2[0]"
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
                  v-for="(item, index) in rankingData2[1]"
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
        <div class="right-center">
          <div class="extra-title">各类OA流程历史平均处理时长</div>
          <div class="shuffling-view">
            <el-carousel height="100%">
              <el-carousel-item class="a" v-for="(item, index) in shufflingOfType" :key="index">
                <div
                  class="shuffling-item"
                  v-for="(items, indexs) in item"
                  :class="items.color === 1 ? 'nice': items.color === 2 ? '' : 'warning'"
                  :key="indexs"
                >
                  <div class="label">{{ items.type }}</div>
                  <div class="value">{{ items.countResult }} <span>天</span></div>
                  <div class="icon"></div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-bottom">
          <div class="extra-title">各科室OA流程平均处理时长</div>
          <div class="shuffling-view">
            <el-carousel height="100%">
              <el-carousel-item class="a" v-for="(item, index) in shufflingOfDepartment" :key="index">
                <div
                  class="shuffling-item"
                  v-for="(items, indexs) in item"
                  :class="items.color === 1 ? 'nice': items.color === 2 ? '' : 'warning'"
                  :key="indexs"
                >
                  <div class="label">{{ items.department }}</div>
                  <div class="value">{{ items.countResult }} <span>天</span></div>
                  <div class="icon"></div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewTitle from './components/viewTitle'
  import BarChart from '../../components/Chart/BarChart'
  import echarts from 'echarts';
  import {
    getOAData
  } from '@/api/build';
  export default {
    name: 'OAProcess',
    components: { BarChart, ViewTitle },
    data() {
      return {
        vhtml: '',
        zszyChart: null,
        // 各科室发起数
        gksfqsSeriesData: [],
        gksfqsXAxisData: [],
        gksfqsLegend: ['历年平均流程发起数', '今年流程发起数'],
        // 今年发起的流程TOP10
        rankingData: [],
        // OA流程情况一览
        oaBaseData: '',
        // 每月发起的流程数
        myfqdlcsSeriesData: [],
        myfqdlcsXAxisData: [],
        myfqdlcsLegend: ['历年平均流程发起数', '今年流程发起数'],
        // 历年流程top10
        rankingData2: [],
        // 各类OA流程历史平均处理时长
        shufflingOfType: [],
        // 各科室OA流程平均处理时长
        shufflingOfDepartment: []
      }
    },
    mounted() {
      this.getOAData();
    },
    methods: {
      /**
       * 获取页面数据
       */
      getOAData() {
        getOAData().then(res => {
          console.log(res);
          this.setGksfqs(res.data.gksfqs);
          this.setJnfqdlc(res.data.jnfqdlcTop10);
          this.setLnfqdlc(res.data.lsztlcTop10);
          this.setMyfqlc(res.data.myfqlcs);
          this.setOAlcqkyl(res.data.oalcqkyl);
          this.setShufflingOfType(res.data.glOAlclspjclsc);
          this.setShufflingOfDepartment(res.data.gksOAlcpjclsc);
          this.setGlblczb(res.data.glblczb);
        })
      },
      /**
       * 各科室发起数
       */
      setGksfqs(data) {
        this.gksfqsXAxisData = data.department;
        this.gksfqsSeriesData = [
          {
            name: '历年平均流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: data.overYear
          },
          {
            name: '今年流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: data.thisYear
          }
        ]
      },
      /**
       * 今年发起的流程
       */
      setJnfqdlc(data) {
        this.rankingData = [];
        this.rankingData.push(data.slice(0, 5));
        this.rankingData.push(data.slice(5, data.length))
      },
      /**
       * 历年流程
       */
      setLnfqdlc(data) {
        this.rankingData2 = [];
        this.rankingData2.push(data.slice(0, 5));
        this.rankingData2.push(data.slice(5, data.length))
      },
      /**
       * 每月发起流程
       */
      setMyfqlc(data) {
        this.myfqdlcsXAxisData = data.month
        this.myfqdlcsSeriesData = [
          {
            name: '历年平均流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: data.overYear
          },
          {
            name: '今年流程发起数',
            type: 'bar',
            barWidth: 6,
            barGap: '66%',
            data: data.thisYear
          }
        ]
      },
      /**
       * OA流程情况一览
       */
      setOAlcqkyl(data) {
        this.oaBaseData = data;
      },
      /**
       * 各类OA流程历史平均处理时长
       */
      setShufflingOfType(data) {
        this.shufflingOfType = [];
        for(let i = 0, len = data.all.length; i < len; i+=6){
          this.shufflingOfType.push(data.all.slice(i,i+6));
        }
      },
      /**
       * 各科室OA流程平均处理时长
       */
      setShufflingOfDepartment(data) {
        this.shufflingOfDepartment = [];
        for(let i = 0, len = data.all.length; i < len; i+=6){
          this.shufflingOfDepartment.push(data.all.slice(i,i+6));
        }
      },
      /**
       * 各类别流程总占比
       */
      setGlblczb(data) {
        const sortData = data.all.sort(function (a, b) {
          return a.countResult - b.countResult
        })
        let position = [
          [0, 65],
          [39, 55],
          [99, 129],
          [126, 92],
          [60, 95],
          [188, 155],
          [165, 90],
          [190, 30]
        ]; // 定位
        let valueInterval = []; // 值范围
        let colorOption = [
          '#039494',
          '#04C7C7',
          '#D6731A',
          '#00FFFF',
          '#039494',
          '#04C7C7',
          '#D6731A',
          '#00FFFF'
        ]; // 颜色
        let adorn = [
          {
            name: "",
            value: 37,
            color: "#D3DEE0",
            position: [25, 122],
            fontSize: "11",
            number: "2",
          },
          {
            name: "",
            value: 37,
            color: "#D3DEE0",
            position: [74, 145],
            fontSize: "11",
            number: "2",
          },
          {
            name: "",
            value: 37,
            color: "#D3DEE0",
            position: [85, 40],
            fontSize: "11",
            number: "2",
          }
        ]; // 装饰物
        // 处理数据
        let reslult = [];
        for (let i = 0; i < sortData.length; i++) {
          valueInterval.push(this.random(60 * this.getScale(), 80 * this.getScale()));
        }
        valueInterval = valueInterval.sort(function (a, b) { return a - b });
        sortData.forEach((item, index) => {
          reslult.push(
            {
              name: item.type,
              value: valueInterval[index],
              color: colorOption[index],
              position: position[index],
              fontSize: "11",
              number: "2",
            }
          )
        });
        reslult = reslult.concat(adorn);
        let datas = [];
        // 渲染数据，并写入chart
        reslult.map((item, index) => {
          datas.push({
            name: item.name,
            value: item.position,
            symbolSize: item.value,
            /*label: {
              normal: {
                formatter: function(param) {
                  console.log(param);
                  var newParamsName = ""; //返回文字格式
                  /!*
                  var paramsNameNumber = param.name.length; //获取显示文字长度
                  var number = parseInt(item.number); //超过多少字换行
                  var rowNumber = Math.ceil(paramsNameNumber / number); //最多能显示几行
                  if (paramsNameNumber > number) {
                    //如果长度大于每行最多显示的字数
                    for (var p = 0; p < rowNumber; p++) {
                      //循环次数就是行数
                      var tempStr = ""; //每次截取的字符
                      var start = p * number; //截取的起点
                      var end = start + number; //截取的终点
                      if (p == rowNumber - 1) {
                        //最后一行就不换行了
                        tempStr = param.name.substring(start);
                      } else {
                        tempStr = param.name.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr; //拼接字符串
                    }
                  } else {
                    newParamsName = param.name; //如果小于每行最多显示的字数就返回原来的字符串
                  }*!/
                  newParamsName = param.data.symbolSize + "\n" + param.name;
                  return newParamsName;
                },
                show: true,
                textStyle: {
                  fontSize: 11,
                  fontFamily: "DIN-Medium",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  opacity: 1,
                },
              },
            },*/
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.7, [{
                  offset: 0.5,
                  color: "rgba(27, 54, 72, 0.2)",
                },
                  {
                    offset: 1,
                    color: item.color,
                  },
                ]),
                opacity: 1,
                borderWidth: 0,
                borderColor: item.color,
              },
            },
          });
        });
        let option = {
          backgroundColor: '#000211',
          grid: {
            show: false,
            top: 10,
            bottom: 10,
          },
          xAxis: [{
            gridIndex: 0,
            type: "value",
            show: false,
            min: 0,
            max: 200,
            nameLocation: "middle",
            nameGap: 5,
          }, ],
          yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 200,
            nameLocation: "middle",
            nameGap: 30,
          }, ],
          series: [{
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: function (value, index) {
                  console.log(value);
                  let names = '';
                  if (value.name.length > 4) {
                    names = value.name.substring(0, 4) + "\n" + value.name.substring(4, value.name.length);
                  } else {
                    names = value.name;
                  }
                  if (value.name === '') return '';
                  return `{value|${sortData[value.dataIndex].countResult}}\n{name|${names}}`;
                },
                rich: {
                  value: {
                    color: '#A7C7C7',
                    fontWeight: 'bold',
                    fontFamily: 'DIN-MEDIUM',
                    align: 'center',
                    fontSize: this.fitChartHeight(18),
                    lineHeight: this.fitChartHeight(32)
                  },
                  name: {
                    color: '#677A7A',
                    fontWeight: '500',
                    fontFamily: 'PingFangSC-Regular',
                    align: 'center',
                    fontSize: this.fitChartHeight(14)
                  },
                },
                color: "#677A7A",
                textStyle: {
                  fontSize: "11",
                },
              },
            },
            animationDurationUpdate: 500,
            animationEasingUpdate: 500,
            animationDelay: function(idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
            data: datas,
          }],
        };
        this.zszyChart = echarts.init(this.$refs.bubble, 'shine');
        this.zszyChart.setOption(option);
      },
      getScale() {
        let w = document.documentElement.clientWidth / 1920;
        let h = document.documentElement.clientHeight / 1080;
        return w < h ? w : h
      },
      random (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        let result = Math.floor(Math.random() * (max - min + 1)) + min
        return result
      },
      setScatter() {
        // 入参说明:
        // 1. data 原始气泡数据，是一个对象数组，形如[{name: '可乐', amount: 49}]
        // 2. format 数组依次指定气泡中展示的名称以及影响气泡大小的数据值, 形如['name', 'amount']
        // 3. dom 气泡图绘制所需要的dom id名
        let data = [
          {label: '可乐', amount: 100},
          {label: '雪碧', amount: 70},
          {label: '土豆', amount: 30},
          {label: '饼干', amount: 50},
          {label: '1', amount: 30},
          {label: '2', amount: 30}
        ]
        this.initBubbleChart(data, ['label', 'amount'], 'bubble')
      },
      initBubbleChart (data = [], format = [], dom) {
        let [maxValue, temp] = [0, []]
        data.forEach(item => {
          temp.push(item[format[1]])
        })
        maxValue = Math.max.apply(null, temp)
        // 气泡颜色数组
        let color = [
          '#FFB600', '#886CFF', '#0084FF',
          '#4CB690','#58B458', '#6C6C6C',
          '#F56161', '#FC754C','#5F5EEC'
        ]
        // 气泡颜色备份
        let bakeColor = [...color]
        // 气泡数据
        let bubbleData  = []
        // 气泡基础大小
        let basicSize = 50
        // 节点之间的斥力因子,值越大,气泡间距越大
        let repulsion = 280
        // 根据气泡数量配置基础大小和斥力因子（以实际情况进行适当调整，使气泡合理分布）
        if (data.length >= 5 && data.length < 10) {
          basicSize = 40
          repulsion = 180
        }
        if (data.length >= 10 && data.length < 20) {
          basicSize = 30
          repulsion = 100
        } else if (data.length >= 20) {
          basicSize = 20
          repulsion = 50
        }

        // 填充气泡数据数组bubbleData
        for (let item of data) {
          // 确保气泡数据条数少于或等于气泡颜色数组大小时，气泡颜色不重复
          if (!bakeColor.length) bakeColor = [...color]
          let colorSet = new Set(bakeColor)
          let curIndex = Math.round(Math.random()*(colorSet.size - 1))
          let curColor = bakeColor[curIndex]
          colorSet.delete(curColor)
          bakeColor = [...colorSet]
          // 气泡大小设置
          let size = (item[format[1]] * basicSize * 2) / maxValue
          if (size < basicSize) size = basicSize

          bubbleData.push({
            "name": item[format[0]],
            "value": item[format[1]],
            "symbolSize": size,
            "draggable": false,
            "itemStyle": {
              "normal": {"color": curColor}
            }
          })
        }

        let bubbleId = document.getElementById(dom)
        let bubbleChart = echarts.init(bubbleId)
        let bubbleOptions = {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          animationEasingUpdate: 'bounceIn',
          series: [{
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: repulsion,
              edgeLength: 10
            },
            // 是否开启鼠标缩放和平移漫游
            roam: true,
            label: {normal: {show: true}},
            data: bubbleData
          }]
        }
        bubbleChart.setOption(bubbleOptions)
      },
      setDiv() {
        this.createBubble(8);   //初始化气泡
      },
      createBubble(num) {
        let iconWidth = 60;   //值越大，元素左右间隔越大
        let iconHeight = 60;  //值越大，元素上下间隔越大
        let targetHeight = document.getElementById("bubble").offsetHeight;
        let targetWidth = document.getElementById("bubble").offsetWidth;
        let _tmpArray = [];
        let html = '';
        //当放置的元素的宽高大于浏览器窗口的宽高时，直接返回
        if(targetWidth < iconWidth || targetHeight < iconHeight){
          return false;
        }

        let xNum = parseInt(targetWidth / iconWidth, 10);    //用浏览器的宽度除以一个元素的宽度可算出浏览器窗口内一行可以放置元素的个数
        let yNum = parseInt(targetHeight / iconHeight, 10);  //用浏览器的高度除以一个元素的高度可算出浏览器窗口内一列可以放置元素的个数
        let allNum = xNum * yNum;   //浏览器窗口内总共可以放置元素的个数
        //当需要放置的元素的个数超过浏览器窗口内总共可以放置的元素的个数时，则返回
        if(num >= allNum){
          return false;
        }

        for(let i = 0; i < allNum; i++){
          _tmpArray.push(i);
        }

        let xStart = 0, yStart = 0;

        console.log(num)
        while(num){
          let pointer = Math.floor(Math.random() * allNum);    //向下取整取出0到allnum之间的任意一个整数
          //如果数组_tmpArray中不存在第pointer值，则继续
          if(!_tmpArray[pointer]){
            continue;
          }

          delete _tmpArray[pointer];   //删除数组_tmpArray中第pointer个值
          yStart = parseInt(pointer / xNum, 10) * iconWidth;
          xStart = (pointer % xNum) * iconHeight;

          html += "<img " +
            "src='http://tp1.sinaimg.cn/1642634100/50/5613120647/0' " +
            "style='top:" + yStart + "px;left:" + xStart + "px;position:absolute'/>";
          num--;
        }
        this.vhtml = html;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .oa {
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
        flex: 597;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        .left-top {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/oa/xssj.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .charts {
            width: 100%;
            height: calc(100% - 60px);
            margin-top: 40px;
            .bubble {
              width: 100%;
              height: 100%;
              padding-left: .1rem;
              position: relative;
            }
          }
        }
        .left-center {
          width: 100%;
          height: 0;
          flex: 288;
          margin-top: 20px;
          margin-bottom: 20px;
          background: url("../../assets/oa/gksfqs.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          padding-left: .35rem;
          .charts {
            width: 100%;
            height: calc(100% - 45px);
            margin-top: 45px;
          }
        }
        .left-bottom {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/oa/jnfqdlctop10.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .ranking-view {
            width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            padding-top: 55px;
            padding-bottom: 45px;
            padding-left: .38rem;
            padding-right: .36rem;
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
              width: 2.24rem;
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
              background: url("../../assets/students/xslhzptop10_img1.png") no-repeat;
              background-size: 100% 100%;
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
        flex: 597;
        width: 0;
        height: 100%;
        margin-left: .25rem;
        margin-right: .25rem;
        display: flex;
        flex-direction: column;
        .center-top {
          width: 100%;
          height: 0;
          flex: 598;
          margin-bottom: 20px;
          background: url("../../assets/oa/oalcqkyl.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .oa-circle {
            width: 1.46rem;
            height: 1.44rem;
            top: 50%;
            left: 50%;
            margin-top: -55px;
            margin-left: -.73rem;
            position: absolute;
            background: url("../../assets/oa/oaliucheng.png") no-repeat;
            background-size: 100% 100%;
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
                color: #04E0E0;
                background: url("../../assets/oa/oalcqkyl_img2.png") no-repeat;
                background-size: 100% 100%;
                width: 1rem;
                height: 60px;
                text-align: center;
                line-height: 60px;
                font-size: 18px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
              }
            }
          }
          .back {
            margin: 15px auto;
            width: 3.16rem;
            height: 3.16rem;
            background: url("../../assets/oa/oalcqkyl_img3.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            animation: spin 9s linear infinite;
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
          .views {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 9px;
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
                font-style: italic;
                font-family: "PingFang SC";
                width: 1.43rem;
                height: 20px;
                line-height: 24px;
                margin-bottom: 7px;
                text-align: center;
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
                color: #04E0E0;
                background: url("../../assets/oa/oalcqkyl_img4.png") no-repeat;
                background-size: 100% 100%;
                width: 100%;
                height: 60px;
                text-align: center;
                line-height: 60px;
                font-size: 18px;
                font-family: DIN-MEDIUM;
                font-weight: 500;
              }
            }
          }
        }
        .center-bottom {
          width: 100%;
          height: 0;
          flex: 288;
          background: url("../../assets/oa/myfqdlcs.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          padding-left: .35rem;
          .charts {
            width: 100%;
            height: calc(100% - 45px);
            margin-top: 45px;
          }
        }
      }
      .right {
        flex: 597;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: url("../../assets/oa/xyxl.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .right-top {
          flex: 319;
          width: 100%;
          height: 0;
          display: flex;
          flex-direction: column;
          .extra-title {
            margin-top: 60px;
            margin-left: auto;
            margin-right: auto;
            width: 2.3rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/oa/xyxl_img3.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            text-align: center;
            font-style: italic;
            font-family: "PingFang SC";
          }
          .ranking-view {
            width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: .38rem;
            padding-right: .36rem;
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
                justify-content: space-between;
              }
            }
            .ranking-item {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 2.24rem;
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
              background: url("../../assets/students/xslhzptop10_img1.png") no-repeat;
              background-size: 100% 100%;
              width: 100%;
              height: 2px;
              position: absolute;
              left: 0;
              bottom: -5px;
            }
          }
        }
        .right-center {
          flex: 290;
          width: 100%;
          height: 0;
          display: flex;
          flex-direction: column;
          .extra-title {
            margin-left: auto;
            margin-right: auto;
            width: 2.3rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/oa/xyxl_img3.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            text-align: center;
            font-style: italic;
            font-family: "PingFang SC";
          }
          .shuffling-view {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: .34rem;
            padding-right: .34rem;
            ::v-deep .el-carousel {
              height: 100%;
              .a {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding-bottom: 45px;
                .shuffling-item {
                  /*flex: 1;*/
                  width: calc((100% - 20px) / 3);
                  height: 96px;
                  background: url("../../assets/oa/xyxl_img4.png") no-repeat;
                  background-size: 100% 100%;
                  position: relative;
                  .label {
                    color: #92ADAD;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                    max-width: 1.1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #E9EDED;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #677A7A;
                    }
                  }
                  .icon {}
                }
                div.nice {
                  background: url("../../assets/oa/xyxl_img5.png") no-repeat;
                  background-size: 100% 100%;
                  .label {
                    color: #03ADAD;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #04E0E0;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #027A7A;
                    }
                  }
                  .icon {
                    width: 14px;
                    height: 18px;
                    background: url("../../assets/oa/xyxl_img6.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 17px;
                    right: 18px;
                  }
                }
                div.warning {
                  background: url("../../assets/oa/xyxl_img6(1).png") no-repeat;
                  background-size: 100% 100%;
                  .label {
                    color: #A35714;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #D6731A;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #703C0D;
                    }
                  }
                  .icon {
                    width: 18px;
                    height: 16px;
                    background: url("../../assets/oa/xyxl_img7.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 17px;
                    right: 18px;
                  }
                }
                .shuffling-item:nth-child(2) {
                  margin: 0 10px 10px 10px;
                }
                .shuffling-item:nth-child(5) {
                  margin: 0 10px 0 10px;
                }
              }
            }
          }
        }
        .right-bottom {
          flex: 290;
          width: 100%;
          height: 0;
          display: flex;
          flex-direction: column;
          .extra-title {
            margin-left: auto;
            margin-right: auto;
            width: 2.3rem;
            height: 20px;
            line-height: 20px;
            background: url("../../assets/oa/xyxl_img3.png") no-repeat;
            background-size: 100% 100%;
            color: #D2FAFA;
            font-size: 14px;
            text-align: center;
            font-style: italic;
            font-family: "PingFang SC";
          }
          .shuffling-view {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: .34rem;
            padding-right: .34rem;
            ::v-deep .el-carousel {
              height: 100%;
              .a {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding-bottom: 65px;
                .shuffling-item {
                  width: calc((100% - 20px) / 3);
                  height: 96px;
                  background: url("../../assets/oa/xyxl_img4.png") no-repeat;
                  background-size: 100% 100%;
                  position: relative;
                  .label {
                    color: #92ADAD;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                    max-width: 1.1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #E9EDED;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #677A7A;
                    }
                  }
                  .icon {}
                }
                div.nice {
                  background: url("../../assets/oa/xyxl_img5.png") no-repeat;
                  background-size: 100% 100%;
                  .label {
                    color: #03ADAD;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #04E0E0;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #027A7A;
                    }
                  }
                  .icon {
                    width: 14px;
                    height: 18px;
                    background: url("../../assets/oa/xyxl_img6.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 17px;
                    right: 18px;
                  }
                }
                div.warning {
                  background: url("../../assets/oa/xyxl_img6(1).png") no-repeat;
                  background-size: 100% 100%;
                  .label {
                    color: #A35714;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: 500;
                    margin-top: 20px;
                    margin-left: .2rem;
                    margin-bottom: 20px;
                  }
                  .value {
                    font-size: 24px;
                    font-family: DIN;
                    font-weight: 500;
                    margin-left: .2rem;
                    color: #D6731A;
                    & > span {
                      font-size: 12px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      color: #703C0D;
                    }
                  }
                  .icon {
                    width: 18px;
                    height: 16px;
                    background: url("../../assets/oa/xyxl_img7.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 17px;
                    right: 18px;
                  }
                }
                .shuffling-item:nth-child(2) {
                  margin: 0 10px 10px 10px;
                }
                .shuffling-item:nth-child(5) {
                  margin: 0 10px 0 10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
