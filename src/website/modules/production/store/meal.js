import * as types from '../constants/mutationTypes'
import SourceProductionResource from '../resource/sourceProduction'

const state = {
  mealList: []
}

const actions = {
  getProductionMealList({ state, commit }, params) {
    SourceProductionResource.getProductionMealList(params).then(response => {
      const list = response.data.data.data
      commit(types.GET_PRODUCT_MEAL_LIST, { list })
    })
  }
}

const mutations = {
  [types.GET_PRODUCT_MEAL_LIST](state, { list }) {
    state.mealList = list
  }
}

export default {
  state,
  actions,
  mutations
}
