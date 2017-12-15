const routeTable = {
  DomainList: {
    name: '域名列表',
    path: '/domainList',
    component: r =>
      import(/* webpackChunkName: "cloud-resolving_DomainList" */ '../views/domain-list/index').then(
        r
      ),
    ConsoleLog: {
      name: '控制台',
      path: '/domainList/console/:id/record',
      component: r =>
        import(/* webpackChunkName: "cloud-resolving_ConsoleLog" */ '../views/domain-list/console/console-tab-record').then(
          r
        )
    },
    Statistics: {
      name: '解析量统计',
      path: '/domainList/statistics/:resolvingDomain',
      component: r =>
        import(/* webpackChunkName: "cloud-resolving_Statistics" */ '../views/domain-list/statistics').then(
          r
        )
    }
  }
}

export const defaultPath = routeTable.DomainList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '云解析', path: defaultPath }

export default routeTable
