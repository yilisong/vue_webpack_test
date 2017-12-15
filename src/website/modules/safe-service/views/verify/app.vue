<template lang="html">
  <website-layout>
    <Verify />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Verify from './Verify'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Verify
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
