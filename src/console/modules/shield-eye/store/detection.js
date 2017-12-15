import * as types from '../constants/MutationTypes'
import ShieldRiskResource from '../resource/ShieldRiskResource'
import { Message } from 'element-ui'
import ListQuery from '../constants/ListQuery'

const visible = false

const state = {
  riskCount: {
    list: [],
    total: 0,
    settingInfo: null
  },
  riskLog: {
    list: [],
    total: 0
  },
  scanNumber: 0,
  riskScanMealList: [],
  riskMealList: [],
  addDetection: {
    visible,
    info: null,
    detailInfo: null
  }
}

const actions = {
  getRiskScanMeal({ commit }) {
    return ShieldRiskResource.getRiskScanMeal().then(response => {
      const { scan_number, risk_meal_list } = response.data.data
      commit(types.RECEIVE_SCAN_NUMBER, { scan_number })
      commit(types.RECEIVE_RISK_SCAN_MEAL_LIST, { risk_meal_list })
    })
  },
  // 添加模式下detection_id默认为0
  getRiskMealList({ commit }, detection_id = 0) {
    return ShieldRiskResource.getRiskMealList(detection_id).then(response => {
      const { data } = response.data
      commit(types.RECEIVE_RISK_MEAL_LIST, { data })
    })
  },
  addRiskDetection({ dispatch }, params) {
    return ShieldRiskResource.addRiskDetection(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('triggerAddDetectionVisible', false)
      }
    })
  },
  getRiskCountList({ commit }) {
    return ShieldRiskResource.getRiskCountList().then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_RISK_COUNT_LIST, { list })
      commit(types.RECEIVE_RISK_COUNT_TOTAL, { total })
    })
  },
  getRiskLogList({ commit }, params) {
    return ShieldRiskResource.getRiskLogList(params).then(response => {
      const { list, total } = response.data.data
      commit(types.RECEIVE_RISK_LOG_LIST, { list })
      commit(types.RECEIVE_RISK_LOG_TOTAL, { total })
    })
  },
  switchRiskTask({ dispatch }, params) {
    return ShieldRiskResource.switchRiskTask(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('getRiskCountList', ListQuery)
      }
    })
  },
  deleteRiskTask({ dispatch }, params) {
    return ShieldRiskResource.deleteRiskTask(params).then(response => {
      const { code } = response.data.status
      if (code === 1) {
        dispatch('getRiskCountList', ListQuery)
      }
    })
  },
  getRiskDetectionInfo({ commit }, detectionId) {
    return ShieldRiskResource.getRiskDetectionInfo(
      detectionId
    ).then(response => {
      const { data } = response.data
      commit(types.RECEIVE_RISK_DETECTION_INFO, { data })
    })
  },
  getRiskSettingInfo({ commit }, detectionId) {
    return ShieldRiskResource.getRiskSettingInfo(detectionId).then(response => {
      const { data, status } = response.data
      if (status.code === 1) {
        commit(types.RECEIVE_RISK_SETTING_INFO, { data })
      }
    })
  },
  saveRiskSettingContent({ commit }, params) {
    return ShieldRiskResource.saveRiskSettingContent(params).then(response => {
      const { status } = response.data
      if (status.code === 1) {
        Message.success({
          message: '操作成功'
        })
      }
    })
  },
  saveRiskSettingStatus({ commit }, params) {
    return ShieldRiskResource.saveRiskSettingStatus(params).then(response => {
      const { status } = response.data
      if (status.code === 1) {
        Message.success({
          message: '操作成功'
        })
      }
    })
  },
  saveRiskDetection({ dispatch, commit }, params) {
    return ShieldRiskResource.saveRiskDetection(params).then(response => {
      const { status } = response.data
      if (status.code === 1) {
        dispatch('triggerAddDetectionVisible', false)
        dispatch('getRiskCountList')
      }
    })
  },
  triggerAddDetectionVisible({ commit }, { visible, info }) {
    commit(types.ADD_DETECTION_VISIBLE, { visible, info })
  }
}

const mutations = {
  [types.ADD_DETECTION_VISIBLE](state, { visible, info }) {
    state.addDetection.visible = visible
    state.addDetection.info = info
  },
  [types.RECEIVE_SCAN_NUMBER](state, { scan_number }) {
    state.scanNumber = scan_number
  },
  [types.RECEIVE_RISK_SCAN_MEAL_LIST](state, { risk_meal_list }) {
    state.riskScanMealList = risk_meal_list
  },
  [types.RECEIVE_RISK_MEAL_LIST](state, { data }) {
    state.riskMealList = data
  },
  [types.RECEIVE_RISK_COUNT_LIST](state, { list }) {
    state.riskCount.list = list
  },
  [types.RECEIVE_RISK_COUNT_TOTAL](state, { total }) {
    state.riskCount.total = parseInt(total, 10)
  },
  [types.RECEIVE_RISK_LOG_LIST](state, { list }) {
    state.riskLog.list = list
  },
  [types.RECEIVE_RISK_LOG_TOTAL](state, { total }) {
    state.riskLog.total = parseInt(total, 10)
  },
  [types.RECEIVE_RISK_DETECTION_INFO](state, { data }) {
    state.addDetection.detailInfo = data
  },
  [types.RECEIVE_RISK_SETTING_INFO](state, { data }) {
    state.riskCount.settingInfo = data
  }
}

const getters = {
  scanNumber: state => state.scanNumber,
  riskScanMealList: state => state.riskScanMealList
}

export default {
  state,
  actions,
  mutations,
  getters
}
