<template>
  <div class="view-layout">
    <div class="search-view">
      <page-form
        ref="form"
        class="search-form"
        label-width="100px"
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
          type="primary"
          icon="icon-yx-jia"
          size="big"
          class="operate-btn btn-white"
          @click="createClick"
          >新建</el-button
        >
        <el-button
          round
          type="danger"
          icon="icon-yx-jian"
          size="big"
          style="box-shadow: 0 6px 6px 0 rgba(201, 6, 55, 0.2)"
          class="operate-btn"
          @click="batchDelete"
          >删除</el-button
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
          @edit="editClick"
          @del="deleClick"
          @reset="resetClick"
        >
        </page-table>
      </div>
    </div>
    <el-dialog
      v-if="createDialog"
      :title="dialogTitle"
      :visible.sync="createDialog"
      width="376px"
      :before-close="handleClose"
      class="create-dialog"
    >
      <page-form
        ref="createForm"
        class="create-form"
        label-width="83px"
        label-position="right"
        :model="createForm"
        size="big"
        :col-span="24"
        :fields="createFields"
      ></page-form>
      <div slot="footer" class="dialog-footer">
        <span @click="handleClose">取 消</span>
        <span type="primary" @click="submitCreate">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDictionaryList, getCatalogueList, operateDictionary } from '@/api/base'
export default {
  name: 'Dictionary',
  data() {
    return {
      searchForm: {
        catalogueCode: '',
        dictionaryName: '',
      },
      formFields: {
        dictionaryName: {
          name: '字典项名称',
        },
        catalogueCode: {
          name: '字段目录',
          type: 'select',
          props: {
            label: 'catalogueName',
            value: 'catalogueCode'
          },
          enums: [],
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: '字典大类',
            key: 'catalogueCode'
          },
          {
            name: '字典项名称',
            key: 'dictionaryName',
          },
          {
            name: '字典项代号',
            key: 'dictionaryCode',
          },
          {
            name: '备注',
            key: 'text',
          },
          {
            name: '最后修改时间',
            key: 'updateTime',
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
          { name: '修改', key: 'edit', color: '#587DFD' },
          { name: '删除', key: 'del', color: '#FF0041', hasPopconfirm: true }
        ],
      },
      createDialog: false,
      dialogTitle: '新增',
      createForm: {
        dictionaryName: '',
        dictionaryCode: '',
        catalogueCode: '',
        text: ''
      },
      createFields: {
        catalogueCode: {
          name: '字典大类',
          type: 'select',
          props: {
            label: 'catalogueName',
            value: 'catalogueCode'
          },
          enums: []
        },
        dictionaryName: {
          name: '字典项名称',
          rules: [{ required: true, message: '请输入字典项名称', trigger: 'blur' }]
        },
        dictionaryCode: {
          name: '字典项代码',
          disabled: false,
          rules: [{ required: true, message: '请输入字典项代码', trigger: 'blur' }]
        },
        text: {
          name: '备注',
          type: 'input'
        }
      }
    };
  },
  mounted() { },
  created() {
    this.getList();
    this.getCatalogue();
  },
  methods: {
    getList() {
      let param = {
        ...this.searchForm,
        pageNum: this.table.page.index,
        pageSize: this.table.page.size
      };
      getDictionaryList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    getCatalogue() {
      getCatalogueList().then((res) => {
        this.formFields.catalogueCode.enums = res.data;
        this.createFields.catalogueCode.enums = res.data;
      })
    },
    resetList() {
      this.table.page.index = 1;
      this.table.page.size = 10;
      this.searchForm.catalogueCode = '';
      this.searchForm.dictionaryName = '';
      this.getList();
    },
    editClick(data) {
      this.dialogTitle = '修改';
      this.createFields.dictionaryCode.disabled = true;
      this.createForm = data;
      this.createDialog = true;
    },
    deleClick(data) {
      operateDictionary('DELETE', { dictionaryId: data.id }).then((res) => {
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
    resetList() {
      this.table.page.index = 1;
      this.table.page.size = 10;
      this.searchForm.catalogueCode = '';
      this.searchForm.dictionaryName = '';
      this.getList();
    },
    batchDelete() {
      let data = this.$refs.tablePage.multipleSelection;
      data.length && operateDictionary('DELETE', { dictionaryId: '' + data.map(item => item.id) }).then((res) => {
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
    resetClick() { },
    createClick() {
      this.dialogTitle = '新增';
      this.createFields.dictionaryCode.disabled = false;
      this.createDialog = true;
    },
    handleClose() {
      this.createForm = {
        dictionaryName: '',
        dictionaryCode: '',
        catalogueCode: '',
        text: ''
      };
      this.createDialog = false;
    },
    submitCreate() {
      this.$refs.createForm.$refs.form.validate((valid) => {
        if (valid) {
          let param = {
            ...this.createForm
          }
          let method = this.dialogTitle === '新增' ? 'post' : 'put';
          method === 'put' && delete param.dictionaryCode;
          operateDictionary(method, param).then((res) => {
            res.code === '200' ? this.$message.success('添加成功') : this.$message.error(res.msg);
            this.handleClose();
            this.getList();
          }).catch((err) => {
            this.$message.error('添加失败');
            this.handleClose();
            this.getList();
          })
        } else {
        }
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
      height: 80px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 3px;
    }
    .table-main {
      flex: 1;
      height: 0;
      overflow-y: hidden;
    }
  }
  .create-dialog {
    ::v-deep .el-dialog__headerbtn {
      right: 30px;
    }
    .create-form {
      width: 100%;
      ::v-deep .el-form-item__label {
        font-size: 12px;
        padding-right: 9px;
      }
      ::v-deep .el-col + .el-col {
        margin-left: 0;
        margin-top: 14px;
      }
      ::v-deep .el-form-item {
        margin-right: 0;
        .el-form-item__label {
          line-height: 28px;
        }
        .el-form-item__content {
          line-height: 28px;
          padding-right: 15px;
        }
        .el-input__inner {
          width: 100%;
          height: 28px;
        }
      }
      ::v-deep .el-select__caret {
        line-height: 28px;
      }
    }
  }
}
</style>