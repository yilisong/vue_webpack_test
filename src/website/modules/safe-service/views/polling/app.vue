<template lang="html">
  <website-layout>
    <Polling />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Polling from './Polling'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Polling
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
