<template>
  <div class="newly-born-plain-view">
    <title-layout title="新生计划导入">
      <page-form
        ref="planForm"
        class="plan-form"
        label-width="120px"
        label-position="left"
        :model="uploadForm"
        size="small"
        :col-span="8"
        :fields="uploadFields"
      ></page-form>
    </title-layout>
    <title-layout style="margin-bottom: 10px" title="导入学生">
      <div class="upload-view">
        <span class="tip">选择excel文件:</span>
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="actionUrl"
          drag
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :before-upload="startUpload"
          :on-change="handleChange"
          :on-remove="handleRemove"
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
              >生成计划</el-button
            >
            <el-button
              style="margin-left: 20px; border: none"
              size="big"
              type="primary"
              class="primary-btn btn-white"
              @click="returns"
            >
              下载模板</el-button
            >
          </div>
        </el-upload>
      </div>
    </title-layout>
    <title-layout title="导入学生说明">
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
    <el-dialog
      v-if="dialogFlag"
      title="添加计划"
      :visible.sync="dialogFlag"
      width="500px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      class="create-dialog"
    >
      <page-form
        ref="planForm"
        class="plan-form"
        label-width="120px"
        label-position="right"
        :model="uploadForm"
        size="small"
        :col-span="24"
        :fields="uploadFields"
      ></page-form>
      <div class="plan-result">
        <span class="label">导入学生数:</span>
        <span class="result">955人</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <span @click="handleClose">取 消</span>
        <span type="primary" @click="submitCreate">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { importStudent, getInformationByType, newPlan } from '@/api/base';
export default {
  name: 'CreateNewlyBornPlan',
  data() {
    return {
      fileList: [],
      tipList: [
        '1、重复数据不导入',
        '2、数据导入采用Excel表格导入',
        '3、不支持Excel公式导入，尽量去除所有文字和表格样式',
        '4、只支持工作表1（Sheet1或工作簿1）导入',
        '5、请点击下载模板学生模板示例',
        '6、如需导入时间，时间格式必须为 YYYY-MM-DD (例如：2021-01-01)'
      ],
      tipList2: [
        '• 必填项目（必填项目不能为空）',
        '学生姓名（自定义）',
        '学生身份证号（自定义，且不能重复）',
        '学生学号（自定义）',
        '学生年级（自定义）',
      ],
      actionUrl: '/rest/enroll/bill/student',
      dialogFlag: false,
      uploadForm: {
        name: '',
        expirationTime: '',
        informationId: ''
      },
      uploadFields: {
        name: {
          name: '缴费计划名称',
          labelWidth: '100px'
        },
        informationId: {
          name: '绑定新生须知',
          labelWidth: '100px',
          type: 'select',
          props: {
            label: 'title',
            value: 'id'
          },
          enums: []
        },
        expirationTime: {
          name: '截止时间',
          labelWidth: '70px',
          type: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-ddTHH:mm:ss'
        },
      },
    }
  },
  mounted() {
    getInformationByType({ type: 'tongzhi' }).then((res) => {
      console.log(res);
      this.uploadFields.informationId.enums = res.data;
    })
  },
  methods: {
    handleClose() {
    },
    startUpload(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    },
    handleRemove(file, fileList) {
      var x = -1;
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i] == file) {
          x = i
        }
      }
      if (x !== -1) {
        this.fileList.splice(x, 1)
      }
    },
    startImport() {
      // this.$refs.upload.submit();  // ele自带上传
      // this.dialogFlag = true;
      if (!this.uploadForm.name || !this.uploadForm.expirationTime || !this.uploadForm.informationId) {
        this.$message.error('计划信息为空!');
        return false;
      }
      if (this.fileList.length < 1) {
        this.$message.error('未添加文件!');
        return false;
      }
      newPlan({ plan: this.uploadForm }).then((res) => {
        if (res.code !== '200') {
          this.$message.error(res.msg);
          return false;
        }
        const form = new FormData();
        for (let i = 0; i < this.fileList.length; i++) {
          form.append('multipartFile', this.fileList[i].raw ? this.fileList[i].raw : '');
        }
        form.append('planCode', res.data.planCode);
        importStudent(form).then((res) => {
          console.log(res);
        })
      })
    },
    returns() {
      this.$Bus.$emit('ratePlan', { target: 'return' });
    },
    handleClose() {
      this.dialogFlag = false;
    },
    submitCreate() { },
    returnPage() {
      this.$Bus.$emit('ratePlan', { target: 'return' });
    }
  },
}
</script>
<style lang="scss" scoped>
.newly-born-plain-view {
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
  .plan-form {
    padding-top: 66px;
    padding-bottom: 48px;
    ::v-deep .el-form {
      width: calc(100% - 155px);
    }
    ::v-deep .el-form-item--small .el-form-item__label {
      line-height: 28px !important;
      font-size: 13px;
      padding-right: 15px;
    }
    ::v-deep .el-form .el-form-item .el-input--small .el-input__inner {
      height: 28px;
      line-height: 28px;
      width: 100%;
    }
    ::v-deep .el-col + .el-col {
      margin-top: 0;
      margin-left: 0;
    }
    ::v-deep .formItem {
      width: 100%;
    }
  }
  .handle-view {
    height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .create-dialog {
    .plan-form {
      ::v-deep .el-form-item--small .el-form-item__label {
        line-height: 28px !important;
        font-size: 13px;
      }
      ::v-deep .el-form .el-form-item .el-input--small .el-input__inner {
        height: 28px;
        line-height: 28px;
        width: 100%;
      }
      ::v-deep .el-col + .el-col {
        margin-top: 14px;
        margin-left: 0;
      }
      ::v-deep .formItem {
        width: 100%;
      }
    }
    .plan-result {
      margin-top: 40px;
      .label {
        color: #9c9ab4;
        font-size: 13px;
        margin-left: 33px;
        margin-right: 10px;
      }
      .result {
        color: #587dfd;
        font-size: 13px;
      }
    }
  }
}
</style>
