<template lang="html">
  <console-page-layout :title="domainName">
    <div class="base-border wrap-background">
      <div class="time-select">
        <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
        <!-- <el-button icon="date" class="btn-little" @click="timeSelectBtn(1)">今天</el-button>
        <el-button icon="date" class="btn-little" @click="timeSelectBtn(-1)">昨天</el-button>
        <el-button icon="date" class="btn-little" @click="timeSelectBtn(7)">7天</el-button>
        <el-date-picker @change="timeSelectFun" format="yyyy-MM-dd HH:mm:ss" v-model="valuevalue" type="daterange" class="data-picker" placeholder="选择日期范围" :picker-options="pickerOptions">
        </el-date-picker> -->
      </div>
      <div>
        <div ref="chart" id="main" class="charts" v-loading="chartLoading"></div>
      </div>
    </div>
  </console-page-layout>
</template>

<script>
import TaichiDnsResource from '../resource/TaichiDnsResource'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import DateSelection from 'common/components/DateSelect/date-selection'
import Echarts from 'echarts'
import moment from 'moment'

export default {
  name: 'FlowmeterTendency',
  components: {
    Echarts,
    ConsolePageLayout,
    DateSelection
  },
  data() {
    return {
      domainName: '',
      endTimevalue: '',
      startTimevalue: '',
      chartLoading: false,
      xData: [],
      yData: [],
      unit: '',
      valuevalue: '',
      queryParams: {
        domain: '',
        start_time: '',
        end_time: ''
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.startTimevalue = startTimevalue
      this.endTimevalue = endTimevalue
      const params = {
        start_time: this.startTimevalue,
        end_time: this.endTimevalue,
        domain: this.$route.params.domainName
      }
      this.getTrendData(params)
      /*默认触发今天情况*/
    },
    timeSelectFun(timeRange) {
      this.params.start_time = timeRange.slice(0, 19)
      this.params.end_time = timeRange.slice(-19)
      this.getTrendData()
    },
    timeSelectBtn(param) {
      let time
      if (param === 1) {
        time = moment().format('YYYY-MM-DD hh:mm:ss')
        this.params.start_time = time.slice(0, 10) + ' 00:00:00'
        this.params.end_time = time.slice(0, 10) + ' 23:59:59'
      } else if (param === -1) {
        time = moment().subtract(1,'days').format('YYYY-MM-DD HH:mm:ss')
        this.params.start_time = time.slice(0, 10) + ' 00:00:00'
        this.params.end_time = time.slice(0, 10) + ' 23:59:59'
      } else {
        time = moment().subtract(7,'days').format('YYYY-MM-DD HH:mm:ss')
        this.params.start_time = time.slice(0, 10) + ' 00:00:00'
        this.params.end_time = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 23:59:59'
      }
      this.getTrendData()
    },
    getTrendData(queryParams) {
      // SourceOverviewResource.getCDNFloweter(params).then(res => {
      //   const trend = res.data.data.trend
      //   this.xData = trend.x_data
      //   this.yData = trend.y_data.data
      //   this.drawLine()
      // })
      //
      this.chartLoading = true
      this.domainName = this.$route.params.domainName
      TaichiDnsResource.getDnsChart(queryParams).then(response => {
        this.xData = Object.keys(response.data.data.list)
        this.yData = Object.values(response.data.data.list)
        this.unit = response.data.data.unit
        this.chartLoading = false
        this.drawLine()
      })
    },
    drawLine() {
      const lineChart = Echarts.init(this.$refs.chart)
      const option = {
        tooltip : {
          trigger: 'axis',
          axisPointer: {
           type: 'cross',
           label: {
               backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '20%'],
          name: `单位(${this.unit})`
        },
        series: [
          {
            name: '瞬时数据',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(56,149,231)'
              }
            },
            areaStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(190,230,241)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(211,216,241)'
                  }
                ])
              }
            },
            data: this.yData
          }
        ]
      }
      lineChart.setOption(option)
    }
  }
}
</script>

<style scope>
.charts{
  width: 100%;
  height: 500px;
}

.chart-title {
  margin: 20px 0 0 20px;
}
.time-select {
  min-height: 40px;
}
</style>
