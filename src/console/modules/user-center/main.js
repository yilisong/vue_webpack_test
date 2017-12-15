import 'common/assets/console-common-style'
// import './assets/styles/index.css'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import store from './store'
import router from './router'

const app = new Vue({
  el: '#root',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
})

/** *****************************
 *      Vue dateTimeSelect      *
 *******************************/
// const dateTimeSelect = new Vuex.DateTimeSelect({
//   state: {
//     dataTimeValue: {},
//     subDmain: {},
//     page: {}
//   },
//   getters: {
//     searchStartTime: (state, getters) => state.dataTimeValue.startTimevalue,
//     searchDmain: (state, getters) => state.subDmain,
//     searchPage: (state, getters) => '',
//     searchTotalPage: (state, getters) => '',
//     searchEndTime: (state, getters) => state.dataTimeValue.endTimevalue
//   },
//   mutations: {
//     updateDataTimeValue(state, payload) {
//       state.dataTimeValue = payload
//     },
//     updateSubDmain(state, payload) {
//       state.subDmain = payload
//     },
//     updatePage(state, payload) {
//       state.page = payload
//     }
//   },
//   strict: process.env.NODE_ENV !== 'production' // 开发环境下, 开启严格模式
// })
