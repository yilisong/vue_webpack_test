import Vue from 'vue'
import Vuex from 'vuex'
import authentiStore from './modules/authentiStore'

Vue.use(Vuex)

const state = {
  loading: true
}

export default new Vuex.Store({
  state,
  modules: {
    authentiStore
  }
})
