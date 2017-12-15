import * as types from '../constants/MutationTypes'
import TaichiResource from '../resource/TaichiResource'

const state = {
  operateRecordTable: [],
  operateRecordTotal: 0
}

const actions = {
  getOperateLog({ commit, state }, params) {
    TaichiResource.getOperateLog(params).then(response => {
      const total = response.data.data.total
      const list = response.data.data.list
      commit(types.GET_OPERATE_LOG, { list, total })
    })
  }
}

const mutations = {
  [types.GET_OPERATE_LOG](state, { list, total }) {
    state.operateRecordTable = list
    state.operateRecordTotal = Number(total)
  }
}

export default {
  state,
  actions,
  mutations
}
