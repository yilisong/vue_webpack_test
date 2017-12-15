import Vue from 'vue'
import Vuex from 'vuex'
import scan from './scan'
import detection from './detection'
import property from './property'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const plugins = [
  // createPersistedState({
  //   key: 'cloud-eye',
  //   paths: ['detection.riskCount']
  // })
]

export default new Vuex.Store({
  modules: {
    scan,
    property,
    detection
  },
  strict: debug,
  plugins: debug ? [createLogger(), ...plugins] : plugins
})
