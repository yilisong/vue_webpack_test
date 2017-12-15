const routeTable = {
  special: {
    path: '/',
    component: r => import('../view/index').then(r)
  }
}

export const defaultPath = routeTable.special.path

export default routeTable
