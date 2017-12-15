import * as types from '../constants/mutation-types'
import SourceGameResource from '../resource/SourceGameResource'
import { Message } from 'element-ui'
import Vue from 'vue'

const state = {
  list: [],
  sourceList: [],
  totalList: [],
  total: 0,
  ipTotal: 0,
  pageSize: 5,
  pageSizeDig: 10,
  statusCode: '',
  serverId: '',
  packageInfo: {
    packageInfoList: {
      packageInfoType: 1,
      packageInfoPath: ''
    },
    ipWhiteList: []
  }
}

const actions = {
  getGameByPage({ commit, state }, params) {
    SourceGameResource.getGameByPage(params).then(response => {
      if (response.data && response.data.data && response.data.data.list) {
        const { list, total } = response.data.data
        commit(types.RECEIVE_GAME_BY_PAGE, { list })
        commit(types.RECEIVE_GAME_TOTAL, { total })
      }
    })
  },
  getPackageInfo({ commit, state }, params) {
    SourceGameResource.getPackageInfo(params).then(response => {
      const ipWhiteList = response.data.data.ip_white_list
      const packageInfoPath =
        response.data.data.package_info.package_game_default_path
      if (response.data.data.package_info.package_game_type === null) {
        response.data.data.package_info.package_game_type = 1
      }
      const packageInfoType = Number(
        response.data.data.package_info.package_game_type
      )
      commit(types.GET_PACKAGE_INFO, {
        ipWhiteList,
        packageInfoType,
        packageInfoPath
      })
    })
  },
  getTotalSourceIPAndPort({ commit, state }, params) {
    SourceGameResource.getTotalSourceIPAndPort(params).then(response => {
      const serverId = params.server_id
      let sourceList
      if (response.data.data) {
        sourceList = response.data.data.list
      } else {
        sourceList = []
      }
      commit(types.GET_TOTAL_SOIRCE_IP_AND_PORT, { sourceList })
      commit(types.GET_TOTAL_SOIRCE_IP_AND_PORT_TOTAL, { serverId })
    })
  },
  modifyConfigurationInformation({ dispatch, commit, state }, params) {
    SourceGameResource.modifyConfigurationInformation(
      params.data
    ).then(response => {
      const { code, message } = response.data.status
      commit(types.RECEIVE_GAME_SAVE, { code })
      if (code === 1) {
        dispatch('getGameByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  editAreaSave({ dispatch, commit, state }, params) {
    return SourceGameResource.editAreaSave(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.EDIT_AREA_SAVE, { code })
      if (code === 1) {
        dispatch('getGameByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  deleteArea({ dispatch, commit, state }, params) {
    SourceGameResource.deleteArea(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.DELETE_AREA, { code })
      if (code === 1) {
        dispatch('getGameByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  getTotalIP({ commit, state }, params) {
    SourceGameResource.getTotalIP(params).then(response => {
      if (response.data && response.data.data && response.data.data.list) {
        const totalList = response.data.data.list
        const ipTotal = response.data.data.total
        commit(types.GET_TOTAL_IP, { totalList })
        commit(types.GET_TOTAL_IP_TOTAL, { ipTotal })
        // } else {
        //   Message.info({
        //     message: '暂无数据',
        //     showClose: true
        //   })
      }
    })
  },
  saveSourceIPAndPort({ dispatch, commit, state }, params) {
    SourceGameResource.saveSourceIPAndPort(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.SAVE_SOIRCE_IP_AND_PORT, { code })
      if (code === 1) {
        dispatch('getGameByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  addServeGameArea({ commit, state }, index) {
    commit(types.ADD_NEW_AREA, { index })
  },
  addConfig({ commit }, ipInput) {
    commit(types.ADD_CONFIG, { ipInput })
  },
  addPort({ commit }, params) {
    commit(types.ADD_PORT, { params })
  }
}

const mutations = {
  [types.RECEIVE_GAME_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_GAME_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.GET_TOTAL_IP](state, { totalList }) {
    state.totalList = totalList
  },
  [types.GET_TOTAL_IP_TOTAL](state, { ipTotal }) {
    state.ipTotal = parseInt(ipTotal, 10)
  },
  [types.RECEIVE_GAME_SAVE](state, { code }) {
    state.statusCode = code
  },
  [types.EDIT_AREA_SAVE](state, { code }) {
    state.statusCode = code
  },
  [types.DELETE_AREA](state, { code }) {
    state.statusCode = code
  },
  [types.GET_PACKAGE_INFO](
    state,
    { ipWhiteList, packageInfoType, packageInfoPath }
  ) {
    state.packageInfo.ipWhiteList = ipWhiteList
    state.packageInfo.packageInfoList.packageInfoType = packageInfoType
    state.packageInfo.packageInfoList.packageInfoPath = packageInfoPath
  },
  [types.SAVE_SOURCE_IP_PORT](state, { code }) {
    state.statusCode = code
  },
  [types.SAVE_SOIRCE_IP_AND_PORT](state, { code }) {
    state.statusCode = code
  },
  [types.GET_TOTAL_SOIRCE_IP_AND_PORT](state, { sourceList }) {
    state.sourceList = sourceList
  },
  [types.GET_TOTAL_SOIRCE_IP_AND_PORT_TOTAL](state, { serverId }) {
    state.serverId = serverId
  },
  [types.ADD_NEW_AREA](state, { index }) {
    if (state.list[index].member_server_list) {
      state.list[index].member_server_list.push({
        server_id: '',
        server_name: '',
        server_edit_status: false
      })
    } else {
      Vue.set(state.list[index], 'member_server_list', [
        {
          server_id: '',
          server_name: '',
          server_edit_status: false
        }
      ])
    }
  },
  [types.ADD_CONFIG](state, { ipInput }) {
    state.packageInfo.ipWhiteList.unshift({
      ip_string: ipInput,
      id: ''
    })
  },
  [types.ADD_PORT](state, { params }) {
    state.sourceList.unshift({
      source_ip: params.ip
      // source_port: params.port
    })
  }
}

export default {
  state,
  actions,
  mutations
}
