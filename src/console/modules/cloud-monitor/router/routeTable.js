const routeTable = {
  MonitorList: {
    name: '宕机监控',
    path: '/monitorList',
    component: r =>
      import(
        /* webpackChunkName: "cloud-monitor_MonitorList" */ '../views/MonitorList/MonitorList'
      ).then(r)
  },
  MonitorReport: {
    name: '宕机统计报表',
    path: '/monitorList/monitorReport',
    component: r =>
      import(
        /* webpackChunkName: "cloud-monitor_AddMonitor" */ '../views/MonitorList/MonitorReport'
      ).then(r)
  },
  AnnounciatorMonitor: {
    name: '故障列表',
    path: '/announciatorMonitor',
    component: r =>
      import(
        /* webpackChunkName: "cloud-monitor_AddMonitor" */ '../views/MonitorList/AnnounciatorMonitor'
      ).then(r)
  }
}

export const defaultPath = routeTable.MonitorList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '云监控', path: defaultPath }

export default routeTable
