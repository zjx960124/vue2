import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '@/layouts/index'
import store from '../layouts/store'
Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    redirect: '/index/user'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/index',
    component: Layout,
    hidden: false,
    meta: {
      title: '跳板'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user'),
        meta: {
          title: '用户管理',
          attribution: 'system'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role'),
        meta: {
          title: '角色管理',
          attribution: 'system'
        }
      },
      {
        path: 'operationLog',
        name: 'operationLog',
        component: () => import('@/views/system/operationLog'),
        meta: {
          title: '操作日志',
          attribution: 'system'
        }
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: () => import('@/views/system/dictionary'),
        meta: {
          title: '字典管理',
          attribution: 'system'
        }
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('@/views/informationTip/information'),
        meta: {
          title: '信息公告',
          attribution: 'informationTip'
        }
      },
      {
        path: 'ratePlan',
        name: 'ratePlan',
        component: () => import('@/views/newlyBorn/ratePlan'),
        meta: {
          title: '收费计划',
          attribution: 'newlyBorn'
        }
      },
      {
        path: 'billingRecords',
        name: 'billingRecords',
        component: () => import('@/views/newlyBorn/billingRecords'),
        meta: {
          title: '支付账单记录',
          attribution: 'newlyBorn'
        }
      }
    ]
  }
]

store.state.router = constantRoutes;

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

export default router
