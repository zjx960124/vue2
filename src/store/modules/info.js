const state = {
  appAttributeInfo: null,
  appId: '',
  appCode: '',
  device: ''
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
