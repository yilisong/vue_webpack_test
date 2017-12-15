const routeTable = {
  DomainList: {
    name: '域名列表',
    path: '/DomainList'
  },
  Statistics: {
    name: '统计图表',
    path: '/DomainList/Statistics/:domainName'
  }
}

export const defaultPath = routeTable.DomainList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '太极抗D-DNS版', path: defaultPath }

export default routeTable
