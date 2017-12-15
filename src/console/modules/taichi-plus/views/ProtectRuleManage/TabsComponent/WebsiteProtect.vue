<template lang="html">
  <div class="page-layout-control">
    <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes"
    @on-size-change="getTableData" @on-current-change="getTableData">
      <div slot="headerLeft">
        <el-button type="primary" @click="dialogVisible = true">添加网站</el-button>
        <el-button type="primary" @click="delDomainList">删除</el-button>
      </div>
      <div slot="headerRight">
        <el-select v-model="packageValue" filterable placeholder="所有套餐" @change="init">
          <el-option v-for="item in packageList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="body">
        <el-table :data="tableData" style="width: 100%" v-loading="tableLoading" @select="handleTableSelectionChange"
        @select-all="handleTableSelectionChange">
          <el-table-column type="selection" width="26">
          </el-table-column>
          <el-table-column prop="domain" label="防护网站" align="left">
          </el-table-column>
          <el-table-column prop="test" label="源站地址" align="left">
            <template scope="scope">
              <ShowBox :webList="scope.row.records"/>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="开通服务" align="center">
            <template scope="scope">
              <i @click="goToHWWS" class="yun-icon red-guard" v-if="scope.row.hwws_status === '0'" title="红网卫士未开启"></i>
              <i @click="goToHWWS" class="yun-icon red-guard taichi-icon-active" v-if="scope.row.hwws_status === '1'" title="红网卫士已开启"></i>
            </template>
          </el-table-column>
          <el-table-column prop="package_name" label="所属套餐" align="left">
          </el-table-column>
          <el-table-column prop="expire_time" label="到期时间" align="left">
            <template scope="scope">
                <ExpireTime :expireTime="scope.row.expire_time" />
            </template>
          </el-table-column>
          <el-table-column prop="serviceStatus" label="服务状态" align="left">
            <template scope="scope">
              <i v-if="scope.row.serviceStatus === '未加速'" class="fail-dot status-dot"></i>
              <i v-if="scope.row.serviceStatus === '清洗加速中'" class="succceed-dot status-dot"></i>
              <i v-if="scope.row.serviceStatus === 'CDN加速中'" class="again-dot status-dot"></i>
              {{scope.row.serviceStatus}}
            </template>
          </el-table-column>
          <el-table-column prop="test" label="防御开关" align="center">
            <template scope="scope">
              <el-switch @change="protectedStatusChange(scope.row)" v-model="scope.row.protect_status" on-value="1" off-value="0" on-color="#13ce66" off-color="#ccc">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="操作" align="right">
            <template scope="scope">
              <el-button type="text" @click="goToConfigPage(scope.row)">控制台</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
    <el-dialog title="添加网站" :visible.sync="dialogVisible" size="tiny" @close="cancelAddDomain">
      <el-form label-width="80px" v-loading="dialogLoading">
        <el-form-item label="选择套餐">
          <el-select v-model="packageListSelect" filterable placeholder="请选择">
            <el-option v-for="item in packageList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择域名">
          <el-select v-model="domainListSelect" filterable multiple placeholder="请选择">
            <el-option v-for="item in domainList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="fr dialog-add-btn">
        <el-button type="primary" @click="addPlusDomain">确认添加</el-button>
        <el-button @click="cancelAddDomain">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="tipsDialog" size="tiny">
      您好，如需关闭请联系<span class="enable" @click="openQQ">技术支持</span>
    </el-dialog>
  </div>

</template>

<script>
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../../resource/TaichiPlusResource'
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ShowBox from '../../Component/ShowBox'
import Help from 'common/utils/help'
import { mapActions } from 'vuex'

export default {
  components: {
    ComboTable,
    ShowBox,
    ExpireTime
  },
  data() {
    return {
      pageSizes: [5, 10, 20],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      packageValue: '',
      packageSelect:[],
      searchKey:'',
      dialogVisible: false,
      tipsDialog: false,
      packageList: [],
      packageListSelect: '',
      domainList: [],
      domainListSelect: [],
      dialogLoading: false,
      tableLoading: false,
      tableMultipleSelection: [],
      websiteConfigNameCache: '',
      summaryList: [],
      nearlyOutTimeNum: 0
    }
  },
  created() {
    this.init()
    this.getPackageListSelect()
    this.getDomainListUsable()
    this.getSummaryInfo()
  },
  methods: {
    ...mapActions([
      'saveConfigPageDomainName'
    ]),
    openQQ() {
      Help.linkService()
    },
    getSummaryInfo() {
      TaichiPlusResource.getSummaryInfo().then(response => {
        const res = response.data.data
        this.summaryList = res.list
        this.nearlyOutTimeNum = res.expire_total
      })
    },
    goToHWWS() {
      window.location.href = '/console/red-guard#/websiteList'
    },
    handleTableSelectionChange(selection) {
      this.tableMultipleSelection = selection
    },
    cancelAddDomain() {
      this.dialogVisible = false
      this.packageListSelect = ''
      this.domainListSelect = []
    },
    addPlusDomain() {
      if (this.packageListSelect === '' ||
    this.domainListSelect.length === 0) {
      this.$message({
        showClose: true,
        message: '套餐或域名不能为空',
        type: 'warning'
      })
      return
    }
      this.dialogLoading = true
      const params = {
        package_id: this.packageListSelect,
        domain_id: this.domainListSelect
      }
      TaichiPlusResource.addPlusDomain(params).then(response => {
        if (response.data.status.code === 1) {
          this.dialogLoading = false
          this.dialogVisible = false
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          this.packageListSelect = ''
          this.domainListSelect = []
          this.getDomainListUsable()
          this.init()
        }
      }).catch(response => {
        this.dialogLoading = false
      })
    },
    getTableData(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.init()
    },
    goToConfigPage(row) {
      // 将设置页面所需要的域名存入VUEX内
      this.saveConfigPageDomainName(row.domain)
      this.$router.push(`/ProtectRuleManage/ConfigPage/${row.domain_id}`)
    },
    init() {
      this.tableLoading = true
      // 如果是套餐列表页面跳转过来，就按照预存的套餐ID进行筛选显示
      const packageId = sessionStorage.getItem('packageIdSelectedCache')
      if (packageId) {
        this.packageValue = packageId
      }
      let params
      if (this.packageValue) {
        params = {
          package_id: this.packageValue,
          page: this.currentPage,
          per_page: this.pageSize
        }
      } else {
        params = {
          page: this.currentPage,
          per_page: this.pageSize
        }
      }
      TaichiPlusResource.getProtectDomainList(params).then(response => {
        this.total = Number(response.data.data.total)
        // 循环遍历每一个网站，判断服务状态，并把服务状态存入对应网站属性内
        response.data.data.list.forEach((value,index) => {
          //CNAME模式下
          if (value.webcdn_protected_mode === '1') {
            // CNAME接入 并且 云加速开关开启
            if (value.use_yundun_cname === '1' && value.webcdn_protected_status === '1') {
              //以加速，下一步判断太极抗D是否开启
              if (value.protect_status === '1') {
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
              if (value.protect_status === '1') {
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
        this.tableData = response.data.data.list
        sessionStorage.setItem('packageIdSelectedCache', '')
        this.tableLoading = false
      }).catch(response => {
        this.tableLoading = false
      })
    },
    getPackageListSelect() {
      TaichiPlusResource.getPackageList().then(response => {
        this.packageList = response.data.data.list
      })
    },
    getDomainListUsable() {
      TaichiPlusResource.getDomainListUsable().then(response => {
        this.domainList = []
        for (const key in response.data.data) {
          this.domainList.push({
            label: response.data.data[key],
            value: key
          })
        }
      })
    },
    protectedStatusChange(row) {
      if (row.protect_status === '0') {
        this.tipsDialog = true
        row.protect_status = '1'
        return
      }
      this.tableLoading = true
      const params = {
        domain_id: row.domain_id,
        protect_status: row.protect_status
      }
      TaichiPlusResource.changeProtectStatus(params).then(response => {
        this.$message({
              showClose: true,
              message: '更改成功',
              type: 'success'
            })
        this.init()
      }).catch(response => {
        this.init()
      })
      // this.websiteListTableLoading = true
      // TaichiResource.changeProtectStatus(params).then(response => {
      //   if (response.data.status.code === 1) {
      //     this.$message({
      //       showClose: true,
      //       message: '更改成功',
      //       type: 'success'
      //     })
      //     this.getDomainList()
      //   }
      // }).catch(response => {
      //     if (row.protected_status === '0') {
      //       row.protected_status = '1'
      //     } else {
      //       row.protected_status = '0'
      //     }
      //     this.websiteListTableLoading = false
      // })
    },
    delDomainList() {
      // console.log('bug-fixed', this.tableMultipleSelection)
      if (this.tableMultipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择删除项！',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.batchDeleteFun()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    batchDeleteFun() {
      const domainIds = {
        package_domain_ids: []
      }
      this.tableMultipleSelection.forEach((item, index) => {
        domainIds.package_domain_ids.push(Number(item.domain_id))
      })
      console.log(this.tableMultipleSelection)
      TaichiPlusResource.batchDeleteDomain(domainIds).then(
        res => {
          console.log(res)
          this.$message({
            showClose: true,
            message: '域名批量删除成功',
            type: 'success'
          })
          this.tableMultipleSelection = []
          this.init()
        })
    }
  }
}
</script>

<style scope>
.input-width-control.el-input {
  width: 200px;
}
.fr {
  float: right;
}
.dialog-add-btn {
  margin: 0 26px 26px 0
}
i.yun-icon{
  font-size: 22px;
  width: 22px;
  height: 22px;
}
.red-guard.taichi-icon-active::before {
  color:rgb(60,151,232)
}
i.red-guard {
  cursor: pointer;
}
.package-profile {
  background-color: #FEFBF7;
  border: 2px solid #FCE2C8;
  padding:16px;
  border-radius: 2px;
  margin-bottom: 12px;
}
.package-name {
  width: 180px;
  display: inline-block;
}
.page-layout-control {
  padding: 12px;
  background-color: var(--wrap-background);
}
tr.el-table__row {
  td:nth-child(3) {
    div.cell {
      padding-left: 0;
    }
  }
}
.el-table__header-wrapper{
  th:nth-child(3).is-left {
    padding-left: 26px;
  }
}
.status-dot {
  margin-bottom: 2px;
}
.enable {
  font-size: 18px;
  color: rgb(60,151,232);
  cursor: pointer;
}
</style>
