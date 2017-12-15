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
    path: routeTable.DomainList.path,
    component: routeTable.DomainList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.DomainList]
    }
  },
  {
    path: routeTable.DomainList.ConsoleLog.path,
    component: routeTable.DomainList.ConsoleLog.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.DomainList,
        routeTable.DomainList.ConsoleLog
      ]
    }
  },
  {
    path: routeTable.DomainList.Statistics.path,
    component: routeTable.DomainList.Statistics.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.DomainList,
        routeTable.DomainList.Statistics
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
