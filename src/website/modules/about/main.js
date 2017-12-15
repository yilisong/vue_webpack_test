import Vue from 'vue'
import App from './Abb'
import router from './router'
import { Tabs, TabPane } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Tabs)
Vue.use(TabPane)
const app = new Vue({
  el: '#root',
  router,
  components: {
    App
  },
  render: h => h(App)
})
