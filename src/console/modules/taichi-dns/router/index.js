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
    path: routeTable.Statistics.path,
    component: routeTable.Statistics.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.DomainList, routeTable.Statistics]
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
