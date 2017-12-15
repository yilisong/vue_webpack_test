import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'
import routeTable, { defaultPath, crumbRoot } from './routeTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: defaultPath
  },
  {
    path: routeTable.RechargeList.path,
    component: routeTable.RechargeList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.RechargeList]
    }
  },
  {
    path: routeTable.OrderList.path,
    component: routeTable.OrderList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.OrderList]
    }
  },
  {
    path: routeTable.OrderDetail.path,
    component: routeTable.OrderDetail.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.OrderDetail]
    }
  },
  {
    path: routeTable.Pay.path,
    component: routeTable.Pay.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.Pay]
    }
  },
  {
    path: routeTable.InvoiceList.path,
    component: routeTable.InvoiceList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.InvoiceList]
    }
  },
  {
    path: routeTable.CouponList.path,
    component: routeTable.CouponList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.CouponList]
    }
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
