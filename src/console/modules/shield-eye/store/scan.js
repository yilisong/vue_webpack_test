import * as types from '../constants/MutationTypes'
import ShieldScanResource from '../resource/ShieldScanResource'
import ListQuery from '../constants/ListQuery'
import { Message } from 'element-ui'

const visible = false

const state = {
  scanTask: {
    list: [],
    total: 0
  },
  scanDetail: {
    list: [],
    total: 0
  },
  addScan: {
    visible,
    info: null,
    settingInfo: null
  }
}

const actions = {
  getScanTaskList({ commit }, params) {
    return ShieldScanResource.getScanTaskList(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_SCAN_TASK_LIST, { list })
      commit(types.RECEIVE_SCAN_TASK_TOTAL, { total })
    })
  },
  getScanDetailList({ commit }, params) {
    return ShieldScanResource.getScanDetailList(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_SCAN_DETAIL_LIST, { list })
      commit(types.RECEIVE_SCAN_DETAIL_TOTAL, { total })
    })
  },
  getScanSettingInfo({ commit }, scanTaskId) {
    return ShieldScanResource.getScanSettingInfo(scanTaskId).then(response => {
      const { data } = response.data
      commit(types.RECEIVE_SCAN_SETTING_INFO, { data })
    })
  },
  addScanTask({ dispatch, commit }, params) {
    return ShieldScanResource.addScanTask(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('triggerAddScanVisible', false)
        dispatch('getPropertyList', ListQuery)
        dispatch('getRiskScanMeal')
      }
    })
  },
  saveCycleScan({ dispatch, commit }, params) {
    return ShieldScanResource.saveCycleScan(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('triggerAddScanVisible', false)
        dispatch('getScanTaskList', ListQuery)
        dispatch('getRiskScanMeal')
      }
    })
  },
  scanTaskAgain({ dispatch }, scanDetailId) {
    return ShieldScanResource.scanTaskAgain(scanDetailId).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        Message.success({
          message: '操作成功'
        })
        dispatch('getRiskScanMeal')
      }
    })
  },
  cancelCycleScan({ dispatch }, scanTaskId) {
    return ShieldScanResource.cancelCycleScan(scanTaskId).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        Message.success({
          message: '操作成功'
        })
        dispatch('getRiskScanMeal')
      }
    })
  },
  triggerAddScanVisible({ commit }, { visible, info }) {
    commit(types.RECEIVE_SCAN_INFO, { info })
    commit(types.ADD_SCAN_VISIBLE, { visible })
  }
}

const mutations = {
  [types.RECEIVE_SCAN_TASK_LIST](state, { list }) {
    state.scanTask.list = list
  },
  [types.RECEIVE_SCAN_TASK_TOTAL](state, { total }) {
    state.scanTask.total = parseInt(total, 10)
  },
  [types.RECEIVE_SCAN_DETAIL_LIST](state, { list }) {
    state.scanDetail.list = list
  },
  [types.RECEIVE_SCAN_DETAIL_TOTAL](state, { total }) {
    state.scanDetail.total = parseInt(total, 10)
  },
  [types.ADD_SCAN_VISIBLE](state, { visible }) {
    state.addScan.visible = visible
  },
  [types.RECEIVE_SCAN_INFO](state, { info }) {
    state.addScan.info = info
  },
  [types.RECEIVE_SCAN_SETTING_INFO](state, { data }) {
    state.addScan.settingInfo = data
  }
}

export default {
  state,
  actions,
  mutations
}
