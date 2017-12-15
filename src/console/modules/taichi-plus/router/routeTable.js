const routeTable = {
  PackageList: {
    name: '套餐列表',
    path: '/PackageList',
    component: r =>
      import(/* webpackChunkName: "taichi-plus_PackageList" */ '../views/ProtectRuleManage/TabsComponent/PackageList').then(
        r
      )
  },
  ProtectRuleManage: {
    name: '防护规则',
    path: '/ProtectRuleManage',
    component: r =>
      import(/* webpackChunkName: "taichi-plus_ProtectRuleManage" */ '../views/ProtectRuleManage/ProtectRuleManage').then(
        r
      ),
    // PackageList: {
    //   name: '套餐列表',
    //   path: '/ProtectRuleManage/PackageList',
    //   component: r =>
    //     import(/* webpackChunkName: "taichi-plus_PackageList" */ '../views/ProtectRuleManage/TabsComponent/PackageList').then(
    //       r
    //     )
    // },
    UnWebsiteProtect: {
      name: '非网站防护',
      path: '/ProtectRuleManage/UnWebsiteProtect/',
      component: r =>
        import(/* webpackChunkName: "taichi-plus_UnWebsiteProtect" */ '../views/ProtectRuleManage/TabsComponent/UnWebsiteProtect').then(
          r
        )
    },
    WebsiteProtect: {
      name: '网站防护',
      path: '/ProtectRuleManage/WebsiteProtect/',
      component: r =>
        import(/* webpackChunkName: "taichi-plus_WebsiteProtect" */ '../views/ProtectRuleManage/TabsComponent/WebsiteProtect').then(
          r
        )
    },
    ConfigPage: {
      name: '防护设置',
      path: '/ProtectRuleManage/ConfigPage/:id',
      component: r =>
        import(/* webpackChunkName: "taichi-plus_ConfigPage" */ '../views/ProtectRuleManage/ConfigPage/ConfigPage').then(
          r
        )
    },
    TcpConfigPage: {
      name: 'TCP防护设置',
      path: '/ProtectRuleManage/TcpConfigPage/:id',
      component: r =>
        import(/* webpackChunkName: "taichi-plus_TcpConfigPage" */ '../views/ProtectRuleManage/ConfigPage/TcpConfigPage').then(
          r
        )
    }
  },
  DataTable: {
    name: '统计图表',
    path: '/plustaichireport',
    component: r =>
      import(/* webpackChunkName: "taichi-plus_DataTable" */ '../views/DataTable/index').then(
        r
      ),
    ReportWebCCAttack: {
      name: 'WEBCC攻击',
      path: 'webCCAttack',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/webCCAttack').then(
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
    },
    ReportTcpCCAttack: {
      name: 'TCP CC攻击统计',
      path: 'tcpCCAttack',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/tcpCCAttack').then(
          r
        )
    },
    ReportTcpTraffic: {
      name: 'TCP 流量',
      path: 'tcpTraffic',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/tcpTraffic').then(
          r
        )
    },
    ReportTcpSession: {
      name: 'TCP 会话',
      path: 'tcpSession',
      component: r =>
        import(/* webpackChunkName: "taichi-ddos_DataTable" */ '../views/DataTable/tcpSession').then(
          r
        )
    }
  },
  DdosAttackDetails: {
    name: 'DDoS攻击详情',
    path: '/plustaichireport/ddosAttackDetails',
    component: r =>
      import(/* webpackChunkName: "taichi-plus_OperateRecord" */ '../views/DataTable/ddosDetails').then(
        r
      )
  },
  OperateRecord: {
    name: '操作记录',
    path: '/OperateRecord',
    component: r =>
      import(/* webpackChunkName: "taichi-plus_OperateRecord" */ '../views/OperateRecord/OperateRecord').then(
        r
      )
  }
}

export const defaultPath = routeTable.PackageList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '太极抗D-PLUS版', path: defaultPath }

export default routeTable
