import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import {
  setPv
} from './utils/set-pv-uv'
import state from './layouts/store'

NProgress.configure({
  showSpinner: false
});

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  // const hasGetUserInfo = store.getters.name
  const hasGetUserInfo = '1';
  if (hasGetUserInfo) {
    // 直接跳转
    next()
  } else {
    // 拉取用户信息
    store.dispatch('user/getInfo').then(() => {
      const accessRoutes = store.getters.routers
      router.options.routes = accessRoutes
      // 添加后台路由表
      router.addRoutes(accessRoutes)
      next({
        ...to,
        replace: true
      })
    }).catch(error => {
      // 清除token,跳转到登录
      store.dispatch('user/resetToken').then(() => {
        Message.error(error || '验证失败,请重新登录')
        NProgress.done()
      })
    })
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
  const username = store.getters.username
  state.changeActive(to.fullPath.split('/')[2]);
  //  tool pv
  /*if (username) {
    setPv(username, store.getters.roleCodesString, store.getters.roleNamesString, to.path, to.meta.title)
  }*/
})
