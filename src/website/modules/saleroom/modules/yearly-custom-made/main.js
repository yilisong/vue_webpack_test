import Vue from 'vue'
import App from './app'
import 'common/assets/website-common-style'
import 'website/static/css/common.css'
import Meta from 'vue-meta'

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
