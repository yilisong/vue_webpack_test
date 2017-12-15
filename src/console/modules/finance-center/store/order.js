import * as types from '../constants/MutationTypes'
import SourceFinanceResource from '../resource/SourceFinanceResource'

const state = {
  // order list
  list: [],
  total: 0,
  // apply for invoice
  changeOrderList: false,
  // order details
  orderCode: '',
  couponCode: '',
  // prepay
  payPrice: 0,
  balance: 0,
  insufficient: false
}

const actions = {
  getOrderByPage({ commit, state }, params) {
    return SourceFinanceResource.getOrderByPage(params)
  },
  cancelOrderByCode({ commit, state, dispatch }, params) {
    return SourceFinanceResource.cancelOrderByCode(params)
  },
  prepayOrderByCode({ commit, state }, params) {
    SourceFinanceResource.prepayOrderByCode(params).then(response => {
      const data = response.data.data
      const payPrice = Number(data.pay_price)
      const balance = Number(data.balance)
      const insufficient = Boolean(balance < payPrice)
      commit(types.RECEIVE_PAY_PRICE, { payPrice })
      commit(types.RECEIVE_BALANCE, { balance })
      commit(types.RECEIVE_INSUFFICIENT, { insufficient })
    })
  },
  payForOrderByCode({ commit, state }, { order_code, vm }) {
    SourceFinanceResource.payForOrderByCode({ order_code }).then(response => {
      vm.$message({
        type: 'success',
        message: '支付成功。'
      })
      vm.$router.push({
        path: 'orderList'
      })
    })
  },
  getOrderDetailById({ commit, state }, params) {
    return SourceFinanceResource.getOrderDetailById(params)
  },
  getNotPaidOrderInfo({ commit, state }, params) {
    return SourceFinanceResource.getNotPaidOrderInfo(params)
  },
  applyForInvoice({ dispatch, commit, state }, params) {
    SourceFinanceResource.applyForInvoice(params).then(() => {
      commit(types.CHANGE_ORDER_LIST, { status: true })
    })
  }
}

const mutations = {
  // order list
  [types.RECEIVE_ORDER_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_ORDER_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  // apply for invoice
  [types.CHANGE_ORDER_LIST](state, { status }) {
    state.changeOrderList = status
  },
  // order details
  [types.RECEIVE_ORDER_CODE](state, { code }) {
    state.orderCode = code
  },
  [types.RECEIVE_COUPON_CODE](state, { couponCode }) {
    state.couponCode = couponCode
  },
  // prepay
  [types.RECEIVE_PAY_PRICE](state, { payPrice }) {
    state.payPrice = payPrice
  },
  [types.RECEIVE_BALANCE](state, { balance }) {
    state.balance = balance
  },
  [types.RECEIVE_INSUFFICIENT](state, { insufficient }) {
    state.insufficient = insufficient
  }
}

export default {
  state,
  actions,
  mutations
}
