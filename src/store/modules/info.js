import {getDeptList} from '@/api/base'

const state = {
  appAttributeInfo: null,
  appId: '',
  appCode: '',
  device: '',
  dept: []
}

const mutations = {
  APPATTRIBUTEINFO_SETTING: (state, {
    key,
    value
  }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SETCURRENTAPPID: (state, appId) => {
    state.appId = appId;
  },
  SETCURRENTAPPCODE: (state, appCode) => {
    state.appCode = appCode;
  },
  SETDEVICE: (state, device) => {
    state.device = device
  },
  SETDEPT: (state, dept) => {
    state.dept = dept
    console.log(state.dept);
  }
}

const actions = {
  appAttributeInfoSet({ commit }, data) {
    commit('APPATTRIBUTEINFO_SETTING', { key: 'appAttributeInfo', value: data })
  },
  setCurrentAppId({ commit }, data) {
    commit('SETCURRENTAPPID', data)
  },
  setCurrentAppCode({ commit }, data) {
    commit('SETCURRENTAPPCODE', data)
  },
  setDevice({ commit }, data) {
    commit('SETDEVICE', data)
  },
  setDept( { commit }, state) {
    return new Promise((resolve, reject) => {
      getDeptList().then((res) => {
        console.log(res);
        commit('SETDEPT', res.data);
        resolve(res.data);
      }).catch((err) => {
        reject();
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
