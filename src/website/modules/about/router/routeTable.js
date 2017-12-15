const routeTable = {
  aboutUs: {
    path: '/introduce',
    component: r => import('../views/about-us/AboutUs').then(r)
  },
  advantage: {
    path: '/advantage',
    component: r => import('../views/advantage/Advantage').then(r)
  },
  cooperation: {
    path: '/cooperation',
    component: r => import('../views/cooperation/Cooperation').then(r)
  },
  events: {
    path: '/events',
    component: r => import('../views/events/Events').then(r)
  },
  legalNotice: {
    path: '/legalNotice',
    component: r => import('../views/legal-notice/LegalNotice').then(r)
  } /*,
  mediaReport: {
    path: '/mediaReport',
    component: r => import('../views/media-report/mediaReport').then(r)
  }*/
}

export const defaultPath = routeTable.aboutUs.path

export default routeTable
