<template lang="html">
  <console-page-layout title="套餐列表">
      <div class="package-profile">
        <el-row>
          <el-col :span="3">
            当前套餐概况:
          </el-col>
          <el-col :span="21">
            <div v-for="(item, index) in summaryList">
              <div>
                <span class="package-name">{{item.package_name}}</span>  （ 套餐属性：{{item.package_type}}， 剩余可用规则数： {{item.package_rules_num}}条
                 <!-- ，1次免费弹性带宽：<span v-if="item.elasticity_status === '0'">未使用</span>
                <span v-if="item.elasticity_status === '1'">已使用</span> -->
                ）
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div v-if="nearlyOutTimeNum" style="margin-top:20px;">
            <img src="../../../assets/images/yun-nearly-out-time.svg" width="80px" class="out-time-tips">当前有 <span style="color: #fe791e">{{nearlyOutTimeNum}}</span> 个防护套餐即将到期，请及时续费，避免影响到您的正常业务。
          </div>
        </el-row>
      </div>
      <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes"
      @on-size-change="getTableData" @on-current-change="getTableData" class="table-layout-fix">
        <div slot="headerLeft">
          <el-button type="primary" @click="packageUpgradeDialog = true">添加套餐</el-button>
        </div>
        <div slot="body">
          <el-table :data="tableData" style="width: 100%" v-loading="tableLoading" element-loading-text="拼命加载中">
            <el-table-column prop="package_name" label="套餐名称" align="left">
            </el-table-column>
            <el-table-column prop="package_type_name" label="套餐" align="center">
              <template scope="scope">
                <el-popover ref="scopeLevel" placement="top" width="130" trigger="hover">
                  <div>DDoS防护峰值</div>
                  <div class="scopeLevelData">{{scope.row.ddos_protect.value}}{{scope.row.ddos_protect.unit}}</div>
                  <div>CC防护峰值</div>
                  <div class="scopeLevelData">{{scope.row.cc_protect.value_format}}{{scope.row.cc_protect.unit}}</div>
                </el-popover>
                <el-button type="text" v-popover:scopeLevel>{{scope.row.package_type_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="CNAME(仅非网站使用)" align="center">
              <template scope="scope">
                <el-button type="text" @click="copyAliasName(scope.row.cname)">复制cname&nbsp;<i class="el-icon el-icon-copy"></i></el-button>
              </template>
            </el-table-column>
            <el-table-column label="防护IP" align="center">
              <template scope="scope">
                <ShowBox :webList="scope.row.ips"/>
              </template>
            </el-table-column>
            <el-table-column prop="test" label="套餐到期时间" align="center">
              <template scope="scope">
                <div v-if="scope.row.expire_status === '0'">
                  <ExpireTime :expireTime="scope.row.expire_time" />
                </div>
                <div v-else-if="scope.row.expire_status === '1'">
                  <el-popover ref="popover1" placement="top" width="100" trigger="hover" content="即将过期，请购买">
                  </el-popover>
                  <ExpireTime :expireTime="scope.row.expire_time" />
                  <el-button type="text" @click="packageUpgradeDialog = true" class="notable" v-popover:popover1>购买</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="配置数量" align="center">
              <template scope="scope">
                <div class="outer-click" @click="goToWebsitePage(scope.row)">
                  网站：{{scope.row.domain_rule}}&nbsp;条
                </div>
                <div class="outer-click" @click="goToUnWebsitePage(scope.row)">
                  非网站：{{scope.row.tcp_rule}}&nbsp;条
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="test" label="操作" align="center">
              <template scope="scope">
                <el-button type="text" @click="packageUpgradeDialog = true" class="notable">升级</el-button>
                |
                <el-button type="text" @click="packageUpgradeDialog = true" class="notable">续费</el-button>
                |
                <el-button type="text" @click="statusAtNow(scope.row)" class="notable">实时状态</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </ComboTable>
      <el-dialog title="提示" :visible.sync="packageUpgradeDialog" size="tiny">
        <p>亲爱的用户:</p>
        <p>如需购买、升级、或续费太极抗D服务，请拨打热线：400-999-7070 或联系<el-button type="text" class="blue-button" @click="openQQ">QQ: 800090007</el-button></p>
        <el-button type="primary" @click="packageUpgradeDialog = false" class="dialogCloseBtn">关闭</el-button>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="protectLevelDialog" size="tiny">
        <p>亲爱的用户:</p>
        <p>如需开启当前套餐的弹性防护服务，账户余额不得少于弹性带宽一天的服务费1180元，请前往账务中心充值余额</p>
        <el-button type="info" class="dialogCloseBtn">去充值</el-button>
        <el-button type="primary" @click="protectLevelDialog = false" class="dialogCloseBtn">关闭</el-button>
      </el-dialog>
      <el-dialog title="实时状态" :visible.sync="realTimeStatusDialog" size="tiny" @close="clearInterBeforeClose">
        <div v-loading="statusLoading" element-loading-text="解析中">
          IP实时状态：
          <el-select @change="IpChangeFun" v-model="ipSelectValue.value" size="small" placeholder="请选择" class="ip-select-dialog">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-row>
            <el-col :span="12"><div class="status-table status-title">流入清洗前</div></el-col>
            <el-col :span="12"><div class="status-table status-title">流入清洗后</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="status-table">{{inBefore}}{{unit}}</div></el-col>
            <el-col :span="12"><div class="status-table">{{inAfter}}{{unit}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="status-table status-title">流出清洗前</div></el-col>
            <el-col :span="12"><div class="status-table status-title">流出清洗后</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="status-table">{{outBefore}}{{unit}}</div></el-col>
            <el-col :span="12"><div class="status-table">{{outAfter}}{{unit}}</div></el-col>
          </el-row>
        </div>
      </el-dialog>
  </console-page-layout>


</template>

<script>
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../../resource/TaichiPlusResource'
import help from 'common/utils/help'
import ShowBox from '../../Component/ShowBox'
export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    ShowBox,
    ExpireTime
  },
  data() {
    return {
      statusLoading: false,
      tableLoading: false,
      realTimeStatusDialog: false,
      packageUpgradeDialog: false,
      protectLevelDialog: false,
      pageSizes: [5, 10, 20],
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      total: 0,
      options:[],
      ipSelectValue:'',
      statusAtNowParams: {},
      summaryList: [],
      nearlyOutTimeNum: 0,
      inBefore: 0,
      inAfter: 0,
      outBefore: 0,
      outAfter: 0,
      unit: '',
      packageIdCache: ''
    }
  },
  created() {
    this.init()
    this.getSummaryInfo()
  },
  beforeDestroy() {
    this.clearInterBeforeClose()
  },
  methods: {
    copyAliasName(text) {
      help.copyText(text)
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    openQQ() {
      help.linkService()
    },
    IpChangeFun() {
      this.statusLoading = true
      this.statusAtNowParams = {
        package_id: this.packageIdCache,
        ip: this.ipSelectValue.value
      }
      // 清除掉原来的间歇定时器
      if (this.interval !== '') {
        clearInterval(this.interval)
      }
      this.interval = setInterval(this.getStatusAtNow, 3000)
    },
    clearInterBeforeClose() {
      if (this.interval !== '') {
        clearInterval(this.interval)
      }
    },
    getSummaryInfo() {
      TaichiPlusResource.getSummaryInfo().then(response => {
        const res = response.data.data
        this.summaryList = res.list
        this.nearlyOutTimeNum = res.expire_total
      })
    },
    openElasticity(row) {
      this.tableLoading = true
      const params = {
        package_id : row.id,
        elasticity_status: '1'
      }
      TaichiPlusResource.openElasticity(params).then(response => {
        this.$message({
          showClose: true,
          message: '开启成功',
          type: 'success'
        })
        this.init()
      }).catch(response => {
        this.tableLoading = false
      })
    },
    statusAtNow(row) {
      this.statusLoading = true
      if (this.interval !== '') {
        clearInterval(this.interval)
      }
      this.options = []
      console.log('fuck the options', row.ips)
      row.ips.forEach((v, i) => {
        this.options.push({
          label: v.value,
          value: v.value
        })
      })
      this.ipSelectValue = row.ips[0]

      // 由于弹出框里面获取不到当前的套餐ID： package_id
      // 所以在弹出框内切换IP之前，预先把套餐ID缓存在data层
      // 当随后切换套餐详情的时候，套餐ID也会在这里被正确的重新覆写
      this.packageIdCache = row.id
      this.statusAtNowParams = {
        package_id: row.id,
        ip: this.ipSelectValue.value
      }
      this.interval = setInterval(this.getStatusAtNow, 3000)
      this.realTimeStatusDialog = true
    },
    getStatusAtNow() {
      if (this.statusAtNowParams.ip === undefined) {
        return
      }
      this.statusLoading = true
      TaichiPlusResource.getStatusAtNow(this.statusAtNowParams).then(response => {
        const param = response.data.data.list
        this.unit = response.data.data.unit
        if (param.length === 0) {
          this.inBefore = this.inAfter = this.outBefore = this.outAfter = 0
        } else {
          this.inBefore = param.trafficin_before
          this.inAfter = param.trafficin_after
          this.outBefore = param.trafficout_before
          this.outAfter = param.ttrafficout_after
        }
        this.statusLoading = false
      })
    },
    // getPackageList() {
    //   TaichiPlusResource.getPackageList().then(response => {
    //     sessionStorage.setItem('taichiPlusPackageDefaultId', response.data.data.list[0].value)
    //   })
    // },
    getTableData(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.init()
    },
    goToDataTable() {
      this.$router.push('/plustaichireport/webCCAttack')
    },
    goToWebsitePage(row) {
      sessionStorage.setItem('packageIdSelectedCache', row.id)
      this.$router.push('/ProtectRuleManage/WebsiteProtect')
    },
    goToUnWebsitePage(row) {
      sessionStorage.setItem('packageIdSelectedCache', row.id)
      this.$router.push('/ProtectRuleManage/UnWebsiteProtect')
    },
    init() {
      this.tableLoading = true
      TaichiPlusResource.getPackageListCopy({
        page: this.currentPage,
        per_page: this.pageSize
      }).then(response => {
        this.total = Number(response.data.data.total)
        // 把ip列表转换为ShowBox组件可以识别的格式
        response.data.data.list.forEach((value, index) => {
          const midValue = []
          value.ips.forEach((v, i) => {
            midValue.push({
              value: v
            })
          })
          value.ips = midValue
        })
        this.tableData = response.data.data.list
        console.log(this.tableData)
        this.tableLoading = false
      }).catch(response => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scope>
.jump-datatable {
  color: rgb(32, 160, 255);
  font-size: 12px;
  margin-left: 16px;
}
button.dialogCloseBtn.el-button {
  float: right;
  margin: 26px 6px 16px 0;
}
.status-table {
  text-align: center;
}
.status-title {
  color: #fff;
  background-color: rgb(45, 144, 230);
}
.ip-select-dialog {
  margin-bottom: 16px;
}
.notable.el-button {
  color: rgb(45, 144, 230);
}
.fl {
  float: left;
}
.incell-width {
  width: 220px;
}
.table-layout-fix {
  padding: 12px;
  background-color: var(--wrap-background);
}
.al {
  text-align: center;
}
.package-profile {
  background-color: #FEFBF7;
  border: 1px solid #FCE2C8;
  padding:16px;
  border-radius: 3px;
  margin-bottom: 12px;
  font-size: 14px;
}
.package-name {
  width: 180px;
  display: inline-block;
}
button.blue-button {
  color: rgb(45, 144, 230);
}
.outer-click {
  display: inline-block;
  min-width: 120px;
  margin: 0 auto;
  text-align: left;
  cursor: pointer;
}
.outer-click:hover {
  color: rgb(45, 144, 230);
}
button.notable {
  span {
    margin: 0 9px;
  }
}
.notable.el-button.el-button--text {
  margin: 0;
}
.scopeLevelData{
  color:rgb(60,151,232);
  font-size: 20px;
  margin: 4px 0;
}
.out-time-tips {
  vertical-align: middle;
  margin-right: 20px;
}
</style>
