<template>
  <div class="view-layout">
    <div class="search-view">
      <span>计划状态:</span>
      <div class="table-state-comp">
        <div
          class="state-item"
          :class="{ 'state-item-active': active === -1 }"
          @click="changeActive(-1)"
        >
          全部
        </div>
        <div
          class="state-item"
          :class="{ 'state-item-active': active === 0 }"
          @click="changeActive(0)"
        >
          准备中
        </div>
        <div
          class="state-item"
          :class="{ 'state-item-active': active === 1 }"
          @click="changeActive(1)"
        >
          进行中
        </div>
        <div
          class="state-item"
          :class="{ 'state-item-active': active === 2 }"
          @click="changeActive(2)"
        >
          已完成
        </div>
        <div
          class="state-item"
          :class="{ 'state-item-active': active === 3 }"
          @click="changeActive(3)"
        >
          停止
        </div>
      </div>
    </div>
    <div class="table-view">
      <div class="operate-view">
        <el-button
          round
          type="primary"
          icon="icon-yx-jia"
          size="big"
          class="operate-btn btn-white"
          @click="activeCreateNewlyBornPlan"
          >新建</el-button
        >
        <el-button
          round
          type="danger"
          icon="icon-yx-jian"
          size="big"
          style="box-shadow: 0 6px 6px 0 rgba(201, 6, 55, 0.2)"
          class="operate-btn"
          @click="batchStop"
          >停止</el-button
        >
        <div class="icon-operate">
          <el-button
            round
            type="text"
            icon="icon-yx-shuaxin"
            size="big"
            class="text-btn"
            @click="getList"
            >刷新</el-button
          >
        </div>
      </div>
      <div class="table-main">
        <page-table
          ref="tablePage"
          :fields="table.fields"
          type="selection"
          :show-no="false"
          :data="table.data"
          :page="table.page"
          :operation="table.operation"
          :loading="table.loading"
          :multiple-selection.sync="table.multipleSelection"
          :operation-widths="table.operationWidths"
          @page-change="getList"
          @look="activePlainDetail"
        >
          <template slot="enable" slot-scope="scope">
            <el-progress
              color="#587DFD"
              class="progress-view"
              :percentage="computedProgress(scope)"
            ></el-progress>
          </template>
          <template slot="planStatus" slot-scope="scope">
            <div>{{ statusDesp(scope.row.planStatus) }}</div>
          </template>
        </page-table>
      </div>
    </div>
    <div
      v-show="operateFlag"
      class="operate-dialog"
      id="operateDialogMoment"
    ></div>
  </div>
</template>
<script>
import titleLayout from '@/components/titleLayout/titleLayout.vue'
import CreateNewlyBornPlan from './components/createNewlyBornPlan.vue'
import PlanDetail from './components/planDetail.vue'
import Vue from 'vue'
import PayCostPlan from './components/payCostPlan.vue'
import { getPlanList, operatePlan, startPlan, closePlan } from '@/api/base'
export default {
  components: { titleLayout },
  name: 'RatePlan',
  data() {
    return {
      table: {
        multipleSelection: [],
        fields: [
          {
            name: "缴费计划名称",
            key: "name",
          },
          {
            name: "制定时间",
            key: "createTime",
          },
          {
            name: "截止时间",
            key: "expirationTime",
          },
          {
            name: "所属年级",
            key: "grade",
          },
          {
            name: "人数",
            key: "planNumber",
          },
          {
            name: "应缴费用",
            key: "payable",
          },
          {
            name: "实缴费用",
            key: "paidIn",
          },
          {
            name: '计划进展',
            key: 'paidInNumber',
            slot: 'enable'
          },
          {
            name: '计划状态',
            key: 'planStatus',
            slot: 'planStatus'
          }
        ],
        data: [],
        loading: false,
        page: {
          index: 1,
          size: 10,
          total: 12,
        },
        operationWidths: 260,
        operation: [
          { name: "查看", key: "look", color: "#587DFD" }
        ],
      },
      operateFlag: false,
      dynamicComp: null,
      active: -1
    }
  },
  mounted() {
    this.getList()
    this.$Bus.$on("ratePlan", (res) => {
      if (res.target === 'return') {
        document.getElementById('operateDialogMoment').removeChild(this.dynamicComp.$el);
        this.dynamicComp = null;
        this.operateFlag = false;
      }
      if (res.target === 'PayCostPlan') this.activePayCostPlan();
    });
  },
  beforeDestroy() {
    this.dynamicComp = null;
    this.operateFlag = false;
    this.$Bus.$off('ratePlan');
  },
  methods: {
    getList() {
      let param = {
        planStatus: this.active >= 0 ? this.active : '',
        pageNum: this.table.page.index,
        pageSize: this.table.page.size
      };
      getPlanList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    changeActive(active) {
      this.active = active;
      this.getList();
    },
    activeCreateNewlyBornPlan() {
      this.renderComp(CreateNewlyBornPlan)
    },
    activePlainDetail(data) {
      this.renderComp(PlanDetail);
      this.$nextTick(() => {
        this.$Bus.$emit('detail', data.id);
      })
    },
    activePayCostPlan() {
      this.renderComp(PayCostPlan)
    },
    renderComp(comp) {
      this.operateFlag = true;
      let PayCostPlanComp = Vue.extend(comp);
      const component = new PayCostPlanComp().$mount();
      this.dynamicComp && document.getElementById('operateDialogMoment').removeChild(this.dynamicComp.$el);
      document.getElementById('operateDialogMoment').appendChild(component.$el);
      this.dynamicComp = component;
    },
    computedProgress(data) {
      if (!data.row.planNumber || data.row.planNumber <= 0) return 0
      let result = parseInt(data.row.planNumber / data.row.paidInNumber)
      return isNaN(result) ? 0 : result
    },
    batchStop() {
      let data = this.$refs.tablePage.multipleSelection;
      data.length && closePlan({ id: '' + data.map(item => item.id) }).then((res) => {
        if (res.code === '200') {
          this.$message.success(res.msg);
        } else {
          this.$message.erroe(res.msg);
        }
        this.getList();
      }).catch((err) => {
        this.$message.error(err.msg);
      })
    },
    statusDesp(status) {
      return ['准备中', '进行中', '已完成', '停止'][status]
    }
  },
}
</script>
<style lang="scss" scoped>
.view-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  .search-view {
    height: 80px;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    font-size: 16px;
    color: #9c9ab4;
    margin-right: 20px;
    .table-state-comp {
      width: 493px;
      height: 40px;
      background: #ffffff;
      border-radius: 20px;
      margin-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .state-item {
        width: 66px;
        height: 26px;
        border-radius: 13px;
        background: #ffffff;
        text-align: center;
        color: #9c9ab4;
        font-size: 14px;
        line-height: 26px;
        cursor: pointer;
      }
      .state-item-active {
        background: #587dfd;
        color: #ffffff;
      }
      .state-item:hover {
        background: #587dfd;
        color: #ffffff;
      }
    }
  }
  .table-view {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    .operate-view {
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 3px;
      position: relative;
      margin-bottom: 20px;
      .icon-operate {
        position: absolute;
        right: 20px;
        bottom: -25px;
        font-size: 14px;
        line-height: 1;
        text-align: right;
      }
    }
    .table-main {
      flex: 1;
      height: 0;
      overflow-y: hidden;
      .progress-view {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 7px;
        justify-content: center;
        ::v-deep .el-progress__text {
          color: #9491b0;
          font-size: 12px !important;
        }
      }
    }
  }
  .operate-dialog {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: calc(100% - 30px);
    background: #f6f6fa;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    overflow-y: auto;
  }
}
</style>
