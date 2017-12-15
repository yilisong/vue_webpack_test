import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getCloudMonitorMealList({ commit, state }, params) {
    SourcePurchaseResource.getCloudMonitorMealList(params).then(response => {
      const { list } = response.data.data
      commit(types.GET_MONITOR_MEAL_LIST, { list })
    })
  },
  confirmCloudMonitorSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmCloudMonitorSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_MONITOR_ORDER_INFO, { data })
      commit(types.CONFIRM_MONITOR_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createCloudMonitorOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('monitor_order_code')
    if (!order_code) {
      SourcePurchaseResource.createCloudMonitorOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('monitor_order_code', order_code)
        commit(types.GET_MESSAGE_ORDER_CODE, { order_code })
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
  [types.GET_MONITOR_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_MONITOR_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_MONITOR_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_MONITOR_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
