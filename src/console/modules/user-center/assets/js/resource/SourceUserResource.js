import { SourceUserResource } from './'
import qs from 'qs'

export default {
  getToken: params =>
    SourceUserResource.get('/sso/V4/attach', {
      params: {
        ...params
      }
    }),
  getUserInfo: params => SourceUserResource.get('/sso/V4/getUserInfo'),
  getLoginLog: params =>
    SourceUserResource.get('/sso/V4/getLoginLog', {
      params: {
        ...params
      }
    }),
  addGovernmentCertification: param =>
    SourceUserResource.post(
      '/sso/V4/addGovernmentCertification',
      qs.stringify(param)
    ),
  updateGovernmentCertification: param =>
    SourceUserResource.post(
      '/sso/V4/updateGovernmentCertification',
      qs.stringify(param)
    ),
  personalUpgradeGovernment: param =>
    SourceUserResource.post(
      '/sso/V4/personalUpgradeGovernment',
      qs.stringify(param)
    ),
  emailCode: param =>
    SourceUserResource.post('/sso/V4/bindEmailSendCap', qs.stringify(param)),
  bindEmail: param =>
    SourceUserResource.post('/sso/V4/bindEmail', qs.stringify(param)),
  mobileCode: param =>
    SourceUserResource.post('/sso/V4/bindMobileSendCap', qs.stringify(param)),
  bindMobile: param =>
    SourceUserResource.post('/sso/V4/bindMobile', qs.stringify(param)),
  bindWechat: param =>
    SourceUserResource.get('/sso/V4/bindWeiXin', qs.stringify(param)),
  modifyEmailSendOldCap: param =>
    SourceUserResource.post(
      '/sso/V4/modifyEmailSendOldCap',
      qs.stringify(param)
    ),
  modifyEmailSendNewEmailCap: param =>
    SourceUserResource.post(
      '/sso/V4/modifyEmailSendNewEmailCap',
      qs.stringify(param)
    ),
  modifyMobileSendOldCap: param =>
    SourceUserResource.post(
      '/sso/V4/modifyMobileSendOldCap',
      qs.stringify(param)
    ),
  modifyMobileSendNewMobileCap: param =>
    SourceUserResource.post(
      '/sso/V4/modifyMobileSendNewMobileCap',
      qs.stringify(param)
    ),
  modifyMobile: param =>
    SourceUserResource.post('/sso/V4/modifyMobile', qs.stringify(param)),
  modifyEmail: param =>
    SourceUserResource.post('/sso/V4/modifyEmail', qs.stringify(param)),
  unBindWeiXin: param =>
    SourceUserResource.get('/sso/V4/unBindWeiXin', qs.stringify(param)),
  modifyQq: param =>
    SourceUserResource.post('/sso/V4/modifyQq', qs.stringify(param)),
  getCertificationInfo: param =>
    SourceUserResource.get(
      '/sso/V4/getCertificationInfo?breakcache=' + Math.random()
    ),
  addPersonalCertification: param =>
    SourceUserResource.post(
      '/sso/V4/addPersonalCertification',
      qs.stringify(param)
    ),
  addCompanyCertification: param =>
    SourceUserResource.post(
      '/sso/V4/addCompanyCertification',
      qs.stringify(param)
    ),
  personalUpgradeCompany: param =>
    SourceUserResource.post(
      '/sso/V4/personalUpgradeCompany',
      qs.stringify(param)
    ),
  updatePersonalCertification: param =>
    SourceUserResource.post(
      '/sso/V4/updatePersonalCertification',
      qs.stringify(param)
    ),
  updateCompanyCertification: param =>
    SourceUserResource.post(
      '/sso/V4/updateCompanyCertification',
      qs.stringify(param)
    ),
  modifyPass: param =>
    SourceUserResource.post('/sso/V4/modifyPass', qs.stringify(param)),
  modifyPassSendCap: param =>
    SourceUserResource.post('/sso/V4/modifyPassSendCap', qs.stringify(param))
}
