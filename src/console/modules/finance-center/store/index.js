import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import recharge from './recharge'
import order from './order'
import invoice from './invoice'
import coupon from './coupon'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    dialog,
    recharge,
    order,
    invoice,
    coupon
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
