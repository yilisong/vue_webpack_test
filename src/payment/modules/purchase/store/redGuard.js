import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  domainList: [],
  noDomain: false,
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getRedGuardDomainList({ commit, state }, params) {
    SourcePurchaseResource.getRedGuardDomainList(params).then(response => {
      const list = response.data.data
      if (!list.length) {
        commit(types.FETCH_NODOMAIN_BY_ERROR, { status: true })
      }
      commit(types.GET_REDGUARD_DOMAIN_LIST, { list })
    })
  },
  getRedGuardMealList({ commit, state }, params) {
    SourcePurchaseResource.getRedGuardMealList(params).then(response => {
      const list = response.data.data
      commit(types.GET_REDGUARD_MEAL_LIST, { list })
    })
  },
  confirmRedGuardSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmRedGuardSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_REDGUARD_TOTAL_PRICE, { total_price })
      commit(types.CONFIRM_REDGUARD_ORDER_INFO, { data })
      dispatch('changeLoadingStatus')
    })
  },
  createRedGuardOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('redguard_order_code')
    if (!order_code) {
      SourcePurchaseResource.createRedGuardOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('redguard_order_code', order_code)
        commit(types.GET_REDGUARD_ORDER_CODE, { order_code })
        dispatch('getNotPaidOrderInfo', { order_code })
        dispatch('changeLoadingStatus')
      })
    } else {
      dispatch('getNotPaidOrderInfo', { order_code })
      dispatch('changeLoadingStatus')
    }
  },
  resetTotalPrice({ commit }) {
    commit(types.CONFIRM_REDGUARD_TOTAL_PRICE, { total_price: '0.00' })
  }
}

const mutations = {
  [types.GET_REDGUARD_DOMAIN_LIST](state, { list }) {
    state.domainList = list
  },
  [types.FETCH_NODOMAIN_BY_ERROR](state, { status }) {
    state.noDomain = status
  },
  [types.GET_REDGUARD_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_REDGUARD_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.CONFIRM_REDGUARD_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.GET_REDGUARD_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
