import 'core-js'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './Root'
import ElementUI from 'element-ui'
import 'common/utils/hmr-events'
import 'common/assets/console-common-style'

Vue.use(ElementUI)

const app = new Vue({
  el: '#root',
  store,
  router,
  components: {
    App
  },
  render: h => h(App)
})
