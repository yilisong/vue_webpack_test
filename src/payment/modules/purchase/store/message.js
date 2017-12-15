import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getMessageMealList({ dispatch, commit, state }, params) {
    SourcePurchaseResource.getMessageMealList(params).then(response => {
      const list = response.data.data
      commit(types.GET_MESSAGE_MEAL_LIST, { list })
    })
  },
  confirmMessageSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmMessageSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.CONFIRM_MESSAGE_ORDER_INFO, { data })
      commit(types.CONFIRM_MESSAGE_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createMessageOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('message_order_code')
    if (!order_code) {
      SourcePurchaseResource.createMessageOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('message_order_code', order_code)
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
  [types.GET_MESSAGE_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_MESSAGE_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_MESSAGE_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_MESSAGE_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  mutations,
  actions
}
