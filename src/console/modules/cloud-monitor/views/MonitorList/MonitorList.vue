<template>
<console-page-layout title="监控列表">
  <Tip :content="monitorTipContent" className="default" mode="dynamic" ref="tip" />
  <ComboTable :total="monitorTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getMonitorList" @on-current-change="getMonitorList">
    <div slot="body">
      <div class="capacityInfo">
        <span>当前账号已购 <span  class="clo">{{totalPackage}}</span> 组宕机联动套餐共 <span class="black">{{switchPackage}}</span> 条切换任务，剩余 <span class="clo">{{sparePackage}}</span> 条切换任务。<a href="/payment#/setting-cloud-monitor" class="buyMore">购买宕机联动套餐</a></span>
      </div>
      <div class="banner_control">
        <el-button type="primary" @click="addMonitorList"> + 添加监控</el-button>
        <el-button type="" @click="handleAffirm('pause')">暂停</el-button>
        <el-button type="" @click="handleAffirm('open')">开启</el-button>
        <el-button type="" @click="handleAffirm('delete')">删除</el-button>
        <div class="monitorSelect">
          <el-select v-model="value" placeholder="请选择" @change="selectChange">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-table :data="monitorList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="24"></el-table-column>
        <el-table-column prop="" label="监控项目" width="180">
          <template scope="scope">
              <span>{{scope.row.name}}</span><br>
              <span>{{scope.row.value}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="protocol" label="监控协议" width="180">
        </el-table-column>
        <el-table-column label="监控频率">
          <template scope="scope">
              <span>{{scope.row.frequency}} 分钟</span>
            </template>
        </el-table-column>
        <el-table-column prop="monitor_status" label="监控状态（处理结果）">
          <template scope="scope">
              <span v-if="scope.row.status === '1'">正常</span>
              <span v-else-if="scope.row.status === '2'">已恢复</span>
              <span v-else-if="scope.row.status === '3'">宕机(暂停)</span>
              <span v-else-if="scope.row.status === '4'">宕机(切换)</span>
              <span v-else-if="scope.row.status === '5'">宕机(不处理)</span>
              <span v-else-if="scope.row.status === '6'">暂停</span>
            </template>
        </el-table-column>
        <el-table-column prop="" label="联动套餐">
          <template scope="scope">
              <span v-if="scope.row.linkage_info.package_info">
                <span v-if="scope.row.linkage_info.package_info !== ''">
                  {{scope.row.linkage_info.package_info.code}}
                </span>
                <span v-else>暂无数据</span>
              </span>
              <span v-else>暂无数据</span>
              <el-button @click="linkageSetting(scope.row)" type="text" size="small">配置</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="" label="联动到期时间">
          <template scope="scope">
              <span v-if="scope.row.linkage_info.package_info">
                <span v-if="scope.row.linkage_info.package_info.expiry_time">
                  <ExpireTime :expireTime="scope.row.linkage_info.package_info.expiry_time" />
                </span>
                <span v-else>暂无数据</span>
              </span>
              <span v-else>暂无数据</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
              <el-button @click="jumpToReport(scope.row)" type="text" size="small">统计</el-button>
              <el-button @click="taskConfig(scope.row)" type="text" size="small">任务配置</el-button>
              <el-button @click="alarmSetting(scope.row)" type="text" size="small">报警设置</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <AddMonitor/>
  <LinkageSetting :taskData="currentData" />
  <TaskConfig :ipValue="currentIp" :taskId="taskId" />
  <AlarmSetting :taskId="alarmId" :ipValue="alarmIp" />
</console-page-layout>
</template>

<script>
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import AddMonitor from './Dialogs/AddMonitor'
import LinkageSetting from './Dialogs/LinkageSetting'
import TaskConfig from './Dialogs/TaskConfig'
import AlarmSetting from './Dialogs/AlarmSetting'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import SourceMonitorResource from '../../resource/SourceMonitorResource'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    AddMonitor,
    ComboTable,
    Tip,
    LinkageSetting,
    TaskConfig,
    AlarmSetting,
    ExpireTime
  },
  directives: {
    tip: TipDirective
  },
  watch: {
    pageSize(newValue) {
    },
    dialogStatus(newValue) {
      if (newValue === false) {
        this.getMonitorList(this.currentPage, this.pageSize)
      }
    },
    linkageStatus(newValue) {
      if (newValue === false) {
        this.getMonitorList(this.currentPage, this.pageSize)
      }
    }
  },
  filters: {
    filterStatus(value) {
      const newValue = value === '1' ? '正常' : '暂停'
      return newValue
    }
  },
  methods: {
    ...mapActions([
      'deleteMonitorList', /*删除*/
      'openMonitorList', /*开启*/
      'pauseMonitorList', /*暂停*/
      'triggerAddMonitorVisible', /*增加*/
      'triggerLinkageSettingVisible', //联动设置窗口
      'triggerTaskConfigVisible',
      'getMonitorByPage',
      'triggerAlarmSettingVisible'
    ]),
    getMonitorList(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.getMonitorByPage({
        page: current,
        per_page: size
      })
    },
    getDaysMinus(startDate, endDate) {
      const startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime()
      const endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime()
      const seconds = Math.abs((startTime - endTime)) / 1000
      return seconds
    },
    addMonitorList() {
      this.triggerAddMonitorVisible(true)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    linkageSetting(data) {
      this.currentData = data
      this.triggerLinkageSettingVisible(true)
    },
    taskConfig(data) {
      this.currentIp = data.value
      this.taskId = data.id
      this.triggerTaskConfigVisible(true)
    },
    alarmSetting(data) {
      this.alarmId = data.id
      this.alarmIp = data.value
      this.triggerAlarmSettingVisible(true)
    },
    handleAffirm(operate) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择当前操作项!'
        })
        return
      }
      let handleAffirmInfo
      switch (operate) {
        case 'pause':
          handleAffirmInfo = '暂停'
          break
        case 'open':
          handleAffirmInfo = '开启'
          break
        case 'delete':
          handleAffirmInfo = '删除'
          break
        default:
      }
      this.$confirm('此操作将' + handleAffirmInfo + '当前监控, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleMonitor(this.multipleSelection, operate)
      })
    },
    selectChange() {
      const status = this.value
      if (status === '0') {
        this.getMonitorByPage({
          page: 1,
          per_page: 10
        })
      } else {
        this.getMonitorByPage({
          page: 1,
          per_page: 10,
          status
        })
      }
    },
    handleMonitor(selection, handleOperate) {
      const delArray = []
      selection.forEach(item => {
        delArray.push(item.id)
      })
      const data = {
        id: delArray
      }
      const pageSize = this.$store.state.monitor.pageSize
      const params = {
        data,
        page: {
          page: this.currentPage,
          per_page: this.pageSize
        }
      }
      switch (handleOperate) {
        case 'pause':
          this.pauseMonitorList(params)
          break
        case 'open':
          this.openMonitorList(params)
          break
        case 'delete':
          this.deleteMonitorList(params)
          break
        default:
      }
    },
    jumpToReport(item) {
      window.localStorage.setItem('monitorReportip', item.value)
      window.localStorage.setItem('monitorReportid', item.id)
      window.location.href = '/console/cloud-monitor#/monitorList/monitorReport'
    }
  },
  computed: {
    monitorList() {
      return this.$store.state.monitor.list
    },
    monitorTotal() {
      return this.$store.state.monitor.total
    },
    dialogStatus() {
      return this.$store.state.dialog.taskConfig.visible
    },
    linkageStatus() {
      return this.$store.state.dialog.linkageSetting.visible
    }
  },
  mounted() {
    this.getMonitorList(1, this.pageSize)
    SourceMonitorResource.getPackageInfo().
    then(response => {
      if (response.data.status.code === 1) {
        this.totalPackage = response.data.data.package_total
        this.switchPackage = response.data.data.package_total_number
        this.sparePackage = response.data.data.package_usable_number
      }
    })
  },
  data() {
    return {
      totalPackage: '',
      switchPackage: '',
      sparePackage: '',
      currentData: [],
      currentIp: '',
      currentPage: 1,
      taskId: 0,
      alarmId: 0,
      alarmIp:'',
      monitorTipContent: [],
      pageSizes: [5, 10, 20],
      pageSize: 10,
      multipleSelection: [],
      linkageDialog: false,
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '已恢复'
      }, {
        value: '3',
        label: '宕机（暂停）'
      }, {
        value: '4',
        label: '宕机（切换）'
      }, {
        value: '5',
        label: '宕机（不处理）'
      }, {
        value: '6',
        label: '暂停'
      }],
      value: '0'
    }
  }
}
</script>

<style>
a {
  color: #333;
}

.banner_control {
  margin-top: 20px;
  margin-bottom: 20px;
}

.capacityInfo {
  border: 1px solid #abd3f5;
  padding: 10px 10px;
  background-color: #f5fafd;
}

.capacityInfo a,
.capacityInfo a:hover,
.capacityInfo a:focus {
  color: #2d90e6;
  background-color: #e1effb;
  border: 1px solid #2d90e6;
  padding: 5px 10px;
  margin-left: 10px;
}

.clo {
  color: #2d90e6;
}

.black {
  color: #000;
}

.monitorSelect {
  float: right;
}

.monitorSelect .el-input__inner {
  height: 36px!important;
}
</style>
