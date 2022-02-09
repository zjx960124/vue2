import App from './App.vue'
import Vue from 'vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/font.css';
import '@/assets/iconfont/iconfont.css'

import PageForm from './components/PageForm/index.vue'
import PageTable from './components/PageTable/index.vue'
import http from './utils/http'

import '@/permission'
import '@/utils/dialog'
import pinyin from 'js-pinyin'

import store from './store'

import '@/assets/font/font.css'
import '../src/styles/index.scss'

import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('VueUeditorWrap',VueUeditorWrap)


import '@/components/titleLayout'

Vue.use(ElementUI)
Vue.component('PageForm', PageForm)
Vue.component('PageTable', PageTable)

Vue.prototype.http = http
Vue.prototype.$Bus = new Vue()
Vue.prototype.pinyin = pinyin

Vue.filter('locale', function (val) {
  val = parseInt(val)
  return Number.isFinite(val) ? val.toLocaleString('zh', { style: 'decimal' }) : 0
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

