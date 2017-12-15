import 'common/assets/console-common-style'
import './assets/styles/index.css'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import store from './store'
import config from './config'

const router = new VueRouter({
  routes: config.routes
})

const app = new Vue({
  el: '#root',
  router,
  components: {
    App
  },
  render: h => h(App)
})
