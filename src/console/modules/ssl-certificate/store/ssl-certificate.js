import * as types from '../constants/mutationTypes'
import SourceCertificateResource from '../resource/source-ssl-certificate'
import { Message } from 'element-ui'

const state = {
  // UI
  loading: false,
  pageSize: 5,
  // logic
  list: [],
  total: 0
}

const actions = {
  getCertificateByPage({ commit, state }, params) {
    commit(types.CHANGE_LOADING_STATUS, { loading: true })
    SourceCertificateResource.getCertificateByPage(params)
      .then(response => {
        const { list, total } = response.data.data
        commit(types.RECEIVE_CERTIFICATE_BY_PAGE, { list })
        commit(types.RECEIVE_CERTIFICATE_TOTAL, { total })
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
      })
      .catch(() => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
      })
  },
  addCertificate({ dispatch, commit, state }, params) {
    SourceCertificateResource.addCertificate(params)
      .then(response => {
        commit(types.SSLCONFIG_VISIBLE, { visible: false })
        const { message } = response.data.status
        Message.info({
          message
        })
        dispatch('getCertificateByPage', {
          page: 1,
          per_page: state.pageSize
        })
      })
      .catch(() => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
      })
  },
  delCertificate({ dispatch, commit, state }, params) {
    commit(types.CHANGE_LOADING_STATUS, { loading: true })
    SourceCertificateResource.delCertificate(params)
      .then(response => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
        const { message } = response.data.status
        Message.info({
          message
        })
        dispatch('getCertificateByPage', {
          page: 1,
          per_page: state.pageSize
        })
      })
      .catch(() => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
      })
  },
  editCertificate({ dispatch, commit, state }, params) {
    commit(types.CHANGE_LOADING_STATUS, { loading: true })
    SourceCertificateResource.editCertificate(params)
      .then(response => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
        const { message } = response.data.status
        Message.info({
          message
        })
        dispatch('getCertificateByPage', {
          page: 1,
          per_page: state.pageSize
        })
      })
      .catch(() => {
        commit(types.CHANGE_LOADING_STATUS, { loading: false })
      })
  },
  changeEditStatus({ state, commit }, { index, status }) {
    commit(types.CHANGE_EDIT_STATUS, { index, status })
  }
}

const mutations = {
  [types.RECEIVE_CERTIFICATE_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.RECEIVE_CERTIFICATE_BY_PAGE](state, { list }) {
    const length = list.length
    for (let i = 0; i < length; i++) {
      list[i].isEditing = false
    }
    state.list = list
  },
  [types.FETCH_PAGESIZE](state, { pageSize }) {
    state.pageSize = pageSize
  },
  [types.CHANGE_EDIT_STATUS](state, { index, status }) {
    state.list[index].isEditing = status
  },
  [types.CHANGE_LOADING_STATUS](state, { loading }) {
    state.loading = loading
  }
}

export default {
  state,
  actions,
  mutations
}
