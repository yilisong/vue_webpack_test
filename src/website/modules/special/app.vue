<template lang="html">
  <website-layout>
    <router-view></router-view>
  </website-layout>
</template>

<script>
import $ from 'jquery'
import websiteLayout from 'common/components/layout/website-layout'

export default {
  data() {
    return {

    }
  },
  components: {
    websiteLayout
  },
  mounted() {
    const $nav = $('#nav-bar')
    $nav.css({
      background: 'rgba(0, 0, 0, 0.5)'
    })
  }
}
</script>

<style>
.footer-bg {
  display: none;
}
</style>
