<template>
<console-page-layout title="统计报表">
  <div slot="tab">
    <el-tabs v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane label="Web CC攻击统计" name="webCCAttack"></el-tab-pane>
      <el-tab-pane label="DDOS攻击统计" name="ddosAttack"></el-tab-pane>
      <el-tab-pane label="TCP CC攻击统计" name="tcpCCAttack"></el-tab-pane>
      <el-tab-pane label="TCP 流量" name="tcpTraffic"></el-tab-pane>
      <el-tab-pane label="TCP 会话" name="tcpSession"></el-tab-pane>
      <el-tab-pane label="CC可视化推演" name="cc"></el-tab-pane>
      <el-tab-pane label="DDOS可视化推演" name="ddos"></el-tab-pane>
    </el-tabs>
  </div>
  <router-view></router-view>
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
      ddosUrl: '',
      activeTabName: this.$route.fullPath.split('/')[2]
    }
  },
  mounted() {
    CommonResource.getReportToken({ report_type: 'cc' }).then(response => {
      const data = response.data.data
      this.ccUrl = `http://ssa.yundun.com/cc?id=${data.member_id}&token=${data.token}`
    })
    CommonResource.getReportToken({ report_type: 'ddos' }).then(response => {
      const data = response.data.data
      this.ddosUrl = `http://ssa.yundun.com/ddos?id=${data.member_id}&token=${data.token}`
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
      } else if (type === 'ddos') {
        window.open(this.ddosUrl)
      } else {
        this.$router.push(`/plustaichireport/${tab.name}`)
      }
    }
  }
}
</script>

<style lang="">
.el-select-dropdown {
  z-index: 99999!important;
}
.el-table_1_column_1 .cell{
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #eaeefb;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 150px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.datalist{
  padding: 10px;
  margin-top: 40px;
  font-size: 20px;
  font-weight: bold;
}
.toolbar{
  margin-bottom: 30px;
}
.grid-content{
  background: #fbfbfb;
  border: 1px solid #d7d7d7;
}
.traffic{
  font-size: 18px;
  padding: 24px 0 0 23px;
}
.traffic_margin{
  margin-top: 33px;
}
.TrafficCunt{
  font-size: 37px;
  color: #1a82e1;
  padding-left: 23px;
}
.select-cunt{
  color: #1a82e1;
}
.select-cunt-text{
  position: absolute;
  padding-top: 15px;
  padding-left: 5px;
  color: #8391a5;
}
.TrafficUnit{
  color: #5c5c5c;
  font-size: 25px;
}
.el-select{
  overflow: hidden;
}
.el-select>.el-select__tags{
  max-height: 28px;
  overflow: hidden;
}
.el-select .el-tag {
    height: 24px;
    box-sizing: border-box;
    margin: 3px 0 3px 6px;
}
.el-progress-bar__innerText {
    display: block;
    color: #fff;
    font-size: 15px;
    margin: 0px 5px;
}
</style>
