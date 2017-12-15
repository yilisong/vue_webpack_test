import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import certificate from './ssl-certificate'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    dialog,
    certificate
  },
  strict: true,
  plugins: debug ? [createLogger()] : []
})
