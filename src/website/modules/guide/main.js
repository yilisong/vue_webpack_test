import Vue from 'vue'
import App from './app'

const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
