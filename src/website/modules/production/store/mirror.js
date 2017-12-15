import * as types from '../constants/mutationTypes'
import SourceProductionResource from '../resource/sourceProduction'
import help from 'common/utils/help'
import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

const state = {
  isPurchased: false
}

const actions = {
  getIsPurchasedOfMirror({ state, commit }, params) {
    SourceProductionResource.getIsPurchasedOfMirror(params).then(response => {
      const isPurchased = response.data.data
      if (isPurchased) {
        MessageBox.confirm('您已购买了替身镜像，如需续费或升级请咨询商务', '提示', {
          type: 'warning',
          confirmButtonText: '咨询商务',
          cancelButtonText: '取消'
        }).then(() => {
          help.linkService()
        })
      } else {
        window.location.href = '/payment#/setting-double-mirror'
      }
    })
  }
}

const mutations = {}

export default {
  state,
  actions,
  mutations
}
