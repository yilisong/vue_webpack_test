import { ShieldScanResource } from './'

export default {
  getScanSettingInfo: scan_task_id =>
    ShieldScanResource.post('/V4/shield.scan.setting.info', {
      scan_task_id
    }),
  getScanDetailList: params =>
    ShieldScanResource.post('/V4/shield.scan.detail.list', {
      ...params
    }),
  getScanTaskList: params =>
    ShieldScanResource.post('/V4/shield.scan.task.list', {
      ...params
    }),
  addScanTask: params =>
    ShieldScanResource.post('/V4/shield.scan.task.add', {
      ...params
    }),
  scanTaskAgain: scan_detail_id =>
    ShieldScanResource.post('/V4/shield.scan.task.again', {
      scan_detail_id
    }),
  saveCycleScan: params =>
    ShieldScanResource.post('/V4/shield.cycle.scan.save', {
      ...params
    }),
  cancelCycleScan: scan_task_id =>
    ShieldScanResource.put('/V4/shield.cycle.scan.cancel', {
      scan_task_id
    })
}
