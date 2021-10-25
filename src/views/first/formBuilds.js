// form-build.js
import componentObj from './formBuild'
import { version } from '../../../package';
const formBuild = {
  props: {
    options: {
      type: Object,
      required: true
    },
  },
  render(h) {
    const options = this.options
    const formData = options.formData

    if (!options.formItem) {
      return h('div')
    }

    console.log(options);

    // 生成表单配置的组件
    const components = options.formItem.map(item => {
      let func = componentObj[item.type]
      let subComponent = func? func.call(this, h, formData, item, this) : null
      let component = null;
      if (item.type === 'collapse') {
        component = subComponent;
      } else {
        component = componentObj['formItem'].call(this, h, item, subComponent, formData)
      }
      // let component = componentObj['formItem'].call(this, h, item, subComponent, formData)
      return componentObj['col'].call(this, h, item, component)
    })

    const childComp = [];

    const fromComp = h('el-form', {
      ref: options.ref,
      style: options.style ? options.style : '',
      props: {
        model: formData,
        ...options.formProps
      },
      class: 'vue-generate-form'
    }, [
      h('el-row', {
        props: options.rowProps
      }, components)
    ]);

    childComp.push(fromComp);

    if (options.events) {
      const eventComp = componentObj['events'].call(this, h, formData, options.events , this)
      childComp.push(eventComp)
    }
    return h('div', [childComp]);
  }
}

const install = function (Vue, ops = {}) {
  Vue.component('formBuild', formBuild)
}

const API = {
  install,
  version
}

if (typeof window !== 'undefined' && window.vue) {
  install(window.vue)
}

export default API


