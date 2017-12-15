import * as types from '../constants/MutationTypes'
import SourceFinanceResource from '../resource/SourceFinanceResource'
// import { MessageBox } from 'element-ui'

const state = {
  list: [],
  total: 0,
  balance: 0
}

const actions = {
  getRechargeByPage({ commit, state }, params) {
    SourceFinanceResource.getRechargeByPage(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_RECHARGE_BY_PAGE, {
        list
      })
      commit(types.RECEIVE_RECHARGE_TOTAL, {
        total
      })
    })
  },
  launchRecharge(
    { dispatch, commit, state },
    { pageName, orderCode, couponCode, pageSize, total_fee, tempWindow, vm }
  ) {
    SourceFinanceResource.launchRecharge({
      total_fee
    }).then(response => {
      tempWindow.location = response.data.data.alipay_form_params.request_url
      commit(types.PAY_CONFIG_VISIBLE, { visible: false })
      vm.$refs.rechargeForm.resetFields()
      vm
        .$confirm('确认已完成充值?', '提示', {
          type: 'warning',
          confirmButtonText: '已完成',
          cancelButtonText: '未完成'
        })
        .then(() => {
          vm.$message({
            type: 'info',
            message: '充值已完成'
          })
          if (pageName === 'rechargePage') {
            dispatch('getUserBalance')
            dispatch('getRechargeByPage', {
              page: 1,
              per_page: pageSize
            })
          } else if (pageName === 'payPage') {
            dispatch('prepayOrderByCode', {
              order_code: orderCode,
              coupon_code: couponCode
            })
          } else {
            return
          }
        })
        .catch(() => {
          if (pageName === 'rechargePage') {
            dispatch('getUserBalance')
            dispatch('getRechargeByPage', {
              page: 1,
              per_page: pageSize
            })
          } else if (pageName === 'payPage') {
            dispatch('prepayOrderByCode', {
              order_code: orderCode,
              coupon_code: couponCode
            })
          } else {
            return
          }
        })
    })
  },
  getUserBalance({ commit, state }) {
    SourceFinanceResource.getUserBalance().then(response => {
      const balance = response.data.data.balance
      commit(types.RECEIVE_BALANCE, { balance })
    })
  }
}

const mutations = {
  [types.RECEIVE_RECHARGE_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_RECHARGE_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.RECEIVE_BALANCE](state, { balance }) {
    state.balance = balance
  }
}

export default {
  state,
  actions,
  mutations
}
