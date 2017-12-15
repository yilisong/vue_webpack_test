import * as types from '../constants/MutationTypes'
import TaichiResource from '../resource/TaichiResource'

const state = {
  list: [],
  total: 0,
  protectCcData: {}
}

const actions = {
  getDomainList({ commit, state }, params) {
    TaichiResource.getDomainList(params).then(response => {
      const list = response.data.data.list
      const total = response.data.data.total
      commit(types.GET_DOMAIN_LIST, list)
      commit(types.GET_DOMAIN_LIST_TOTAL, total)
    })
  },
  // getProtectCcData({ commit, state }, params) {
  //
  // },
  changeProtectCcData({ commit, state }, params) {
    commit(types.CHANGE_PROTECT_CC_DATA, params)
  },
  saveAddData({ commit, state }, { param, id }) {
    TaichiResource.saveAddData(param, id).then(response => {})
  }
}

const mutations = {
  [types.GET_DOMAIN_LIST](state, list) {
    state.list = list
  },
  [types.GET_DOMAIN_LIST_TOTAL](state, total) {
    state.total = Number(total)
  },
  // [types.GET_PROTECT_CC_DATA](state, list) {
  //   state.protectCcData = list
  // },
  [types.CHANGE_PROTECT_CC_DATA](state, params) {
    // state.protectCcData = list
    if (params === 'blackAdd') {
      state.protectCcData.black_list.unshift({
        group: 'addNewList',
        value: {
          type: '',
          mode: '',
          content: '',
          remark: ''
        },
        order: ''
      })
    } else if (params === 'whiteAdd') {
      state.protectCcData.white_list.unshift({
        group: 'addNewList',
        value: {
          type: '',
          mode: '',
          content: '',
          remark: ''
        },
        order: ''
      })
    } else if (params === 'blackDel') {
      state.protectCcData.black_list.splice(0, 1)
    } else if (params === 'whiteDel') {
      state.protectCcData.white_list.splice(0, 1)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
