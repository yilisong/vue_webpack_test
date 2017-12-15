import * as types from '../constants/mutation-types'
import TaichiPlusResource from '../resource/TaichiPlusResource'
import { Message } from 'element-ui'
import Vue from 'vue'

const state = {
  list: [],
  total: '',
  packageId: '',
  domainNameCache: ''
}

const actions = {
  getPackageList({ commit, state }, params) {
    TaichiPlusResource.getPackageList(params).then(response => {
      if (response.data && response.data.data && response.data.data.list) {
        const list = response.data.data.list
        commit(types.GET_PACKAGE_LIST, { list })
      } else {
        const message = response.data.status.message
        Message.info({
          showClose: true,
          message
        })
      }
    })
  },
  savePackageID({ commit, state }, params) {
    console.log('params', params)
    const packageId = params.packageId
    commit(types.SAVE_PACKAGE_ID, { packageId })
  },
  saveConfigPageDomainName({ commit, state }, param) {
    // console.log('saveConfigPageDomainName VUEX!!!', params)
    commit('saveDomainName', param)
  }
}

const mutations = {
  [types.GET_PACKAGE_LIST](state, { list }) {
    console.log('list', list)
    state.list = list
  },
  [types.SAVE_PACKAGE_ID](state, { packageId }) {
    state.packageId = packageId
  },
  saveDomainName(state, param) {
    state.domainNameCache = param
  }
}

export default {
  state,
  actions,
  mutations
}
