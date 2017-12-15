const resolve = require('path').resolve

const pages = [
  {
    path: 'website',
    name: 'index',
    title: '云盾|首页',
    symbol: 'wp1',
    entry: resolve(__dirname, '../src/website/modules/index/main.js')
  },
  {
    path: 'website',
    name: 'activity',
    title: '云盾|活动页',
    symbol: 'wp2',
    entry: resolve(__dirname, '../src/website/modules/activity/main.js')
  },
  {
    path: 'website',
    name: 'about',
    title: '云盾|关于',
    symbol: 'wp4',
    entry: resolve(__dirname, '../src/website/modules/about/main.js')
  },
  {
    path: 'website',
    name: 'login',
    title: '云盾|登录',
    symbol: 'wp5',
    entry: resolve(__dirname, '../src/website/modules/login/main.js'),
    required: true
  },
  {
    path: 'website',
    name: 'find-pass',
    title: '云盾|密码找回',
    symbol: 'wp6',
    entry: resolve(__dirname, '../src/website/modules/find-pass/main.js')
  },
  {
    path: 'website',
    name: 'register',
    title: '云盾|注册',
    symbol: 'wp7',
    entry: resolve(__dirname, '../src/website/modules/register/main.js')
  },
  {
    path: 'website',
    name: 'register-suc',
    title: '云盾|注册成功',
    symbol: 'wp8',
    entry: resolve(__dirname, '../src/website/modules/register-suc/main.js')
  },
  {
    path: 'website',
    name: 'hatch-plan',
    title: '云盾|安孵计划',
    symbol: 'wp9',
    entry: resolve(__dirname, '../src/website/modules/hatch-plan/main.js')
  },
  {
    path: 'website',
    name: 'guide',
    title: '云盾|导览',
    symbol: 'wp10',
    entry: resolve(__dirname, '../src/website/modules/guide/main.js'),
    required: true
  },
  {
    path: 'website',
    name: 'assess',
    title: '云盾|风险评估',
    symbol: 'wp11',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/assess/main.js'
    )
  },
  {
    path: 'website',
    name: 'consult',
    title: '云盾|等保咨询',
    symbol: 'wp12',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/consult/main.js'
    )
  },
  {
    path: 'website',
    name: 'guarantor',
    title: '云盾|安全重保',
    symbol: 'wp13',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/guarantor/main.js'
    )
  },
  {
    path: 'website',
    name: 'polling',
    title: '云盾|安全巡检',
    symbol: 'wp14',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/polling/main.js'
    )
  },
  {
    path: 'website',
    name: 'respond',
    title: '云盾|应急响应',
    symbol: 'wp15',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/respond/main.js'
    )
  },
  {
    path: 'website',
    name: 'service',
    title: '云盾|安全测试和渗透服务',
    symbol: 'wp16',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/service/main.js'
    )
  },
  {
    path: 'website',
    name: 'verify',
    title: '云盾|源代码审计及验证',
    symbol: 'wp17',
    entry: resolve(
      __dirname,
      '../src/website/modules/safe-service/views/verify/main.js'
    )
  },
  {
    path: 'website',
    name: 'browser-tip',
    title: '云盾|浏览器提示',
    symbol: 'wp18',
    entry: resolve(__dirname, '../src/website/modules/browser-tip/main.js')
  },
  {
    path: 'website',
    name: 'solve-scheme-chess',
    title: '云盾|棋牌解决方案',
    symbol: 'wp19',
    entry: resolve(
      __dirname,
      '../src/website/modules/solve-scheme/views/solve-scheme-chess/main.js'
    )
  },
  {
    path: 'website',
    name: 'solve-scheme-finance',
    title: '云盾|金融解决方案',
    symbol: 'wp20',
    entry: resolve(
      __dirname,
      '../src/website/modules/solve-scheme/views/solve-scheme-finance/main.js'
    )
  },
  {
    path: 'website',
    name: 'solve-scheme-government',
    title: '云盾|政府解决方案',
    symbol: 'wp21',
    entry: resolve(
      __dirname,
      '../src/website/modules/solve-scheme/views/solve-scheme-government/main.js'
    )
  },
  {
    path: 'website',
    name: 'solve-scheme-internet',
    title: '云盾|互联网解决方案',
    symbol: 'wp22',
    entry: resolve(
      __dirname,
      '../src/website/modules/solve-scheme/views/solve-scheme-internet/main.js'
    )
  },
  {
    path: 'website',
    name: 'special',
    title: '云盾|专题页',
    symbol: 'wp23',
    entry: resolve(__dirname, '../src/website/modules/special/main.js')
  },
  {
    path: 'website',
    name: 'cloudHost',
    title: '云盾|云主机',
    symbol: 'wp24',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/cloudHost/main.js'
    )
  },
  {
    path: 'website',
    name: 'cloudMonitor',
    title: '云盾|云监控',
    symbol: 'wp25',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/cloudMonitor/main.js'
    )
  },
  {
    path: 'website',
    name: 'cloudResolving',
    title: '云盾|云解析',
    symbol: 'wp26',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/cloudResolving/main.js'
    )
  },
  {
    path: 'website',
    name: 'cloudSpeed',
    title: '云盾|云加速',
    symbol: 'wp27',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/cloudSpeed/main.js'
    )
  },
  {
    path: 'website',
    name: 'doubleMirror',
    title: '云盾|替身镜像',
    symbol: 'wp28',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/doubleMirror/main.js'
    )
  },
  {
    path: 'website',
    name: 'redGuard',
    title: '云盾|红网卫士',
    symbol: 'wp29',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/redGuard/main.js'
    )
  },
  {
    path: 'website',
    name: 'serverGuard',
    title: '云盾|服卫士',
    symbol: 'wp30',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/serverGuard/main.js'
    )
  },
  {
    path: 'website',
    name: 'riskDetect',
    title: '云盾|盾眼',
    symbol: 'wp31',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/riskDetect/main.js'
    )
  },
  {
    path: 'website',
    name: 'sslCertificate',
    title: '云盾|ssl证书',
    symbol: 'wp32',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/sslCertificate/main.js'
    )
  },
  {
    path: 'website',
    name: 'stargaze',
    title: '云盾|观星风控数据台',
    symbol: 'wp33',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/stargaze/main.js'
    )
  },
  {
    path: 'website',
    name: 'taichiddosApp',
    title: '云盾|太极抗D App版',
    symbol: 'wp34',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/taichiddosApp/main.js'
    )
  },
  {
    path: 'website',
    name: 'taichiddosDns',
    title: '云盾|太极抗D Dns版',
    symbol: 'wp35',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/taichiddosDns/main.js'
    )
  },
  {
    path: 'website',
    name: 'taichiddosPlus',
    title: '云盾|太极抗D Plus版',
    symbol: 'wp36',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/taichiddosPlus/main.js'
    )
  },
  {
    path: 'website',
    name: 'taichiddosWeb',
    title: '云盾|太极抗D Web版',
    symbol: 'wp37',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/taichiddosWeb/main.js'
    )
  },
  {
    path: 'website',
    name: 'messageCenter',
    titie: '云盾|消息验证',
    symbol: 'wp38',
    entry: resolve(
      __dirname,
      '../src/website/modules/production/view/messageCenter/main.js'
    )
  },
  {
    path: 'website',
    name: 'personal-game-protect',
    titie: '云盾|私人游戏防护',
    symbol: 'wp41',
    entry: resolve(
      __dirname,
      '../src/website/modules/saleroom/modules/personal-game-protect/main.js'
    )
  },
  {
    path: 'website',
    name: 'yearly-custom-made',
    titie: '云盾|IP包年定制服务',
    symbol: 'wp42',
    entry: resolve(
      __dirname,
      '../src/website/modules/saleroom/modules/yearly-custom-made/main.js'
    )
  },
  {
    path: 'payment',
    name: 'purchase',
    title: '云盾支付|购买',
    symbol: 'pp1',
    entry: resolve(__dirname, '../src/payment/modules/purchase/main.js')
  },
  {
    path: 'console',
    name: 'home',
    title: '云盾控制台|首页',
    symbol: 'cp1',
    entry: resolve(__dirname, '../src/console/modules/home/main.js')
  },
  {
    path: 'console',
    name: 'ssl-certificate',
    title: '云盾控制台|产品&服务',
    symbol: 'cp2',
    entry: resolve(__dirname, '../src/console/modules/ssl-certificate/main.js')
  },
  {
    path: 'console',
    name: 'double-mirror',
    title: '云盾控制台|解决方案',
    symbol: 'cp3',
    entry: resolve(__dirname, '../src/console/modules/double-mirror/main.js')
  },
  {
    path: 'console',
    name: 'cloud-resolving',
    title: '云盾控制台|帮助文档',
    symbol: 'cp4',
    entry: resolve(__dirname, '../src/console/modules/cloud-resolving/main.js')
  },
  {
    path: 'console',
    name: 'cloud-monitor',
    title: '云盾控制台|云镜像',
    symbol: 'cp5',
    entry: resolve(__dirname, '../src/console/modules/cloud-monitor/main.js')
  },
  {
    path: 'console',
    name: 'message-center',
    title: '云盾控制台|消息中心',
    symbol: 'cp6',
    entry: resolve(__dirname, '../src/console/modules/message-center/main.js')
  },
  {
    path: 'console',
    name: 'cloud-host',
    title: '云盾控制台|登录',
    symbol: 'cp7',
    entry: resolve(__dirname, '../src/console/modules/cloud-host/main.js')
  },
  {
    path: 'console',
    name: 'cloud-speed',
    title: '云盾控制台|云加速',
    symbol: 'cp8',
    entry: resolve(__dirname, '../src/console/modules/cloud-speed/main.js')
  },
  {
    path: 'console',
    name: 'shield-eye',
    title: '云盾控制台|盾眼',
    symbol: 'cp9',
    entry: resolve(__dirname, '../src/console/modules/shield-eye/main.js')
  },
  {
    path: 'console',
    name: 'user-center',
    title: '云盾控制台|用户中心',
    symbol: 'cp10',
    entry: resolve(__dirname, '../src/console/modules/user-center/main.js')
  },
  {
    path: 'console',
    name: 'finance-center',
    title: '云盾控制台|账务管理',
    symbol: 'cp11',
    entry: resolve(__dirname, '../src/console/modules/finance-center/main.js')
  },
  {
    path: 'console',
    name: 'game-shield',
    title: '云盾控制台|太极抗D APP版',
    symbol: 'cp12',
    entry: resolve(__dirname, '../src/console/modules/game-shield/main.js')
  },
  {
    path: 'console',
    name: 'taichi-ddos',
    title: '云盾控制台|太极抗D WEB版',
    symbol: 'cp13',
    entry: resolve(__dirname, '../src/console/modules/taichi-ddos/main.js')
  },
  {
    path: 'console',
    name: 'taichi-dns',
    title: '云盾控制台|太极抗D DNS版',
    symbol: 'cp14',
    entry: resolve(__dirname, '../src/console/modules/taichi-dns/main.js')
  },
  {
    path: 'console',
    name: 'taichi-plus',
    title: '云盾控制台|太极抗D PLUS版',
    symbol: 'cp15',
    entry: resolve(__dirname, '../src/console/modules/taichi-plus/main.js')
  },
  {
    path: 'console',
    name: 'red-guard',
    title: '云盾控制台|红网卫士',
    symbol: 'cp16',
    entry: resolve(__dirname, '../src/console/modules/red-guard/main.js')
  },
  {
    path: 'console',
    name: 'observe-risk',
    title: '云盾控制台|观星风控',
    symbol: 'cp17',
    entry: resolve(__dirname, '../src/console/modules/observe-risk/main.js')
  },
  {
    path: 'console',
    name: 'serve-guard',
    title: '云盾控制台|观星风控',
    symbol: 'cp18',
    entry: resolve(__dirname, '../src/console/modules/serve-guard/main.js')
  },
  {
    path: 'console',
    name: 'privately-node',
    title: '云盾控制台|私有节点',
    symbol: 'cp19',
    entry: resolve(__dirname, '../src/console/modules/privately-node/main.js')
  },
  {
    path: 'perception',
    name: 'chongqing-perception',
    title: '云盾态势感知图|重庆态势感知图',
    symbol: 'pr1',
    entry: resolve(
      __dirname,
      '../src/perception/modules/chongqing-perception/main.js'
    )
  }
]

module.exports = {
  pages,
  symbols: ['md1', 'md2', 'md3', 'md4', ...pages.map(page => page.symbol)]
}
