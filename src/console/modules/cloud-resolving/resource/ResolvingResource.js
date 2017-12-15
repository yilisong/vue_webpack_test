import { ResolvingResource } from './'

export default {
  getDomainList: params =>
    ResolvingResource.get('/V4/CloudDns.Domain.DnsDomain.list', {
      params: {
        ...params
      }
    }),
  getViewList: params =>
    ResolvingResource.get('/V4/CloudDns.DiyViews.list', {
      params: {
        ...params
      }
    }),
  getAliasList: params =>
    ResolvingResource.get('/V4/CloudDns.Domain.DnsDomain.aliasList', {
      params: {
        ...params
      }
    }),
  batchDeleteDomain: params =>
    ResolvingResource.post('/V4/CloudDns.Domain.DnsDomain.batchDelete', {
      ...params
    }),
  addDomainList: params =>
    ResolvingResource.post('/V4/CloudDns.Domain.DnsDomain.add', {
      ...params
    }),
  addAliasName: params =>
    ResolvingResource.post('/V4/CloudDns.Domain.DnsDomain.addAlias', {
      ...params
    }),
  delAliasName: params =>
    ResolvingResource.post('/V4/CloudDns.Domain.DnsDomain.deleteAlias', {
      ...params
    }),
  getResolvingChart: params =>
    ResolvingResource.get('/V4/CloudDns.Domain.DnsDomain.DnsStat', {
      params: {
        ...params
      }
    }),
  getDnsStatus: params =>
    ResolvingResource.get('/V4/CloudDns.DomainRecords.getDomainDns', {
      params: {
        ...params
      }
    }),
  importToSpeed: params =>
    ResolvingResource.get(
      '/V4/CloudDns.DomainRecords.importRecord2CloudSpeed',
      {
        params: {
          ...params
        }
      }
    ),
  getRecordList: params =>
    ResolvingResource.get('/V4/CloudDns.DomainRecords.list', {
      params: {
        ...params
      }
    }),
  saveRecordEdit: params =>
    ResolvingResource.post('/V4/CloudDns.DomainRecords.edit', {
      ...params
    }),
  addNewRecord: params =>
    ResolvingResource.post('/V4/CloudDns.DomainRecords.add', {
      ...params
    })
}
