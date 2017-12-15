import * as types from '../constants/MutationTypes'
import SourceFinanceResource from '../resource/SourceFinanceResource'

const state = {
  // UI
  isLoaded: false,
  invoiceId: '',
  invoice_status: '',
  list: [],
  total: 0
}

const actions = {
  getInvoiceByPage({ commit, state }, params) {
    commit(types.RECEIVE_LIST_LOADED, { isLoaded: true })
    SourceFinanceResource.getInvoiceByPage(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_INVOICE_BY_PAGE, {
        list
      })
      commit(types.RECEIVE_INVOICE_TOTAL, {
        total
      })
      commit(types.RECEIVE_LIST_LOADED, { isLoaded: false })
    })
  },
  getInvoiceDetailsById({ commit, state }, params) {
    return SourceFinanceResource.getInvoiceDetailsById(params)
  }
}

const mutations = {
  [types.RECEIVE_INVOICE_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_INVOICE_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.RECEIVE_INVOICE_ID](state, { id }) {
    state.invoiceId = id
  },
  [types.RECEIVE_INVOICE_STATUS](state, { status }) {
    state.invoice_status = status
  },
  [types.RECEIVE_LIST_LOADED](state, { isLoaded }) {
    state.isLoaded = isLoaded
  }
}

export default {
  state,
  actions,
  mutations
}
