const routeTable = {
  // recharge list
  RechargeList: {
    name: '充值列表',
    path: '/rechargeList',
    component: r => import('../views/RechargeList/RechargeList').then(r)
  },
  // order list
  OrderList: {
    name: '订单列表',
    path: '/orderList',
    component: r => import('../views/OrderList/OrderList').then(r)
  },
  OrderDetail: {
    name: '订单详情',
    path: '/orderDetail',
    component: r => import('../views/OrderList/OrderDetail').then(r)
  },
  Pay: {
    name: '支付页面',
    path: '/pay',
    component: r => import('../views/OrderList/Pay').then(r)
  },
  // invoice list
  InvoiceList: {
    name: '发票列表',
    path: '/invoiceList',
    component: r => import('../views/InvoiceList/InvoiceList').then(r)
  },
  // coupon list
  CouponList: {
    name: '优惠码列表',
    path: '/couponList',
    component: r => import('../views/CouponList/CouponList').then(r)
  }
}

export const defaultPath = routeTable.RechargeList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '账务中心', path: defaultPath }

export default routeTable
