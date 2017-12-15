<template lang="">
<console-page-layout :title="titleDomain">
  <div class="wrap-background">
    <div>
      <el-button icon="date" class="btn-little" @click="timeSelectBtn(1)">今天</el-button>
      <el-button icon="date" class="btn-little" @click="timeSelectBtn(-1)">昨天</el-button>
      <el-button icon="date" class="btn-little" @click="timeSelectBtn(7)">7天</el-button>
      <el-date-picker @change="timeSelectFun" format="yyyy-MM-dd HH:mm:ss" v-model="valuevalue" type="daterange" class="data-picker" placeholder="选择日期范围" :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div v-loading="chartLoading" element-loading-text="拼命加载中">
      <div class="charts" id="chartEle"></div>
    </div>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ResolvingResource from '../../resource/ResolvingResource'
import Echarts from 'echarts'
import moment from 'moment'

export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      params: {
        domain: '',
        start_time: '',
        end_time: ''
      },
      pickerOptions: {
        shortcuts: [
        {
          text: '最近三十天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
            picker.$emit('pick', [start, end])
          }
        }
      ],
      disabledDate(time) {
        return time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
               time.getTime() >= Date.now()
        }
      },
      valuevalue: '',
      chartLoading: false,
      chartDate: [],
      chartDateX: [],
      unit: '',
      titleDomain: ''
    }
  },
  methods: {
    drawChart() {
      this.chartTest = Echarts.init(document.getElementById('chartEle'))
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
          data: this.chartDateX
        }],
        yAxis: [{
          name: '单位:' + this.unit,
          type: 'value',
          boundaryGap: [0, '20%'],
          data: 5
        }],
        series: [{
          name: '瞬时数据',
          type: 'line',
          smooth: true,
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
          data: this.chartDate
        }]
      })
    },
    timeSelectFun(timeRange) {
      this.params.start_time = timeRange.slice(0, 19)
      this.params.end_time = timeRange.slice(-19)
      this.chartInit()
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
      this.chartInit()
    },
    chartInit() {
      this.chartLoading = true
        this.params.domain = this.$route.params.resolvingDomain
        // this.params.start_time = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 00:00:00'
        // this.params.end_time = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 23:59:59'

      ResolvingResource.getResolvingChart(this.params).then(res => {
          this.chartDateX = Object.keys(res.data.data.list)
          this.chartDate = Object.values(res.data.data.list)
          this.unit = res.data.data.unit
          this.drawChart()
          this.tableLoading = false
          this.chartLoading = false
        }).catch(res => {
          this.$message({
            showClose: true,
            message: '统计报表初始化失败',
            type: 'error'
          })
        })
    }
  },
  mounted() {
    this.titleDomain = this.$route.params.resolvingDomain
    this.params.start_time = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 00:00:00'
    this.params.end_time = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 23:59:59'
    this.chartInit()
  }
}
</script>

<style lang="">
#chartEle {
  height: 500px;
  width: 100%
}
/*.data-picker.el-date-editor.el-input {
  width: 360px;
}*/
.el-date-editor--daterange.el-input.data-picker{
  width: 360px;
  margin-left: 30px;
}
.btn-little {
  padding:6px 6px;
  width:70px;
  border-radius: 3px;
}
</style>
