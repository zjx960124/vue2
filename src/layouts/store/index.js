import { toggleThemeColorClass, toggleThemeClass } from '@/utils/utils'
const layoutModes = ['ltr', 'lcr', 'ttb']

function findItemByKey(key, menuList) {
  for (let index = 0; index < menuList.length; index++) {
    const temp = menuList[index]
    if (temp.path === key) {
      return temp
    } else {
      if (temp.children && temp.children.length > 0) {
        const result = findItemByKey(key, temp.children)
        if (result) {
          return result
        }
        continue
      }
      continue
    }
  }
}

function logout() {
  this.state.permissionRoutes = []
  this.state.visitedView = []
  this.state.cachedView = []
  localStorage.removeItem('userInfo')
  localStorage.removeItem('visited')
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
function toHump(str) {
  if (!str) return str
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}
function addCachedView(route) {
  if (route.name && route.meta && route.meta.cacheable) {
    const humName = toHump(route.name)
    if (!this.state.cachedView.includes(humName)) {
      this.state.cachedView.push(humName)
    }
    this.addEmptyRouteName()
  }
}
function removeCachedView(route) {
  const humName = toHump(route.name)
  const index = this.state.cachedView.indexOf(humName)
  if (index !== -1) {
    this.state.cachedView.splice(index, 1)
  }
  this.addEmptyRouteName()
}
function resetCachedView() {
  // 从已经访问过的页面的数组中过滤可缓存的页面
  this.state.cachedView = this.state.visitedView.filter((it, index) => {
    return it.name && it.meta && it.meta.cacheable
  }).map(it => toHump(it.name))
  this.addEmptyRouteName()
}
function addEmptyRouteName() {
  if (!this.state.cachedView.includes('RouterViewLayout')) {
    this.state.cachedView.push('RouterViewLayout')
  }
}


export default {
  state: {
    isCollapse: false,
    isFixedNavBar: true,
    layoutMode: 'ltr',
    device: 'pc',
    theme: 'dark-side',
    themeColor: 'theme_color_blue',
    permissionRoutes: [],
    visitedView: [],
    cachedView: [],
    actionItem: {
      showSearch: true,
      showMessage: true,
      showFullScreen: true,
      showRefresh: true
    },
    activeItem: '',
    router: []
  },
  changeActive(active) {
    this.state.activeItem = active;
  },
  start({ state, actions }) {
    state && (this.state = Object.assign(this.state, state))
    if (actions) {
      for (const key in actions) {
        this[key] = actions[key]
      }
    }
    toggleThemeColorClass(document.body, this.state.themeColor)
    toggleThemeClass(document.body, this.state.theme)
  },
  randomLayouMode() {
    return layoutModes[Math.floor(Math.random() * layoutModes.length)]
  },
  toggleCollapse(newStatus) {
    this.state.isCollapse = newStatus
  },
  toggleFixedNavBar(newStatus) {
    this.state.isFixedNavBar = newStatus
  },
  changeLayoutMode(mode = 'ltr') {
    this.state.layoutMode = mode
  },
  changeDevice(device = 'pc') {
    this.state.device = device
  },
  changeTheme(theme = 'light') {
    this.state.theme = theme
    toggleThemeClass(document.body, this.state.theme)
  },
  isShowHeader() {
    return this.state.device === 'pc' && this.state.layoutMode === 'ttb'
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter(it => {
      return !it.hidden && it.children && it.children.length > 0
    })
  },
  initPermissionRoute(routes) {
    this.state.permissionRoutes = routes
  },
  isEmptyPermissionRoute() {
    return (
      !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
    )
  },
  changeSideBarIcon(key = null, icon = null) {
    if (!key || !icon) {
      return
    }
    const menuList = this.state.permissionRoutes.filter(
      it => it.hidden === false
    )
    const item = findItemByKey(key, menuList)
    if (item && item.meta) {
      item.meta.icon = icon
    }
  },
}

/*export default {
  addVisitedView(route) {
    return new Promise(resolve => {
      if (!this.state.visitedView.find(it => it.fullPath === route.fullPath)) {
        this.state.visitedView.push(route)
      }
      this.addCachedView && this.addCachedView(route)
      resolve(route)
    })
  },
  removeVisitedView(route) {
    return new Promise(resolve => {
      this.state.visitedView.splice(this.state.visitedView.indexOf(route), 1)
      this.removeCachedView && this.removeCachedView(route)
      resolve(route)
    })
  },
  closeLeftVisitedView(selectRoute) {
    return new Promise(resolve => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index >= selectIndex
        })
      }
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  closeRightVisitedView(selectRoute) {
    return new Promise(resolve => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index <= selectIndex
        })
      }
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  closeAllVisitedView() {
    return new Promise(resolve => {
      this.state.visitedView = this.state.visitedView.filter((it, index) => {
        return (it.meta && it.meta.affix)
      })
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  persistentVisitedView() {
    const tempPersistendRoutes = this.state.visitedView.map(it => {
      return {
        fullPath: it.fullPath,
        meta: it.meta,
        name: it.name,
        params: it.params,
        path: it.path,
        query: it.query
      }
    })
    localStorage.setItem('visited', JSON.stringify(tempPersistendRoutes))
  },
  restoreVisitedView() {
    this.state.visitedView = [...this.state.visitedView]
    const originRouteString = localStorage.getItem('visited')
    const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
    persistentVisitedRoutes.forEach(originRoute => {
      if (!this.state.visitedView.find(it => it.fullPath === originRoute.fullPath && it.name === originRoute.name)) {
        this.state.visitedView.push(originRoute)
      }
    })
  }
}*/
