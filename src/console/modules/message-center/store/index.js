import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import messageList from './messageList'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const plugins = [
  createPersistedState({
    key: 'G_S'
  })
]

export default new Vuex.Store({
  modules: {
    messageList
  },
  strict: debug,
  plugins: debug ? [createLogger()] : plugins
})
