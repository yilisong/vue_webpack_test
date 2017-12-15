const routeTable = {
  DomainList: {
    name: '域名列表',
    path: '/DomainList',
    component: r =>
      import(/* webpackChunkName: "taichi-dns_DomainList" */ '../views/DomainList').then(
        r
      )
  },
  Statistics: {
    name: '统计图表',
    path: '/DomainList/Statistics/:domainName',
    component: r =>
      import(/* webpackChunkName: "taichi-dns_Statistics" */ '../views/Statistics').then(
        r
      )
  }
}

export const defaultPath = routeTable.DomainList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '太极抗D-DNS版', path: defaultPath }

export default routeTable
