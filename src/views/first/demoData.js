const formOption = {
  ref: 'formValidate',
  style: { //表单样式，非必须
    width: '',
    margin: 'auto',
    paddingTop: '30px',
    border: '1px solid #cccccc'
  },
  className: 'form',
  formProps: { //非必须
    'label-width': '70px',
    'span': 12
  },
  formData: {//所要监听的表单字段数据，必须
    name: '',
    city: '',
    sex: 'female',
    names: '1'
  },
  formItem: [ //iview form表单的每个formItem，必须
    {
      type: 'input',
      label: '名称', //对应formItem的label
      key: 'name', //key对应formData中的字段
      props: {
        placeholder: '请输入名称',
        span: 12
      },
      rules: {  //表单检测规则，非必须
        required: true,
        message: '请填写名称',
        trigger: 'blur',
      },
    },
    {
      type: 'collapse',
      label: '折叠', //对应formItem的label
      key: 'names', //key对应formData中的字段
      style: {
        width: `calc(100% - 80px)`,
        margin: 'auto',
        marginBottom: '40px'
      },
      children: [
        {
          type: 'collapse-item',
          props: {
            title: '测试折叠',
            name: '1',
          },
          children: [{
            text: '1111111111111111111111111'
          }]
        }
      ],
      props: {
        placeholder: '请输入名称',
        span: 24,
        title: '折叠',
        vModel: 'names'
      }
    },
    {
      type: 'select',
      label: '城市', //对应formItem的label
      key: 'city', //key对应formData中的字段
      style: {
        width: '100%'
      },
      props: {
        placeholder: '请输入名称',
        span: 12
      },
      children: [{ label: 'xml', value: '1' },
        { label: 'json', value: '2' },
        { label: 'hl7', value: '3' }
      ],
      rules: {  //表单检测规则，非必须
        required: true,
        message: '请选择城市',
        trigger: 'blur',
      },
    },
    {
      type: 'radio',
      key: 'sex',
      label: 'sex',
      children: [
        {
          text: '男性',
          label: 'female',
        },
        {
          text: '女性',
          label: 'male',
        },
      ],
      events: {
        'on-change': (vm, value) => {
          vm.$emit('on-change', value);
        },
      },
    }
  ],
  events: events('formValidate'),//表单按钮组
}

function events (ref) {
  return {
    ref,
    style: {
      textAlign: 'center',
      'margin-top': '20px !important'
    },
    reset: {
      text: '取消',
      props: {
        type: 'primary'
      },
      success(formData, vm) {
        vm.$emit('on-change')
      }
    },
    submit: {
      text: '保存',
      span: 24,
      props: {
        type: 'primary'
      },
      success(formData, vm) {
        vm.$emit('on-submit', {formData, ref})
      },
      fail(formData) {
        console.log(formData)
      }
    }
  }
}

export default  formOption;
