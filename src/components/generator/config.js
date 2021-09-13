// 表单属性【右面板】
import {
  regionData
} from 'element-china-area-data'

import nationalityData from '@/components/generator/nationality'
const newId = new Date().getTime();

export const formConf = {
  formRef: 'elForm',
  formModel: 'formModel _' + newId,
  size: 'small',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 个人信息组件 【左面板】
export const infoComponents = [{
    __config__: {
      label: '姓名',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'name',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: []
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '手机号',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'phone',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: [{
        pattern: '/^1[3|4|5|7|8][0-9]{9}$/',
        message: '手机号格式错误'
      }]
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: 11,
    'show-word-limit': true,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '邮箱',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'email',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: [{
        pattern: '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/',
        message: '邮箱格式错误'
      }]
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': true,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '性别',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'sexy',
      changeTag: true,
      defaultValue: 1,
      layout: 'colFormItem',
      span: 12,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: ''
    },
    __slot__: {
      options: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 2
      }, {
        label: '未知',
        value: 3
      }]
    },
    style: {},
    size: 'small',
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '学历',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'education',
      changeTag: true,
      defaultValue: 1,
      layout: 'colFormItem',
      span: 12,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: ''
    },
    __slot__: {
      options: [{
        label: '小学及以下',
        value: 1
      }, {
        label: '初中',
        value: 2
      }, {
        label: '高中/中专/技校',
        value: 3
      }, {
        label: '大学专科',
        value: 4
      }, {
        label: '大学本科',
        value: 5
      }, {
        label: '硕士研究生及以上',
        value: 6
      }, {
        label: '其他',
        value: 7
      }]
    },
    style: {},
    size: 'small',
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '身份证号',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'idCard',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: [{
        pattern: '/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/',
        message: '身份证号格式错误'
      }]
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: 18,
    'show-word-limit': true,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '电话号码',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'tel',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: [{
        pattern: '((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)',
        message: '电话号码格式错误'
      }]
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    'show-word-limit': true,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '地址',
      url: '',
      method: 'get',
      dataKey: 'list',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'address',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 12,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    options: regionData,
    placeholder: '请选择',
    style: {
      width: '100%'
    },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/',
    hidden: false
  },
  {
    __config__: {
      label: '年龄范围',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'age',
      changeTag: true,
      defaultValue: 1,
      layout: 'colFormItem',
      span: 12,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: ''
    },
    __slot__: {
      options: [{
        label: '18岁以下',
        value: 1
      }, {
        label: '18~24岁',
        value: 2
      }, {
        label: '25~30岁',
        value: 3
      }, {
        label: '31~40岁',
        value: 4
      }, {
        label: '41~50岁',
        value: 5
      }, {
        label: '51~60岁',
        value: 6
      }, {
        label: '61岁及以上',
        value: 7
      }]
    },
    style: {},
    size: 'small',
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '国籍',
      defaultValue: 'China',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'nationality',
      layout: 'colFormItem',
      span: 12,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    __slot__: {
      options: nationalityData
    },
    placeholder: '请选择',
    style: {
      width: '100%'
    },
    clearable: true,
    disabled: false,
    filterable: true,
    multiple: false,
    hidden: false
  }
]

// 输入型组件 【左面板】
export const inputComponents = [{
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      // 正则校验规则
      regList: []
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      regList: [],
      changeTag: true,
      document: ''
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: {
      width: '100%'
    },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'password',
      defaultValue: "",
      layout: 'colFormItem',
      span: 12,
      required: true,
      regList: [],
      document: ''
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    'show-password': true,
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'counter',
      defaultValue: "",
      span: 12,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: ''
    },
    placeholder: '',
    min: '',
    max: '',
    step: 1,
    'step-strictly': false,
    precision: "",
    'controls-position': '',
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '数值',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'number',
      defaultValue: "",
      required: true,
      layout: 'colFormItem',
      span: 12,
      document: '',
      regList: []
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    type: 'number',
    style: {
      width: '100%'
    },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    readonly: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '编辑器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'tinymce',
      tagIcon: 'rich-text',
      defaultValue: "",
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: ''
    },
    placeholder: '请输入',
    height: 300, // 编辑器高度
    branding: false, // 隐藏右下角品牌烙印,
    hidden: false
  }
]

// 选择型组件 【左面板】
export const selectComponents = [{
    __config__: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 12,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    __slot__: {
      options: [{
        label: '选项-1',
        value: 1
      }, {
        label: '选项-2',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: {
      width: '100%'
    },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false,
    hidden: false
  },
  {
    __config__: {
      label: '级联选择',
      url: '',
      method: 'get',
      dataKey: 'list',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 12,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    options: [{
      id: 1,
      value: 1,
      label: '选项1',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    style: {
      width: '100%'
    },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/',
    hidden: false
  },
  {
    __config__: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      defaultValue: 1,
      layout: 'colFormItem',
      span: 12,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: ''
    },
    __slot__: {
      options: [{
        label: '选项-1',
        value: 1
      }, {
        label: '选项-2',
        value: 2
      }]
    },
    style: {},
    size: 'small',
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 12,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      regList: [],
      changeTag: true,
      border: false,
      document: ''
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'small',
    min: null,
    max: null,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 12,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    style: {},
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  },
  {
    __config__: {
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: "",
      span: 12,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false,
    hidden: false
  },
  {
    __config__: {
      label: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: "",
      span: 12,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    placeholder: '请选择',
    style: {
      width: '100%'
    },
    disabled: false,
    hidden: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '时间范围',
      tag: 'el-time-picker',
      tagIcon: 'time-range',
      span: 12,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: [],
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    style: {
      width: '100%'
    },
    disabled: false,
    hidden: false,
    clearable: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: "",
      showLabel: true,
      labelWidth: null,
      span: 12,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    placeholder: '请选择',
    type: 'date',
    style: {
      width: '100%'
    },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false,
    hidden: false
  },
  {
    __config__: {
      label: '日期范围',
      tag: 'el-date-picker',
      tagIcon: 'date-range',
      defaultValue: [],
      span: 12,
      showLabel: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: ''
    },
    style: {
      width: '100%'
    },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false,
    hidden: false
  },
  {
    __config__: {
      label: '日期时间',
      tag: 'el-date-picker',
      tagIcon: 'datetime',
      defaultValue: "",
      showLabel: true,
      labelWidth: null,
      span: 12,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    placeholder: '请选择',
    type: 'datetime',
    style: {
      width: '100%'
    },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd HH:mm:ss',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    readonly: false,
    hidden: false
  },
  {
    __config__: {
      label: '日时范围',
      tag: 'el-date-picker',
      tagIcon: 'datetimerange',
      defaultValue: "",
      showLabel: true,
      labelWidth: null,
      span: 12,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    placeholder: '请选择',
    type: 'datetimerange',
    style: {
      width: '100%'
    },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd HH:mm:ss',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    readonly: false,
    hidden: false
  },
  {
    __config__: {
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      defaultValue: 0,
      span: 12,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '颜色选择',
      tag: 'el-color-picker',
      tagIcon: 'color',
      span: 12,
      defaultValue: "",
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: ''
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'small',
    hidden: false
  }, {
    __config__: {
      label: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      defaultValue: "",
      showLabel: true,
      labelWidth: null,
      required: true,
      span: 12,
      showTip: false,
      buttonText: '点击上传',
      regList: [],
      changeTag: true,
      fileSize: 2,
      sizeUnit: 'MB',
      document: ''
    },
    __slot__: {
      'list-type': true
    },
    action: process.env.VUE_APP_BASE_API + '/rest/paas/template/file',
    accept: 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/gif,image/GIF,image/bmp,image/BMP',
    name: 'files',
    'auto-upload': true,
    'list-type': 'text',
    'with-credentials': true,
    multiple: false,
    disabled: false,
    hidden: false
  }
]

// 布局型组件 【左面板】
export const layoutComponents = [{
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: ''
    },
    type: 'default',
    justify: 'start',
    align: 'top',
    hidden: false
  },
  {
    __config__: {
      label: '按钮',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-button',
      tagIcon: 'button',
      span: 12,
      layout: 'colFormItem',
      document: ''
    },
    __slot__: {
      default: '主要按钮'
    },
    type: 'primary',
    icon: 'el-icon-search',
    round: false,
    size: 'small',
    plain: false,
    circle: false,
    disabled: false,
    hidden: false
  },
  {
    __config__: {
      label: '分割线',
      showLabel: false,
      tag: 'el-divider',
      tagIcon: 'divider',
      span: 24,
      layout: 'colFormItem',
      document: ''
    },
    direction: 'horizontal',
    'content-position': 'center',
    hidden: false
  }
  // {
  //     __config__: {
  //         layout: 'colFormItem',
  //         tagIcon: 'table',
  //         tag: 'el-table',
  //         document: '',
  //         span: 24,
  //         formId: 101,
  //         renderKey: 1595761764203,
  //         componentName: 'row101',
  //         showLabel: true,
  //         changeTag: true,
  //         labelWidth: null,
  //         label: '表格',
  //         children: [{
  //             __config__: {
  //                 layout: 'raw',
  //                 tag: 'el-table-column',
  //                 renderKey: 15957617660153
  //             },
  //             prop: 'date',
  //             label: '日期',
  //             align: 'center'
  //         }, {
  //             __config__: {
  //                 layout: 'raw',
  //                 tag: 'el-table-column',
  //                 renderKey: 15957617660152
  //             },
  //             prop: 'address',
  //             label: '地址',
  //             align: 'center'
  //         }, {
  //             __config__: {
  //                 layout: 'raw',
  //                 tag: 'el-table-column',
  //                 renderKey: 15957617660151
  //             },
  //             prop: 'name',
  //             label: '名称',
  //             align: 'center'
  //         }, {
  //             __config__: {
  //                 layout: 'raw',
  //                 tag: 'el-table-column',
  //                 renderKey: 1595774496335,
  //                 children: [{
  //                     __config__: {
  //                         label: '按钮',
  //                         tag: 'el-button',
  //                         tagIcon: 'button',
  //                         layout: 'raw',
  //                         renderKey: 1595779809901
  //                     },
  //                     __slot__: {
  //                         default: '编辑'
  //                     },
  //                     type: 'text',
  //                     icon: '',
  //                     round: false,
  //                     size: 'mini'
  //                 }, {
  //                     __config__: {
  //                         label: '按钮',
  //                         tag: 'el-button',
  //                         tagIcon: 'button',
  //                         layout: 'raw',
  //                         renderKey: 1595779809902
  //                     },
  //                     __slot__: {
  //                         default: '删除'
  //                     },
  //                     type: 'text',
  //                     icon: '',
  //                     round: false,
  //                     size: 'mini'
  //                 }]
  //             },
  //             label: '操作',
  //             align: 'center'
  //         }]
  //     },
  //     data: [{
  //         date: '2016-05-02',
  //         name: '王小虎',
  //         address: '上海市普陀区金沙江路 1518 弄'
  //     }],
  //     border: true,
  //     type: 'default',
  //     justify: 'start',
  //     align: 'top'
  // }
]
