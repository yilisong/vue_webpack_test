import Vue from 'vue'
import App from './app'
import store from '../../store'
import Meta from 'vue-meta'

Vue.use(Meta)

const app = new Vue({
  el: '#root',
  store,
  components: {
    App
  },
  render: h => h(App)
})
