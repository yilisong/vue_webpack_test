<template>
<console-page-layout title="数据报表">
<div class="webTaichi">
  <div slot="tab">
    <el-tabs v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane label="CC攻击统计" name="ccAttack"></el-tab-pane>
      <el-tab-pane label="DDoS攻击统计" name="ddosAttack"></el-tab-pane>
      <el-tab-pane label="CC可视化推演" name="cc">
      </el-tab-pane>
    </el-tabs>
  </div>
  <router-view></router-view>
</div>
</console-page-layout>
</template>

<script>
import CommonResource from 'common/resource/CommonResource'
import ConsolePageLayout from 'common/components/layout/console-page-layout'

export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      ccUrl: '',
      activeTabName: this.$route.fullPath.split('/')[2]
    }
  },
  mounted() {
    CommonResource.getReportToken({ report_type: 'cc' }).then(response => {
      const data = response.data.data
      this.ccUrl = `http://ssa.yundun.com/cc?id=${data.member_id}&token=${data.token}`
    })
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      this.tabActiveName = `${toDepth[2]}`
    }
  },
  methods: {
    handleClick(tab, event) {
      const type = `${tab.name}`
      if (type === 'cc') {
        window.open(this.ccUrl)
      } else {
        this.$router.push(`/DataTable/${tab.name}`)
      }
    }
  }
}
</script>
<style>
div.el-tabs__content {
  min-height: 1px;
  overflow: hidden;
}
</style>
<style scoped>
  /*.extra-btn {
    position: absolute;
    right: 60px;
    top: 130px;
    z-index:50;
  }
  .extra-btn2 {
    position: absolute;
    right: 200px;
    top: 130px;
    z-index:50;
  }*/
</style>
