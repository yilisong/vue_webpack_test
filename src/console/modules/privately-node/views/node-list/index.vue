<template lang="html">
<console-page-layout title="节点列表">
  <div class="function_button">
    <el-button type="primary" @click="openBatchSendDialog">批量推送</el-button>
  </div>
  <ComboTable :total="pointTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getPonitList" @on-current-change="getPonitList">
    <div slot="body">
      <el-table ref="multipleTable" :data="pointList" border tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="节点IP(归属地)" width="140" align="left">
          <template scope="scope">
            <span>{{scope.row.ip}}（{{scope.row.area}}）</span>
          </template>
        </el-table-column>
        <el-table-column label="配置">
          <template scope="scope">
            <span>CPU: {{scope.row.cpu}}</span>
            <span>内存: {{scope.row.memory}}</span>
            <span>宽带: {{scope.row.broadband}}</span>
          </template>
        </el-table-column>
        <el-table-column label="健康状态" width="120">
          <template scope="scope">
            <span v-if="scope.row.status === '1'"><i class="succceed-dot"></i> 正常</span>
            <span v-else><i class="fail-dot"></i> 宕机</span>
          </template>  
        </el-table-column>
        <el-table-column prop="address" label="已绑定服务">
          <template scope="scope">
            <div v-if="!scope.row.packageName && !scope.row.websiteList"> - </div>
            <div v-else>
              <div v-if="scope.row.packageName">{{scope.row.packageName}}: {{scope.row.package}}</div>
              <div v-else></div>
              <div v-if="scope.row.websiteList">
                <div style="display:inline-block;float:left;">网站：</div>
                <div style="float:left">
                  <div :key="index" v-for="(item,index) in scope.row.websiteList" :value = "index">
                    {{item}}
                  </div>
                </div>
              </div>
              <div v-else></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="openSendDialog(scope.row.id)" type="text" size="small">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <send></send>
  <Batchsend></Batchsend>
</console-page-layout>
</template>


<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Send from './dialogs/send'
import Batchsend from './dialogs/batchsend'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Send,
    Batchsend
  },
  data() {
    return {
      pointTotal: 2,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      pointList:[{
        id: '22',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '1',
        long: '22',
        packageName: '太极抗d',
        package: '0x007',
        websiteList: ['www.baidu.com','www.yundun.com']
      },{
        id: '25',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '2',
        long: '22',
        package: '太极抗d'
      },{
        id: '212',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '1',
        long: '22',
        package: '太极抗d'
      }]
    }
  },
  created() {},
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'triggerSendSetVisible',
      'triggerBatchSendSetVisible'
    ]),
    getPonitList() {
      console.log(111)
    },
    openBatchSendDialog() {
      this.triggerBatchSendSetVisible(true)
    },
    openSendDialog(id) {
      console.log(id)
      this.triggerSendSetVisible(true)
    }
  }
}
</script>
<style scoped>
  .function_button {
    margin: 20px 0; 
  }
</style>
