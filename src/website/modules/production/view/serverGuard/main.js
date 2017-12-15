import Vue from 'vue'
import App from './app'
import Meta from 'vue-meta'

Vue.use(Meta)

const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
