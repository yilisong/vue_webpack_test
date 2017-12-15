import { TaichiResource } from './'

// const user_id = 27037

export default {
  getDomainList: params =>
    TaichiResource.get('/V4/Tjkd.Web.Domain.list', {
      params: {
        ...params
        // user_id
      }
    }),
  getCcAttackData: params =>
    TaichiResource.get('/V4/statistic.tai.cc.top', {
      params: {
        ...params
      }
    }),
  getNodeDDoSList: params =>
    TaichiResource.get('/V4/Tjkd.Web.Domain.nodes', {
      params: {
        ...params
      }
    }),
  getCcAttackChart: params =>
    TaichiResource.get('V4/statistic.tai.cc.line', {
      params: {
        ...params
      }
    }),
  getCountryChart: params =>
    TaichiResource.get('V4/statistic.tai.cc.top.province', {
      params: {
        ...params
      }
    }),
  getWorldChart: params =>
    TaichiResource.get('V4/statistic.tai.cc.top.country', {
      params: {
        ...params
      }
    }),
  getOperateLog: params =>
    TaichiResource.get('V4/Tjkd.Web.op.log.list', {
      params: {
        ...params
      }
    }),
  getDdosAttackChart: params =>
    TaichiResource.get('V4/statistic.tai.ddos.line', {
      params: {
        ...params
      }
    }),
  getProtectCcData: domainId =>
    TaichiResource.get(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules`,
      {
        domainId: {
          // ...params
        }
      }
    ),
  saveAddData: (params, domainId) =>
    TaichiResource.post(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules`,
      {
        ...params
      }
    ),
  delListData: (id, domainId) =>
    TaichiResource.delete(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules.${id}`
    ),
  saveCcEditkData: (id, domainId, params) =>
    TaichiResource.put(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules.${id}`,
      {
        ...params
      }
    ),
  getProtectUrlList: domainId =>
    TaichiResource.get(
      `V4/Web.Domain.DomainId.${domainId}.Settings.tjkd_web_import_url_protect`
    ),
  changeProtectUrlList: (domainId, params) =>
    TaichiResource.put(
      `V4/Web.Domain.DomainId.${domainId}.Settings.tjkd_web_import_url_protect`,
      {
        ...params
      }
    ),
  getProtectCcSetting: domainId =>
    TaichiResource.get(`V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc`),

  changeProtectCcSetting: (domainId, params) =>
    TaichiResource.put(`V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc`, {
      ...params
    }),
  nearlyOutTimeWebsite: params =>
    TaichiResource.get('V4/Tjkd.Web.Domain.getexpiring', {
      params: {
        ...params
      }
    }),
  delDomain: params =>
    TaichiResource.delete('V4/Tjkd.Web.Domain.del', {
      data: {
        ...params
      }
    }),
  getHwwsStatus: params =>
    TaichiResource.get(
      `V4/Web.Domain.DomainId.${params}.Settings.cloud_ids`,
      {}
    ),
  changeProtectStatus: params =>
    TaichiResource.post('V4/Tjkd.Web.Domain.protect', {
      ...params
    })
}
