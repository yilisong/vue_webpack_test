import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'

const state = {
  mealList: [],
  total_price: '0.00',
  order_info: {},
  order_code: ''
}

const actions = {
  getShieldMealList({ commit, state }, params) {
    if (params) {
      SourcePurchaseResource.getRiskDetectionMealList(params).then(response => {
        const list = response.data.data
        commit(types.GET_SHIELD_MEAL_LIST, { list })
      })
    } else {
      SourcePurchaseResource.getScanMealList(params).then(response => {
        const list = response.data.data
        commit(types.GET_SHIELD_MEAL_LIST, { list })
      })
    }
  },
  confirmShieldSetting({ dispatch, commit, state }, params) {
    const {
      service_type,
      product_meal_id,
      frequency,
      buy_time,
      buy_number
    } = params
    const foramt_service_type = Number(service_type)
    if (foramt_service_type) {
      const params = { product_meal_id, frequency, buy_time, buy_number }
      dispatch('changeLoadingStatus')
      SourcePurchaseResource.confirmRiskDetectionSetting(
        params
      ).then(response => {
        const data = response.data.data
        const total_price = data.total_price
        commit(types.CONFIRM_SHIELD_ORDER_INFO, { data })
        commit(types.CONFIRM_SHIELD_TOTAL_PRICE, { total_price })
        dispatch('changeLoadingStatus')
      })
    } else {
      const params = { product_meal_id, buy_number }
      dispatch('changeLoadingStatus')
      SourcePurchaseResource.confirmScanSetting(params).then(response => {
        const data = response.data.data
        const total_price = data.total_price
        commit(types.CONFIRM_SHIELD_ORDER_INFO, { data })
        commit(types.CONFIRM_SHIELD_TOTAL_PRICE, { total_price })
        dispatch('changeLoadingStatus')
      })
    }
  },
  createShieldOrder({ dispatch, commit, state }, params) {
    const {
      service_type,
      product_meal_id,
      frequency,
      buy_time,
      buy_number
    } = params
    const format_service_type = Number(service_type)
    if (format_service_type) {
      const order_code = localStorage.getItem('detect_order_code')
      if (order_code) {
        dispatch('getNotPaidOrderInfo', { order_code })
      } else {
        const params = { product_meal_id, frequency, buy_time, buy_number }
        dispatch('changeLoadingStatus')
        SourcePurchaseResource.createRiskDetectionOrder(
          params
        ).then(response => {
          const order_code = response.data.data.order_code
          localStorage.setItem('detect_order_code', order_code)
          commit(types.GET_SHIELD_ORDER_CODE, { order_code })
          dispatch('getNotPaidOrderInfo', { order_code })
          dispatch('changeLoadingStatus')
        })
      }
    } else {
      const order_code = localStorage.getItem('scan_order_code')
      if (order_code) {
        dispatch('getNotPaidOrderInfo', { order_code })
      } else {
        const params = { product_meal_id, buy_number }
        dispatch('changeLoadingStatus')
        SourcePurchaseResource.createScanOrder(params).then(response => {
          const order_code = response.data.data.order_code
          localStorage.setItem('scan_order_code', order_code)
          commit(types.GET_SHIELD_ORDER_CODE, { order_code })
          dispatch('getNotPaidOrderInfo', { order_code })
          dispatch('changeLoadingStatus')
        })
      }
    }
  }
}

const mutations = {
  [types.GET_SHIELD_MEAL_LIST](state, { list }) {
    state.mealList = list
  },
  [types.CONFIRM_SHIELD_ORDER_INFO](state, { data }) {
    state.order_info = data
  },
  [types.CONFIRM_SHIELD_TOTAL_PRICE](state, { total_price }) {
    state.total_price = total_price
  },
  [types.GET_SHIELD_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  }
}

export default {
  state,
  actions,
  mutations
}
