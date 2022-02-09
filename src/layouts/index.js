import Vue from 'vue';

const components = require.context('./', true, /\.vue$/)

components.keys().forEach(it => {
  const component = components(it)
  Vue.component(component.default.name, component.default)
})

/*
function install(Vue, options) {
  store.start(options)
  Vue.prototype.$layoutStore = store
}*/
export { default as Layout } from './Layout.vue'
