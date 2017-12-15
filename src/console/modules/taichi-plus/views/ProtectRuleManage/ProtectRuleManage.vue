<template lang="html">
  <console-page-layout title="防护规则管理">
    <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
    <!-- <el-tab-pane label="套餐列表" name="PackageList">
    </el-tab-pane> -->
    <el-tab-pane label="非网站防护" name="UnWebsiteProtect">
    </el-tab-pane>
    <el-tab-pane label="网站防护" name="WebsiteProtect">
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
  </console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
// import PackageList from './TabsComponent/PackageList'
// import WebsiteProtect from './TabsComponent/WebsiteProtect'
// import UnWebsiteProtect from './TabsComponent/UnWebsiteProtect'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      activeTabName: this.$route.fullPath.split('/')[2]
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      this.activeTabName = `${toDepth[2]}`
    }
  },
  created() {
  },
  methods: {
    handleTabClick(tab) {
      if (tab.name === 'UnWebsiteProtect' || tab.name === 'WebsiteProtect') {
        this.$router.push(`/ProtectRuleManage/${tab.name}`)
      } else {
        this.$router.push(`/ProtectRuleManage/${tab.name}`)
      }
    }
  }
}
</script>

<style scope>

</style>
