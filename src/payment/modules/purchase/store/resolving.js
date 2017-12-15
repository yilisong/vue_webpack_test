import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getResolvingMealList({ commit, state }, params) {
    SourcePurchaseResource.getResolvingMealList(params).then(response => {
      const list = response.data.data.data
      commit(types.GET_RESOLVING_MEAL_LIST, { list })
    })
  },
  confirmResolvingSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmResolvingSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_RESOLVING_ORDER_INFO, { data })
      commit(types.CONFIRM_RESOLVING_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createResolvingOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('resolving_order_code')
    if (!order_code) {
      SourcePurchaseResource.createResolvingOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('resolving_order_code', order_code)
        commit(types.GET_RESOLVING_ORDER_CODE, { order_code })
        dispatch('getNotPaidOrderInfo', { order_code })
        dispatch('changeLoadingStatus')
      })
    } else {
      dispatch('getNotPaidOrderInfo', { order_code })
      dispatch('changeLoadingStatus')
    }
  }
}

const mutations = {
  [types.GET_RESOLVING_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_RESOLVING_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_RESOLVING_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_RESOLVING_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  mutations,
  actions
}
