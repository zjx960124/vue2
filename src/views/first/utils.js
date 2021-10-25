function events (ref) {
  return {
    ref,
    style: {},
    reset: {
      text: '取消',
      props: {
        type: 'default'
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
