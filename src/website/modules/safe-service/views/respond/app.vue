<template lang="html">
  <website-layout>
    <Respond />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Respond from './Respond'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Respond
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
