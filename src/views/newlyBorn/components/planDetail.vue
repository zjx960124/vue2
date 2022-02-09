<template>
  <div class="plain-detail">
    <div class="plain-information">
      <div class="information-item">
        <div class="i">
          <span class="label">计划名称:</span>
          <span class="value">2022级新生入学缴费计划</span>
        </div>
        <div class="i">
          <span class="label">制定时间:</span>
          <span class="value">2022级新生入学缴费计划</span>
        </div>
        <div class="i">
          <span class="label">截至时间:</span>
          <span class="value">2022-01-06 18:18:18</span>
        </div>
      </div>
      <div class="information-item">
        <div class="i">
          <span class="label">缴费人数:</span>
          <span class="value">900</span>
        </div>
        <div class="i">
          <span class="label">应收金额:</span>
          <span class="value">900000</span>
        </div>
        <div class="i">
          <span class="label">实收金额:</span>
          <span class="value">700900</span>
        </div>
      </div>
      <div class="information-item">
        <div class="i">
          <span class="label">新生补充信息填报表单:</span>
          <span class="value">2021新生补充信息</span>
        </div>
        <div class="i">
          <span class="label">新生须知:</span>
          <span class="value">2022新生入学须知</span>
        </div>
      </div>
      <div class="information-item">
        <div class="i">
          <span class="label">计划进展:</span>
          <span class="value">
            <el-progress
              color="#587DFD"
              class="progress-view"
              :percentage="22"
            ></el-progress>
          </span>
        </div>
        <div class="i">
          <span class="label">计划进展:</span>
          <span class="value">进行中</span>
        </div>
      </div>
    </div>
    <div class="plain-table">
      <div class="search-view">
        <page-form
          ref="form"
          class="search-form"
          label-width="85px"
          label-position="right"
          :model="searchForm"
          size="big"
          :col-span="7"
          :fields="formFields"
        >
          <template slot="code" slot-scope="scope" class="slot">
            <el-select
              style="margin-right: 14px"
              class="label-select"
              v-model="scope.model.code"
            >
              <el-option
                v-for="(item, index) in scope.field.enums"
                :value="item.value"
                :label="item.label"
                :key="index"
              ></el-option>
            </el-select>
            <el-input v-model="scope.model.code"></el-input>
          </template>
        </page-form>
        <div class="btn-group">
          <el-button
            type="primary"
            icon="icon-yx-ss"
            size="big"
            class="primary-btn"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="icon-yx-chongzhi"
            size="big"
            class="primary-btn"
            >重置</el-button
          >
        </div>
      </div>
      <div class="operate-view">
        <el-button
          round
          type="primary"
          icon="icon-yx-jia"
          size="big"
          class="operate-btn btn-white"
          @click="importPayCost"
          >导入</el-button
        >
        <el-button
          round
          type="danger"
          icon="icon-yx-jian"
          size="big"
          style="box-shadow: 0 6px 6px 0 rgba(201, 6, 55, 0.2)"
          class="operate-btn"
          >停止</el-button
        >
      </div>
      <div class="icon-operate">
        <el-button
          round
          type="text"
          icon="icon-yx-shuaxin"
          size="big"
          class="text-btn"
          >刷新</el-button
        >
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
          @look="lookClick"
        >
          <template slot="enable" slot-scope="scope">
            <el-progress
              color="#587DFD"
              class="progress-view"
              :percentage="22"
            ></el-progress>
          </template>
        </page-table>
      </div>
      <div class="handle-view">
        <el-button
          type="primary"
          icon="icon-yx-fanhui"
          size="big"
          class="primary-btn"
          @click="returnPage"
          >返回</el-button
        >
      </div>
    </div>
    <el-dialog
      v-if="costTableFlag"
      title=""
      :visible.sync="costTableFlag"
      width="376px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      class="cost-table-dialog"
    >
      <div class="cost-table">
        <div class="cost-table-header">
          <div class="header-index">序号</div>
          <div class="header-label">缴费项名称</div>
          <div class="header-value">费用金额</div>
        </div>
        <div
          class="cost-table-item"
          v-for="(item, index) in costTableData"
          :key="index"
        >
          <div class="header-index">{{ index + 1 }}</div>
          <div class="header-label">{{ item.label }}</div>
          <div class="header-value">{{ item.value }}元</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-if="costPersonFlag"
      title="缴费人员明细"
      :visible.sync="costPersonFlag"
      width="1234px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      class="cost-table-dialog layout-person"
    >
      <title-layout class="person-title" title="基础信息">
        <div class="person-info">
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
          </div>
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
        </div>
      </title-layout>
      <title-layout class="person-title" title="资料补充">
        <div class="person-info">
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
          <div class="person-item">
            <div class="i">
              <span class="label">学生学号:</span>
              <span class="value">100112221</span>
            </div>
            <div class="i">
              <span class="label">入学年级:</span>
              <span class="value">2021</span>
            </div>
            <div class="i">
              <span class="label">学生性别:</span>
              <span class="value">男</span>
            </div>
          </div>
        </div>
      </title-layout>
      <title-layout class="person-title" title="缴费记录">
        <page-table
          ref="personPage"
          class="person-page"
          :fields="personTable.fields"
          type="index"
          :show-no="false"
          :data="personTable.data"
          :page="personTable.page"
          :operation="personTable.operation"
          :loading="personTable.loading"
          :multiple-selection.sync="personTable.multipleSelection"
          :operation-widths="personTable.operationWidths"
          :is-page="false"
        ></page-table>
      </title-layout>
    </el-dialog>
  </div>
</template>
<script>
import titleLayout from '@/components/titleLayout/titleLayout.vue';
import { operatePlan, billPageList } from '@/api/base';
export default {
  components: { titleLayout },
  name: 'PlanDetail',
  data() {
    return {
      searchForm: {
        name: '',
        rateCode: ''
      },
      formFields: {
        name: {
          name: '',
          slot: 'code',
          enums: [
            {
              label: '按姓名',
              value: 'name'
            }
          ]
        },
        rateCode: {
          name: '缴费状态',
          type: 'select'
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: "编号",
            key: "user",
          },
          {
            name: "操作者",
            key: "name",
          },
          {
            name: "操作日期",
            key: "name",
          },
          {
            name: "IP地址",
            key: "name",
          },
          {
            name: "记录",
            key: "name",
          },
          {
            name: '计划进展',
            key: 'name',
            slot: 'enable'
          }
        ],
        data: [
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
          {
            name: "1",
            user: "1",
          },
        ],
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
      costTableFlag: false,
      costTableData: [
        {
          label: '学费',
          value: '500'
        },
        {
          label: '学杂费',
          value: '0'
        }
      ],
      costPersonFlag: false,
      personTable: {
        fields: [
          {
            name: "订单单号",
            key: "name",
          },
          {
            name: "计划名称",
            key: "createTime",
          },
          {
            name: "缴费项目",
            key: "expirationTime",
          },
          {
            name: "缴费金额",
            key: "grade",
          },
          {
            name: "缴费方式",
            key: "planNumber",
          },
          {
            name: "交易完成时间",
            key: "payable",
            width: '130'
          },
          {
            name: "最后修改时间",
            key: "paidIn",
            width: '130'
          },
          {
            name: '缴费状态',
            key: 'paidInNumber',
          },
          {
            name: '说明',
            key: 'paidInNumber',
          },
          {
            name: '操作',
            key: 'paidInNumber',
          },
          {
            name: '操作人',
            key: 'paidInNumber',
          }
        ],
        data: [
          {
            name: '1'
          },
          {
            name: '1'
          },
          {
            name: '1'
          },
          {
            name: '1'
          },
          {
            name: '1'
          },
          {
            name: '1'
          },
          {
            name: '1'
          }
        ],
        loading: false,
        page: {
          index: 1,
          size: 10,
          total: 12,
        },
      }
    }
  },
  mounted() {
    this.$Bus.$on('detail', (res) => {
      this.getInfo(res);
    })
  },
  beforeDestroy() {
    this.$Bus.$off('detail');
  },
  methods: {
    lookClick() {
      // this.costTableFlag = true;
      this.costPersonFlag = true;
    },
    getList() { },
    getInfo(id) {
      // 详情
      operatePlan('GET', { id }).then((res) => {
        console.log(res);
      }).catch((err) => {
        this.$message.error(err.msg);
      })
      // 缴费列表
      let param = {
        pageNum: this.table.page.index,
        pageSize: this.table.page.size,
        name: this.searchForm.name
      }
      billPageList(param).then((res) => {
        console.log(res);
      })
    },
    pageChange() { },
    returnPage() {
      this.$Bus.$emit('ratePlan', { target: 'return' });
    },
    importPayCost() {
      this.$Bus.$emit('ratePlan', { target: 'PayCostPlan' });
    },
    handleClose() {
      // this.costTableFlag = false;
      this.costPersonFlag = false;
    }
  },
}
</script>
<style lang="scss" scoped>
.plain-detail {
  display: flex;
  flex: 1;
  height: 0;
  flex-direction: column;
  overflow-y: hidden;
  .plain-information {
    padding: 10px 0 30px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ebebf5;
    flex-shrink: 0;
    .information-item {
      margin-bottom: 30px;
      display: flex;
      height: fit-content;
      .i {
        color: #9c9ab4;
        font-size: 12px;
        min-width: 280px;
        text-align: left;
        line-height: 1;
        .label {
          margin-right: 8px;
        }
        .value {
          margin: 0;
          .progress-view {
            display: inline-block;
          }
        }
      }
    }
    .information-item:last-of-type {
      margin: 0;
    }
  }
  .plain-table {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 0;
    overflow-y: hidden;
    .search-view {
      height: 100px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      .search-form {
        flex: 1;
        width: 100%;
        ::v-deep .el-form {
          width: 100%;
          .el-form-item__content {
            display: flex;
            align-items: center;
          }
          .label-select {
            .el-input {
              height: 40px;
              .el-input__inner {
                width: 97px !important;
              }
            }
          }
        }
      }
      .btn-group {
        flex-shrink: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    .operate-view {
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 3px;
    }
    .icon-operate {
      font-size: 14px;
      line-height: 1;
      text-align: right;
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
        ::v-deep .el-progress__text {
          color: #9491b0;
          font-size: 12px !important;
        }
      }
    }
    .handle-view {
      height: 80px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .layout-person {
    ::v-deep .el-dialog {
      .el-dialog__header {
        border-bottom: 1px solid #ebebf5 !important;
      }
      .el-dialog__body {
        padding: 0 !important;
      }
      .el-dialog__headerbtn {
        right: 30px;
      }
    }
    .person-title {
      ::v-deep .header {
        height: 56px;
        line-height: 56px;
        border-bottom: none;
      }
    }
    .person-title:not(:first-of-type) {
      border-top: 1px solid #ebebf5;
    }
    .person-info {
      width: 100%;
      box-sizing: border-box;
      padding-left: 58px;
      .person-item {
        margin-bottom: 18px;
        display: flex;
        height: fit-content;
        .i {
          color: #9c9ab4;
          font-size: 12px;
          min-width: 280px;
          text-align: left;
          line-height: 1;
          .label {
            margin-right: 21px;
            min-width: 53px;
            text-align: right;
          }
          .value {
            margin: 0;
            .progress-view {
              display: inline-block;
            }
          }
        }
      }
    }
    .person-page {
      max-height: 220px;
      height: 220px;
      margin-bottom: 60px;
      border: 1px solid #d5d6e3;
      border-radius: 4px;
      div.table-view {
        height: 100%;
      }
      ::v-deep .el-table tr {
        th,
        td {
          height: 30px;
          padding: 0;
          background: #d5d6e3;
          border: none;
          text-overflow: ellipsis;
          overflow: hidden;
          word-wrap: normal;
        }
        td {
          background: #ffffff !important;
          border-bottom: 1px solid #d5d6e3;
        }
      }
    }
  }
  .cost-table-dialog {
    ::v-deep .el-dialog {
      .el-dialog__header {
        border-bottom: none;
      }
      .el-dialog__body {
        padding: 15px 0 40px;
      }
      .el-dialog__headerbtn {
        right: 30px;
      }
    }

    .cost-table {
      height: 324px;
      max-height: 324px;
      overflow-y: auto;
      border: 1px solid #d5d6e3;
      border-radius: 4px;
      .cost-table-header {
        height: 30px;
        background: #ecedf6;
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 600;
      }
      .cost-table-item {
        height: 30px;
        display: flex;
        align-items: center;
      }
      .header-index {
        width: 64px;
        color: #9c9ab4;
        text-align: center;
        font-size: 12px;
        margin-right: 20px;
      }
      .header-label {
        flex: 1;
        color: #9c9ab4;
        font-size: 12px;
      }
      .header-value {
        width: 84px;
        color: #9c9ab4;
        font-size: 12px;
      }
    }
  }
}
</style>
