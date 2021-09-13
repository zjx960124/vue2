<script>
import { deepClone, isEmpty } from "@/utils/index";
import { processingImgUrl } from "@/utils/common";
import render from "@/components/render/render.js";

const ruleTrigger = {
  "el-input": "blur",
  "el-input-number": "blur",
  "el-select": "change",
  "el-radio-group": "change",
  "el-checkbox-group": "change",
  "el-cascader": "change",
  "el-time-picker": "change",
  "el-date-picker": "change",
  "el-rate": "change",
};

const processType = [
  "el-select",
  "el-cascader",
  "el-radio-group",
  "el-checkbox-group",
];

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__;
    const listeners = buildListeners.call(this, scheme);

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) labelWidth = "0";
    if (scheme.hidden === true) return;
    if (this.isPhone) {
      config.span = 24;
    }
    return (
      <el-col span={config.span}>
        <el-form-item
          label-width={labelWidth}
          prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ""}
        >
          <render conf={scheme} {...{ on: listeners }} />
        </el-form-item>
      </el-col>
    );
  },
  rowFormItem(h, scheme) {
    let child = renderChildren.apply(this, arguments);
    if (scheme.type === "flex") {
      child = (
        <el-row
          type={scheme.type}
          justify={scheme.justify}
          align={scheme.align}
        >
          {child}
        </el-row>
      );
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>{child}</el-row>
      </el-col>
    );
  },
};

function renderFrom(h) {
  const { formConfCopy } = this;
  if (this.formDisabled) {
    formConfCopy.disabled = true;
  }
  if (this.isPhone) {
    formConfCopy.labelPosition = "top";
  }
  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        class="parser-form"
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  );
}

function formBtns(h) {
  const { showFormBtns, showSaveDraftBtn, showSubmitBtn } = this;

  if (showFormBtns) {
    if (showSaveDraftBtn) {
      return (
        <el-col>
          <el-form-item size="small" class="btn-form">
            <el-button size="small" onClick={this.saveDraft}>
              暂 存
            </el-button>

            <el-button type="primary" size="small" onClick={this.submitForm}>
              {this.submitBtnText}
            </el-button>
          </el-form-item>
        </el-col>
      );
    } else {
      if (showSubmitBtn) {
        return (
          <el-col>
            <el-form-item size="small" class="btn-form">
              <el-button type="primary" size="small" onClick={this.submitForm}>
                {this.submitBtnText}
              </el-button>
            </el-form-item>
          </el-col>
        );
      }
    }
  }
  return;
}

function renderFormItem(h, elementList) {
  return elementList.map((scheme) => {
    const config = scheme.__config__;
    const layout = layouts[config.layout];

    if (layout) {
      return layout.call(this, h, scheme);
    }
    throw new Error(`没有与${config.layout}匹配的layout`);
  });
}

function renderChildren(h, scheme) {
  const config = scheme.__config__;
  if (!Array.isArray(config.children)) return null;
  return renderFormItem.call(this, h, config.children);
}

function setUpload(config, scheme, response, file, fileList) {
  let newValue = [];
  const defaultValue = this[this.formConf.formModel][scheme.__vModel__];
  if (typeof defaultValue == "string") {
    try {
      newValue = JSON.parse(defaultValue);
    } catch (error) {
      console.warn(error);
    }
  } else if (Array.isArray(defaultValue)) {
    newValue = defaultValue;
  }

  if (!newValue) {
    newValue = [];
  }
  newValue.push({ name: file.name, url: processingImgUrl(response.data) });
  this.$set(config, "defaultValue", newValue);
  this.$set(this[this.formConf.formModel], scheme.__vModel__, newValue);
}

function deleteUpload(config, scheme, file, fileList) {
  let newValue = [];
  fileList.forEach((element) => {
    newValue.push({ name: element.name, url: element.url });
  });
  this.$set(config, "defaultValue", newValue);
  this.$set(this[this.formConf.formModel], scheme.__vModel__, newValue);
}

function setValue(event, config, scheme) {
  this.$set(config, "defaultValue", event);
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event);
}

function buildListeners(scheme) {
  const config = scheme.__config__;
  const methods = this.formConf.__methods__ || {};
  const listeners = {};

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event);
  });
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => setValue.call(this, event, config, scheme);
  listeners.upload = (response, file, fileList) =>
    setUpload.call(this, config, scheme, response, file, fileList);
  listeners.deleteUpload = (file, fileList) =>
    deleteUpload.call(this, config, scheme, file, fileList);

  return listeners;
}

export default {
  components: {
    render,
  },
  props: {
    formConf: {
      type: Object,
      required: true,
      default: () => {},
    },
    formModel: {
      type: Object,
      default: () => {},
    },
    showFormBtns: {
      type: Boolean,
      default: true,
    },
    showSubmitBtn: {
      type: Boolean,
      default: true,
    },
    showSaveDraftBtn: {
      type: Boolean,
      default: true,
    },
    submitBtnText: {
      type: String,
      default: "提 交",
    },
    formDisabled: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const data = {
      isPhone: false,
      formLabelModel: {},
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {},
    };
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel]);
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules]);
    return data;
  },
  watch: {
    formConf: {
      handler(val, oldVal) {
        const data = {
          formConfCopy: deepClone(val),
          [val.formModel]: {},
          [val.formRules]: {},
        };
        this.formConfCopy = data.formConfCopy;
        this.initFormData(data.formConfCopy.fields, data[val.formModel]);
        this.buildRules(data.formConfCopy.fields, data[val.formRules]);
      },
      immediate: true,
      deep: true,
    },
    isMobile: {
      handler(val, oldVal) {
        this.isPhone = val;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__;
        if (!isEmpty(this.formModel)) {
          config.defaultValue = this.formModel[cur.__vModel__];
        }
        if (cur.__vModel__ && config.defaultValue) {
          formData[cur.__vModel__] = config.defaultValue;
        }
        if (config.children) {
          this.initFormData(config.children, formData);
        }
      });
    },
    buildRules(componentList, rules) {
      if (componentList.length < 1) return false;
      componentList.forEach((cur) => {
        const config = cur.__config__;
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = {
              required: config.required,
              message: cur.placeholder,
            };
            if (Array.isArray(config.defaultValue)) {
              required.type = "array";
              required.message = `请至少选择一个${config.label}`;
            }
            required.message === undefined &&
              (required.message = `${config.label}不能为空`);
            config.regList.push(required);
          }
          try {
            rules[cur.__vModel__] = config.regList.map((item) => {
              item.pattern && (item.pattern = eval(item.pattern));
              item.trigger = ruleTrigger && ruleTrigger[config.tag];
              return item;
            });
          } catch (error) {
            console.warn(error);
          }
        }
        if (config.children) this.buildRules(config.children, rules);
      });
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf);
      this.$refs[this.formConf.formRef].resetFields();
    },
    getObject(array, key, value) {
      let o = {};
      array.some(function iter(a) {
        if (a[key] === value) {
          o = a;
          return true;
        }
        return Array.isArray(a.children) && a.children.some(iter);
      });
      return o;
    },
    setLabelFormModel(fields, formModel) {
      fields.forEach((item) => {
        let temConfig = item.__config__;
        let defaultValue = formModel[item.__vModel__];
        if (processType.indexOf(temConfig.tag) > -1 && defaultValue) {
          if (defaultValue instanceof Array) {
            let labelStr = "";
            defaultValue.forEach((cur, index) => {
              if (cur) {
                let options = [];
                if (temConfig.tag === "el-cascader") {
                  options = item.options;
                } else {
                  options = item.__slot__.options;
                }
                let labelItem = this.getObject(options, "value", cur);
                if (labelItem) {
                  if (index === 0) {
                    labelStr += labelItem.label;
                  } else {
                    labelStr += "," + labelItem.label;
                  }
                }
              }
            });
            this.formLabelModel[item.__vModel__] = labelStr;
          } else {
            let options = [];
            if (temConfig.tag === "el-cascader") {
              options = item.options;
            } else {
              options = item.__slot__.options;
            }
            const _this = this;
            options.forEach(function (option) {
              if (option.value == defaultValue) {
                _this.formLabelModel[item.__vModel__] = option.label;
              }
            });
          }
        }
      });
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate((valid) => {
        if (!valid) {
          return false;
        }
        let canSubmit = true;
        this.formConfCopy.fields.map((item, index) => {
          if (!item.hidden && item.__config__.required) {
            if (
              item.__config__.defaultValue === undefined ||
              item.__config__.defaultValue === null ||
              item.__config__.defaultValue === ""
            ) {
              canSubmit = false;
              this.$message.warning("必填选项不能为空");
              return false;
            }
          }
        });
        if (canSubmit) {
          // 触发sumit事件
          this.formLabelModel = deepClone(this[this.formConf.formModel]);
          this.setLabelFormModel(
            this.formConfCopy.fields,
            this[this.formConf.formModel]
          );
          this.$emit(
            "submit",
            this[this.formConf.formModel],
            this.formLabelModel,
            this.formConfCopy
          );
          return true;
        }
        return false;
      });
    },
    saveDraft() {
      // 触发saveDraft事件
      this.$emit("saveDraft", this[this.formConf.formModel], this.formConfCopy);
      return true;
    },
  },
  render(h) {
    return renderFrom.call(this, h);
  },
};
</script>

<style lang="scss" scope>
.btn-form .el-form-item__content {
  margin-top: 10px;
  margin-left: 0 !important;
  text-align: center;
}

.parser-form > .el-col {
  min-height: 53px;
}

.parser-form {
  .el-col-24 .el-textarea,
  .el-col-24 .el-input,
  .el-col-24 .el-select {
    padding-right: 0;
  }
}
</style>
