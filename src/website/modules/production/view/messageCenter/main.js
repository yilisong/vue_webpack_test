import Vue from 'vue'
import App from './app'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
// Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading.service

const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
