<template lang="html">
  <website-layout>
    <Service />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Service from './Service'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Service
  }
}
</script>

<style scoped>
</style>
<style>
.nav-bar {
  background: rgba(0, 0, 0, .9) !important
}
</style>
