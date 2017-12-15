import * as types from '../constants/MutationTypes'
import ShieldPropertyResource from '../resource/ShieldPropertyResource'
import ListQuery from '../constants/ListQuery'

const visible = false

const state = {
  list: [],
  total: 0,
  addProperty: {
    visible
  },
  verifyProperty: {
    visible,
    info: null,
    code: null
  },
  noticeMemberList: []
}

const actions = {
  getPropertyList({ commit }, params) {
    return ShieldPropertyResource.getPropertyList(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_PROPERTY_LIST, { list })
      commit(types.RECEIVE_PROPERTY_TOTAL, { total })
    })
  },
  addProperty({ dispatch }, params) {
    return ShieldPropertyResource.addProperty(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('triggerAddPropertyVisible', false)
        dispatch('getPropertyList', ListQuery)
      }
    })
  },
  deleteProperty({ dispatch }, params) {
    return ShieldPropertyResource.deleteProperty(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('getPropertyList', ListQuery)
      }
    })
  },
  verifyProperty({ dispatch }, params) {
    return ShieldPropertyResource.verifyProperty(params).then(response => {
      const { code } = response.data.status
      if (code === 2) {
        dispatch('triggerVerifyPropertyVisible', false)
        dispatch('getPropertyList', ListQuery)
      }
    })
  },
  getVerifyCode({ commit }, params) {
    return ShieldPropertyResource.getVerifyCode(params).then(response => {
      const code = response.data.data
      commit(types.RECEIVE_VERIFY_CODE, code)
    })
  },
  clearVerifyCode({ commit }) {
    commit(types.CLEAR_VERIFY_CODE)
  },
  getNoticeMemberList({ commit }) {
    return ShieldPropertyResource.getNoticeMemberList().then(response => {
      const {
        notice_member_list,
        notice_member_group_list
      } = response.data.data
      commit(types.RECEIVE_NOTICE_MEMBER_LIST, { notice_member_list })
    })
  },
  triggerAddPropertyVisible({ commit }, visible) {
    commit(types.ADD_PROPERTY_VISIBLE, { visible })
  },
  triggerVerifyPropertyVisible({ commit }, { visible, info }) {
    commit(types.VERIFY_PROPERTY_VISIBLE, { visible, info })
  }
}

const mutations = {
  [types.RECEIVE_PROPERTY_LIST](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_PROPERTY_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.ADD_PROPERTY_VISIBLE](state, { visible }) {
    state.addProperty.visible = visible
  },
  [types.VERIFY_PROPERTY_VISIBLE](state, { visible, info }) {
    state.verifyProperty.visible = visible
    state.verifyProperty.info = info
  },
  [types.RECEIVE_VERIFY_CODE](state, code) {
    state.verifyProperty.code = code
  },
  [types.CLEAR_VERIFY_CODE](state, code) {
    state.verifyProperty.code = null
  },
  [types.RECEIVE_NOTICE_MEMBER_LIST](state, { notice_member_list }) {
    state.noticeMemberList = notice_member_list
  }
}

export default {
  state,
  actions,
  mutations
}
