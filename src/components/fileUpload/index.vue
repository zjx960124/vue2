<template>
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    title="文件上传"
    v-bind="$attrs"
    :destroy-on-close="true"
    width="670px"
    custom-class="app-dialog"
    :before-close="close"
    append-to-body
    v-on="$listeners"
  >
    <el-upload
      ref="uploader"
      class="upload"
      :headers="headers"
      :disabled="disabled"
      :action="actionUrl"
      :accept="accept"
      :show-file-list="showFileList"
      :list-type="listType"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove"
      :on-exceed="handleExceed"
      :on-progress="onProgress"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="files"
      :auto-upload="autoUpload"
      :http-request="httpRequest"
      :class="{ hide: hideUploadEdit }"
      :multiple="multiple && limit > 1"
      :with-credentials="withCredentials"
      :drag="drag"
    >
      <i class="el-icon-upload" />
      <div v-if="text" class="el-upload__text">{{ text }}<em>点击上传</em></div>
      <div v-if="tip" slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click.stop="close">取 消</el-button>
      <el-button type="primary" size="small" @click.stop="sure"
        >保 存</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "FileUpload",
  props: {
    /* 必选参数，上传的地址 */
    actionUrl: { type: String, required: true, default: "" },
    /* 最大允许上传个数*/
    limit: { type: Number, default: 1 },
    /* 限制图片大小 单位：kb*/
    limitSize: { type: Number, default: 10240 },
    /* 文上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]*/
    fileList: {
      type: Array,
      default: () => [],
    },
    /* 是否可多选*/
    multiple: {
      type: Boolean,
      default: true,
    },
    /* 提示*/
    tip: {
      type: String,
      default: "只允许上传pdf，word文件，且最大10MB",
    },
    /* 是否禁用*/
    disabled: {
      type: Boolean,
      default: false,
    },
    /*  是否显示已上传文件列表 */
    showFileList: {
      type: Boolean,
      default: true,
    },
    /* 是否在选取文件后立即进行上传 */
    autoUpload: {
      type: Boolean,
      default: false,
    },
    /* 接受上传的文件类型（thumbnail-mode 模式下此参数无效） */
    accept: { type: String, default: ".PDF,.WORD,.DOC,.DOCX" },
    /* 覆盖默认的上传行为，可以自定义上传的实现 */
    httpRequest: {
      type: Function,
      default: undefined,
    },
    /* 支持发送 cookie 凭证信息 */
    withCredentials: {
      type: Boolean,
      default: false,
    },
    /* 是否启用拖拽上传 */
    drag: {
      type: Boolean,
      default: false,
    },
    /*  上传文字提示 */
    text: { type: String, default: "将文件拖到此处，或" },
    /*  设置上传的请求头部 */
    headers: {
      type: Object,
      default: () => {
        return null;
      },
    },
    /* 文件列表的类型 */
    listType: { type: String, default: "" },
  },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    hideUploadEdit() {
      return this.fileList.length >= this.limit;
    },
  },
  watch: {
    fileList: {
      handler: function (newVar, oldVar) {
        this.files = newVar;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleChange(file, fileList) {
      if (this.limit === 1 && fileList.length > 0) {
        this.files = [fileList[fileList.length - 1]];
      }
      this.files = fileList;
      this.$emit("change", fileList);
    },
    onSuccess(response, file, fileList) {
      this.$emit("onSuccess", response, file, fileList);
    },
    onError(err, file, fileList) {
      this.$emit("onError", err, file, fileList);
    },
    onProgress(event, file, fileList) {
      this.$emit("onProgress", event, file, fileList);
    },
    handleBeforeUpload(file) {
      if (size > this.limitSize) {
        this.$message.warning("文件大小超过允许范围");
      }
      this.$emit("beforeUpload", file);
    },
    handleBeforeRemove(file, fileList) {
      this.$emit("beforeRemove", file, fileList);
    },
    handleRemove(file, fileList) {
      var x = -1;
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i] == file) {
          x = i;
        }
      }
      if (x !== -1) {
        this.files.splice(x, 1);
      }
      this.$emit("onRemove", file, fileList);
    },
    handlePreview(file) {
      this.$emit("onPreview", file);
    },
    handleExceed(files, fileList) {
      this.$message({
        message: `最多可上传${this.limit}张图片`,
        type: "warning",
      });
      this.$emit("onExceed", files, fileList);
    },
    uploadFile() {
      if (this.autoUpload) {
        this.$message.warning("请设置autoUpload为false");
        return;
      }
      this.$refs.uploader.submit();
    },
    close() {
      this.files = [];
      this.$emit("update:visible", false);
    },
    sure() {
      if (this.files.length === 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      this.$emit("uploadFileSubmit", this.files);
      this.close();
    },
  },
};
</script>
<style lang="scss">
.upload {
  margin: 0 auto;
  width: 100%;
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      height: 210px;
    }
  }
  .el-upload-list {
    margin-top: 10px;
    padding: 0;
    list-style: none;
    max-height: 100px;
    overflow: auto;
  }
}
</style>
