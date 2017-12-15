import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'
import routeTable, { defaultPath } from './routeTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/page',
    redirect: defaultPath
  },
  {
    path: routeTable.hatchPlan.path,
    component: routeTable.hatchPlan.component
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
