import * as types from '../constants/mutation-types'

const state = {
  package: {
    gameComboId: ''
  }
}

const actions = {
  changeGameComboId({ commit, state }, id) {
    commit(types.GAME_COMBO_ID, {
      id
    })
  }
}

const mutations = {
  [types.GAME_COMBO_ID](state, { id }) {
    // 变更id
    state.package.gameComboId = id
  }
}

export default {
  state,
  actions,
  mutations
}
