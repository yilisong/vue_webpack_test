<template lang="html">
<console-page-layout title="域名列表">
  <Tip v-if="tipVisible" :content="tipValue"></Tip>
    <div class="wrap-background">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="24">
        </el-table-column>
        <el-table-column prop="domain" label="域名" min-width="100">
        </el-table-column>
        <el-table-column prop="trust_status_desc" label="托管状态">
        </el-table-column>
        <el-table-column prop="status_desc" label="域名状态">
        </el-table-column>
        <el-table-column prop="level_desc" label="套餐名称">
        </el-table-column>
        <el-table-column label="防御能力" min-width="150" align="center">
          <template scope="scope">
            {{scope.row.level_detail.dns_ddos.show}}
          </template>
        </el-table-column>
        <el-table-column prop="test" label="DNS服务器" min-width="180" align="center">
          <template scope="scope">
            <p v-for="item in scope.row.yundun_servers">
              {{item}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="expiry_time" label="到期日期" min-width="95">
        </el-table-column>
        <el-table-column prop="test" label="操作" min-width="140">
          <template scope="scope">
            <el-button type="text" @click="goToStatistics(scope.row)">统计</el-button>
            <el-button type="text" @click="goToResolving(scope.row)">云解析管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Tip from 'common/components/Tip/Tip'
import TaichiDnsResource from '../resource/TaichiDnsResource'
export default {
  components: {
    ConsolePageLayout,
    Tip,
    ComboTable
  },
  methods: {
    getTableData(current, size) {
      TaichiDnsResource.getTableList().then(response => {
        const arrayMidValue = []
        response.data.data.list.forEach((value, index) => {
          if (value.level_detail instanceof Array === false) {
            if (Number(value.level_detail.dns_ddos.value.gbps) >= 50 &&
            Number(value.level_detail.dns_ddos.value.qps) >= 500000) {
              arrayMidValue.push(value)
            }
          }
        })
        this.tableData = arrayMidValue
      })
    },
    goToStatistics(row) {
      this.$router.push(`/DomainList/Statistics/${row.domain}`)
    },
    goToResolving(row) {
      // console.log(row)
      // return
      window.location.href = `/console/cloud-resolving#/domainList/console/${row.id}/record`
    },
    nearlyOutTimeWebsite() {
      TaichiDnsResource.nearlyOutTimeWebsite().then(response => {
          if (response.data.data.list.length !== 0) {
            this.tipVisible = true
            this.total = response.data.data.total
            const midValue = Object.values(response.data.data.list)
            midValue.forEach((value, index) => {
              this.content = this.content + ' ' + ' ' + value
            })
            this.tipValue = [`当前有${this.total}个域名解析套餐即将到期，请联系客服及时续费，避免影响到您的网站访问。`,`即将到期域名：${this.content}`]
          } else {
            this.tipVisible = false
          }
      })
    }
  },
  data() {
    return {
      content:'',
      pageSizes: [5, 10, 20],
      pageSize: 5,
      tableData: [],
      total: 0,
      tipVisible: '',
      tipValue: []
    }
  },
  created() {
    this.getTableData()
    this.nearlyOutTimeWebsite()
  }
}
</script>

<style lang="css" scoped>

</style>
