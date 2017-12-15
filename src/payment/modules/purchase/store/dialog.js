import * as types from '../constants/MutationTypes'

const initVisible = false

const state = {
  recharge: {
    visible: initVisible
  }
}

const actions = {
  triggerRechargeVisible({ commit, state }, visible) {
    commit(types.RECHARGE_VISIBLE, { visible })
  }
}

const mutations = {
  [types.RECHARGE_VISIBLE](state, { visible }) {
    state.recharge.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
