import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'

const BasicInfo = {
  name: '基本资料',
  path: '/basicinfo',
  component: r =>
    import(
      /* webpackChunkName: "cloud-monitor_MonitorList" */ '../views/basics/index'
    ).then(r)
}
const Authentication = {
  name: '用户认证',
  path: '/authentication',
  component: r =>
    import(
      /* webpackChunkName: "cloud-monitor_AddMonitor" */ '../views/authentication/index'
    ).then(r)
}
const ModifyPass = {
  name: '修改密码',
  path: '/modifypass',
  component: r =>
    import(
      /* webpackChunkName: "cloud-monitor_AddMonitor" */ '../views/modify/index'
    ).then(r)
}
const LoginLog = {
  name: '登录日志',
  path: '/loginlog',
  component: r =>
    import(
      /* webpackChunkName: "cloud-monitor_AddMonitor" */ '../views/loginlog/index'
    ).then(r)
}

const defaultModulePath = BasicInfo.path
// Root breadcrumb item for the entire module
const root = { name: '用户中心', path: defaultModulePath }

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: defaultModulePath
  },
  {
    path: BasicInfo.path,
    component: BasicInfo.component,
    meta: {
      breadcrumb: [root, BasicInfo]
    }
  },
  {
    path: Authentication.path,
    component: Authentication.component,
    meta: {
      breadcrumb: [root, Authentication]
    }
  },
  {
    path: ModifyPass.path,
    component: ModifyPass.component,
    meta: {
      breadcrumb: [root, ModifyPass]
    }
  },
  {
    path: LoginLog.path,
    component: LoginLog.component,
    meta: {
      breadcrumb: [root, LoginLog]
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
