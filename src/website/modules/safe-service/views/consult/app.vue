<template lang="html">
  <website-layout>
    <Consult />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Consult from './Consult'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Consult
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
