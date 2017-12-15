<template>
<console-page-layout title="网站防护列表">
  <Tip v-if="tipVisible" :content="tipData"></Tip>
  <div class="wrap-background">
    <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes"
  @on-size-change="getTableData" @on-current-change="getTableData">
    <div slot="headerLeft">
      <el-button type="primary" @click="outPage">添加网站</el-button>
      <el-button @click="delDomain">删除</el-button>
    </div>
    <div slot="body">
      <el-table :data="domainList" style="width: 100%" v-loading="websiteListTableLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="26" align="center" :selectable="checkItIfTimeIsOver">
        </el-table-column>
        <el-table-column prop="domain" label="防护网站" align="left">
        </el-table-column>
        <el-table-column prop="records" label="源站地址" align="center" min-width="100">
          <template scope="scope">
            <div class="domain-address">
              <ShowBox :webList="scope.row.records"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="开通服务" align="center">
          <template scope="scope">
            <i @click="goToHWWS" class="yun-icon red-guard" v-if="scope.row.hwws_status === '0'" title="红网卫士未开通"></i>
            <i @click="goToHWWS" class="yun-icon red-guard taichi-icon-active" v-if="scope.row.hwws_status === '1'" title="红网卫士已开通"></i>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="套餐" align="center">
          <template scope="scope">
            <el-popover ref="scopeLevel" placement="top" width="130" trigger="hover">
              <div>{{scope.row.meal_detail.ddos_fence.title}}</div>
              <div class="scopeLevelData">{{scope.row.meal_detail.ddos_fence.value}}{{scope.row.meal_detail.ddos_fence.unit}}</div>
              <div>{{scope.row.meal_detail.cc_fence.title}}</div>
              <div class="scopeLevelData">{{scope.row.meal_detail.cc_fence.value_format}}{{scope.row.meal_detail.cc_fence.unit}}</div>
            </el-popover>
            <el-button type="text" v-popover:scopeLevel>{{scope.row.level}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="expire_time" label="套餐到期时间" align="center">
          <template scope="scope">
            <ExpireTime :expireTime="scope.row.expire_time" />
          </template>
        </el-table-column>
        <el-table-column prop="serviceStatus" label="防御状态" align="center">
          <template scope="scope">
            <i v-if="scope.row.serviceStatus === '未加速'" class="fail-dot"></i>
            <i v-if="scope.row.serviceStatus === '清洗加速中'" class="succceed-dot"></i>
            <i v-if="scope.row.serviceStatus === 'CDN加速中'" class="again-dot"></i>
            {{scope.row.serviceStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="protected_status" label="防御开关" align="center">
          <template scope="scope">
            <el-switch @change="protectedStatusChange(scope.row)" v-model="scope.row.protected_status" on-value="1" off-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="test" label="操作" align="right">
          <template scope="scope">
            <el-button type="text" @click.native.prevent="update(scope.row)">升级</el-button>
            <el-button type="text" @click.native.prevent="renewal(scope.row)">续费</el-button>
            <el-button type="text" @click="toCommandPage(scope.row)">控制台</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  </div>
  <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
    您好，如需关闭请联系<a class="enable" @click="openQQ">技术支持</a>
  </el-dialog>
</console-page-layout>
</template>

<script>
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Tip from 'common/components/Tip/Tip'
import TaichiResource from '../../resource/TaichiResource'
import ShowBox from 'common/components/ShowBox/show-box'
import Help from 'common/utils/help'
import moment from 'moment'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Tip,
    ShowBox,
    ExpireTime
  },
  directives: {},
  methods: {
    ...mapActions([
      // 'getDomainList'
    ]),
    openQQ() {
      Help.linkService()
    },
    checkItIfTimeIsOver(row) {
      return row.selectable
    },
    goToHWWS() {
      window.location.href = '/console/red-guard#/websiteList'
    },
    goToCloudSpeed() {
      window.location.href = '/console/cloud-speed#/websiteList'
    },
    getDomainList() {
      const params = {
        page: this.currentPage,
        per_page: this.pageSize
      }
      this.websiteListTableLoading = true
      TaichiResource.getDomainList(params).then(response => {
        if (response.data.data) {
          // 循环遍历每一个网站，判断服务状态，并把服务状态存入对应网站属性内
          response.data.data.list.forEach((value,index) => {
            //CNAME模式下
            if (value.webcdn_protected_mode === '1') {
              // CNAME接入 并且 云加速开关开启
              if (value.use_yundun_cname === '1' && value.webcdn_protected_status === '1') {
                //以加速，下一步判断太极抗D是否开启
                if (value.tjkd_protected_status === '1') {
                  value.serviceStatus = '清洗加速中'
                } else {
                  value.serviceStatus = 'CDN加速中'
                }
              } else {
                //未加速
                  value.serviceStatus = '未加速'
              }
            } else {
              //NS模式下
              //NS接入 并且 云加速开关开启
              if (value.use_yundun_dns === '1' && value.webcdn_protected_status === '1') {
                //以加速，下一步判断太极抗D是否开启
                if (value.tjkd_protected_status === '1') {
                  value.serviceStatus = '清洗加速中'
                } else {
                  value.serviceStatus = 'CDN加速中'
                }
              } else {
                //未加速
                  value.serviceStatus = '未加速'
              }
            }
            // 顺路判断网站的套餐是否已经到期
            const timeNow = Date.now()
            const timeOver = Date.parse(new Date(value.expire_time.replace(/-/g, '/')))
            if (timeOver - timeNow > 0) {
              value.selectable = false
            } else {
              value.selectable = true
            }
          })
          this.domainList = response.data.data.list
          // console.log('fucking on ther way', this.domainList)
          this.total = Number(response.data.data.total)
        }
        this.websiteListTableLoading = false
      }).catch(response => {
        this.websiteListTableLoading = false
      })
    },
    getTableData(currentPage, pageSize) {
      this.currentPage = currentPage
      this.pageSize = pageSize
      this.getDomainList()
    },
    outPage() {
      window.location.href = '/payment#/setting-taichi-ddos'
    },
    toCommandPage(row) {
      this.$router.push(`/WebsiteProtectList/console/${row.domain_id}`)
    },
    nearlyOutTimeWebsite() {
      TaichiResource.nearlyOutTimeWebsite().then(response => {
          const resArray = Object.values(response.data.data.list)
          this.tipNum = resArray.length
          if (resArray.length !== 0) {
            this.tipVisible = true
            this.tipData = [`当前有${this.tipNum}网站的防护套餐即将到期，请及时续费，避免影响到您的网站访问`, '即将过期网站：']
            resArray.forEach((value,index) => {
              this.tipData.push(value)
            })
          } else {
            this.tipVisible = false
          }
      })
    },
    handleSelectionChange(selection) {
      this.selectDomainsIdArray = []
      selection.forEach((value,index) => {
        console.log(value.selectable === true)
        if (value.selectable === true) {
          this.selectDomainsIdArray.push(Number(value.domain_id))
        }
      })
    },
    update(row) {
      if (row.meal_detail.ddos_fence.value >= 300) {
        this.$message({
          showClose: true,
          message: '该套餐已是最高等级',
          type: 'warning'
        })
        return
      }
      window.location.href = `/payment#/setting-taichi-ddos?id=${row.domain_id}&type=1&domain=${row.domain}`
    },
    renewal(row) {
      window.location.href = `/payment#/setting-taichi-ddos?id=${row.domain_id}&type=2&domain=${row.domain}`
    },
    delDomain() {
      if (this.selectDomainsIdArray.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择删除项',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认要删除该网站吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.websiteListTableLoading = true
          const param = {
            ids: this.selectDomainsIdArray
          }
          TaichiResource.delDomain(param).then(response => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.selectDomainsIdArray = []
            this.getDomainList()
          }).catch(response => {
            this.websiteListTableLoading = false
          })
        }).catch(() => {

        })
    },
    protectedStatusChange(row) {
      // 不允许关闭开关，并额外弹出提示框
      if (row.protected_status === '0') {
        this.dialogVisible = true
        row.protected_status = '1'
        return
      }
      this.websiteListTableLoading = true
      const params = {
        domain_id: row.domain_id,
        protected_status: row.protected_status
      }
      TaichiResource.changeProtectStatus(params).then(response => {
        if (response.data.status.code === 1) {
          this.$message({
            showClose: true,
            message: '更改成功',
            type: 'success'
          })
          this.getDomainList()
        }
      }).catch(response => {
          if (row.protected_status === '0') {
            row.protected_status = '1'
          } else {
            row.protected_status = '0'
          }
          this.websiteListTableLoading = false
      })
    }
  },
  computed: {
  },
  mounted() {
    this.getDomainList()
    this.nearlyOutTimeWebsite()
  },
  data() {
    return {
      dialogVisible: false,
      selectDomainsIdArray:[],
      websiteListTableLoading: false,
      domainList:[],
      total: 0,
      tipData: [],
      tipNum: 0,
      tipVisible: false,
      pageSizes: [5, 10, 20],
      pageSize: 5,
      currentPage: 1,
      tableData: []
    }
  }
}
</script>
<style>
.scopeLevelData{
  color:rgb(60,151,232);
  font-size: 20px;
  margin: 4px 0;
}
i.yun-icon{
  font-size: 22px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.yun-icon.red-guard.taichi-icon-active::before {
  color:rgb(60,151,232)
}
.domain-address {
  width: 94px;
}
td.el-table_1_column_3.is-center div{
  overflow: visible;
}
ul.web-origin-domain {
  min-width: 130px;
}
.enable {
  font-size: 18px;
  color: rgb(60,151,232);
  cursor: pointer;
}
</style>
