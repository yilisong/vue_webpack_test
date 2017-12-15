<template>
<div class="page-wrap wrap-background">
  <div class="ddosContent">
    <div class="page-header">
      <span data-v-037cbcdb="" class="title">DDoS攻击统计</span>
      <span class="plusDdosPeak">攻击峰值：<span>{{maxWidth}}Mbps</span></span>
    </div>
  </div>
  <div id="ddos-attack-statistics" v-loading="" element-loading-text="拼命加载中"></div>
  <div class="" id="ddosDetails">
    <div class="page-header">
      <span data-v-037cbcdb="" class="title">DDoS攻击记录</span>
    </div>
    <div class="plusDdosTable">
      <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getLogs" @on-current-change="getLogs">
        <div slot="body">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="攻击IP">
              <template scope="scope">
                <span>{{scope.row.ip}}({{scope.row.ip_location}})</span>
              </template>
            </el-table-column>
            <el-table-column prop="trafficin_0" label="攻击峰值(Mbps)">
            </el-table-column>
            <el-table-column prop="timestamp" label="攻击时间">
            </el-table-column>
          </el-table>
        </div>
      </ComboTable>
    </div>
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
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      total: 0,
      ddosLoading: true,
      ddosAttackChart: {
        xData: [],
        yData: [],
        unit: ''
      },
      tableData: [],
      maxWidth: '0'
    }
  },
  methods: {
    getLogs(current, size) {
      const params = {
        ddos_id: window.localStorage.taichiPlusDetailsid,
        end_time: window.localStorage.taichiPlusDetailsend,
        begin_time: window.localStorage.taichiPlusDetailsbegin,
        per_page: size,
        page: current
      }
      this.getPlusDDosDetailsList(params)
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
    getPlusDDosDetailsList(params) {
      TaichiPlusResource.getPlusDDosDetailsList(params).then(response => {
        if (response.data.status.code = 1 && response.data.data.other_data) {
          const data = response.data.data
          this.maxWidth = data.other_data.max_width
          this.total = data.other_data.ip_count
          this.tableData = data.other_data.ip_list
        } else {
          this.maxWidth = '0'
          this.total = 0
          this.tableData = []
        }
      })
    },
    getPlusDDosDetailsLine(params) {
      TaichiPlusResource.getPlusDDosDetailsLine(params).then(response => {
        if (response.data.status.code = 1 && response.data.data.echart) {
          const data = response.data.data
          this.ddosAttackChart.yData = []
          this.ddosAttackChart.unit = 'Mbps'
          this.ddosAttackChart.xData = data.echart.xAxis_data
          const res = data.echart.yAxis__data
          res.forEach((v, i) => {
            this.ddosAttackChart.yData.push(v.trafficin_0)
          })
        } else {
          this.ddosAttackChart.yData = []
          this.ddosAttackChart.unit = 'Mbps'
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
    const params = {
      ddos_id: window.localStorage.taichiPlusDetailsid,
      end_time: window.localStorage.taichiPlusDetailsend,
      begin_time: window.localStorage.taichiPlusDetailsbegin,
      per_page: 5,
      page: 1
    }
    this.getPlusDDosDetailsList(params)
    this.getPlusDDosDetailsLine({
      ddos_id: window.localStorage.taichiPlusDetailsid,
      end_time: window.localStorage.taichiPlusDetailsend,
      begin_time: window.localStorage.taichiPlusDetailsbegin
    })
  }
}
</script>
<style scoped>
  .clearfix {
    clear: both;
  }
  .plusDdosPeak {
    float: right;
  }
  .page-header {
    padding: 0 12px;
    color: #324057;
    border-bottom: 1px solid #eaeefb;
  }
  .plusDdosTable {
    width: 98%;
    margin-left: 1%;
    margin-top: 20px;
  }
  .page-wrap {
    margin: 12px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }
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
  #ddosDetails .el-table {
    border: none;
  }
  #ddosDetails {
    margin-bottom: 30px;
  }
  .plusDdosPeak span {
    color: #2d90e6;
  }
</style>
