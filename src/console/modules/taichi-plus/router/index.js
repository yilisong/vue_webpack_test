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
    path: routeTable.ProtectRuleManage.path,
    component: routeTable.ProtectRuleManage.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.ProtectRuleManage]
    },
    children: [
      {
        path: '/',
        redirect: routeTable.ProtectRuleManage.UnWebsiteProtect.path
      },
      {
        path: routeTable.ProtectRuleManage.UnWebsiteProtect.path,
        component: routeTable.ProtectRuleManage.UnWebsiteProtect.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.ProtectRuleManage,
            routeTable.ProtectRuleManage.UnWebsiteProtect
          ]
        }
      },
      {
        path: routeTable.ProtectRuleManage.WebsiteProtect.path,
        component: routeTable.ProtectRuleManage.WebsiteProtect.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.ProtectRuleManage,
            routeTable.ProtectRuleManage.WebsiteProtect
          ]
        }
      }
    ]
  },
  {
    path: routeTable.ProtectRuleManage.ConfigPage.path,
    component: routeTable.ProtectRuleManage.ConfigPage.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.ProtectRuleManage,
        routeTable.ProtectRuleManage.WebsiteProtect,
        routeTable.ProtectRuleManage.ConfigPage
      ]
    }
  },
  {
    path: routeTable.ProtectRuleManage.TcpConfigPage.path,
    component: routeTable.ProtectRuleManage.TcpConfigPage.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.ProtectRuleManage,
        routeTable.ProtectRuleManage.UnWebsiteProtect,
        routeTable.ProtectRuleManage.TcpConfigPage
      ]
    }
  },
  {
    path: routeTable.PackageList.path,
    component: routeTable.PackageList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.PackageList]
    }
  },
  {
    path: routeTable.DataTable.path,
    component: routeTable.DataTable.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.DataTable]
    },
    children: [
      {
        path: '/',
        redirect: routeTable.DataTable.ReportWebCCAttack.path
      },
      {
        path: routeTable.DataTable.ReportWebCCAttack.path,
        component: routeTable.DataTable.ReportWebCCAttack.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportWebCCAttack]
        }
      },
      {
        path: routeTable.DataTable.ReportDDoSAttack.path,
        component: routeTable.DataTable.ReportDDoSAttack.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportDDoSAttack]
        }
      },
      {
        path: routeTable.DataTable.ReportTcpCCAttack.path,
        component: routeTable.DataTable.ReportTcpCCAttack.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportTcpCCAttack]
        }
      },
      {
        path: routeTable.DataTable.ReportTcpTraffic.path,
        component: routeTable.DataTable.ReportTcpTraffic.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportTcpTraffic]
        }
      },
      {
        path: routeTable.DataTable.ReportTcpSession.path,
        component: routeTable.DataTable.ReportTcpSession.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportTcpSession]
        }
      }
    ]
  },
  {
    path: routeTable.DdosAttackDetails.path,
    component: routeTable.DdosAttackDetails.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.DataTable.ReportDDoSAttack,
        routeTable.DdosAttackDetails
      ]
    }
  },
  {
    path: routeTable.OperateRecord.path,
    component: routeTable.OperateRecord.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.OperateRecord]
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
