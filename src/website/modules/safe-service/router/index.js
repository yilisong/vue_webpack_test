import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'
import routeTable, { defaultPath } from './routeTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: defaultPath
  },
  {
    path: routeTable.consult.path,
    component: routeTable.consult.component
  },
  {
    path: routeTable.assess.path,
    component: routeTable.assess.component
  },
  {
    path: routeTable.guarantor.path,
    component: routeTable.guarantor.component
  },
  {
    path: routeTable.polling.path,
    component: routeTable.polling.component
  },
  {
    path: routeTable.respond.path,
    component: routeTable.respond.component
  },
  {
    path: routeTable.service.path,
    component: routeTable.service.component
  },
  {
    path: routeTable.verify.path,
    component: routeTable.verify.component
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
