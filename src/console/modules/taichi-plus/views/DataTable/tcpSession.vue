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
      <span>时间间隔</span>
      <el-select v-model="selectTime" placeholder="间隔时间" @change="changeTime" class="tcpTrafficTimeSelect">
        <el-option v-for="item in optionsTime" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
    </div>
    <div class="clear"></div>
  </div>
  <div id="ddos-attack-statistics" v-loading="ddosLoading" element-loading-text="拼命加载中"></div>
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
      endTimevalue: '',
      startTimevalue: '',
      selectValue: '',
      options: '',
      optionsIP: '',
      optionsIPTrue: 'all',
      selectValueIP: '所有IP',
      ddosLoading: false,
      ddosAttackChart: {
        xData: [],
        yData: [],
        unit: ''
      },
      optionsPackage: [],
      value: '',
      test: '0',
      test2: '0',
      selectTime: '1m',
      optionsTime: [{
        label: '1分钟',
        value: '1m'
      },{
        label: '5分钟',
        value: '5m'
      },{
        label: '10分钟',
        value: '10m'
      }]
    }
  },
  methods: {
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
              const params = {
                package_id: this.value,
                ip: this.optionsIPTrue,
                start_time: this.startTimevalue,
                end_time: this.endTimevalue,
                interval: this.selectTime
              }
              this.test = '0'
              this.test2 = '0'
              this.getPlusTcpConversation(params)
              this.getPackageIPList({ package_id: this.value })
            }
          } else {
            this.ddosLoading = false
            this.ddosAttackChart.unit = '次'
            this.ddosAttackChart.yData = [0, 0]
            this.ddosAttackChart.xData = [this.startTimevalue, this.endTimevalue]
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
        const params = { 
          package_id: this.value,
          ip: this.optionsIPTrue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: this.selectTime
        }
        this.getPlusTcpConversation(params)
        this.getPackageIPList({ package_id: this.value })
      }
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.ddosLoading = false
      this.endTimevalue = endTimevalue
      this.startTimevalue = startTimevalue
      if (this.optionsPackage.length === 0) {
        this.ddosLoading = false
        this.ddosAttackChart.unit = '次'
        this.ddosAttackChart.yData = [0, 0]
        this.ddosAttackChart.xData = [this.startTimevalue, this.endTimevalue]
        this.ddosAttack()
      } else {
        if (this.test === '0') {
          return
        } else {
          let ip
          let params
          if ((this.selectValueIP === '所有IP') && (this.optionsIPTrue !== '')) {
            params = {
              package_id: this.value,
              ip: 'all',
              start_time: startTimevalue,
              end_time: endTimevalue,
              interval: '1m'
            }
            this.getPlusTcpConversation(params)
          } else {
            params = {
              package_id: this.value,
              ip: this.selectValueIP,
              start_time: startTimevalue,
              end_time: endTimevalue,
              interval: '1m'
            }
            this.getPlusTcpConversation(params)
          }
        }
      }
    },
    changeIP() {
      this.ddosLoading = true
      let params
      if (this.selectValueIP === '所有IP' || this.selectValueIP === '') {
        params = {
          package_id: this.value,
          ip: 'all',
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: this.selectTime
        }
      } else {
        params = {
          package_id: this.value,
          ip: this.selectValueIP,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: this.selectTime
        }
      }
      this.getPlusTcpConversation(params)
    },
    changeTime() {
      if (this.value === '') {
        return
      } else {
        this.ddosLoading = true
        let params
        if (this.selectValueIP === '所有IP' || this.selectValueIP === '') {
          params = {
            package_id: this.value,
            ip: 'all',
            start_time: this.startTimevalue,
            end_time: this.endTimevalue,
            interval: this.selectTime
          }
        } else {
          params = {
            package_id: this.value,
            ip: this.selectValueIP,
            start_time: this.startTimevalue,
            end_time: this.endTimevalue,
            interval: this.selectTime
          }
        }
        this.getPlusTcpConversation(params)
      }
    },
    getPackageIPList(params) {
      TaichiPlusResource.getPackageIPList(params).then(response => {
        if (response.data && response.data.data && response.data.data.list) {
          this.optionsIP = response.data.data.list
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
    ddosAttack() {
      if (!document.getElementById('ddos-attack-statistics')) {
        return
      }
      this.chartTest = Echarts.init(document.getElementById('ddos-attack-statistics'))
      const unit = this.ddosAttackChart.unit
      const maxY = Math.max.apply(null, this.ddosAttackChart.yData)
      this.chartTest.setOption({
        title: {
          left: 'left',
          text: 'TCP 会话'
        },
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
          areaStyle: {
            normal: {
              color: '#2d90e6'
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
    getPlusTcpConversation(params) {
      TaichiPlusResource.getPlusTcpConversation(params).then(response => {
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
          this.ddosAttackChart.unit = response.data.data.trend.y_data.unit ? response.data.data.trend.y_data.unit : '次'
        } else {
          this.ddosAttackChart.unit = '次'
          this.ddosAttackChart.yData = []
          this.ddosAttackChart.xData = []
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.ddosAttack()
        })
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
  .tcpTrafficTimeSelect .el-input__inner{
    width: 100px;
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
</style>
