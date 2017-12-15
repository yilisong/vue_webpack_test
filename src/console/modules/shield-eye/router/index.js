import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'
import routeTable, { defaultPath, crumbRoot } from './routeTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: defaultPath
  },
  {
    path: routeTable.PropertyList.path,
    component: routeTable.PropertyList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.PropertyList]
    }
  },
  {
    path: routeTable.PropertyDetail.path,
    component: routeTable.PropertyDetail.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.PropertyList,
        routeTable.PropertyDetail
      ]
    },
    children: [
      {
        path: '/',
        redirect: routeTable.PropertyDetail.VulnerabilityDetail.path
      },
      {
        path: routeTable.PropertyDetail.VulnerabilityDetail.path,
        component: routeTable.PropertyDetail.VulnerabilityDetail.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.PropertyList,
            routeTable.PropertyDetail,
            routeTable.PropertyDetail.VulnerabilityDetail
          ]
        }
      },
      {
        path: routeTable.PropertyDetail.RiskDetail.path,
        component: routeTable.PropertyDetail.RiskDetail.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.PropertyList,
            routeTable.PropertyDetail,
            routeTable.PropertyDetail.RiskDetail
          ]
        }
      }
    ]
  },
  {
    path: routeTable.VulnerabilityScan.path,
    component: routeTable.VulnerabilityScan.component,
    children: [
      {
        path: '/',
        redirect: routeTable.VulnerabilityScan.ScanDetailList.path
      },
      {
        path: routeTable.VulnerabilityScan.ScanDetailList.path,
        component: routeTable.VulnerabilityScan.ScanDetailList.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.VulnerabilityScan,
            routeTable.VulnerabilityScan.ScanDetailList
          ]
        }
      },
      {
        path: routeTable.VulnerabilityScan.ScanTaskList.path,
        component: routeTable.VulnerabilityScan.ScanTaskList.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.VulnerabilityScan,
            routeTable.VulnerabilityScan.ScanTaskList
          ]
        }
      }
    ]
  },
  {
    path: routeTable.RiskDetection.path,
    component: routeTable.RiskDetection.component,
    children: [
      {
        path: '/',
        redirect: routeTable.RiskDetection.DetectionList.path
      },
      {
        path: routeTable.RiskDetection.DetectionList.path,
        component: routeTable.RiskDetection.DetectionList.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.RiskDetection,
            routeTable.RiskDetection.DetectionList
          ]
        }
      },
      {
        path: routeTable.RiskDetection.EventList.path,
        component: routeTable.RiskDetection.EventList.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.RiskDetection,
            routeTable.RiskDetection.EventList
          ]
        }
      }
    ]
  },
  {
    path: routeTable.RiskDetection.ConsolePanel.path,
    component: routeTable.RiskDetection.ConsolePanel.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.RiskDetection,
        routeTable.RiskDetection.DetectionList,
        routeTable.RiskDetection.ConsolePanel
      ]
    }
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
