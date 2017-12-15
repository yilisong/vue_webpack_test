<template>
<div class="wrap-background">
  <div>
    <el-select v-model="value" placeholder="请选择" @change="changePackage">
       <el-option v-for="item in optionsPackage" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="cc-statistics">
    <div class="tableLeft">
      <br />
      <h3>今日被攻击IP/端口 Top5</h3><br />
      <el-table :data="topFiveURL" v-loading="top5TableLoading" element-loading-text="拼命加载中">
        <el-table-column prop="url" label="IP/端口">
        </el-table-column>
        <el-table-column prop="format_count" label="攻击次数">
          <template scope="scope">
            {{scope.row.format_count}}{{scope.row.unit}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableRight">
      <br />
      <h3>今日攻击IP/端口 Top5</h3><br />
      <el-table :data="topFiveIP" v-loading="top5TableLoading" element-loading-text="拼命加载中">
        <el-table-column prop="ip" label="IP/端口">
        </el-table-column>
        <el-table-column prop="format_count" label="拦截次数">
          <template scope="scope">
            {{scope.row.format_count}}{{scope.row.unit}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="clear:both;"></div>
  </div>
  <div class="cc-trend">
    <div class="headerLeft">
      <h3>CC攻击趋势</h3>
    </div>
    <div class="headerRight">
      <!-- <el-select v-model="selectValue" placeholder="请选择" @change="changeDomain">
        <el-option v-for="item in options" :key="item.domain" :label="item.domain" :value="item.domain">
        </el-option>
      </el-select> -->
      <el-select v-model="selectValue" placeholder="所有IP" @change="changeDomain">
        <el-option v-for="item in options" :key="item.ip_string" :label="item.ip_string" :value="item.ip_string">
        </el-option>
      </el-select>
      <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
    </div>
    <div class="charts" id="chartEle" v-loading="ccAttackChartLoading" element-loading-text="拼命加载中"></div>
  </div>
  <div class="headerLeft">
    <h3>CC攻击统计地图</h3>
  </div>
  <div class="cc-map bottom_charts" v-loading="nationalLoading" element-loading-text="拼命加载中">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="全国分布" name="country">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <h3 class="attack-times">攻击次数：</h3>
              <div id="nationalDistributionCharts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple tongji_Banner" style="padding:12px;">
              <div class="top_title">攻击次数 <span class="top_5">Top 5</span></div>
              <div class="top_progress_bar" id="nationalTop0">
                <el-row :gutter="20">
                  <el-col :span="12">{{ nationalTop5[0] }}</el-col>
                  <el-col :span="12" class="textRight">{{nationalTip[0]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{nationalTipPercent[0]}}%</div>
                  <el-progress :text-inside="true" :stroke-width="16" :percentage="nationalTop5Percent[0]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="nationalTop1">
                <el-row :gutter="20">
                  <el-col :span="12">{{ nationalTop5[1] }}</el-col>
                  <el-col :span="12" class="textRight">{{nationalTip[1]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{nationalTipPercent[1]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[1]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="nationalTop2">
                <el-row :gutter="20">
                  <el-col :span="12">{{ nationalTop5[2] }}</el-col>
                  <el-col :span="12" class="textRight">{{nationalTip[2]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{nationalTipPercent[2]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[2]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="nationalTop3">
                <el-row :gutter="20">
                  <el-col :span="12">{{ nationalTop5[3] }}</el-col>
                  <el-col :span="12" class="textRight">{{nationalTip[3]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{nationalTipPercent[3]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[3]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="nationalTop4">
                <el-row :gutter="20">
                  <el-col :span="12">{{ nationalTop5[4] }}</el-col>
                  <el-col :span="12" class="textRight">{{nationalTip[4]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{nationalTipPercent[4]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[4]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="全球分布" name="earth" class="earth-pane">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <h3 class="attack-times">攻击次数：</h3>
              <div id="nationalDistributionCharts2"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple attack-statistics tongji_Banner">
              <div class="top_title">攻击次数 <span class="top_5">Top 5</span></div>
              <div class="top_progress_bar" id="worldTop0">
                <el-row :gutter="20">
                  <el-col :span="12">{{ globalTop5[0] }}</el-col>
                  <el-col :span="12" class="textRight">{{globalTip[0]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{globalTipPercent[0]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[0]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="worldTop1">
                <el-row :gutter="20">
                  <el-col :span="12">{{ globalTop5[1] }}</el-col>
                  <el-col :span="12" class="textRight">{{globalTip[1]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{globalTipPercent[1]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[1]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="worldTop2">
                <el-row :gutter="20">
                  <el-col :span="12">{{ globalTop5[2] }}</el-col>
                  <el-col :span="12" class="textRight">{{globalTip[2]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{globalTipPercent[2]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[2]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="worldTop3">
                <el-row :gutter="20">
                  <el-col :span="12">{{ globalTop5[3] }}</el-col>
                  <el-col :span="12" class="textRight">{{globalTip[3]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{globalTipPercent[3]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[3]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
              <div class="top_progress_bar" id="worldTop4">
                <el-row :gutter="20">
                  <el-col :span="12">{{ globalTop5[4] }}</el-col>
                  <el-col :span="12" class="textRight">{{globalTip[4]}}</el-col>
                </el-row>
                <el-tooltip placement="top">
                  <div slot="content">占比总攻击 {{globalTipPercent[4]}}%</div>
                  <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[4]" status="success" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div style="clear:both;"></div>
</div>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../resource/TaichiPlusResource'
import Tip from 'common/components/Tip/Tip'
import Echarts from 'echarts'
import EchartsLine from 'echarts/lib/chart/line'
import EchartsChinaMap from 'echarts/map/js/china'
import EchartsWorldMap from 'echarts/map/js/world'
import NameMapVal from 'common/config/nameMap'
import DateSelection from 'common/components/DateSelect/date-selection'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Tip,
    NameMapVal,
    DateSelection
  },
  directives: {},
  computed: {
  },
  data() {
    return {
      endTimevalue: '',
      startTimevalue: '',
      selectValue: '所有IP',
      options: '',
      top5TableLoading: true,
      nationalLoading: true,
      ccAttackChartLoading: true,
      topFiveURL: [],
      topFiveIP: [],
      ccAttackChart: {
        xData: [],
        yData: [],
        unit: ''
      },
      /*中国*/
      nationalDistributionSeries: [],
      nationalTop5: [],
      nationalTip: [],
      nationalTop5Percent: [],
      nationalTipPercent: [],
      /*世界地图*/
      globalDistributionSeries: [],
      globalDistributionData: [],
      globalTop5: [],
      globalTip: [],
      globalTop5Percent: [],
      globalTipPercent: [],
      activeName2: 'country',
      optionsPackage: [],
      value: '',
      test: '1',
      test2: '0'
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
              const params = { package_id: this.value }
              this.test = '0'
              this.test2 = '0'
              this.getPlusTCPCCTop(params)
              this.getPackageDomainList(params)
              this.changeDomain()
              this.getplusTcpCountry(params)
              this.getplusTcpProvince(params)
            }
          } else {
            this.top5TableLoading = false
            this.topFiveIP = []
            this.topFiveURL = []
            this.ccAttackChartLoading = false
            this.ccAttackChart.unit = 'QPS'
            this.ccAttackChart.yData = [0, 0]
            this.ccAttackChart.xData = [this.startTimevalue, this.endTimevalue]
            this.nationalLoading = false
            this.globalLoading = false
            for (let i = 1; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'none'
              } else {
                return
              }
              if (document.getElementById('worldTop' + i)) {
                document.getElementById('worldTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            this.nationalTop5Percent = [0]
            this.nationalTipPercent = [0]
            this.nationalTop5 = ['暂无数据']
            this.nationalTip = ['暂无']
            this.nationalDistributionSeries = [{ name: '南海诸岛', value: 0 }]
            this.globalTop5Percent = [0]
            this.globalTipPercent = [0]
            this.globalTop5 = ['暂无数据']
            this.globalTip = ['暂无']
            this.globalDistributionSeries = [{ name: '中国', value: 0 , percent:0 }]
            this.nationalDistribution2('nationalDistributionCharts2')
            this.drawChart()
            this.nationalDistribution('nationalDistributionCharts')
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
        this.getPlusTCPCCTop(params)
        this.getPackageDomainList(params)
        this.changeDomain()
        this.getplusTcpCountry(params)
        this.getplusTcpProvince(params)
      }
    },
    getPackageDomainList(params) {
      TaichiPlusResource.getPackageIPList(params).then(response => {
        if (response.data && response.data.data && response.data.data.list) {
          this.options = response.data.data.list
        } else {
          this.options = []
        }
      })
    },
    handleTabClick(tab, event) {
      this.nationalDistribution2()
    },
    drawChart() {
      if (!document.getElementById('chartEle')) {
        return
      }
      this.chartTest = Echarts.init(document.getElementById('chartEle'))
      const maxY = Math.max.apply(null, this.ccAttackChart.yData)
      const unit = this.ccAttackChart.unit
      this.chartTest.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
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
          data: this.ccAttackChart.xData
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
          // symbol:'none',
          itemStyle: {
            normal: {
              color: '#2d90e6',
              lineStyle: {
                color: '#2d90e6'
              }
            }
          },
          data: this.ccAttackChart.yData,
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
    getPlusTcpCCLine(params) {
      TaichiPlusResource.getPlusTcpCCLine(params).then(response => {
        this.ccAttackChartLoading = false
        if (response.data && (response.data.status.code === 1) && response.data.data.trend) {
          this.ccAttackChart.xData = response.data.data.trend.x_data
          if (response.data.data.trend.y_data.data instanceof Array) {
            this.ccAttackChart.yData = response.data.data.trend.y_data.data
          } else {
            const arrayMidValue = []
            for (const key in response.data.data.trend.y_data.data) {
              arrayMidValue.push(response.data.data.trend.y_data.data[key])
            }
            this.ccAttackChart.yData = arrayMidValue
          }
          this.ccAttackChart.unit = response.data.data.trend.y_data.unit ? response.data.data.trend.y_data.unit : 'QPS'
        } else {
          this.ccAttackChart.unit = 'QPS'
          this.ccAttackChart.yData = []
          this.ccAttackChart.xData = []
        }
      }).then(res => {
        this.$nextTick(function(e) {
           this.drawChart()
        })
      })
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.endTimevalue = endTimevalue
      this.startTimevalue = startTimevalue
      let domain
      if (this.test2 === '0') {
        return
      } else {
        this.ccAttackChartLoading = true
        if (this.selectValue === '所有IP') {
          domain = 'all'
        } else {
          domain = this.selectValue
        }
        const params = {
          package_id: this.value,
          sub_domain: domain,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue,
          interval: '15m'
        }
        this.getPlusTcpCCLine(params)
      }
    },
    getPlusTCPCCTop(params) {
      TaichiPlusResource.getPlusTCPCCTop(params).then(response => {
        this.top5TableLoading = false
        if (response.data && response.data.data && (response.data.status.code === 1)) {
          const dateTop = response.data.data
          if (dateTop.top_upstream_addr) {
            const lenUrl = dateTop.top_upstream_addr.length
            if (lenUrl > 4) {
              this.topFiveURL = dateTop.top_upstream_addr.slice(0, 5)
            } else if (lenUrl > 0 && lenUrl < 5) {
              this.topFiveURL = dateTop.top_upstream_addr.slice(0, lenUrl)
            } else {
              this.topFiveURL = []
            }
          } else {
            this.topFiveURL = []
          }
          if (dateTop.top_remote_addr) {
            const lenIp = dateTop.top_remote_addr.length
            if (lenIp > 4) {
              this.topFiveIP = dateTop.top_remote_addr.slice(0, 5)
            } else if (lenIp > 0 && lenIp < 5) {
              this.topFiveIP = dateTop.top_remote_addr.slice(0, lenIp)
            } else {
              this.topFiveIP = []
            }
          } else {
            this.topFiveIP = []
          }
        }
      })
    },
    changeDomain() {
      this.ccAttackChartLoading = true
      let domain
      if (this.selectValue === '所有IP') {
        domain = 'all'
      } else {
        domain = this.selectValue
      }
      const params = {
        package_id: this.value,
        sub_domain: domain,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue,
        interval: '15m'
      }
      this.getPlusTcpCCLine(params)
    },
    nationalDistribution() {
      const vm = this
      if (!document.getElementById('nationalDistributionCharts')) {
        return
      }
      this.nationalDistributionChart = Echarts.init(document.getElementById('nationalDistributionCharts'))
      this.nationalDistributionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            let percent = ''
            for (let i = 0; i < vm.nationalDistributionSeries.length; i++) {
              if (vm.nationalDistributionSeries[i].name === params.name) {
                percent = vm.nationalDistributionSeries[i].percent
              }
            }
            let res
            if (params.value) {
              res = '全国分布<br/>' + params.name + ': ' + params.value + '次<br/>占比: ' + percent + '%'
            } else {
              res = '全国分布<br/>暂无数据'
            }
            return res
          }
        },
        visualMap: {
          min: 0,
          max: this.nationalDistributionSeries[0].value ? this.nationalDistributionSeries[0].value : 100,
          left: 'left',
          top: 'bottom',
          color: ['#104da5', '#2d6fbc', '#6ebaef'],
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        series: [{
          name: '全国分布',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: this.nationalDistributionSeries
        }]
      })
    },
    getplusTcpProvince(params) {
      TaichiPlusResource.getplusTcpProvince(params).then(response => {
        this.nationalDistributionSeries = []
        if (response.data && (response.data.status.code === 1) && response.data.data) {
          const res = response.data
          this.nationalTip = []
          this.nationalTop5 = []
          this.nationalTop5Percent = []
          this.nationalTipPercent = []
          this.nationalLoading = false
          res.data.forEach((v, i) => {
            this.nationalDistributionSeries.push({
              name: v.country,
              percent: v.percent,
              value: v.count,
              unit: v.unit
            })
          })
          function GetPercent(num, total) {
            return total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00)
          }
          if (res.data.length > 4) {
            const top0 = res.data[0].count
            const top1 = res.data[1].count
            const top2 = res.data[2].count
            const top3 = res.data[3].count
            const top4 = res.data[4].count
            const fiveTotal = Number(top0)
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'block'
              } else {
                return
              }
            }
            this.nationalTip[0] = top0 + '次'
            this.nationalTip[1] = top1 + '次'
            this.nationalTip[2] = top2 + '次'
            this.nationalTip[3] = top3 + '次'
            this.nationalTip[4] = top4 + '次'
            for (let i = 0; i < 5; i++) {
              this.nationalTop5[i] = res.data[i].country
              this.nationalTop5Percent[i] = GetPercent(res.data[i].count, fiveTotal)
              this.nationalTipPercent[i] = res.data[i].percent
            }
          } else if (res.data.length > 0 && res.data.length < 5) {
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            /*求和  百分比*/
            let totalArr = 0
            for (let i = 0; i < res.data.length; i++) {
              totalArr += res.data[i].count
            }
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].country) {
                this.nationalTop5[i] = res.data[i].country
                this.nationalTop5Percent[i] = GetPercent(res.data[i].count, totalArr)
                this.nationalTipPercent[i] = res.data[i].percent
                this.nationalTip[i] = res.data[i].count + '次'
                if (document.getElementById('nationalTop' + i)) {
                  document.getElementById('nationalTop' + i).style.display = 'block'
                } else {
                  return
                }
              }
            }
          } else {
            for (let i = 1; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            this.nationalTop5Percent = [0]
            this.nationalTipPercent = [0]
            this.nationalTop5 = ['暂无数据']
            this.nationalTip = ['暂无']
            this.nationalDistributionSeries = [{ name: '南海诸岛', value: 0 }]
          }
        }
      })
      .then(res => {
        this.$nextTick(function(e) {
          this.nationalDistribution('nationalDistributionCharts')
        })
      })
    },
    nationalDistribution2() {
      const vm = this
      if (!document.getElementById('nationalDistributionCharts2')) {
        return
      }
      this.globalDistributionChart = Echarts.init(document.getElementById('nationalDistributionCharts2'))
      this.globalDistributionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            let percent = ''
            let value = (params.value + '').split('.')
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            if (value === '' || value === 'NaN') {
              return params.seriesName + '<br/>暂无数据'
            } else {
              for (let i = 0; i < vm.globalDistributionSeries.length; i++) {
                if (vm.globalDistributionSeries[i].name === params.name) {
                  percent = vm.globalDistributionSeries[i].percent
                }
              }
              let res
              if (params.value) {
                res = '世界分布<br/>' + params.name + ': ' + params.value + '次<br/>占比: ' + percent + '%'
              } else {
                res = '世界分布<br/>暂无数据'
              }
              return res
            }
          }
        },
        visualMap: {
          min: 0,
          max: this.globalDistributionSeries[0].value ? this.globalDistributionSeries[0].value : 100,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#6ebaef', '#2d6fbc', '#104da5']
          }
        },
        series: [{
          name: '全球分布',
          type: 'map',
          mapType: 'world',
          roam: false,
          itemStyle: {
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: this.globalDistributionSeries,
          nameMap: NameMapVal.nameMap
        }]
      })
    },
    getplusTcpCountry(params) {
      TaichiPlusResource.getplusTcpCountry(params).then(response => {
        this.globalDistributionSeries = []
       if (response.data && (response.data.status.code === 1) && response.data.data) {
          this.globalTip = []
          this.globalTop5 = []
          this.globalTop5Percent = []
          this.globalTipPercent = []
          this.globalLoading = false
          const res = response.data
          function GetPercent(num, total1) {
            return total1 <= 0 ? '0' : (Math.round(num / total1 * 10000) / 100.00)
          }
          res.data.forEach((v, i) => {
            this.globalDistributionSeries.push({
              name: v.country,
              percent: v.percent,
              value: v.count,
              unit: v.unit
            })
          })
          if (res.data.length > 4) {
            const top0 = res.data[0].count
            const top1 = res.data[1].count
            const top2 = res.data[2].count
            const top3 = res.data[3].count
            const top4 = res.data[4].count
            const fiveTotal = Number(top0)
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('worldTop' + i)) {
                document.getElementById('worldTop' + i).style.display = 'block'
              } else {
                return
              }
            }
            this.globalTip[0] = top0 + '次'
            this.globalTip[1] = top1 + '次'
            this.globalTip[2] = top2 + '次'
            this.globalTip[3] = top3 + '次'
            this.globalTip[4] = top4 + '次'
            for (let i = 0; i < 5; i++) {
              this.globalTop5[i] = res.data[i].country
              this.globalTop5Percent[i] = GetPercent(res.data[i].count, fiveTotal)
              this.globalTipPercent[i] = res.data[i].percent
            }
          } else if (res.data.length > 0 && res.data.length < 5) {
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('worldTop' + i)) {
                document.getElementById('worldTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            /*求和  百分比*/
            let totalArr = 0
            for (let i = 0; i < res.data.length; i++) {
              totalArr += res.data[i].count
            }
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].country) {
                this.globalTop5[i] = res.data[i].country
                this.globalTop5Percent[i] = GetPercent(res.data[i].count, totalArr)
                this.globalTipPercent[i] = res.data[i].percent
                this.globalTip[i] = res.data[i].count + '次'
                if (document.getElementById('worldTop' + i)) {
                  document.getElementById('worldTop' + i).style.display = 'block'
                } else {
                  return
                }
              }
            }
          } else {
            for (let i = 1; i < 5; i++) {
              if (document.getElementById('worldTop' + i)) {
                document.getElementById('worldTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            this.globalTop5Percent = [0]
            this.globalTipPercent = [0]
            this.globalTop5 = ['暂无数据']
            this.globalTip = ['暂无']
            this.globalDistributionSeries = [{ name: '中国', value: 0 , percent:0 }]
          }
        }
      })
      .then(res => {
        this.$nextTick(function(e) {
          this.nationalDistribution2('nationalDistributionCharts2')
        })
      })
    }
  },
  mounted() {
    const w = document.getElementById('nationalDistributionCharts').clientWidth
    document.getElementById('nationalDistributionCharts2').style.width = w + 'px'
    document.getElementById('nationalDistributionCharts').style.width = w + 'px'
  },
  created() {
    this.getPackageList()
  }
}
</script>
<style>
  .cc-map .el-tabs__item.is-active {
    color: #fff!important;
    background: #20a0ff!important;
  }
  .cc-map .el-tabs__header{
    border-bottom: 2px solid #20a0ff!important;
  }
  .cc-map .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border: none!important;
    border-radius: 4px 4px 0 0;
  }
</style>
<style scoped>
  .top_title {
    margin-top: 47px;
  }
  .top_5 {
    color: #fd0264;
    font-size: 20px;
  }
  .tongji_Banner .el-row {
    margin-bottom: 0px;
  }
  .tongji_Banner .el-row .textRight {
    text-align: right;
  }
  .el-table {
    border: none;
  }
  .el-select-dropdown {
    z-index: 99999!important;
  }
  .el-select .el-input__inner {
    height: 37px;
  }
  .el-select {
    margin-right: 20px;
  }
  .grid-content {
    background: #fff!important;
    border: none!important;
  }
  .el-tabs__content {
    border-bottom: 1px solid #d7d7d7;
    border-left: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
  }
  .el-tabs__header {
     margin: 0!important;
  }
  .el-progress.is-success .el-progress-bar__inner {
    background: #20a0ff;
  }
  /***************************/
  .tableLeft,
  .tableRight {
    float: left;
    width: 50%;
  }
  .tableLeft {
    padding-right: 10px;
    box-sizing: border-box;
  }
  .tableRight {
    padding-left: 10px;
    box-sizing: border-box;
  }
  .cc-trend {
    float: left;
    margin-top: 18px;
    width: 100%;
  }
  .headerLeft,.cc-map {
    float: left;
  }
  .cc-map {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .headerRight {
    float: right;
  }
  #chartEle {
    height: 500px;
    width: 100%;
    padding-bottom: 20px;
    float: left;
  }
  #nationalDistributionCharts {
    height: 673px;
    width: 100%;
  }
  #nationalDistributionCharts2 {
    height: 673px;
  }
  .attack-times {
    position: relative;
    top:10px;
    left:10px;
  }
  .attack-from {
    float: left;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }
  .top5 {
    font-size: 26px;
    color: rgb(255,9,99);
    position: relative;
    top:14px;
    left:10px;
  }
  .attack-progress {
    margin-top: 40px;
  }
  .attack-from-item {
    font-size: 18px;
    margin:50px 0;
  }
  .attack-from-item-progress {
    margin:12px 0 16px 0;
  }
  .attack-statistics {
    padding: 12px;
  }
  .ddos-label {
    float: right;
  }
  .ddos-statistics {
    float: left;
    line-height: 30px;
    font-weight: 500;
  }
  .earth-pane {
    width: 100%;
  }
  .clear {
    clear:both;
  }
  .el-tabs__content {
    overflow: visible;
  }
  .top_progress_bar {
    padding: 30px 10px;
    width: 80%;
    margin-top: 20px;
  }
  .top_progress_bar:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }
</style>
