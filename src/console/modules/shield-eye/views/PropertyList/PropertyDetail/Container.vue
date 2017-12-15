<template>
<console-page-layout title="资产详情">
  <div slot="tab">
    <el-tabs v-model="activeTab"
      @tab-click="handleTabClick">
      <el-tab-pane :label="VulnerabilityDetail.name"
        :name="VulnerabilityDetail.path"></el-tab-pane>
      <el-tab-pane :label="RiskDetail.name"
        :name="RiskDetail.path"></el-tab-pane>
    </el-tabs>
  </div>
  <router-view></router-view>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import routeTable from '../../../router/routeTable'

export default {
  components: {
    ConsolePageLayout
  },
  methods: {
    handleTabClick(tab) {
      this.$router.push({ path: tab.name, query: { property: this.$route.query.property } })
    }
  },
  created() {
    const path = this.$route.fullPath.split('/')
    this.activeTab = `/${path[1]}/${path[2]}/${path[3].split('?')[0]}`
  },
  data() {
    return {
      VulnerabilityDetail: routeTable.PropertyDetail.VulnerabilityDetail,
      RiskDetail: routeTable.PropertyDetail.RiskDetail
    }
  }
}
</script>
