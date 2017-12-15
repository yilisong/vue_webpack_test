import DomainList from '../views/domain-list/index'
import BatchDomainAdd from '../views/domain-list/batch-domain-add'
import BatchRecordAdd from '../views/domain-list/batch-record-add'
import BatchRecordImport from '../views/domain-list/batch-record-import'
import Statistics from '../views/domain-list/statistics'
import Details from '../views/domain-list/details'
import Console from '../views/domain-list/console/index'
import ConsoleTabRecord from '../views/domain-list/console/console-tab-record'
import ConsoleTabConfig from '../views/domain-list/console/console-tab-config'
import ConsoleTabLog from '../views/domain-list/console/console-tab-log'

import CustomLine from '../views/custom-line/index'
import NotFound from 'common/components/NotFound/NotFound'

export default {
  appMenu: {
    title: '云解析',
    navActive: '5-2',
    items: [
      {
        title: '域名列表',
        index: '/domainList'
      }
      // 自定义线路暂时不上
      //  {
      //   title: '自定义线路',
      //   index: '/customLine'
      // }
    ]
  },
  routes: [
    {
      path: '/',
      redirect: '/domainList'
    },
    {
      path: '/domainList',
      component: DomainList
    },
    {
      path: '/domainList/batch-domain-add',
      component: BatchDomainAdd
    },
    {
      path: '/domainList/batch-record-add',
      component: BatchRecordAdd
    },
    {
      path: '/domainList/batch-record-import',
      component: BatchRecordImport
    },
    {
      path: '/domainList/statistics/:id',
      component: Statistics
    },
    {
      path: '/domainList/console/:id',
      component: Console,
      children: [
        {
          path: '/',
          redirect: 'record'
        },
        {
          path: 'record',
          component: ConsoleTabRecord
        },
        {
          path: 'config',
          component: ConsoleTabConfig
        },
        {
          path: 'log',
          component: ConsoleTabLog
        }
      ]
    },
    {
      path: '/domainList/details/:id',
      component: Details
    },
    {
      path: '/customLine',
      component: CustomLine
    },
    {
      path: '*',
      component: NotFound
    }
  ]
}
