<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ServeGuard :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn">敬请期待</a></span>
      </ServeGuard>
    </div>
  </console-layout>
</template>

<script>
import ServeGuard from 'common/components/ConsoleProduct/serve-guard/ServeGuard'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'

export default {
  mixins: [routerSync(require('./constants/AppMenu'))],
  components: {
    ServeGuard,
    ConsoleLayout
  },
  data() {
    return {
      banner: {
        title: '服卫士 (主机防火墙)',
        description: [
          '服卫士是针对Windows Server系统开发的集服务器安全防护和安全管理为一体的综合性服务器防火墙软件。'
        ]
      },
      name: 'taichiDdos'
    }
  },
  created() {}
}
</script>

<style scoped>
.experience-btn {
  background: #f8f8f8 !important;
}
</style>
