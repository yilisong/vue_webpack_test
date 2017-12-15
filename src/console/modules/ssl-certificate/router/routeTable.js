const routeTable = {
  SSLList: {
    name: '证书列表',
    path: '/certificateList',
    component: r => import('../views/certificate-list').then(r)
  }
}

export const defaultPath = routeTable.SSLList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: 'SSL证书', path: defaultPath }

export default routeTable
