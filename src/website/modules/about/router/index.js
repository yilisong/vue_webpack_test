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
    path: routeTable.aboutUs.path,
    component: routeTable.aboutUs.component
  },
  {
    path: routeTable.advantage.path,
    component: routeTable.advantage.component
  },
  {
    path: routeTable.cooperation.path,
    component: routeTable.cooperation.component
  },
  {
    path: routeTable.events.path,
    component: routeTable.events.component
  },
  {
    path: routeTable.legalNotice.path,
    component: routeTable.legalNotice.component
  },
  /*
    {
      path: routeTable.mediaReport.path,
      component: routeTable.mediaReport.component
    },*/
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
