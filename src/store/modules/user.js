import {
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import {
  constantRoutes,
  notFoundRouter,
  resetRouter
} from '@/router'
import routerFormat from '@/utils/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    routers: constantRoutes,
    depts: '',
    roles: '',
    roleCodesString: '',
    roleNamesString: '',
    currentRoutes: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTERS: (state, routers) => {
    // 路由访问
    state.addRouters = routers
    // 菜单显示,404最后加入
    // 移除默认首页
    // constantRoutes.splice(1, 1)
    state.routers = constantRoutes.concat(routers).concat(notFoundRouter)
  },
  SET_CURRENT_ROUTES: (state, routes) => {
    state.currentRoutes = routes
  },
  SET_DEPTS: (state, depts) => {
    state.depts = depts
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLECODESSTRING: (state, roleCodesString) => {
    state.roleCodesString = roleCodesString
  },
  SET_ROLENAMESSTRING: (state, roleNamesString) => {
    state.roleNamesString = roleNamesString
  }
}

const actions = {

  // 获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      var params = {
        appCode: 'enrollment'
      }
      getInfo(params).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('获取用户信息出错')
        }
        const {
          name,
          username,
          avatar,
          routers,
          depts,
          grantRole
        } = data

        commit('SET_NAME', name)
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ROUTERS', routerFormat(routers))
        commit('SET_DEPTS', depts)
        commit('SET_ROLES', grantRole)
        let roleCodesString = ''
        let roleNamesString = ''
        if (grantRole && grantRole.length > 0) {
          const roleCodes = []
          const roleNames = []
          grantRole.forEach(item => {
            roleCodes.push(item.roleCode)
            roleNames.push(item.roleName)
          })
          roleCodesString = roleCodes.join(',')
          roleNamesString = roleNames.join(',')
        }
        commit('SET_ROLECODESSTRING', roleCodesString)
        commit('SET_ROLENAMESSTRING', roleNamesString)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
        window.location.href = 'http://i.haiyanproduct.com/cas/logout?service=' + window.location.href
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
