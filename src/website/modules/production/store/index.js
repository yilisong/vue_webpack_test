import Vue from 'vue'
import Vuex from 'vuex'
import meal from './meal'
import mirror from './mirror'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    meal,
    mirror
  },
  strict: true,
  plugins: debug ? [createLogger()] : []
})
