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
  // taichi-ddos-web
  {
    path: routeTable.SettingTaichiWeb.path,
    name: routeTable.SettingTaichiWeb.name,
    component: routeTable.SettingTaichiWeb.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingTaichiWeb]
    }
  },
  // taichi-ddos-dns
  // {
  //   path: routeTable.SettingTaichiDns.path,
  //   name: routeTable.SettingTaichiDns.name,
  //   component: routeTable.SettingTaichiDns.component,
  //   meta: {
  //     breadcrumb: [crumbRoot, routeTable.SettingTaichiDns]
  //   }
  // },
  // cloud-speed  hidden temporarily
  {
    path: routeTable.SettingCloudSpeed.path,
    name: routeTable.SettingCloudSpeed.name,
    component: routeTable.SettingCloudSpeed.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingCloudSpeed]
    }
  },
  // cloud-resolving
  {
    path: routeTable.SettingCloudResolving.path,
    name: routeTable.SettingCloudResolving.name,
    component: routeTable.SettingCloudResolving.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingCloudResolving]
    }
  },
  // double-mirror
  {
    path: routeTable.SettingDoubleMirror.path,
    name: routeTable.SettingDoubleMirror.name,
    component: routeTable.SettingDoubleMirror.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingDoubleMirror]
    }
  },
  // message
  {
    path: routeTable.SettingMessage.path,
    name: routeTable.SettingMessage.name,
    component: routeTable.SettingMessage.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingMessage]
    }
  },
  // cloud-monitor
  {
    path: routeTable.SettingCloudMonitor.path,
    name: routeTable.SettingCloudMonitor.name,
    component: routeTable.SettingCloudMonitor.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingCloudMonitor]
    }
  },
  // shield-eye
  {
    path: routeTable.SettingShieldEye.path,
    name: routeTable.SettingShieldEye.name,
    component: routeTable.SettingShieldEye.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SettingShieldEye]
    }
  },
  // red-guard
  // {
  //   path: routeTable.SettingRedGuard.path,
  //   name: routeTable.SettingRedGuard.name,
  //   component: routeTable.SettingRedGuard.component,
  //   meta: {
  //     breadcrumb: [crumbRoot, routeTable.SettingRedGuard]
  //   }
  // },
  // agreement
  {
    path: routeTable.TaichiWebAgreement.path,
    name: routeTable.TaichiWebAgreement.name,
    component: routeTable.TaichiWebAgreement.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.TaichiWebAgreement]
    }
  },
  {
    path: routeTable.RedGuardAgreement.path,
    name: routeTable.RedGuardAgreement.name,
    component: routeTable.RedGuardAgreement.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.RedGuardAgreement]
    }
  },
  // common
  {
    path: routeTable.confirm.path,
    name: routeTable.confirm.name,
    component: routeTable.confirm.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.confirm]
    }
  },
  {
    path: routeTable.prepay.path,
    name: routeTable.prepay.name,
    component: routeTable.prepay.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.prepay]
    }
  },
  {
    path: routeTable.purchase.path,
    name: routeTable.purchase.name,
    component: routeTable.purchase.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.purchase]
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
