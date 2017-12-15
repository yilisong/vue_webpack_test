import * as types from '../constants/MutationTypes'

const state = {
  loading: false
}

const actions = {
  changeLoadingStatus({ state, commit }) {
    const loading = !state.loading
    commit(types.CHANGE_LOADING_STATUS, { loading })
  }
}

const mutations = {
  [types.CHANGE_LOADING_STATUS](state, { loading }) {
    state.loading = loading
  }
}

export default {
  state,
  actions,
  mutations
}
