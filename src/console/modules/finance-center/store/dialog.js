import * as types from '../constants/MutationTypes'

const initVisible = false

const state = {
  payConfig: {
    visible: initVisible
  },
  invoiceConfig: {
    visible: initVisible
  },
  invoiceInfo: {
    visible: initVisible
  }
}

const actions = {
  triggerPayConfigVisible({ commit, state }, visible) {
    commit(types.PAY_CONFIG_VISIBLE, {
      visible
    })
  },
  triggerInvoiceConfigVisible({ commit, state }, visible) {
    commit(types.INVOICE_CONFIG_VISIBLE, {
      visible
    })
  },
  triggerInvoiceInfoVisible({ commit, state }, visible) {
    commit(types.INVOICE_INFO_VISIBLE, {
      visible
    })
  }
}

const mutations = {
  [types.PAY_CONFIG_VISIBLE](state, { visible }) {
    state.payConfig.visible = visible
  },
  [types.INVOICE_CONFIG_VISIBLE](state, { visible }) {
    state.invoiceConfig.visible = visible
  },
  [types.INVOICE_INFO_VISIBLE](state, { visible }) {
    state.invoiceInfo.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
