import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
   domain : ''
}

const mutations = {
   getDomain(state,domain) {
     state.domain = domain
   }
}

const actions = {

}

const getters = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
