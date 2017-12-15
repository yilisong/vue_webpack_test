import { ShieldPropertyResource } from './'

export default {
  getPropertyList: params =>
    ShieldPropertyResource.post('/V4/shield.property.count.list', {
      ...params
    }),
  getPropertyInfo: property_id =>
    ShieldPropertyResource.post('/V4/shield.property.info', {
      property_id
    }),
  addProperty: params =>
    ShieldPropertyResource.post('/V4/shield.property.add', {
      ...params
    }),
  deleteProperty: params =>
    ShieldPropertyResource.delete('/V4/shield.property.delete', {
      params
    }),
  verifyProperty: params =>
    ShieldPropertyResource.post('/V4/shield.property.verify', {
      ...params
    }),
  getVerifyCode: params =>
    ShieldPropertyResource.post('/V4/shield.property.get.code', {
      ...params
    }),
  getNoticeMemberList: () =>
    ShieldPropertyResource.get('/V4/shield.notice.member.list')
}
