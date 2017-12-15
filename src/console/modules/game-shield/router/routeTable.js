const routeTable = {
  GameShield: {
    name: '节点信息列表',
    path: '/gameList',
    component: r =>
      import(
        /* webpackChunkName: "game-shield_GameShield" */ '../views/GameList/GameShield'
      ).then(r)
  }
}

export const defaultPath = routeTable.GameShield.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '太极抗D APP版', path: defaultPath }

export default routeTable
