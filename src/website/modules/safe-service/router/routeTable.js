const routeTable = {
  consult: {
    path: '/consult',
    component: r => import('../views/consult/Consult').then(r)
  },
  assess: {
    path: '/assess',
    component: r => import('../views/assess/Assess').then(r)
  },
  guarantor: {
    path: '/guarantor',
    component: r => import('../views/guarantor/Guarantor').then(r)
  },
  polling: {
    path: '/polling',
    component: r => import('../views/polling/Polling').then(r)
  },
  respond: {
    path: '/respond',
    component: r => import('../views/respond/Respond').then(r)
  },
  service: {
    path: '/service',
    component: r => import('../views/service/Service').then(r)
  },
  verify: {
    path: '/verify',
    component: r => import('../views/verify/Verify').then(r)
  }
}

export const defaultPath = routeTable.consult.path

export default routeTable
