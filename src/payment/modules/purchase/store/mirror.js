import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  mealList: [],
  total_price: '199.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getDoubleMirrorMealList({ commit, state }, params) {
    SourcePurchaseResource.getDoubleMirrorMealList(params).then(response => {
      const { list, remain } = response.data.data
      commit(types.GET_DOUBLEMIRROR_MEAL_LIST, { list })
    })
  },
  confirmDoubleMirrorSetting({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.confirmDoubleMirrorSetting(params).then(response => {
      const data = response.data.data
      const total_price = data.total_price
      commit(types.GET_MIRROR_ORDER_INFO, { data })
      commit(types.GET_MIRROR_TOTAL_PRICE, { total_price })
      dispatch('changeLoadingStatus')
    })
  },
  createDoubleMirrorOrder({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    const order_code = localStorage.getItem('mirror_order_code')
    if (!order_code) {
      SourcePurchaseResource.createDoubleMirrorOrder(params).then(response => {
        const order_code = response.data.data.order_code
        localStorage.setItem('mirror_order_code', order_code)
        commit(types.GET_MIRROR_ORDER_CODE, { order_code })
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
  [types.GET_DOUBLEMIRROR_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.GET_MIRROR_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.GET_MIRROR_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_MIRROR_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  mutations,
  actions
}
