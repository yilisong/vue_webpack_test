import * as types from '../constants/mutationTypes'

const initVisible = false

const state = {
  sslConfig: {
    visible: initVisible
  }
}

const actions = {
  triggerSSLConfigVisible({ commit, state }, visible) {
    commit(types.SSLCONFIG_VISIBLE, { visible })
  }
}

const mutations = {
  [types.SSLCONFIG_VISIBLE](state, { visible }) {
    state.sslConfig.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
