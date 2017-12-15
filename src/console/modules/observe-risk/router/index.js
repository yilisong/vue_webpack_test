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
    path: routeTable.DomainList.path
  },
  {
    path: routeTable.Statistics.path
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
