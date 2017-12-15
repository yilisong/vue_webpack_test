const state = {
  unReadNumber: 0
}

const actions = {
  getUnReadNumber({ commit, state }, param) {
    commit('changeUnreadNumber', param)
  }
}

const mutations = {
  changeUnreadNumber(state, param) {
    state.unReadNumber = param
  }
}

export default {
  state,
  actions,
  mutations
}
