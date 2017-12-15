<style lang="css" scoped>

</style>

<template lang="html">
<console-layout  :appMenu="appMenu" :breadcrumb="breadcrumb">
  <transition :name="transitionName" mode="out-in">
    <router-view></router-view>
  </transition>
</console-layout>
</template>

<script>
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'

export default {
  components: {
    ConsoleLayout
  },
  mixins: [
    routerSync(require('./constants/AppMenu'))
  ],
  data() {
    return {
      // secondMenu: config.secondMenu,
      transitionName: 'slide-right'
    }
  },
  created() {},
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      const fromDepth = from.fullPath.split('/')
      this.transitionName = toDepth.length < fromDepth.length ? 'slide-left' : 'slide-right'
    }
  },
  methods: {}
}
</script>
