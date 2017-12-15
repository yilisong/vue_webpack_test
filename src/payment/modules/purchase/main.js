import 'core-js'
import Vue from 'vue'
import router from './router'
import store from './store'
// import 'common/utils/hmr-events'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app'
import 'purchase/assets/styles/index.css'

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
