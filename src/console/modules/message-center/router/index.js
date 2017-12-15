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
    path: routeTable.MessageList.path,
    component: routeTable.MessageList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.MessageList]
    }
  },
  {
    path: routeTable.MessageList.Detail.path,
    component: routeTable.MessageList.Detail.component,
    meta: {
      breadcrumb: [
        crumbRoot,
        routeTable.MessageList,
        routeTable.MessageList.Detail
      ]
    }
  },
  {
    path: routeTable.NoticeConfig.path,
    component: routeTable.NoticeConfig.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.NoticeConfig]
    }
  },
  {
    path: routeTable.PersonManage.path,
    component: routeTable.PersonManage.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.PersonManage]
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
