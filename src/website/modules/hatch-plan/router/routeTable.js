const routeTable = {
  hatchPlan: {
    path: '/',
    component: r => import('../view/index').then(r)
  }
}

export const defaultPath = routeTable.hatchPlan.path

export default routeTable
