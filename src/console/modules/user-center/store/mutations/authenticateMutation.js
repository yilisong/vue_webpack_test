import Vue from 'vue'
import * as types from '../mutation-type/authentication'

export default {
  [types.GET_BASICINFO](state, data) {
    state.status = data.status
    state.type = data.type
    state.reason = data.reason
  },
  [types.GET_PERSONALINFO](state, data) {
    console.log(data, '-00980-=')
    state.info.personal.personal_name = data.personal_name
    state.info.personal.personal_mobile = data.personal_mobile
    state.info.personal.personal_id_card = data.personal_id_card
    state.info.personal.personal_id_card_pic = data.personal_id_card_pic
    state.info.personal.personal_id_card_pic_negative =
      data.personal_id_card_pic_negative
  },
  [types.GET_COMPANYINFO](state, data) {
    state.info.company.company_name = data.company_name
    state.info.company.company_tyshxy_card = data.company_tyshxy_card
    state.info.company.company_yyzz_pic = data.company_yyzz_pic
    state.info.company.company_concat_name = data.company_concat_name
    state.info.company.company_concat_mobile = data.company_concat_mobile
  },
  [types.GET_GOVERNMENTINFO](state, data) {
    console.log(data, 'dddaata')
    state.info.government.organization_name = data.organization_name
    state.info.government.organization_code = data.organization_code
    state.info.government.charge_man_name = data.charge_man_name
    state.info.government.office_phone = data.office_phone
    state.info.government.organization_address = data.organization_address
    state.info.government.organization_certificate_pic =
      data.organization_certificate_pic
    state.info.government.contact_mobile = data.contact_mobile
    state.info.government.contact_qq = data.contact_qq
    state.info.government.contact_name = data.contact_name
  }
}
