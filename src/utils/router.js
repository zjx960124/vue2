import {
    Message
} from 'element-ui'

export default function (routers) {
    return filterAsyncRouter(routers)
}
// 将后台返回的json权限数据格式化（递归遍历子节点）
export const filterAsyncRouter = (asyncRouterMap) => { // 遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            route.component = loadView(route)
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        if (route.path !== '/taskCenter' && route.path !== '/globalSetting') {
            route.hideSidebar = true
            route.hideBreadcrumb = true
        }
        // if (route.path === '/globalSetting') {
        //   route.hideSidebar = false
        //   route.hideBreadcrumb = false
        // }
        return true
    })
    return accessedRouters
}

export const loadView = (route) => { // 路由懒加载
    if (route.component === 'Layout') {
        return require('@/layout').default
    }
    try {
        const newComponent = require('@/views' + route.component).default
        if (newComponent) {
            return newComponent
        }
        return null
    } catch (error) {
        Message({
            message: `请检查${route.meta.title}的组件是否配置正确:${route.component}`,
            type: 'error',
            duration: 5 * 1000
        })
        return null
    }
}
