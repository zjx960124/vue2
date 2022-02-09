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
        :col-span="6"
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
    <div v-if="operateFlag" class="operate-dialog">
      <div class="search-view">
        <page-form
          ref="form"
          class="search-form"
          label-width="85px"
          label-position="right"
          :model="dialogForm"
          size="big"
          :col-span="6"
          :fields="dialogFields"
        >
        </page-form>
      </div>
      <div class="ue-view">
        <VueUeditorWrap v-model="ueContent" :config="myConfig" />
      </div>
      <div class="handle-view">
        <el-button
          type="primary"
          icon="icon-yx-tijiao"
          size="big"
          class="primary-btn"
          @click="preview"
          >预览</el-button
        >
        <el-button
          type="primary"
          icon="icon-yx-chongzhi"
          size="big"
          class="plain-btn"
          @click="submit"
          >发布</el-button
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
import { getInformationList, getDictionaryList, operateInformation } from '@/api/base'
export default {
  name: "Information",
  data() {
    return {
      searchForm: {
        time: [],
        type: ''
      },
      formFields: {
        type: {
          name: "信息类型",
          type: 'select',
          props: {
            label: 'label',
            value: 'value'
          },
          enums: [
            {
              label: '公告',
              value: 'gonggao'
            },
            {
              label: '文章',
              value: 'wenzhang'
            },
            {
              label: '通知',
              value: 'tongzhi'
            }
          ]
        },
        time: {
          name: "发布时间",
          type: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd',
          colSpan: 10
        },
      },
      table: {
        multipleSelection: [],
        fields: [
          {
            name: "标题",
            key: "title",
          },
          {
            name: "信息类型",
            key: "type",
          },
          {
            name: "发布时间",
            key: "updateTime",
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
          { name: "查看管理", key: "edit", color: "#587DFD" },
        ],
      },
      operateFlag: false,
      dialogTitle: '新增',
      dialogForm: {
        title: '',
        type: '',
      },
      dialogFields: {
        title: {
          name: '标题',
          labelWidth: 50,
          colSpan: 4.5
        },
        type: {
          name: '信息类型',
          type: 'select',
          colSpan: 5.5,
          props: {
            label: 'dictionaryName',
            value: 'dictionaryCode'
          },
          enums: [
            {
              label: '公告',
              value: 'gonggao'
            },
            {
              label: '文章',
              value: 'wenzhang'
            }
          ]
        },
      },
      ueContent: '',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: "480",
        // 初始容器宽度
        initialFrameWidth: "100%",
        // UEditor 资源文件的存放路径，
        UEDITOR_HOME_URL: "./ues/",
        imagePopup: false,
        imageScaleEnabled: false,
        elementPathEnabled: false,
        autoFloatEnabled: false,
        allowDivTransToP: false,
        zIndex: 1,
        // 允许的最大字符数
        maximumWords: 100000
      }
    };
  },
  mounted() {
    this.getList();
    this.getInformationType();
  },
  methods: {
    getList() {
      let param = {
        type: this.searchForm.type,
        startTime: this.searchForm.time.length ? this.searchForm.time[0] : '',
        endTime: this.searchForm.time.length ? this.searchForm.time[1] : '',
        pageNum: this.table.page.index,
        pageSize: this.table.page.size
      };
      getInformationList(param).then((res) => {
        this.table.page.total = res.data.totalElements;
        this.table.data = res.data.content;
      })
    },
    getInformationType() {
      getDictionaryList({ catalogueCode: 'xinxileixing' }).then((res) => {
        res.data.content.length &&
          (
            this.formFields.type.enums = res.data.content,
            this.dialogFields.type.enums = res.data.content
          )
      })
    },
    editClick(data) {
      this.dialogForm = data;
      this.ueContent = data.content;
      this.dialogTitle = '修改',
        this.operateFlag = true;
    },
    deleClick(data) {
      operateInformation('DELETE', { informationId: data.id }).then((res) => {
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
    batchDelete() {
      let data = this.$refs.tablePage.multipleSelection;
      data.length && operateInformation('DELETE', { informationId: '' + data.map(item => item.id) }).then((res) => {
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
    createClick() {
      this.dialogTitle = '新增';
      this.operateFlag = true;
    },
    resetClick() { },
    submit() {
      console.log(this.ueContent);
      let param = {
        ...this.dialogForm,
        content: this.ueContent
      }
      let method = this.dialogTitle === '新增' ? 'post' : 'put';
      operateInformation(method, param).then((res) => {
        if (res.code === '200') {
          this.$message.success('发布成功');
          this.handleClose();
          this.getList();
        } else {
          this.$message.error(res.msg);
          this.handleClose();
          this.getList();
        }
      }).catch((err) => {
        this.$message.error(err.msg);
      })
    },
    preview() {

    },
    handleClose() {
      this.dialogForm = {
        title: '',
        type: ''
      };
      this.ueContent = '';
      this.operateFlag = false;
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
      margin-bottom: 20px;
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
    overflow-y: auto;
    .search-view {
      height: 100px;
      flex-shrink: 0;
      .search-form {
        flex: 1;
        width: 100%;
        ::v-deep .el-form {
          width: 100%;
          .el-form-item__content {
            width: 280px;
          }
        }
      }
    }
    .ue-view {
      width: 100%;
      padding: 0 50px;
      aspect-ratio: auto 1615 / 586;
      display: flex;
      box-sizing: border-box;
      font-size: 12px;
      position: relative;
    }
    .ue-view::before {
      content: "内容";
      position: absolute;
      top: 0;
      left: 0;
      color: #9c9ab4;
      font-size: 16px;
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