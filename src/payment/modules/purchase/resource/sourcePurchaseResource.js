import { SourcePurchaseResource } from './'

export default {
  // from order
  getNotPaidOrderInfo: params =>
    SourcePurchaseResource.put('/V4/finance.order.notpay', {
      ...params
    }),
  orderPrepayByCode: params =>
    SourcePurchaseResource.put('/V4/finance.order.prepay', {
      ...params
    }),
  orderPayByCode: params =>
    SourcePurchaseResource.put('/V4/finance.order.pay', {
      ...params
    }),
  launchRecharge: params =>
    SourcePurchaseResource.post('/V4/finance.recharge.recharge', {
      ...params
    }),
  cancelOrderByCode: params =>
    SourcePurchaseResource.post('/V4/finance.order.cancel', {
      ...params
    }),
  // for taichi-web
  getDomainList: params =>
    SourcePurchaseResource.get('/V4/taiji.web.domain.list', {
      params: {
        ...params
      }
    }),
  getTaichiMealList: params =>
    SourcePurchaseResource.get('/V4/taiji.web.product.list', {
      params: {
        ...params
      }
    }),
  confirmTaichiSetting: params =>
    SourcePurchaseResource.post('/V4/taiji.web.buy.menu', {
      ...params
    }),
  createTaiChiWebOrder: params =>
    SourcePurchaseResource.post('/V4/taiji.web.create.order', {
      ...params
    }),
  // for taichi-dns
  getTaichiDnsDomainList: params =>
    SourcePurchaseResource.get('/V4/buy.tjkd.dns.getDomains', {
      params: {
        ...params
      }
    }),
  getTaichiDnsMealList: params =>
    SourcePurchaseResource.get('/V4/buy.tjkd.dns.products', {
      params: {
        ...params
      }
    }),
  confirmTaichiDnsSetting: params =>
    SourcePurchaseResource.post('/V4/buy.tjkd.dns.orderInfo', {
      ...params
    }),
  createTaiChiDnsOrder: params =>
    SourcePurchaseResource.post('/V4/buy.tjkd.dns.createOrder', {
      ...params
    }),
  // for cloud-speed
  getSpeedMealList: params =>
    SourcePurchaseResource.get('/V4/cloud.speed.product.list', {
      params: {
        ...params
      }
    }),
  confirmSpeedSetting: params =>
    SourcePurchaseResource.post('/V4/cloud.speed.buy.menu', {
      ...params
    }),
  createSpeedOrder: params =>
    SourcePurchaseResource.post('/V4/cloud.speed.create.order', {
      ...params
    }),
  // for cloud-resolving
  getResolvingMealList: params =>
    SourcePurchaseResource.get('/V4/cloud.dns.product.list', {
      params: {
        ...params
      }
    }),
  confirmResolvingSetting: params =>
    SourcePurchaseResource.post('/V4/cloud.dns.buy.menu', {
      ...params
    }),
  createResolvingOrder: queryBody =>
    SourcePurchaseResource.post('/V4/cloud.dns.created.order', {
      ...queryBody
    }),
  // double-mirror
  getDoubleMirrorMealList: params =>
    SourcePurchaseResource.get('/V4/buy.replaceMirror.products', {
      params: {
        ...params
      }
    }),
  confirmDoubleMirrorSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.replaceMirror.orderInfo', {
      ...queryBody
    }),
  createDoubleMirrorOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.replaceMirror.createOrder', {
      ...queryBody
    }),
  // message
  getMessageMealList: params =>
    SourcePurchaseResource.get('/V4/buy.message.products', {
      params: {
        ...params
      }
    }),
  confirmMessageSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.message.orderInfo', {
      ...queryBody
    }),
  createMessageOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.message.createOrder', {
      ...queryBody
    }),
  // cloud-monitor
  getCloudMonitorMealList: params =>
    SourcePurchaseResource.get('/V4/buy.cloudMonitor.products', {
      params: {
        ...params
      }
    }),
  confirmCloudMonitorSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.cloudMonitor.orderInfo', {
      ...queryBody
    }),
  createCloudMonitorOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.cloudMonitor.createOrder', {
      ...queryBody
    }),
  // shield-eye vulnerability scanning
  getScanMealList: params =>
    SourcePurchaseResource.get('/V4/buy.scan.products', {
      params: {
        ...params
      }
    }),
  confirmScanSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.scan.orderInfo', {
      ...queryBody
    }),
  createScanOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.scan.createOrder', {
      ...queryBody
    }),
  // shield-eye riskDetection
  getRiskDetectionMealList: params =>
    SourcePurchaseResource.get('/V4/buy.riskDetection.products', {
      params: {
        ...params
      }
    }),
  confirmRiskDetectionSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.riskDetection.orderInfo', {
      ...queryBody
    }),
  createRiskDetectionOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.riskDetection.createOrder', {
      ...queryBody
    }),
  // red-guard
  getRedGuardDomainList: params =>
    SourcePurchaseResource.get('/V4/buy.hwws.getDomains', {
      params: {
        ...params
      }
    }),
  getRedGuardMealList: params =>
    SourcePurchaseResource.get('/V4/buy.hwws.products', {
      params: {
        ...params
      }
    }),
  confirmRedGuardSetting: queryBody =>
    SourcePurchaseResource.post('/V4/buy.hwws.orderInfo', {
      ...queryBody
    }),
  createRedGuardOrder: queryBody =>
    SourcePurchaseResource.post('/V4/buy.hwws.createOrder', {
      ...queryBody
    })
}
