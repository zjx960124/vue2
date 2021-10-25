import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    redirect: '/build',
    hidden: true
  },
  {
    path: '/index',
    component: () => import('@/views/index'),
    hidden: true
  },
  {
    path: '/first',
    component: () => import('@/views/first/index')
  },
  {
    path: '/htmls',
    component: () => import('@/views/first/htmls')
  },
  {
    path: '/build',
    name: 'build',
    component: () => import('@/views/build/index')
  },
  {
    path: '/campus',
    name: 'campus',
    component: () => import('@/views/build/campusManagement')
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/build/teachers')
  },
  {
    path: '/studentDevelopment',
    name: 'studentDevelopment',
    component: () => import('@/views/build/studentDevelopment')
  },
  {
    path: '/networkTeaching',
    name: 'networkTeaching',
    component: () => import('@/views/build/networkTeaching')
  },
  {
    path: '/OAProcess',
    name: 'OAProcess',
    component: () => import('@/views/build/OAProcess')
  }
];

export const notFoundRouter = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
