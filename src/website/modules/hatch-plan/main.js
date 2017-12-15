import Vue from 'vue'
import App from './app'
import router from './router'
import Meta from 'vue-meta'

Vue.use(Meta, {
  keyName: 'metaInfo'
})
const app = new Vue({
  el: '#root',
  router,
  components: {
    App
  },
  render: h => h(App)
})
