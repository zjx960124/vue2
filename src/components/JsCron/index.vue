<template>
  <div>
    <el-tabs type="border-card" class="jsCron-tabs">
      <el-tab-pane label="秒">
        <JsCronSecond
          ref="cronsecond"
          :check="checkNumber"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="分钟">
        <JsCronMin
          ref="cronmin"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="小时">
        <JsCronHour
          ref="cronhour"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="日">
        <JsCronDay
          ref="cronday"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="月">
        <JsCronMonth
          ref="cronmonth"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="周">
        <JsCronWeek
          ref="cronweek"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>

      <el-tab-pane label="年">
        <JsCronYear
          ref="cronyear"
          :check="checkNumber"
          :cron="jsCronValueObj"
          @update="updateContabValue"
        />
      </el-tab-pane>
    </el-tabs>

    <div class="popup-main">
      <div v-if="showExpression" class="popup-result">
        <p class="title">时间表达式</p>
        <table>
          <thead>
            <th v-for="item of tabTitles" :key="item" width="40">{{ item }}</th>
            <th>完整表达式</th>
          </thead>
          <tbody>
            <td>
              <span>{{ jsCronValueObj.second }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.min }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.hour }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.day }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.month }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.week }}</span>
            </td>
            <td>
              <span>{{ jsCronValueObj.year }}</span>
            </td>
            <td>
              <span>{{ contabValueString }}</span>
            </td>
          </tbody>
        </table>
      </div>
      <JsCronResult v-if="showResult" :ex="contabValueString" />

      <div class="pop_btn">
        <el-button size="small" @click="clearCron">重 置</el-button>
        <el-button size="small" @click="hidePopup">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submitFill"
        >确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import JsCronSecond from './JsCron-Second.vue'
import JsCronMin from './JsCron-Min.vue'
import JsCronHour from './JsCron-Hour.vue'
import JsCronDay from './JsCron-Day.vue'
import JsCronMonth from './JsCron-Month.vue'
import JsCronWeek from './JsCron-Week.vue'
import JsCronYear from './JsCron-Year.vue'
import JsCronResult from './JsCron-Result.vue'

export default {
  name: 'JsCron',
  components: {
    JsCronSecond,
    JsCronMin,
    JsCronHour,
    JsCronDay,
    JsCronMonth,
    JsCronWeek,
    JsCronYear,
    JsCronResult
  },
  props: {
    // 反解析
    expression: {
      type: String,
      default: ''
    },
    // 是否展示最近查询结果
    showResult: {
      type: Boolean,
      default: false
    },
    // 是否展示结果表达式
    showExpression: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tabTitles: ['秒', '分钟', '小时', '日', '月', '周', '年'],
      tabActive: 0,
      myindex: 0,
      jsCronValueObj: {
        second: '*',
        min: '*',
        hour: '*',
        day: '*',
        month: '*',
        week: '?',
        year: ''
      }
    }
  },
  computed: {
    contabValueString: function () {
      const obj = this.jsCronValueObj
      const str =
        obj.second +
        ' ' +
        obj.min +
        ' ' +
        obj.hour +
        ' ' +
        obj.day +
        ' ' +
        obj.month +
        ' ' +
        obj.week +
        (obj.year == '' ? '' : ' ' + obj.year)
      return str
    }
  },
  watch: {
    expression: 'resolveExp'
  },
  // mounted: function () {
  //   this.resolveExp();
  // },
  methods: {
    resolveExp() {
      // 反解析 表达式
      if (this.expression) {
        const arr = this.expression.split(' ')
        arr
        if (arr.length >= 6) {
          // 6 位以上是合法表达式
          const obj = {
            second: arr[0],
            min: arr[1],
            hour: arr[2],
            day: arr[3],
            month: arr[4],
            week: arr[5],
            year: arr[6] ? arr[6] : ''
          }
          for (const i in obj) {
            if (obj[i]) this.changeRadio(i, obj[i])
          }
        }
      } else {
        // 没有传入的表达式 则还原
        this.clearCron()
      }
    },
    // tab切换值
    tabCheck(index) {
      this.tabActive = index
    },
    // 由子组件触发，更改表达式组成的字段值
    updateContabValue(name, value, from) {
      'updateContabValue', name, value, from
      this.jsCronValueObj[name] = value
      if (from && from !== name) {
        `来自组件 ${from} 改变了 ${name} ${value}`
        this.changeRadio(name, value)
      }
    },
    // 赋值到组件
    changeRadio(name, value) {
      const arr = ['second', 'min', 'hour', 'month']
      const refName = 'cron' + name
      let insVlaue

      if (arr.includes(name)) {
        if (value === '*') {
          insVlaue = 1
        } else if (value.indexOf('-') > -1) {
          const indexArr = value.split('-')
          isNaN(indexArr[0])
            ? (this.$refs[refName].cycle01 = 0)
            : (this.$refs[refName].cycle01 = indexArr[0])
          this.$refs[refName].cycle02 = indexArr[1]
          insVlaue = 2
        } else if (value.indexOf('/') > -1) {
          const indexArr = value.split('/')
          isNaN(indexArr[0])
            ? (this.$refs[refName].average01 = 0)
            : (this.$refs[refName].average01 = indexArr[0])
          this.$refs[refName].average02 = indexArr[1]
          insVlaue = 3
        } else {
          insVlaue = 4
          this.$refs[refName].checkboxList = value.split(',')
        }
      } else if (name == 'day') {
        if (value === '*') {
          insVlaue = 1
        } else if (value == '?') {
          insVlaue = 2
        } else if (value.indexOf('-') > -1) {
          const indexArr = value.split('-')
          isNaN(indexArr[0])
            ? (this.$refs[refName].cycle01 = 0)
            : (this.$refs[refName].cycle01 = indexArr[0])
          this.$refs[refName].cycle02 = indexArr[1]
          insVlaue = 3
        } else if (value.indexOf('/') > -1) {
          const indexArr = value.split('/')
          isNaN(indexArr[0])
            ? (this.$refs[refName].average01 = 0)
            : (this.$refs[refName].average01 = indexArr[0])
          this.$refs[refName].average02 = indexArr[1]
          insVlaue = 4
        } else if (value.indexOf('W') > -1) {
          const indexArr = value.split('W')
          isNaN(indexArr[0])
            ? (this.$refs[refName].workday = 0)
            : (this.$refs[refName].workday = indexArr[0])
          insVlaue = 5
        } else if (value === 'L') {
          insVlaue = 6
        } else {
          this.$refs[refName].checkboxList = value.split(',')
          insVlaue = 7
        }
      } else if (name == 'week') {
        if (value === '*') {
          insVlaue = 1
        } else if (value == '?') {
          insVlaue = 2
        } else if (value.indexOf('-') > -1) {
          const indexArr = value.split('-')
          isNaN(indexArr[0])
            ? (this.$refs[refName].cycle01 = 0)
            : (this.$refs[refName].cycle01 = indexArr[0])
          this.$refs[refName].cycle02 = indexArr[1]
          insVlaue = 3
        } else if (value.indexOf('#') > -1) {
          const indexArr = value.split('#')
          isNaN(indexArr[0])
            ? (this.$refs[refName].average01 = 1)
            : (this.$refs[refName].average01 = indexArr[0])
          this.$refs[refName].average02 = indexArr[1]
          insVlaue = 4
        } else if (value.indexOf('L') > -1) {
          const indexArr = value.split('L')
          isNaN(indexArr[0])
            ? (this.$refs[refName].weekday = 1)
            : (this.$refs[refName].weekday = indexArr[0])
          insVlaue = 5
        } else {
          this.$refs[refName].checkboxList = value.split(',')
          insVlaue = 7
        }
      } else if (name == 'year') {
        if (value == '') {
          insVlaue = 1
        } else if (value == '*') {
          insVlaue = 2
        } else if (value.indexOf('-') > -1) {
          insVlaue = 3
        } else if (value.indexOf('/') > -1) {
          insVlaue = 4
        } else {
          this.$refs[refName].checkboxList = value.split(',')
          insVlaue = 5
        }
      }
      this.$refs[refName].radioValue = insVlaue
    },
    // 表单选项的子组件校验数字格式（通过-props传递）
    checkNumber(value, minLimit, maxLimit) {
      // 检查必须为整数
      value = Math.floor(value)
      if (value < minLimit) {
        value = minLimit
      } else if (value > maxLimit) {
        value = maxLimit
      }
      return value
    },
    // 隐藏弹窗
    hidePopup() {
      // 清除表单
      this.$refs['cronsecond'].clearForm()
      this.$refs['cronmin'].clearForm()
      this.$refs['cronhour'].clearForm()
      this.$refs['cronday'].clearForm()
      this.$refs['cronmonth'].clearForm()
      this.$refs['cronyear'].clearForm()
      this.$emit('hide')
    },
    // 填充表达式
    submitFill() {
      this.$emit('fill', this.contabValueString)
      this.hidePopup()
    },
    // 还原选择项
    clearCron() {
      this.jsCronValueObj = {
        second: '*',
        min: '*',
        hour: '*',
        day: '*',
        month: '*',
        week: '?',
        year: ''
      }
      for (const j in this.jsCronValueObj) {
        this.changeRadio(j, this.jsCronValueObj[j])
      }
    }
  }
}
</script>
<style lang="scss">
.jsCron-tabs {
  height: 440px;
  .el-tabs--border-card > .el-tabs__content {
    padding: 15px 10px;
  }
  .el-form-item {
    padding: 0 5px;
  }
}
.pop_btn {
  text-align: center;
  margin-top: 20px;
}
.popup-main {
  position: relative;
  margin: 10px auto;
  background: #fff;
  border-radius: 5px;
  font-size: 12px;
  overflow: hidden;
}
.popup-title {
  overflow: hidden;
  line-height: 34px;
  padding-top: 6px;
  background: #f2f2f2;
}
.popup-result {
  box-sizing: border-box;
  line-height: 24px;
  margin: 25px auto;
  padding: 15px 10px 10px;
  border: 1px solid #ccc;
  position: relative;
}
.popup-result .title {
  position: absolute;
  top: -28px;
  left: 50%;
  width: 140px;
  font-size: 14px;
  margin-left: -70px;
  text-align: center;
  line-height: 30px;
  background: #fff;
}
.popup-result table {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.popup-result table thead th {
  text-align: center;
}
.popup-result table span {
  display: block;
  width: 100%;
  font-family: arial;
  line-height: 30px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}
.popup-result-scroll {
  font-size: 12px;
  line-height: 24px;
  height: 10em;
  overflow-y: auto;
}
</style>
