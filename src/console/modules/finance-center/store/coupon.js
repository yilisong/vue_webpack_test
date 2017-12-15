import * as types from '../constants/MutationTypes'
import SourceFinanceResource from '../resource/SourceFinanceResource'

const state = {
  list: [],
  total: 0
}

const actions = {
  getCouponByPage({ commit, state }, params) {
    SourceFinanceResource.getCouponByPage(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_COUPON_BY_PAGE, {
        list
      })
      commit(types.RECEIVE_COUPON_TOTAL, {
        total
      })
    })
  }
}

const mutations = {
  [types.RECEIVE_COUPON_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_COUPON_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  }
}

export default {
  state,
  actions,
  mutations
}
