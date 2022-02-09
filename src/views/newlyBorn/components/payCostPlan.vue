<template>
  <div class="pay-cost-plain-view">
    <title-layout style="margin-bottom: 10px" title="导入缴费信息">
      <div class="upload-view">
        <span class="tip">选择excel文件:</span>
        <el-upload
          class="upload-demo"
          drag
          multiple
          :auto-upload="false"
          :file-list="fileList"
        >
          <img src="../../../assets/other_images/file.png" alt="" />
          <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
          <div class="el-upload__tips">支持扩展名：.xls .xlsx</div>
          <div class="el-upload__tip" slot="tip">
            <el-button
              class="primary-btn"
              size="big"
              type="primary"
              @click="startImport"
              >开始导入</el-button
            >
            <el-button
              style="margin-left: 20px; border: none"
              size="big"
              type="primary"
              class="primary-btn btn-white"
              >下载模板</el-button
            >
          </div>
        </el-upload>
      </div>
    </title-layout>
    <title-layout title="导入缴费信息说明">
      <div class="tip-list-view">
        <span v-for="(item, index) in tipList" :key="index" class="tip-info">{{
          item
        }}</span>
        <div class="line"></div>
        <span
          v-for="(item, index) in tipList2"
          :key="index + '2'"
          class="tip-info"
          >{{ item }}</span
        >
      </div>
    </title-layout>
    <el-dialog
      v-if="dialogFlag"
      title="缴费信息预览"
      :visible.sync="dialogFlag"
      width="1231px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      class="preview-dialog"
    >
      <div class="result-info">
        <div>
          <span>应生成缴费订单:</span>
          <span>100条</span>
        </div>
        <div class="had">
          <span>已生成缴费订单:</span>
          <span>100条</span>
        </div>
      </div>
      <el-radio-group v-model="radio" size="mini" text-color="#9491B0">
        <el-radio :label="successed">成功</el-radio>
        <el-radio :label="failed">失败</el-radio>
      </el-radio-group>
      <div class="table-views">
        <div class="table-container">
          <div class="tip">系统缺失数据:</div>
          <div class="table-main">
            <page-table
              ref="tablePage"
              class="preview-table"
              :fields="systemMissingTable.fields"
              type="index"
              :page="systemMissingTable.page"
              :show-no="false"
              :data="systemMissingTable.data"
              :operation="systemMissingTable.operation"
              :loading="systemMissingTable.loading"
              :multiple-selection.sync="systemMissingTable.multipleSelection"
              :operation-widths="systemMissingTable.operationWidths"
            >
            </page-table>
          </div>
        </div>
        <div class="table-container">
          <div class="tip">上传缴费excel缺失数据:</div>
          <div class="table-main">
            <page-table
              ref="tablePage"
              class="preview-table"
              :fields="systemMissingTable.fields"
              type="index"
              :page="systemMissingTable.page"
              :show-no="false"
              :data="systemMissingTable.data"
              :operation="systemMissingTable.operation"
              :loading="systemMissingTable.loading"
              :multiple-selection.sync="systemMissingTable.multipleSelection"
              :operation-widths="systemMissingTable.operationWidths"
            >
            </page-table>
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
export default {
  name: 'PayCostPlan',
  data() {
    return {
      fileList: [],
      tipList: [
        '重复数据不导入',
        '数据导入用excel',
        '重复数据不导入',
        '数据导入用excel',
        '重复数据不导入',
        '数据导入用excel'
      ],
      tipList2: [
        '重复数据不导入',
        '数据导入用excel',
        '重复数据不导入',
        '数据导入用excel',
        '重复数据不导入',
      ],
      dialogFlag: false,
      radio: 'successed',
      systemMissingTable: {
        multipleSelection: [],
        fields: [
          {
            name: "姓名",
            key: "name",
          },
          {
            name: "身份证号",
            key: "createTime",
          },
          {
            name: "学号",
            key: "expirationTime",
          },
          {
            name: "学费",
            key: "grade",
          },
          {
            name: "学杂费",
            key: "planNumber",
          },
          {
            name: "住宿费",
            key: "payable",
          }
        ],
        data: [
          {
            name: '111'
          }
        ],
        loading: false,
        page: {
          index: 1,
          size: 10,
          total: 1,
        },
      }
    }
  },
  mounted() { },
  methods: {
    startImport() {
      this.dialogFlag = true;
    },
    submitCreate() { },
    handleClose() {
      this.dialogFlag = false;
    }
  },
}
</script>
<style lang="scss" scoped>
.pay-cost-plain-view {
  .upload-view {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    padding-top: 4%;
    padding-bottom: 2%;
    display: flex;
    align-items: flex-start;
    padding-left: 20%;
    line-height: 0.8;
    position: relative;
    .tip {
      color: #9c9ab4;
      font-size: 12px;
      line-height: 1;
      margin-right: 75px;
    }
    .upload-demo {
      ::v-deep .el-upload .el-upload-dragger {
        border: 1px dashed #587dfd;
        img {
          margin-top: 35px;
        }
      }
      .el-upload__text {
        color: #9c9ab4;
        font-size: 14px;
        line-height: 1;
        margin: 25px 0 15px;
      }
      .el-upload__tips {
        color: #9491b0;
        line-height: 1;
        font-size: 12px;
      }
      .el-upload__tip {
        text-align: center;
        width: 360px;
        margin-top: 40px;
      }
      ::v-deep .el-upload-list {
        max-height: 80px;
        margin-top: 15px;
        overflow-y: auto;
      }
    }
  }
  .tip-list-view {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    .tip-info {
      color: #9c9ab4;
      font-size: 12px;
      margin-bottom: 15px;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #ebebf5;
      margin-bottom: 15px;
    }
  }
  .preview-dialog {
    ::v-deep .el-dialog {
      .el-dialog__body {
        padding: 20px 0 0;
        .result-info {
          color: #587dfd;
          font-size: 12px;
          display: flex;
          align-items: center;
          .had {
            margin-left: 62px;
            line-height: 1;
          }
        }
        .el-radio-group {
          margin: 22px 0 26px;
          .el-radio {
            .el-radio__inner {
              width: 12px;
              height: 12px;
            }
            .el-radio__label {
              color: #9491b0;
              font-size: 12px;
              line-height: 1;
            }
          }
        }
        .table-views {
          width: 100%;
          display: flex;
          .table-container {
            flex: 1;
            width: 0;
            max-width: 565px;
            min-height: 366px;
            display: flex;
            flex-direction: column;
            .tip {
              color: #ff0041;
              font-size: 12px;
              margin-bottom: 18px;
              line-height: 1;
              height: 12px;
              flex-shrink: 0;
            }
            .table-main {
              width: 100%;
              height: 0;
              flex: 1;
              .table-view {
                border: 1px solid #d5d6e3;
                border-radius: 4px;
                .el-table th.el-table__cell {
                  height: 30px;
                  padding: 0;
                  background: #d5d6e3;
                  border: none;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-wrap: normal;
                }
                .el-table tr {
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
          }
          .table-container + .table-container {
            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>
