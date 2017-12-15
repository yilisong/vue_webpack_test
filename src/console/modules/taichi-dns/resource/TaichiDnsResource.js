import { TaichiDnsResource } from './'

export default {
  getTableList: params =>
    TaichiDnsResource.get('/V4/CloudDns.Domain.DnsDomain.list', {
      params: {
        ...params
      }
    }),
  getDnsChart: params =>
    TaichiDnsResource.get('/V4/CloudDns.Domain.DnsDomain.DnsStat', {
      params: {
        ...params
      }
    }),
  nearlyOutTimeWebsite: params =>
    TaichiDnsResource.get('V4/CloudDns.Domain.tjkdDns.expiringDomains', {
      params: {
        ...params
      }
    })
}
