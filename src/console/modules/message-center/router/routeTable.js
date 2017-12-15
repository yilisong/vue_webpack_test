const routeTable = {
  MessageList: {
    name: '消息列表',
    path: '/MessageList',
    component: r =>
      import(/* webpackChunkName: "message-center_MessageList" */ '../views/MessageList/MessageList').then(
        r
      ),
    Detail: {
      name: '详情',
      path: '/MessageList/detail/:id',
      component: r =>
        import(/* webpackChunkName: "message-center_Detail" */ '../views/MessageList/Components/detail').then(
          r
        )
    }
  },
  NoticeConfig: {
    name: '消息通知设置',
    path: '/NoticeConfig',
    component: r =>
      import(/* webpackChunkName: "message-center_NoticeConfig" */ '../views/MessageList/NoticeConfig').then(
        r
      )
  },
  PersonManage: {
    name: '消息接收人管理',
    path: '/PersonManage',
    component: r =>
      import(/* webpackChunkName: "message-center_PersonManage" */ '../views/MessageList/PersonManage').then(
        r
      )
  }
}

export const defaultPath = routeTable.MessageList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '消息中心', path: defaultPath }

export default routeTable
