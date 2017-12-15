import Vue from 'vue'
import Vuex from 'vuex'
import TaichiPlusResource from './TaichiPlusStore'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    TaichiPlusResource
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
