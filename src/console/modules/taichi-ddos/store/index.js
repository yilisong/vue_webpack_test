import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import websiteList from './websiteList'
import dataTable from './dataTable'
import operateRecord from './operateRecord'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const plugins = [
  createPersistedState({
    key: 'G_S'
  })
]

export default new Vuex.Store({
  modules: {
    dialog,
    websiteList,
    dataTable,
    operateRecord
  },
  strict: debug,
  plugins: debug ? [createLogger()] : plugins
})
