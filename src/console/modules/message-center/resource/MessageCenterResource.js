import { MessageCenterResource } from './'

export default {
  getWebsiteList: params =>
    MessageCenterResource.get('/V4/messagecenter.getmessagelist', {
      params: {
        ...params
      }
    }),
  getNoticeConfigList: params =>
    MessageCenterResource.get('/V4/messagecenter.message.noticesetting.list', {
      params: {
        ...params
      }
    }),
  getPersonManageList: params =>
    MessageCenterResource.get('/V4/messagecenter.notice.getnoticememberlist', {
      params: {
        ...params
      }
    }),
  addNewUser: params =>
    MessageCenterResource.post('/V4/messagecenter.notice.addnoticemember', {
      ...params
    }),
  addNewGroup: params =>
    MessageCenterResource.post('/V4/messagecenter.notice.addnoticegroup', {
      ...params
    }),
  getGroupList: params =>
    MessageCenterResource.get('/V4/messagecenter.notice.getnoticegrouplist', {
      params: {
        ...params
      }
    }),
  delGroupList: params =>
    MessageCenterResource.delete('V4/messagecenter.notice.deletenoticegroup', {
      data: {
        ...params
      }
    }),
  updatePersonList: params =>
    MessageCenterResource.put('V4/messagecenter.notice.updatenoticemember', {
      ...params
    }),
  delPersonList: params =>
    MessageCenterResource.delete('V4/messagecenter.notice.deletenoticemember', {
      data: {
        ...params
      }
    }),
  updateNoticeConfig: params =>
    MessageCenterResource.post('/V4/messagecenter.message.noticesetting.save', {
      ...params
    }),
  messageDetail: params =>
    MessageCenterResource.get('/V4/messagecenter.getmessageinfo', {
      params: {
        ...params
      }
    }),
  delMessageList: params =>
    MessageCenterResource.delete('V4/messagecenter.batch.deletemessage', {
      data: {
        ...params
      }
    }),
  updateMseeageType: params =>
    MessageCenterResource.put('V4/messagecenter.batch.savemessagestatus', {
      ...params
    }),
  getLastSms: params =>
    MessageCenterResource.get('/V4/messagecenter.center.usableSmsNumber', {
      params: {
        ...params
      }
    }),
  sendEmailSmsReg: params =>
    MessageCenterResource.put('/V4/messagecenter.notice.verify', {
      ...params
    })
}
