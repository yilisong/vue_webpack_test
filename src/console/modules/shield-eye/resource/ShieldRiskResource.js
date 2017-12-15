import { ShieldRiskResource } from './'

export default {
  getRiskScanMeal: () =>
    ShieldRiskResource.get('/V4/shield.risk.scan.meal.info'),
  getRiskMealList: detection_id =>
    ShieldRiskResource.get('/V4/shield.risk.meal.list', {
      params: {
        detection_id
      }
    }),
  addRiskDetection: params =>
    ShieldRiskResource.post('/V4/shield.risk.detection.add', {
      ...params
    }),
  getRiskCountList: params =>
    ShieldRiskResource.post('/V4/shield.risk.count.list', {
      ...params
    }),
  switchRiskTask: params =>
    ShieldRiskResource.put('/V4/shield.risk.switch.act', {
      ...params
    }),
  deleteRiskTask: params =>
    ShieldRiskResource.delete('/V4/shield.risk.task.delete', {
      params
    }),
  getRiskLogList: params =>
    ShieldRiskResource.post('/V4/shield.risk.log.list', {
      ...params
    }),
  getRiskDetectionInfo: detection_id =>
    ShieldRiskResource.post('/V4/shield.risk.detection.info', {
      detection_id
    }),
  getRiskSettingInfo: detection_id =>
    ShieldRiskResource.post('/V4/shield.risk.setting.info', {
      detection_id
    }),
  saveRiskSettingContent: params =>
    ShieldRiskResource.put('/V4/shield.risk.setting.content.save', {
      ...params
    }),
  saveRiskSettingStatus: params =>
    ShieldRiskResource.put('/V4/shield.risk.setting.status.save', {
      ...params
    }),
  saveRiskDetection: params =>
    ShieldRiskResource.post('/V4/shield.risk.detection.save', {
      ...params
    })
}
