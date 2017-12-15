<template lang="html">
  <website-layout>
    <Chess />
    <YundunBar />
  </website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import Chess from './Chess'

export default {
  data() {
    return {}
  },
  components: {
    websiteLayout,
    YundunBar,
    Chess
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
