const routeTable = {
  // taichi-web
  SettingTaichiWeb: {
    name: 'setting-taichi-ddos',
    path: '/setting-taichi-ddos',
    component: r => import('../views/services/taichi-ddos-web').then(r)
  },
  // taichi-dns
  SettingTaichiDns: {
    name: 'setting-taichi-dns',
    path: '/setting-taichi-dns',
    component: r => import('../views/services/taichi-ddos-dns').then(r)
  },
  // cloud-speed
  SettingCloudSpeed: {
    name: 'cloud-speed',
    path: '/cloud-speed',
    component: r => import('../views/services/cloud-speed').then(r)
  },
  // cloud-resolving
  SettingCloudResolving: {
    name: 'cloud-resolving',
    path: '/cloud-resolving',
    component: r => import('../views/services/cloud-resolving').then(r)
  },
  // cloud-resolving
  SettingDoubleMirror: {
    name: 'setting-double-mirror',
    path: '/setting-double-mirror',
    component: r => import('../views/services/double-mirror').then(r)
  },
  // message
  SettingMessage: {
    name: 'setting-message',
    path: '/setting-message',
    component: r => import('../views/services/message').then(r)
  },
  // cloud-monitor
  SettingCloudMonitor: {
    name: 'setting-cloud-monitor',
    path: '/setting-cloud-monitor',
    component: r => import('../views/services/cloud-monitor').then(r)
  },
  // shield-eye
  SettingShieldEye: {
    name: 'setting-shield-eye',
    path: '/setting-shield-eye',
    component: r => import('../views/services/shield-eye').then(r)
  },
  // red-guard
  SettingRedGuard: {
    name: 'setting-red-guard',
    path: '/setting-red-guard',
    component: r => import('../views/services/red-guard').then(r)
  },
  // agreement
  TaichiWebAgreement: {
    name: 'taichi-web-agreement',
    path: '/agreement/taichi-web',
    component: r => import('../views/agreement/taichi-web').then(r)
  },
  RedGuardAgreement: {
    name: 'red-guard-agreement',
    path: '/agreement/red-guard',
    component: r => import('../views/agreement/red-guard').then(r)
  },
  // common
  confirm: {
    name: 'confirm',
    path: '/confirm',
    component: r => import('../views/common/confirm').then(r)
  },
  prepay: {
    name: 'prepay',
    path: '/prepay',
    component: r => import('../views/common/prepay').then(r)
  },
  purchase: {
    name: 'purchase',
    path: '/purchase',
    component: r => import('../views/common/purchase').then(r)
  }
}

export const defaultPath = routeTable.SettingTaichiWeb.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '支付', path: defaultPath }

export default routeTable
