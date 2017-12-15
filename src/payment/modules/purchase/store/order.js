import * as types from '../constants/MutationTypes'
import SourcePurchaseResource from '../resource/sourcePurchaseResource'
import { fromUrls } from 'common/config/fromUrls'
import { Message, MessageBox } from 'element-ui'

const state = {
  order_code: '',
  coupon_code: '',
  order_info: {},
  pay_price: 0,
  balance: 0,
  insufficient: false
}

const actions = {
  // from order
  getNotPaidOrderInfo({ dispatch, commit, state }, params) {
    const { order_code, coupon_code } = params
    return SourcePurchaseResource.getNotPaidOrderInfo(params).then(response => {
      const orderInfo = response.data.data
      commit(types.GET_ORDER_INFO, { orderInfo })
      commit(types.FETCH_COUPON_CODE, { coupon_code })
    })
  },
  cancelOrderByCode({ dispatch, commit, state }, { pro_name, order_code }) {
    MessageBox.confirm('此操作将取消订单，是否继续？', '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      dispatch('changeLoadingStatus')
      SourcePurchaseResource.cancelOrderByCode({
        order_code
      })
        .then(response => {
          dispatch('changeLoadingStatus')
          Message.info({
            message: '订单取消成功。'
          })
          if (pro_name === 'scan' || pro_name === 'detect') {
            window.location = fromUrls.shield
          } else {
            window.location = fromUrls[pro_name]
          }
        })
        .catch(() => {
          dispatch('changeLoadingStatus')
          if (pro_name === 'scan' || pro_name === 'detect') {
            window.location = fromUrls.shield
          } else {
            window.location = fromUrls[pro_name]
          }
        })
    })
  },
  orderPrepayByCode({ dispatch, commit, state }, params) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.orderPrepayByCode(params)
      .then(response => {
        const { pay_price, balance } = response.data.data
        commit(types.GET_ORDER_PAY_PRICE, { pay_price })
        commit(types.GET_ORDER_BALANCE, { balance })
        if (Number(pay_price) > Number(balance)) {
          commit(types.GET_ORDER_INSUFFICIENT, { insufficient: true })
        } else {
          commit(types.GET_ORDER_INSUFFICIENT, { insufficient: false })
        }
        dispatch('changeLoadingStatus')
      })
      .catch(() => {
        dispatch('changeLoadingStatus')
      })
  },
  orderPayByCode(
    { dispatch, commit, state },
    { pro_name, order_code, coupon_code }
  ) {
    dispatch('changeLoadingStatus')
    SourcePurchaseResource.orderPayByCode({
      order_code,
      coupon_code
    })
      .then(() => {
        dispatch('changeLoadingStatus')
        if (pro_name === 'scan' || pro_name === 'detect') {
          window.location = fromUrls.shield
        } else {
          window.location = fromUrls[pro_name]
        }
      })
      .catch(() => {
        dispatch('changeLoadingStatus')
        if (pro_name === 'scan' || pro_name === 'detect') {
          window.location = fromUrls.shield
        } else {
          window.location = fromUrls[pro_name]
        }
      })
  },
  launchRecharge({ dispatch, commit, state }, { total_fee, tempWindow }) {
    SourcePurchaseResource.launchRecharge({
      total_fee
    }).then(response => {
      tempWindow.location = response.data.data.alipay_form_params.request_url
      commit(types.RECHARGE_VISIBLE, { visible: false })
      MessageBox.confirm('确认已完成充值？', '提示', {
        type: 'warning',
        confirmButtonText: '已完成',
        cancelButtonText: '未完成'
      })
        .then(() => {
          dispatch('orderPrepayByCode', {
            order_code: state.order_code,
            coupon_code: state.coupon_code
          })
        })
        .catch(() => {
          dispatch('orderPrepayByCode', {
            order_code: state.order_code,
            coupon_code: state.coupon_code
          })
        })
    })
  }
}

const mutations = {
  [types.FETCH_ORDER_CODE](state, { order_code }) {
    state.order_code = order_code
  },
  [types.FETCH_COUPON_CODE](state, { coupon_code }) {
    state.coupon_code = coupon_code
  },
  [types.GET_ORDER_INFO](state, { orderInfo }) {
    state.order_info = orderInfo
  },
  [types.GET_ORDER_PAY_PRICE](state, { pay_price }) {
    state.pay_price = pay_price
  },
  [types.GET_ORDER_BALANCE](state, { balance }) {
    state.balance = balance
  },
  [types.GET_ORDER_INSUFFICIENT](state, { insufficient }) {
    state.insufficient = insufficient
  }
}

export default {
  state,
  mutations,
  actions
}
