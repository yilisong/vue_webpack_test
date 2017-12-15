import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  domainList: [],
  mealList: [],
  noDomain: false,
  remain: '',
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getDomainList({ commit, state }, params) {
    SourcePurchaseResource.getDomainList(params).then(response => {
      const list = response.data.data
      if (!list.length) {
        commit(types.GET_NODOMAIN_FROM_WEB, { noDomain: true })
      }
      commit(types.GET_DOMAIN_LIST, { list })
    })
  },
  getTaichiMealList({ commit, state }, params) {
    SourcePurchaseResource.getTaichiMealList(params).then(response => {
      const list = response.data.data.data
      const remain = response.data.data.format_surplus_time
      commit(types.GET_TAICHI_MEAL_LIST, { list })
      commit(types.GET_TAICHI_SURPLUS_TIME, { remain })
    })
  },
  confirmTaichiSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmTaichiSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_TAICHI_ORDER_INFO, { data })
      commit(types.CONFIRM_TAICHI_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createTaiChiWebOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('taichiWeb_order_code')
    if (!order_code) {
      SourcePurchaseResource.createTaiChiWebOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('taichiWeb_order_code', order_code)
        commit(types.GET_TAICHI_ORDER_CODE, { order_code })
        dispatch('getNotPaidOrderInfo', { order_code })
        dispatch('changeLoadingStatus')
      })
    } else {
      dispatch('getNotPaidOrderInfo', { order_code })
      dispatch('changeLoadingStatus')
    }
  },
  resetTotalPrice({ commit }) {
    commit(types.CONFIRM_TAICHI_TOTAL_PRICE, { total_price: '0.00' })
  }
}

const mutations = {
  [types.GET_DOMAIN_LIST](state, { list }) {
    state.domainList = list
  },
  [types.GET_TAICHI_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.GET_NODOMAIN_FROM_WEB](state, { noDomain }) {
    state.noDomain = noDomain
  },
  [types.GET_TAICHI_SURPLUS_TIME](state, { remain }) {
    state.remain = remain
  },
  [types.CONFIRM_TAICHI_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_TAICHI_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_TAICHI_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
