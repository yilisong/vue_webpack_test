const routeTable = {
  WebsiteProtectList: {
    name: '网站防护列表',
    path: '/WebsiteProtectList',
    component: r =>
      import(/* webpackChunkName: "taichi-ddos_WebsiteProtectList" */ '../views/WebsiteProtectList/WebsiteProtectList').then(
        r
      )
  },
  OperateRecord: {
    name: '操作记录',
    path: '/OperateRecord',
    component: r =>
      import(/* webpackChunkName: "taichi-ddos_OperateRecord" */ '../views/OperateRecord/OperateRecord').then(
        r
      )
  },
  DataTable: {
    name: '数据列表',
    path: '/DataTable',
    component: r =>
      import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/index').then(
        r
      ),
    ReportCCAttack: {
      name: 'CC攻击',
      path: 'ccAttack',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/ccAttack').then(
          r
        )
    },
    ReportDDoSAttack: {
      name: 'DDoS攻击',
      path: 'ddosAttack',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/ddosAttack').then(
          r
        )
    }
  },
  CCLog: {
    name: 'CC记录',
    path: '/ccLog',
    component: r =>
      import(/* webpackChunkName: "taichi-ddos_CCLog" */ '../views/CCLog/CCLog').then(
        r
      )
  },
  WebsiteConsole: {
    name: '控制台',
    path: '/WebsiteProtectList/console/:id',
    component: r =>
      import(/* webpackChunkName: "taichi-ddos_WebsiteConsole" */ '../views/WebsiteProtectList/WebsiteConsole').then(
        r
      )
  }
}

export const defaultPath = routeTable.WebsiteProtectList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '太极抗D WEB版', path: defaultPath }

export default routeTable
