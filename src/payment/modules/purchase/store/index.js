import Vue from 'vue'
import Vuex from 'vuex'
import order from './order'
import dialog from './dialog'
import effect from './effect'
import taichiWeb from './taichiWeb'
import taichiDns from './taichiDns'
import speed from './speed'
import resolving from './resolving'
import monitor from './monitor'
import mirror from './mirror'
import shield from './shield'
import message from './message'
import redGuard from './redGuard'
import createLogger from 'vuex/dist/logger'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const plugins = []

export default new Vuex.Store({
  modules: {
    effect,
    dialog,
    order,
    taichiWeb,
    taichiDns,
    speed,
    resolving,
    monitor,
    mirror,
    shield,
    message,
    redGuard
  },
  strict: debug,
  plugins: debug ? [createLogger()] : plugins
})
