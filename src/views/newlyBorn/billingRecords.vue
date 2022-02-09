<template>
  <div class="view-layout">
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
            style="width: 97px; margin-right: 14px"
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
    <div class="table-view">
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
    </div>
  </div>
</template>
<script>
import titleLayout from '@/components/titleLayout/titleLayout.vue'
import { billingPageList } from '@/api/base'
export default {
  components: { titleLayout },
  name: 'BillingRecords',
  data() {
    return {
      searchForm: {
        code: '',
        rateCode: '',
        orderCode: ''
      },
      formFields: {
        code: {
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
          name: '支付单号',
        },
        orderCode: {
          name: '订单号',
          labelWidth: '75'
        }
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
      },
      operateFlag: false,
    }
  },
  mounted() {
    this.billingPageList();
  },
  methods: {
    getList() { },
    billingPageList() {
      let param = {
        pageNum: this.table.page.index,
        pageSize: this.table.page.size,
      }
      billingPageList(param).then((res) => {
        console.log(res);
      })
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
        .el-form-item__content .el-select .el-input {
          width: 97px;
          height: 40px;
          .el-input__inner {
            width: 100% !important;
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
    width: 100%;
    height: 100%;
  }
}
</style>