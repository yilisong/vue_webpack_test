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
    path: routeTable.WebsiteProtectList.path,
    component: routeTable.WebsiteProtectList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.WebsiteProtectList]
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
    path: routeTable.DataTable.path,
    component: routeTable.DataTable.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.DataTable]
    },
    children: [
      {
        path: '/',
        redirect: routeTable.DataTable.ReportCCAttack.path
      },
      {
        path: routeTable.DataTable.ReportCCAttack.path,
        component: routeTable.DataTable.ReportCCAttack.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportCCAttack]
        }
      },
      {
        path: routeTable.DataTable.ReportDDoSAttack.path,
        component: routeTable.DataTable.ReportDDoSAttack.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.DataTable.ReportDDoSAttack]
        }
      }
    ]
  },
  {
    path: routeTable.CCLog.path,
    component: routeTable.CCLog.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.CCLog]
    }
  },
  {
    path: routeTable.WebsiteConsole.path,
    component: routeTable.WebsiteConsole.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.WebsiteConsole]
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
