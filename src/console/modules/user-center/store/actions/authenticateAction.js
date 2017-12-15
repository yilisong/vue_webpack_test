import * as types from '../mutation-type/authentication'
import SourceUserResource from '../../assets/js/resource/SourceUserResource'
import { Message } from 'element-ui'

export default {
  getBasicinfo({ commit }) {
    const data = {
      status: 0,
      type: 1,
      reason: ''
    }
    SourceUserResource.getCertificationInfo().then(response => {
      // data.status = 0
      console.log(response, 'infoResponse')
      if (response.data.status.code === 16161) {
        data.status = 0
      } else if (response.data.status.code === 1) {
        data.type = parseInt(response.data.data.certification_type, 0)
        data.status = parseInt(response.data.data.check_status, 0)
        data.reason = response.data.data.reason
        //单状态判断
        switch (data.type) {
          case 1:
            commit(types.GET_PERSONALINFO, response.data.data.personal_info)
            break
          case 2:
            commit(types.GET_COMPANYINFO, response.data.data.company_info)
            break
          case 3:
            commit(types.GET_GOVERNMENTINFO, response.data.data.government_info)
            break
          default:
            commit(types.GET_PERSONALINFO, response.data.data.personal_info)
        }
        //升级状态判断（后端会返回个人和升级对应类型的数据 所以需要筛选获取）
        if (data.status === 4)
          commit(types.GET_COMPANYINFO, response.data.data.company_info)
        else if (data.status === 7)
          commit(types.GET_GOVERNMENTINFO, response.data.data.government_info)
      } else {
        Message.error(response.data.status.message)
      }
      commit(types.GET_BASICINFO, data)
    })
  }
}
