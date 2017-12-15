import { SourceFinanceResource } from './'

export default {
  // userInfo
  getUserBalance: params =>
    SourceFinanceResource.get('/V4/finance.recharge.getMemberBalance', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  // account recharge
  getRechargeByPage: params =>
    SourceFinanceResource.get('/V4/finance.recharge.rechargeList', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  launchRecharge: queryBody =>
    SourceFinanceResource.post('/V4/finance.recharge.recharge', {
      ...queryBody
    }),
  // order management
  getOrderByPage: params =>
    SourceFinanceResource.get('/V4/finance.order.list', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  cancelOrderByCode: queryBody =>
    SourceFinanceResource.post('/V4/finance.order.cancel', {
      ...queryBody
    }),
  prepayOrderByCode: params =>
    SourceFinanceResource.put('/V4/finance.order.prepay', {
      ...params
    }),
  payForOrderByCode: params =>
    SourceFinanceResource.put('/V4/finance.order.pay', {
      ...params
    }),
  getOrderDetailById: params =>
    SourceFinanceResource.get('/V4/finance.order.detail', {
      params: {
        ...params
      }
    }),
  getNotPaidOrderInfo: params =>
    SourceFinanceResource.put('/V4/finance.order.notpay', {
      ...params
    }),
  getApplyInfo: params =>
    SourceFinanceResource.get('/V4/finance.invoice.applyInfo', {
      params: {
        ...params
      }
    }),
  applyForInvoice: params =>
    SourceFinanceResource.post('/V4/finance.invoice.apply', {
      ...params
    }),
  // invoice management
  getInvoiceByPage: params =>
    SourceFinanceResource.get('/V4/finance.invoice.list', {
      params: {
        ...params
      }
    }),
  getInvoiceDetailsById: params =>
    SourceFinanceResource.get('/V4/finance.invoice.detail', {
      params: {
        ...params
      }
    }),
  // coupon management
  getCouponByPage: params =>
    SourceFinanceResource.get('/V4/finance.coupon.list', {
      params: {
        ...params
      }
    })
}
