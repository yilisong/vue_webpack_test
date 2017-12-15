import * as types from '../constants/mutation-types'

const initVisible = false

const state = {
  gameComboSet: {
    visible: initVisible
  },
  editPort: {
    visible: initVisible
  },
  showTotalIP: {
    visible: initVisible
  }
}

const actions = {
  triggerGameComboSetVisible({ commit, state }, visible) {
    commit(types.GAME_COMBO_SET, { visible })
  },
  triggerEditPortVisible({ commit, state }, visible) {
    commit(types.EDIT_PORT, { visible })
  },
  triggerShowTotalIPVisible({ commit, state }, visible) {
    commit(types.SHOW_TOTAL_IP, { visible })
  }
}

const mutations = {
  [types.GAME_COMBO_SET](state, { visible }) {
    state.gameComboSet.visible = visible
  },
  [types.EDIT_PORT](state, { visible }) {
    state.editPort.visible = visible
  },
  [types.SHOW_TOTAL_IP](state, { visible }) {
    state.showTotalIP.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
