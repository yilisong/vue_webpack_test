import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  remain: '',
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  // for cloud-speed
  getSpeedMealList({ commit, state }, params) {
    SourcePurchaseResource.getSpeedMealList(params).then(response => {
      const list = response.data.data.data
      const remain = response.data.data.surplus_flow
      commit(types.GET_SPEED_MEAL_LIST, { list })
      commit(types.GET_SPEED_SURPLUS_FLOW, { remain })
    })
  },
  confirmSpeedSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmSpeedSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_SPEED_ORDER_INFO, { data })
      commit(types.CONFIRM_SPEED_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createSpeedOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('speed_order_code')
    if (!order_code) {
      SourcePurchaseResource.createSpeedOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('speed_order_code', order_code)
        commit(types.GET_SPEED_ORDER_CODE, { order_code })
        dispatch('getNotPaidOrderInfo', { order_code })
        dispatch('changeLoadingStatus')
      })
    } else {
      dispatch('getNotPaidOrderInfo', { order_code })
      dispatch('changeLoadingStatus')
    }
  },
  resetTotalPrice({ commit }) {
    commit(types.CONFIRM_SPEED_TOTAL_PRICE, {
      total_price: '0.00'
    })
  }
}

const mutations = {
  [types.GET_SPEED_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.GET_SPEED_SURPLUS_FLOW](state, { remain }) {
    state.remain = remain
  },
  [types.CONFIRM_SPEED_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_SPEED_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_SPEED_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
