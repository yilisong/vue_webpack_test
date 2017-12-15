<template>
<div class="wrap-background">
  <div>
    <el-select v-model="value" placeholder="请选择" @change="changePackage">
       <el-option v-for="item in optionsPackage" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="ddosContent">
    <div class="ddos-label">
      <span>IP</span>
      <el-select v-model="selectValueIP" placeholder="默认为所有IP" @change="changeIP">
        <el-option v-for="item in optionsIP" :key="item.ip_string" :label="item.ip_string" :value="item.ip_string">
        </el-option>
      </el-select>
      <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
    </div>
    <div class="clear"></div>
  </div>
  <div class="datalist2">DDoS攻击统计</div>
  <div id="ddos-attack-statistics" v-loading="ddosLoading" element-loading-text="拼命加载中"></div>
  <div class="datalist2">DDoS攻击详情</div>
  <div class="ddosSelectInfo">
    <el-select v-model="selectValueTableIP" placeholder="默认为所有IP" @change="changeTableIP">
      <el-option v-for="item in optionsTableIP" :key="item.ip_string" :label="item.ip_string" :value="item.ip_string">
      </el-option>
    </el-select>
    <el-date-picker v-model="startTimevalue2" type="date" placeholder="选择开始时间" :picker-options="pickerOptions" @change="timeSelectStar2" format="yyyy-MM-dd"></el-date-picker>
    <span class="demonstration">到</span>
    <el-date-picker v-model="endTimevalue2" type="date" placeholder="选择结束时间" :picker-options="pickerOptions" @change="timeSelectEnd2" format="yyyy-MM-dd"></el-date-picker>
    <el-select v-model="order" placeholder="请选择排序" @change="changeOrder">
      <el-option v-for="item in orderSelect" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="ddosTable_plus">
    <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getLogs" @on-current-change="getLogs">
      <div slot="body">
        <el-table :data="tableData" style="width: 100%" v-loading="ddosTableLoading">
          <el-table-column prop="host_ip" label="防御IP">
            <template scope="scope">
              <span>{{scope.row.host_ip}}({{scope.row.ip_location}})</span>
            </template>
          </el-table-column>
          <el-table-column prop="begin_time" label="开始时间">
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column prop="max_width" label="峰值带宽（Mbps）">
          </el-table-column>
          <el-table-column prop="duration" label="持续时间（秒）">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="checkDetails(scope.row.id, scope.row.begin_time, scope.row.end_time)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
  </div>
</div>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../resource/TaichiPlusResource'
import Tip from 'common/components/Tip/Tip'
import Echarts from 'echarts'
import EchartsLine from 'echarts/lib/chart/line'
import DateSelection from 'common/components/DateSelect/date-selection'


export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Tip,
    DateSelection
  },
  directives: {},
  computed: {
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
                 time.getTime() >= Date.now()
        }
      },
      startTimevalue2: '',
      endTimevalue2: '',
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      total: 0,
      endTimevalue: '',
      startTimevalue: '',
      optionsIP: '',
      optionsIPTrue: '',
      selectValueIP: '所有IP',
      ddosLoading: true,
      ddosTableLoading: true,
      ddosAttackChart: {
        xData: [],
        yData: [],
        unit: ''
      },
      tableData: [],
      test: '1',
      test2: '0',
      optionsPackage: [],
      value: '',
      orderSelect: [{
        label: '峰值带宽：降序',
        value: 'max_width|desc'
      },{
        label: '峰值带宽：升序',
        value: 'max_width|asc'
      },{
        label: '持续时间：降序',
        value: 'duration|desc'
      },{
        label: '持续时间：升序',
        value: 'duration|asc'
      }],
      order: '',
      selectValueTableIP: '',
      optionsTableIP: [],
      test3: '0'
    }
  },
  methods: {
    timeSelectStar2(timeRange) {
      this.startTimevalue2 = timeRange + ' ' + '00:00:00'
    },
    timeSelectEnd2(timeRange) {
      if (this.startTimevalue2 === ' 00:00:00') {
        this.$message({
          showClose: true,
          message: '开始时间不能为空',
          type: 'error'
        })
        return false
      }
      if (this.endTimevalue2 === '') {
        this.$message({
          showClose: true,
          message: '结束时间不能为空',
          type: 'error'
        })
        return false
      }
      this.endTimevalue2 = timeRange + ' ' + '23:59:59'
      if (this.startTimevalue2 > this.endTimevalue2) {
        this.$message({
          showClose: true,
          message: '开始时间必须小于结束时间',
          type: 'error'
        })
        return false
      }
      this.changeOrder()
    },
    getPackageList() {
      TaichiPlusResource.getPackageList().then(response => {
        if (response.data && response.data.data && response.data.data.list) {
          const list = response.data.data.list
          if (list.length > 0) {
            this.optionsPackage = list
            this.value = list[0].value ? list[0].value : ''
            if (this.value === '') {
              return
            } else {
              const params = { package_id: this.value }
              this.test = '0'
              this.test2 = '0'
              this.getPackageIPList(params)
              this.getPlusDDosList({
                package_id: this.value,
                ip: 'all',
                page: 1,
                per_page: 5,
                start_time: this.startTimevalue2,
                end_time: this.endTimevalue2,
                order: 'max_width|desc'
              })
              this.changeIP()
            }
          } else {
            this.ddosTableLoading = false
            this.ddosLoading = false
            this.ddosAttackChart.xData = [this.startTimevalue, this.endTimevalue]
            this.ddosAttackChart.yData = [0, 0]
            this.ddosAttackChart.unit = 'Mbps'
            this.ddosAttack()
          }
        } else {
          const message = response.data.status.message
          this.$message({
            showClose: true,
            message,
            type: 'error'
          })
        }
      })
    },
    changePackage() {
      if (this.value === '' || this.test === '0') {
        this.test = '1'
        this.test2 = '1'
        return
      } else {
        const params = { package_id: this.value }
        this.getPackageIPList(params)
        this.getPlusDDosList({
          package_id: this.value,
          ip: 'all',
          page: 1,
          per_page: 5,
          start_time: this.startTimevalue2,
          end_time: this.endTimevalue2,
          order: 'max_width|desc'
        })
        this.changeIP()
      }
    },
    getLogs(current, size) {
      let order
      if (this.order === '') {
        order = 'max_width|desc'
      } else {
        order = this.order
      }
      this.getPlusDDosList({
        package_id: this.value,
        ip: this.selectValueTableIP,
        page: current,
        per_page: size,
        start_time: this.startTimevalue2,
        end_time: this.endTimevalue2,
        order
      })
    },
    getPackageIPList(params) {
      TaichiPlusResource.getPackageIPList(params).then(response => {
        if (response.data && response.data.data && response.data.data.list) {
          this.optionsIP = response.data.data.list
          this.optionsTableIP = response.data.data.list
        } else {
          const message = response.data.status.message
          this.$message({
            showClose: true,
            message,
            type: 'error'
          })
        }
      })
    },
    checkDetails(id, begin, end) {
      window.localStorage.taichiPlusDetailsid = id
      window.localStorage.taichiPlusDetailsbegin = begin
      window.localStorage.taichiPlusDetailsend = end
      window.location.href = '/console/taichi-plus#/plustaichireport/ddosAttackDetails'
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.ddosLoading = true
      this.endTimevalue = endTimevalue
      this.startTimevalue = startTimevalue
      this.startTimevalue2 = startTimevalue
      this.endTimevalue2 = endTimevalue
      let ip
      let params
      if (this.test2 === '0') {
        return
      } else if (this.selectValueIP === '所有IP') {
        params = {
          ip: 'all',
          start_time: startTimevalue,
          end_time: endTimevalue,
          interval: '15m',
          package_id: this.value
        }
        this.getDdosAttackLine(params)
      } else {
        params = {
          ip: this.selectValueIP,
          start_time: startTimevalue,
          end_time: endTimevalue,
          interval: '15m',
          package_id: this.value
        }
        this.getDdosAttackLine(params)
      }
    },
    changeIP() {
      this.ddosLoading = true
      let params
      if (this.selectValueIP === '所有IP' || this.selectValueIP === '') {
        params = {
          ip: 'all',
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: '15m',
          package_id: this.value
        }
        this.getDdosAttackLine(params)
      } else {
        params = {
          ip: this.selectValueIP,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: '15m',
          package_id: this.value
        }
        this.getDdosAttackLine(params)
      }
    },
    changeOrder() {
      if (this.test3 === '0') {
        return
      } else {
        this.ddosTableLoading = true
        let orderValue
        let selectValueTableIPValue
        if (this.selectValueTableIP === '' || this.selectValueTableIP === 'all') {
          selectValueTableIPValue = 'all'
          this.test3 = '0'
        } else {
          selectValueTableIPValue = this.selectValueTableIP
        }
        if (this.order === '') {
          this.test3 = '0'
          orderValue = 'max_width|desc'
        } else {
          orderValue = this.order
        }
        this.getPlusDDosList({
          package_id: this.value,
          ip: selectValueTableIPValue,
          page: 1,
          per_page: 5,
          start_time: this.startTimevalue2,
          end_time: this.endTimevalue2,
          order: orderValue
        })
      }
    },
    changeTableIP() {
      this.changeOrder()
    },
    ddosAttack() {
      if (!document.getElementById('ddos-attack-statistics')) {
        return
      }
      this.chartTest = Echarts.init(document.getElementById('ddos-attack-statistics'))
      const unit = this.ddosAttackChart.unit
      const maxY = Math.max.apply(null, this.ddosAttackChart.yData)
      this.chartTest.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.ddosAttackChart.xData
        }],
        yAxis: [{
          name: '单位:' + unit,
          type: 'value',
          data: 5
        }],
        series: [{
          name: '瞬时数据',
          type: 'line',
          stack: '总量',
          itemStyle: {
            normal: {
              color: '#2d90e6',
              lineStyle: {
                color: '#2d90e6'
              }
            }
          },
          data: this.ddosAttackChart.yData,
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值',
              symbol: 'circle',
              symbolSize: 5,
              effect:{
                show: true,
                type: 'scale',
                loop: true,
                period: 15,
                scaleSize : 2,
                bounceDistance: 10,
                color : null,
                shadowColor : null,
                shadowBlur : 0
              }
            }],
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: 12
                  },
                  show: true,
                  position: 'top',
                  formatter() {
                    const maxStr = maxY.toString()
                    let newParamsName = ''
                    newParamsName += '最大值: '
                    newParamsName += maxStr
                    newParamsName += unit
                    return newParamsName
                  }
                }
              }
            }
          }
        }]
      })
    },
    getDdosAttackLine(params) {
      TaichiPlusResource.getDdosAttackLine(params).then(response => {
        this.ddosLoading = false
        if (response.data.status.code = 1 && response.data.data.trend) {
          this.ddosAttackChart.xData = response.data.data.trend.x_data
          if (response.data.data.trend.y_data.data instanceof Array) {
            this.ddosAttackChart.yData = response.data.data.trend.y_data.data
          } else {
            const arrayMidValue = []
            for (const key in response.data.data.trend.y_data.data) {
              arrayMidValue.push(response.data.data.trend.y_data.data[key])
            }
            this.ddosAttackChart.yData = arrayMidValue
          }
          this.ddosAttackChart.unit = response.data.data.trend.y_data.unit ? response.data.data.trend.y_data.unit : 'Mbps'
        } else {
          this.ddosAttackChart.xData = []
          this.ddosAttackChart.yData = []
          this.ddosAttackChart.unit = 'Mbps'
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.ddosAttack()
        })
      })
    },
    getPlusDDosList(params) {
      TaichiPlusResource.getPlusDDosList(params).then(response => {
        this.ddosTableLoading = false
        if (response.data.status.code = 1 && response.data.data) {
          this.test3 = '1'
          const data = response.data.data
          this.total = Number(data.total)
          this.tableData = data.list
        } else {
          this.test3 = '1'
          this.total = 0
          this.tableData = []
        }
      })
    }
  },
  mounted() {
  },
  created() {
    this.getPackageList()
  }
}
</script>
<style>
  .clearfix {
    clear: both;
  }
</style>
<style scoped>
  .el-select-dropdown {
    z-index: 99999!important;
  }
  .ddosContent {
    padding-top: 20px;
    padding-left: 20px;
  }
  .el-select .el-input__inner {
    height: 37px;
  }
  .el-select {
    margin-right: 20px;
  }
  .ddos-label {
    float: right;
  }
  .ddos-statistics {
    float: left;
    line-height: 30px;
    font-weight: 500;
  }
  .clear {
    clear:both;
  }
  #ddos-attack-statistics{
    width: 100%;
    height: 600px;
  }
  .extra-btn {
    position: absolute;
    right:40px;
    top: -50px;
  }
  .extra-btn2 {
    position: absolute;
    right:170px;
    top: -50px;
  }
  .ddosSelectInfo {
    float: right;
  }
  .datalist2 {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  .ddosTable_plus {
    margin-top: 60px;
  }
</style>
