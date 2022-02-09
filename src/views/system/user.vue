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
      width="696px"
      :before-close="handleClose"
      class="create-dialog"
    >
      <div class="create-user-view">
        <div class="left">
          <page-form
            ref="createForm"
            class="create-form"
            label-width="68px"
            label-position="right"
            :model="createForm"
            size="big"
            :col-span="24"
            :fields="createFields"
            @change="createFormChange"
          ></page-form>
        </div>
        <div class="center checkbox-container">
          <div class="checkbox-header">角色</div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="checkList" @change="roleGroupChange">
              <el-checkbox
                v-for="item in roleList"
                :label="item.roleCode"
                :key="item.roleCode"
                >{{ item.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div class="right checkbox-container">
          <div class="checkbox-header">拥有权限</div>
          <div class="checkbox-group">
            <div
              v-for="item in resourceList"
              :label="item.resourceCode"
              :key="item.resourceCode"
            >
              {{ item.resourceName }}
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span @click="handleClose">取 消</span>
        <span type="primary" @click="submitCreate">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getAllRole, UserRelevanceRole, getRoleResource, operateUser, deleteUser, getDeptList } from '@/api/base';
import store from '@/store'
export default {
  name: 'User',
  data() {
    return {
      searchForm: {
        name: '',
        roleCode: '',
      },
      formFields: {
        name: {
          name: '用户名称',
        },
        roleCode: {
          name: '角色',
          labelWidth: '50'
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: '账户',
            key: 'userName',
          },
          {
            name: '姓名',
            key: 'name',
          },
          {
            name: '手机号',
            key: 'phone'
          },
          {
            name: '部门',
            key: 'deptName'
          },
          {
            name: '角色',
            key: 'roleNames'
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
          { name: '删除', key: 'del', color: '#FF0041', hasPopconfirm: true },
          {
            name: '重置密码',
            key: 'reset',
            color: '#B8B5D3',
            hasPopconfirm: true,
          },
        ],
      },
      createDialog: false,
      dialogTitle: '新增',
      createForm: {
        deptCode: '',
        roleCode: '',
        userName: '',
        name: '',
        phone: '',
        password: '',
      },
      createFields: {
        deptCode: {
          name: '所属部门',
          type: 'treeSelect',
          enums: store.getters.dept,
          onlyLast: true,
          nodeKey: 'deptCode',
          props: {
            label: 'deptName',
            children: 'children',
          }
        },
        roleCode: {
          name: '所属角色',
          disabled: true
        },
        userName: {
          name: '账户',
          rules: [{ required: true, message: '请输入账户', trigger: 'blur' }]
        },
        name: {
          name: '姓名',
          rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
        phone: {
          name: '手机号',
        },
        password: {
          name: '初始密码',
          type: 'password',
          rules: [{ required: true, message: '请输入初始密码', trigger: 'blur' }]
        }
      },
      checkList: [],
      deptList: store.getters.dept,
      roleList: [],
      resourceList: [],
      resource: []
    };
  },
  mounted() { },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let param = {
        ...this.searchForm,
        pageNum: this.table.page.index,
        pageSize: this.table.page.size
      };
      getUserList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    resetList() {
      this.table.page.index = 1;
      this.table.page.size = 10;
      this.searchForm.name = '';
      this.searchForm.roleCode = '';
      this.getList();
    },
    createClick() {
      this.dialogTitle = '新增';
      this.validateOption();
      this.createDialog = true;
    },
    handleClose() {
      this.resourceList = [];
      this.checkList = [];
      this.createForm = {
        deptCode: '',
        roleCode: '',
        userName: '',
        name: '',
        phone: '',
        password: '',
      };
      this.createDialog = false;
    },
    validateOption() {
      return new Promise((resolve, reject) => {
        if (!this.deptList.length || !this.roleList.length) {
          Promise.all([store.dispatch('info/setDept'), getAllRole({ appCode: 'enrollment' })]).then(([res1, res2]) => {
            this.deptList = res1;
            this.createFields.deptCode.enums = res1;
            this.roleList = res2.data.role;
            resolve('1')
          })
        } else {
          resolve('2')
        }
      })
    },
    createFormChange(value) {
      console.log(value);
      value.deptCode && (this.createForm.deptCode = value.deptCode);
    },
    roleGroupChange(value) {
      this.createForm.roleCode = value.toString();
      this.getResourceList(value.toString());
    },
    getResourceList(value) {
      getRoleResource({ roleCode: value, appCode: 'enrollment' }).then((res) => {
        this.resourceList = res.data;
      })
    },
    submitCreate() {
      this.$refs.createForm.$refs.form.validate(async (valid) => {
        if (valid) {
          let paramsUser = {
            ...this.createForm
          }
          let method = this.dialogTitle === '新增' ? 'post' : 'put';
          if (method === 'put') {
            delete paramsUser.userNames;
            delete paramsUser.roleNames;
            delete paramsUser.roleCodes;
          }
          console.log(paramsUser);
          // return
          let a = await operateUser(method, paramsUser), b;
          a.code === '200'
            &&
            (b = await UserRelevanceRole({ userName: this.createForm.userName, roleCode: this.createForm.roleCode }))
            || this.$message.error(a.msg);
          if (b.code && b.code === '200') {
            this.$message.success(b.msg);
            this.handleClose();
            this.getList();
          }
        } else {
        }
      })
    },
    batchDelete() {
      let data = this.$refs.tablePage.multipleSelection;
      data.length && operateUser('DELETE', { userId: '' + data.map(item => item.id) }).then((res) => {
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
    async editClick(value) {
      this.createForm = { ...value };
      this.createForm.roleCode = this.createForm.roleCodes.toString();
      this.createForm.userId = value.id;
      this.checkList = value.roleCodes;
      let validation = await this.validateOption();
      if (validation) {
        console.log(this.createForm);
        this.dialogTitle = '修改';
        this.createDialog = true;
        this.$nextTick(() => {
          this.$refs.createForm.$refs.form.$children[0].$children[0].$refs.tree.setKey(value.deptCode || '');
        })
      }

    },
    deleClick(data) {
      operateUser('DELETE', { userId: data.id }).then((res) => {
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
    .create-user-view {
      min-height: 238px;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        width: 0;
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
      .center {
        flex: 1;
        width: 0;
        border-radius: 4px;
        border: 1px solid #d5d6e3;
      }
      .right {
        flex: 1;
        width: 0;
        border-radius: 4px;
        border: 1px solid #d5d6e3;
        margin-left: 5px;
      }
      .checkbox-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-height: 238px;
        .checkbox-header {
          background: #ecedf6;
          border-bottom: 1px solid #d5d6e3;
          color: #9c9ab4;
          text-align: center;
          line-height: 28px;
          height: 28px;
          flex-shrink: 0;
        }
        .checkbox-group {
          flex: 1;
          height: 0;
          width: 100%;
          padding: 10px;
          color: #9c9ab4;
          .el-checkbox-group {
            display: flex;
            flex-direction: column;
            ::v-deep .el-checkbox__label {
              color: #9c9ab4;
            }
          }
        }
      }
    }
  }
}
</style>
