import 'core-js'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './Root'
import ElementUI from 'element-ui'
import 'common/assets/console-common-style'
import 'common/assets/styles/helper-class.css'
import 'nprogress/nprogress.css'
import './assets/styles/reset.css'

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
