const routeTable = {
  PropertyList: {
    name: '资产列表',
    path: '/propertyList',
    component: r =>
      import(/* webpackChunkName: "shield-eye:PropertyList" */ '../views/PropertyList/PropertyList').then(
        r
      )
  },
  PropertyDetail: {
    name: '资产详情',
    path: '/propertyList/propertyDetail',
    component: r =>
      import(/* webpackChunkName: "shield-eye:PropertyDetail/Container" */ '../views/PropertyList/PropertyDetail/Container').then(
        r
      ),
    VulnerabilityDetail: {
      name: '漏洞',
      path: '/propertyList/propertyDetail/vulnerabilityDetail',
      component: r =>
        import(/* webpackChunkName: "shield-eye:PropertyDetail/VulnerabilityDetail" */ '../views/PropertyList/PropertyDetail/VulnerabilityDetail').then(
          r
        )
    },
    RiskDetail: {
      name: '风险',
      path: '/propertyList/propertyDetail/riskDetail',
      component: r =>
        import(/* webpackChunkName: "shield-eye:PropertyDetail/RiskDetail" */ '../views/PropertyList/PropertyDetail/RiskDetail').then(
          r
        )
    }
  },
  VulnerabilityScan: {
    name: '漏洞扫描',
    path: '/vulnerabilityScan',
    component: r =>
      import(/* webpackChunkName: "shield-eye:VulnerabilityScan/Container" */ '../views/VulnerabilityScan/Container').then(
        r
      ),
    ScanDetailList: {
      name: '扫描列表',
      path: '/vulnerabilityScan/scanDetailList',
      component: r =>
        import(/* webpackChunkName: "shield-eye:VulnerabilityScan/ScanDetailList" */ '../views/VulnerabilityScan/ScanDetailList').then(
          r
        )
    },
    ScanTaskList: {
      name: '配置列表',
      path: '/vulnerabilityScan/scanTaskList',
      component: r =>
        import(/* webpackChunkName: "shield-eye:VulnerabilityScan/ScanTaskList" */ '../views/VulnerabilityScan/ScanTaskList').then(
          r
        )
    }
  },
  RiskDetection: {
    name: '内容监测',
    path: '/riskDetection',
    component: r =>
      import(/* webpackChunkName: "shield-eye:RiskDetectionContainer" */ '../views/RiskDetection/Container').then(
        r
      ),
    DetectionList: {
      name: '监测列表',
      path: '/riskDetection/detectionList',
      component: r =>
        import(/* webpackChunkName: "shield-eye:RiskDetection/DetectionList" */ '../views/RiskDetection/DetectionList').then(
          r
        )
    },
    ConsolePanel: {
      name: '控制台',
      path: '/riskDetection/consolePanel',
      component: r =>
        import(/* webpackChunkName: "shield-eye:RiskDetection/ConsolePanel" */ '../views/RiskDetection/ConsolePanel').then(
          r
        )
    },
    EventList: {
      name: '事件列表',
      path: '/riskDetection/eventList',
      component: r =>
        import(/* webpackChunkName: "shield-eye:RiskDetection/EventList" */ '../views/RiskDetection/EventList').then(
          r
        )
    }
  }
}

export const defaultPath = routeTable.PropertyList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '盾眼', path: defaultPath }

export default routeTable
