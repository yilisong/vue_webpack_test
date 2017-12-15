import Vue from 'vue'
import App from './app'
import Meta from 'vue-meta'
import 'website/static/css/common.css'

Vue.use(Meta, {
  keyName: 'metaInfo'
})
const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
