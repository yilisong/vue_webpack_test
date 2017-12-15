import { TaichiPlusResource } from './'

export default {
  getCcAttackData: params =>
    TaichiPlusResource.get('/V4/statistic.tai.cc.top', {
      params: {
        ...params
      }
    }),
  getNodeDDoSList: params =>
    TaichiPlusResource.get('/V4/Tjkd.Web.Domain.nodes', {
      params: {
        ...params
      }
    }),
  getCcAttackChart: params =>
    TaichiPlusResource.get('V4/statistic.tai.cc.line', {
      params: {
        ...params
      }
    }),
  getCountryChart: params =>
    TaichiPlusResource.get('V4/statistic.tai.cc.top.province', {
      params: {
        ...params
      }
    }),
  getWorldChart: params =>
    TaichiPlusResource.get('V4/statistic.tai.cc.top.country', {
      params: {
        ...params
      }
    }),
  getOperateLog: params =>
    TaichiPlusResource.get('V4/Tjkd.Web.op.log.list', {
      params: {
        ...params
      }
    }),
  getDdosAttackChart: params =>
    TaichiPlusResource.get('V4/statistic.tai.ddos.line', {
      params: {
        ...params
      }
    }),
  getProtectCcData: domainId =>
    TaichiPlusResource.get(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules`,
      {
        domainId: {
          // ...params
        }
      }
    ),
  saveAddData: (params, domainId) =>
    TaichiPlusResource.post(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules`,
      {
        ...params
      }
    ),
  delListData: (id, domainId) =>
    TaichiPlusResource.delete(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules.${id}`
    ),
  saveCcEditkData: (id, domainId, params) =>
    TaichiPlusResource.put(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules.${id}`,
      {
        ...params
      }
    ),
  getProtectUrlList: domainId =>
    TaichiPlusResource.get(
      `V4/Web.Domain.DomainId.${domainId}.Settings.tjkd_web_import_url_protect`
    ),
  changeProtectUrlList: (domainId, params) =>
    TaichiPlusResource.put(
      `V4/Web.Domain.DomainId.${domainId}.Settings.tjkd_web_import_url_protect`,
      {
        ...params
      }
    ),
  getProtectCcSetting: domainId =>
    TaichiPlusResource.get(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc`
    ),

  changeProtectCcSetting: (domainId, params) =>
    TaichiPlusResource.put(
      `V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc`,
      {
        ...params
      }
    ),
  getHwwsStatus: params =>
    TaichiPlusResource.get(
      `V4/Web.Domain.DomainId.${params}.Settings.cloud_ids`
    ),
  getPackageListCopy: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.package.list', {
      params: {
        ...params
      }
    }),
  getPackageList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.package.all', {
      params: {
        ...params
      }
    }),
  getProtectDomainList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.domain.list', {
      params: {
        ...params
      }
    }),
  getDomainListUsable: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.domain.usable', {
      params: {
        ...params
      }
    }),
  getDomainListAll: params =>
    TaichiPlusResource.get('V4/Tjkd.Web.Domain.list', {
      params: {
        ...params
      }
    }),
  getRuleList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.forward.rule.list', {
      params: {
        ...params
      }
    }),
  addPlusDomain: (params, domainId) =>
    TaichiPlusResource.post('V4/Tjkd.plus.domain.add', {
      ...params
    }),
  batchDeleteDomain: params =>
    TaichiPlusResource.delete('V4/Tjkd.plus.domain.del', {
      data: {
        ...params
      }
    }),
  batchDeleteRule: params =>
    TaichiPlusResource.delete('V4/Tjkd.plus.forward.rule.del', {
      data: {
        ...params
      }
    }),
  addNewRuleFun: params =>
    TaichiPlusResource.post('V4/Tjkd.plus.forward.rule.save', {
      ...params
    }),
  getPlusBlackWhiteList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.forward.rule.whiteblackip.list', {
      params: {
        ...params
      }
    }),
  addPlusBlackWhiteList: params =>
    TaichiPlusResource.post('V4/Tjkd.plus.forward.rule.whiteblackip.add', {
      ...params
    }),
  saveUnWebsiteRule: params =>
    TaichiPlusResource.post('V4/Tjkd.plus.forward.rule.cc.setting.save', {
      ...params
    }),
  getUnWebsiteRule: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.forward.rule.cc.setting.info', {
      params: {
        ...params
      }
    }),
  getCountryList: params =>
    TaichiPlusResource.get('V4/Web.Domain.Region', {
      params: {
        ...params
      }
    }),
  changeProtectStatus: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.domain.change.protect.status', {
      params: {
        ...params
      }
    }),
  changeBlackWhiteList: params =>
    TaichiPlusResource.put('V4/Tjkd.plus.forward.rule.whiteblackip.save', {
      ...params
    }),
  delBlackWhiteList: params =>
    TaichiPlusResource.delete('V4/Tjkd.plus.forward.rule.whiteblackip.del', {
      data: {
        ...params
      }
    }),
  getStatusAtNow: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.protect.ip.firewall.info', {
      params: {
        ...params
      }
    }),
  openElasticity: params =>
    TaichiPlusResource.get(
      'V4/Tjkd.plus.package.change.elasticity.protect.status',
      {
        params: {
          ...params
        }
      }
    ),
  getSummaryInfo: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.package.overview', {
      params: {
        ...params
      }
    }),
  /***************************/
  // V4/statistic.tjkd.plus.web.cc.top
  getPlusWebCCTop: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.web.cc.top', {
      params: {
        ...params
      }
    }),
  //V4/Tjkd.plus.package.domain.list
  getPackageDomainList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.package.domain.list', {
      params: {
        ...params
      }
    }),
  //
  getWebCcAttackChart: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.web.cc.line', {
      params: {
        ...params
      }
    }),
  //
  getWebCCNationalData: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.web.cc.Province.top', {
      params: {
        ...params
      }
    }),
  getWebCCGlobalData: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.web.cc.Country.top', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.ddos.line
  getDdosAttackLine: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.ddos.line', {
      params: {
        ...params
      }
    }),
  //V4/Tjkd.plus.package.ip.list
  getPackageIPList: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.package.ip.list', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.tcp.cc.top
  getPlusTCPCCTop: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.top', {
      params: {
        ...params
      }
    }),
  getPlusTcpCCLine: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.line', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.tcp.cc.Province.top
  getplusTcpProvince: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.Province.top', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.tcp.cc.Country.top
  getplusTcpCountry: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.Country.top', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.tcp.cc.flaw
  getPlusTCpFlaw: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.flaw', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.tcp.cc.conversation
  getPlusTcpConversation: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.tcp.cc.conversation', {
      params: {
        ...params
      }
    }),
  //V4/statistic.tjkd.plus.ddos.list
  getPlusDDosList: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.ddos.list', {
      params: {
        ...params
      }
    }),
  getPlusDDosDetailsList: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.ddos.detailList', {
      params: {
        ...params
      }
    }),
  getPlusDDosDetailsLine: params =>
    TaichiPlusResource.get('V4/statistic.tjkd.plus.ddos.detailLine', {
      params: {
        ...params
      }
    }),
  //getLogTableData
  getLogTableData: params =>
    TaichiPlusResource.get('V4/Tjkd.plus.op.log.list', {
      params: {
        ...params
      }
    })
}
