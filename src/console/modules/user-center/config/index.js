import Basics from '../views/basics/index'
import Authentication from '../views/authentication/index'
import Modify from '../views/modify/index'
import Loginlog from '../views/loginlog/index'
import NotFound from 'common/components/NotFound/NotFound'
export default {
  secondMenu: {
    title: '用户中心',
    navActive: '8-1',
    subMenus: [
      {
        title: '基本资料',
        index: '/basics'
      },
      {
        title: '用户认证',
        index: '/authentication'
      },
      {
        title: '修改密码',
        index: '/modify'
      },
      {
        title: '登录日志',
        index: '/loginlog'
      }
    ],
    active2: '/basics'
  },
  routes: [
    {
      path: '/',
      redirect: '/basics'
    },
    {
      path: '/basics',
      component: Basics
    },
    {
      path: '/authentication',
      component: Authentication
      // children: [{
      //     path: '/',
      //     redirect: 'wideFlowRange'
      //   }, {
      //     path: 'wideFlowRange',
      //     component: ReportTabWideFlowRange
      //   },
      //   {
      //     path: 'accessAnalysis',
      //     component: ReportTabAccessAnalysis
      //   },
      //   {
      //     path: 'distributionRequest',
      //     component: ReportTabDistributionRequest
      //   }, {
      //     path: 'securityTrend',
      //     component: ReportTabSecurityTrend
      //   },
      //   {
      //     path: 'statusCodeAnalysis',
      //     component: ReportTabStatusCodeAnalysis
      //   },
      //   {
      //     path: 'hotspotAnalysis',
      //     component: ReportTabHotspotAnalysis,
      //     children: [{
      //       path: '/',
      //       redirect: 'hotUrl'
      //     }, {
      //       path: 'hotUrl',
      //       component: HotUrl
      //     }, {
      //       path: 'hotReferer',
      //       component: HotReferer
      //     }]
      //   }
      // ]
    },
    {
      path: '/modify',
      component: Modify
    },
    {
      path: '/loginLog',
      component: Loginlog
    },

    {
      path: '*',
      component: NotFound
    }
  ]
}
