import NotFound from 'common/components/NotFound/NotFound'
import Sub1 from '../views/sub1'
import Sub2 from '../views/sub2'

export default {
  appMenu: {
    title: '云主机',
    navActive: '5-1',
    items: [
      {
        title: '云主机_sub1',
        index: '/sub1'
      },
      {
        title: '云主机_sub2',
        index: '/sub2'
      }
    ],
    active: '/sub1'
  },
  routes: [
    {
      path: '/',
      redirect: 'sub1'
    },
    {
      path: '/sub1',
      component: Sub1
    },
    {
      path: '/sub2',
      component: Sub2
    },
    {
      path: '*',
      component: NotFound
    }
  ]
}
