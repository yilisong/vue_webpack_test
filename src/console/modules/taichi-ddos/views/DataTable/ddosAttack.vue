<template>
<div class="wrap-background">
  <div class="ddosContent">
    <div class="ddos-statistics">DDoS攻击统计</div>
    <div class="ddos-label">
      <span>域名</span>
      <el-select v-model="selectValue" placeholder="默认所有域名" @change="changeDomain">
        <el-option v-for="item in options" :key="item.domain_id" :label="item.domain" :value="item.domain_id">
        </el-option>
      </el-select>
      <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
    </div>
    <div class="clear"></div>
  </div>
  <div id="ddos-attack-statistics" v-loading="ddosLoading" element-loading-text="拼命加载中"></div>
  <div style="clear:both;"></div>
</div>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiResource from '../../resource/TaichiResource'
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
      // optionsIP: '',
      optionsIPTrue: '',
      // selectValueIP: '',
      ddosLoading: true,
      ddosAttackChart: {
        xData: [],
        yData: [],
        unit: ''
      }
    }
  },
  methods: {
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.ddosLoading = true
      this.endTimevalue = endTimevalue
      this.startTimevalue = startTimevalue
      let params
      if (this.selectValue === '') {
        this.ddosAttackChart.yData = [0, 0]
        this.ddosAttackChart.xData = [this.startTimevalue, this.endTimevalue]
        this.ddosAttackChart.unit = 'Mbps'
        return
      } else {
        params = {
          domain_id: this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: '15m'
        }
        this.getDdosAttackChart(params)
      }
    },
    changeDomain() {
      const params = {
        domain_id: this.selectValue,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue,
        interval: '15m'
      }
      this.getDdosAttackChart(params)
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
    getDdosAttackChart(params) {
      TaichiResource.getDdosAttackChart(params).then(response => {
        this.ddosLoading = false
        if (response.data.status.code = 1 && response.data.data && response.data.data.trend) {
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
          this.ddosAttack()
        } else {
          this.ddosAttackChart.yData = [0, 0]
          this.ddosAttackChart.xData = [this.startTimevalue, this.endTimevalue]
          this.ddosAttackChart.unit = 'Mbps'
          this.ddosAttack()
        }
      })
    },
    getSelectDomainList() {
      TaichiResource.getDomainList({ per_page: 1000 }).then(response => {
        if ((response.data.status.code === 1) && response.data.data) {
          this.options = response.data.data.list
          this.selectValue = this.options[0].domain_id
        } else {
          this.options = []
        }
      })
    }
  },
  mounted() {
  },
  created() {
    this.getSelectDomainList()
  }
}
</script>
<style>
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
