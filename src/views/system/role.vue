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
          @click="createRole"
          >新建</el-button
        >
        <el-button
          round
          type="danger"
          icon="icon-yx-jian"
          size="big"
          style="box-shadow: 0 6px 6px 0 rgba(201, 6, 55, 0.2)"
          class="operate-btn"
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
          <template slot="enable" slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#587DFD"
              inactive-color="#C3C2D2"
              active-value="1"
              inactive-value="0"
              @change="(value) => switchClick(value, scope)"
            >
            </el-switch>
          </template>
        </page-table>
      </div>
    </div>
    <div v-if="operateFlag" class="operate-dialog">
      <div class="operate-search-view">
        <page-form
          ref="operateForm"
          class="search-form"
          label-width="100px"
          label-position="right"
          :model="operateForm"
          size="big"
          :col-span="7"
          :fields="operateFields"
          @change="operateFormInput"
        ></page-form>
      </div>
      <div class="check-form">
        <template v-for="(item, index) in businessList">
          <div class="business-group" :key="index">
            <el-checkbox-group
              v-model="checkedBusiness"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                :indeterminate="isIndeterminate"
                :label="item.resourceCode"
                @change="($event) => handleCheckAllChange($event, index)"
                class="check-header"
                >{{ item.resourceName }}</el-checkbox
              >
              <el-checkbox
                v-for="(items, indexs) in item.children"
                :label="items.resourceCode"
                :key="indexs"
                >{{ items.resourceName }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </template>
      </div>
      <div class="handle-view">
        <el-button
          type="primary"
          icon="icon-yx-tijiao"
          size="big"
          class="primary-btn"
          @click="submitForm"
          >提交</el-button
        >
        <el-button
          type="primary"
          icon="icon-yx-chongzhi"
          size="big"
          class="plain-btn"
          @click="resetOperate"
          >重填</el-button
        >
        <el-button
          type="primary"
          icon="icon-yx-fanhui"
          size="big"
          class="plain-btn"
          @click="handleClose"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleList, getRoleResource, getAllResource, operateRole, enabledRole, roleRelevanceResource } from '@/api/base'
export default {
  name: "Role",
  data() {
    return {
      searchForm: {
        roleName: '',
      },
      formFields: {
        roleName: {
          name: "角色名称",
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: "角色名称",
            key: "roleName",
          },
          {
            name: "角色描述",
            key: "roleTest",
          },
          {
            name: "添加时间",
            key: "createTime",
          },
          {
            name: "是否启用",
            key: "enabled",
            slot: "enable",
          },
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
          { name: "修改", key: "edit", color: "#587DFD" },
          { name: "删除", key: "del", color: "#FF0041", hasPopconfirm: true },
        ],
      },
      operateForm: {
        roleName: '',
        roleTest: '',
        roleCode: ''
      },
      operateFields: {
        roleName: {
          name: '角色名称',
          rules: [{ required: true, message: '请填写角色名称', trigger: 'blur' }]
        },
        roleTest: {
          name: '角色描述'
        }
      },
      isIndeterminate: false,
      checkedBusiness: [],
      businessList: [],
      operateFlag: false,
      dialogTitle: '新增'
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
      getRoleList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    resetList() {
      this.table.page.index = 1;
      this.table.page.size = 10;
      this.searchForm.roleName = '';
      this.getList();
    },
    /**
     * 启用
     */
    switchClick(value, data) {
      console.log(value, data);
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      enabledRole({ roleId: data.row.id }).then((res) => {
        loading.close();
      }).catch((err) => {
        loading.close();
        this.table.data[data.$index].enabled === 1 ?
          this.table.data[data.$index].enabled = 0 :
          this.table.data[data.$index].enabled = 1;
      })
    },
    editClick(data) {
      console.log(data);
      !this.businessList.length && getAllResource({ appCode: 'enrollment' }).then(res => this.businessList = res.data)
      operateRole('get', { appCode: 'enrollment', roleCode: data.roleCode }).then((res) => {
        this.operateForm = {
          roleName: data.roleName,
          roleTest: data.roleTest,
          roleCode: data.roleCode
        };
        res.data.resource.forEach(item => this.checkedBusiness.push(item.resourceCode));
        this.dialogTitle = '修改';
        this.operateFlag = true;
      })
    },
    deleClick(data) {
      operateRole('DELETE', { roleId: data.id }).then((res) => {
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
    resetClick() { },
    /**
     * 新建角色
     */
    createRole() {
      getAllResource({ appCode: 'enrollment' }).then((res) => {
        console.log(res);
        res.data.forEach(item => item.checkAll = false)
        this.businessList = res.data;
        this.dialogTitle = '新增';
        this.operateFlag = true;
      })
    },
    operateFormInput(value, field) {
      if (field.key === 'roleName') {
        this.operateForm.roleCode = this.pinyin.getFullChars(value);
      }
    },
    /**
     * 业务操作全选
     */
    handleCheckAllChange(val, index) {
      this.checkedBusiness = val ? [...this.checkedBusiness, ...this.businessList[index].children.map(item => item.resourceCode)] : this.getArrDifference(this.checkedBusiness, this.businessList[index].children.map(item => item.resourceCode));
      this.isIndeterminate = false;
    },
    resetOperate() {
      this.operateForm = {
        roleName: '',
        roleTest: ''
      };
      this.checkedBusiness = [];
    },
    submitForm() {
      this.$refs.operateForm.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.operateForm,
          }
          let method = this.dialogTitle === '新增' ? 'post' : 'put';
          operateRole(method, params).then((res) => {
            console.log(res);
            if (res.code === '200') {
              let param = {
                roleCode: this.operateForm.roleCode,
                resourceCode: '' + this.checkedBusiness.map(item => item)
              }
              roleRelevanceResource(param).then((res) => {
                this.$message.success('添加成功');
                this.handleClose();
                this.getList();
              }).catch((err) => {
                this.$message.success('添加失败');
                this.handleClose();
                this.getList();
              })
            } else {
              this.$message.error(res.msg);
              this.handleClose();
              this.getList();
            }
          })
        }
      })
    },
    handleClose() {
      this.operateFlag = false;
      this.operateForm = {
        roleName: '',
        roleTest: ''
      };
      this.checkedBusiness = [];
    },
    /**
     * 页面勾选
     */
    handleCheckedCitiesChange() { },
    /**
     * 获取两个数组不同元素
     */
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    }
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
  position: relative;
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
  .operate-dialog {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: #f6f6fa;
    display: flex;
    flex-direction: column;
    .operate-search-view {
      height: 80px;
      flex-shrink: 0;
      padding-top: 30px;
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
    }
    .check-form {
      flex: 1;
      height: 0;
      overflow-y: auto;
      margin-top: 30px;
      .business-group {
        display: flex;
        flex-direction: column;
        .el-checkbox-group {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding-left: 17px;
          .check-header {
            height: 54px;
            background: #ecedf6;
            border: 1px solid #e8ebee;
            line-height: 54px;
            box-sizing: border-box;
            padding-left: 18px;
            color: #9491b0;
            font-weight: 600;
            margin-bottom: 30px;
            width: 100% !important;
          }
          .el-checkbox {
            margin-bottom: 30px;
            color: #9491b0;
            padding-left: 18px;
            width: fit-content;
          }
        }
      }
    }
    .handle-view {
      height: 120px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>