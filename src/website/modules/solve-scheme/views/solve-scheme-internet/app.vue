<template lang="html">
  <website-layout>
    <Internet />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Internet from './Internet'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Internet
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
