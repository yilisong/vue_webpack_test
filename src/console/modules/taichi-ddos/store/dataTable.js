import * as types from '../constants/MutationTypes'
import TaichiResource from '../resource/TaichiResource'

const state = {
  topFiveIP: [],
  topFiveURL: [],
  ccAttackChart: {
    xData: [],
    yData: [],
    unit: ''
  },
  countryChart: [],
  countryTopFive: [],
  worldChart: [],
  worldTopFive: [],
  ddosAttackChartNew: {
    xData: [],
    yData: [],
    unit: ''
  }
}

const actions = {
  // getCcAttackData({ commit, state }, params) {
  //   TaichiResource.getCcAttackData(params).then(response => {
  //     const ips = response.data.data.top_remote_addr.slice(0, 5)
  //     const urls = response.data.data.top_request_url.slice(0, 5)
  //     commit(types.GET_TOP5_IP, ips)
  //     commit(types.GET_TOP5_URL, urls)
  //   })
  // },
  // getCcAttackChart({ commit, state }, params) {
  //   TaichiResource.getCcAttackChart(params).then(response => {
  //     const xData = response.data.data.trend.x_data
  //     const unit = response.data.data.trend.y_data.unit
  //     const yData = response.data.data.trend.y_data.data
  //     commit(types.GET_ATTACK_CHART, { xData, unit, yData })
  //   })
  // },
  // getCountryChart({ commit, state }, params) {
  //   TaichiResource.getCountryChart(params).then(response => {
  //     const chartMiddleValue = []
  //     const countryTopFive = []
  //     response.data.data.forEach((v, i) => {
  //       chartMiddleValue.push({
  //         name: v.country,
  //         percent: v.percent,
  //         value: v.count,
  //         unit: v.unit
  //       })
  //       if (i < 5) {
  //         countryTopFive.push({
  //           name: v.country,
  //           percent: Number(v.percent),
  //           value: v.count,
  //           unit: v.unit
  //         })
  //       }
  //     })
  //     const countryChart = chartMiddleValue
  //     commit(types.GET_COUNTRY_CHART, { countryChart, countryTopFive })
  //   })
  // },
  // getWorldChart({ commit, state }, params) {
  //   TaichiResource.getWorldChart(params).then(response => {
  //     const chartMiddleValue = []
  //     const worldTopFive = []
  //     response.data.data.forEach((v, i) => {
  //       chartMiddleValue.push({
  //         name: v.country,
  //         percent: v.percent,
  //         value: v.count,
  //         unit: v.unit
  //       })
  //       if (i < 5) {
  //         worldTopFive.push({
  //           name: v.country,
  //           percent: Number(v.percent),
  //           value: v.count,
  //           unit: v.unit
  //         })
  //       }
  //     })
  //     const worldChart = chartMiddleValue
  //     commit(types.GET_WORLD_CHART, { worldChart, worldTopFive })
  //   })
  // },
  // getDdosAttackChart({ commit, state }, params) {
  //   TaichiResource.getDdosAttackChart(params).then(response => {
  //     const xData = response.data.data.trend.x_data
  //     const yData = response.data.data.trend.y_data.data
  //     const unit = response.data.data.trend.y_data.unit
  //     commit(types.GET_DDOS_ATTACK_CHART, { xData, yData, unit })
  //   })
  // }
}

const mutations = {
  [types.GET_TOP5_IP](state, ips) {
    state.topFiveIP = ips
  },
  [types.GET_TOP5_URL](state, urls) {
    state.topFiveURL = urls
  },
  [types.GET_ATTACK_CHART](state, { xData, unit, yData }) {
    state.ccAttackChart.xData = xData
    state.ccAttackChart.unit = unit
    state.ccAttackChart.yData = yData
  },
  [types.GET_COUNTRY_CHART](state, { countryChart, countryTopFive }) {
    state.countryChart = countryChart
    state.countryTopFive = countryTopFive
  },
  [types.GET_WORLD_CHART](state, { worldChart, worldTopFive }) {
    state.worldChart = worldChart
    state.worldTopFive = worldTopFive
  },
  [types.GET_DDOS_ATTACK_CHART](state, { xData, yData, unit }) {
    state.ddosAttackChartNew.xData = xData
    state.ddosAttackChartNew.yData = yData
    state.ddosAttackChartNew.unit = unit
  }
}

export default {
  state,
  actions,
  mutations
}
