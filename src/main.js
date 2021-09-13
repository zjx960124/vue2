import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueContextMenu from 'vue-contextmenu'
import vuescroll from 'vuescroll'
import VueClipboard from 'vue-clipboard2'
import Print from 'vue-print-nb'


import '@/styles/index.scss'
import '@/styles/common.scss'
import '@/assets/font/font.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'
import globalVariable from '@/api/global_variable'
import '@/utils/dialog'
import PageForm from '@/components/PageForm'
import PageTable from '@/components/PageTable'
import JsTree from '@/components/JsTree'
import Tinymce from '@/components/tinymce/index.vue'
import pinyin from 'js-pinyin'

import formCreate from '@form-create/element-ui'

import {
  sameKeySetValue,
  isEmpty,
  filterParams
} from '@/utils/index'
import {
  processingImgUrl
} from '@/utils/common'

Vue.prototype.pinyin = pinyin
Vue.prototype.globalData = globalVariable
Vue.prototype.sameKeySetValue = sameKeySetValue
Vue.prototype.isEmpty = isEmpty
Vue.prototype.filterParams = filterParams
Vue.prototype.processingImgUrl = processingImgUrl
VueClipboard.config.autoSetContainer = true

Vue.use(ElementUI)
Vue.use(VueContextMenu)
Vue.use(vuescroll)
Vue.use(VueClipboard)
Vue.use(Print)
Vue.use(formCreate)


Vue.component('PageForm', PageForm)
Vue.component('PageTable', PageTable)
Vue.component('JsTree', JsTree)
Vue.component('tinymce', Tinymce)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
