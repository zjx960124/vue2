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
      ></page-form>
      <div class="btn-group">
        <el-button
          type="primary"
          icon="icon-yx-ss"
          size="big"
          class="primary-btn"
          @click="getList"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="icon-yx-chongzhi"
          size="big"
          class="primary-btn"
          @click="resetList"
          >重置</el-button
        >
      </div>
    </div>
    <div class="table-view">
      <div class="operate-view">
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
          @del="deleClick"
        >
        </page-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getOperateLogList, operateLogDelete } from '@/api/base'
export default {
  name: "User",
  data() {
    return {
      searchForm: {
        date: "",
        userName: "",
      },
      formFields: {
        userName: {
          name: "操作人员",
        },
        date: {
          name: "操作日期",
          type: 'date',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: "编号",
            key: "id",
          },
          {
            name: "操作者",
            key: "userName",
          },
          {
            name: "操作日期",
            key: "time",
          },
          {
            name: "IP地址",
            key: "ip",
          },
          {
            name: "记录",
            key: "record",
          },
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
          { name: "删除", key: "del", color: "#FF0041", hasPopconfirm: true },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() { },
  methods: {
    getList() {
      let param = {
        ...this.searchForm,
        pageNum: this.table.page.index,
        pageSize: this.table.page.size
      };
      getOperateLogList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    resetList() {
      this.table.page.index = 1;
      this.table.page.size = 10;
      this.searchForm.userName = '';
      this.searchForm.date = '';
      this.getList();
    },
    deleClick(data) {
      operateLogDelete({ operationLogId: data.id }).then((res) => {
        if (res.code === '200') {
          this.$message.success(res.msg);
        } else {
          this.$message.erroe(res.msg);
        }
        this.getList();
      }).catch((err) => {
        this.$message.error(err.message);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.view-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .search-view {
    height: 80px;
    padding-top: 20px;
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
      height: 50px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .table-main {
      flex: 1;
      height: 0;
      overflow-y: hidden;
    }
  }
}
</style>