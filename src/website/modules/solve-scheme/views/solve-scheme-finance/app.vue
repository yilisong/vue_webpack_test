<template lang="html">
  <website-layout>
    <Finance />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Finance from './Finance'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Finance
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
