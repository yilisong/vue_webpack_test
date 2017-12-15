import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import gameOperation from './gameOperation'
import id from './comboId'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    dialog,
    gameOperation,
    id
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
