import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  domainList: [],
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getTaichiDnsDomainList({ commit, state }, params) {
    SourcePurchaseResource.getTaichiDnsDomainList(params).then(response => {
      const list = response.data.data
      commit(types.GET_TAICHI_DNS_DOMAIN_LIST, { list })
    })
  },
  getTaichiDnsMealList({ commit, state }, params) {
    SourcePurchaseResource.getTaichiDnsMealList(params).then(response => {
      const list = response.data.data.data
      const remain = response.data.data.format_surplus_time
      commit(types.GET_TAICHI_DNS_MEAL_LIST, { list })
    })
  },
  confirmTaichiDnsSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmTaichiDnsSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_TAICHI_DNS_ORDER_INFO, { data })
      commit(types.CONFIRM_TAICHI_DNS_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createTaiChiDnsOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('taichiDns_order_code')
    if (!order_code) {
      SourcePurchaseResource.createTaiChiDnsOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('taichiDns_order_code', order_code)
        commit(types.GET_TAICHI_DNS_ORDER_CODE, { order_code })
        dispatch('getNotPaidOrderInfo', { order_code })
        dispatch('changeLoadingStatus')
      })
    } else {
      dispatch('getNotPaidOrderInfo', { order_code })
      dispatch('changeLoadingStatus')
    }
  },
  resetTotalPrice({ commit }) {
    commit(types.CONFIRM_TAICHI_DNS_TOTAL_PRICE, { total_price: '0.00' })
  }
}

const mutations = {
  [types.GET_TAICHI_DNS_DOMAIN_LIST](state, { list }) {
    state.domainList = list
  },
  [types.GET_TAICHI_DNS_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_TAICHI_DNS_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_TAICHI_DNS_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_TAICHI_DNS_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
