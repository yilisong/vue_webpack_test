<template lang="html">
    <div class="page-layout-control">
      <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getTableData" @on-current-change="getTableData">
        <div slot="headerLeft">
          <el-button type="primary" @click="dialogVisible = true">添加转发规则</el-button>
          <el-button type="primary" @click="delDomainList">删除</el-button>
        </div>
        <div slot="headerRight">
          <el-select v-model="packageValue" filterable placeholder="所有套餐" @change="packageChange">
            <el-option v-for="item in packageListSelect" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div slot="body">
          <el-table :data="tableData" @select="handleTableSelectionChange"
           @select-all="handleTableSelectionChange" v-loading="tableLoading">
            <el-table-column type="selection" width="26">
            </el-table-column>
            <el-table-column label="转发规则" align="left" min-width="80">
              <template scope="scope">
                {{scope.row.protocol_name}}/{{scope.row.protocol_port}}
              </template>
            </el-table-column>
            <el-table-column label="源IP/源端口" align="left">
              <template scope="scope">
                <ShowBox :webList="scope.row.records"/>
              </template>
            </el-table-column>
            <el-table-column label="所属套餐" align="center" min-width="150">
              <template scope="scope" class="package-cell">
                <div class="package-surround">{{scope.row.package_name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="expire_time" label="到期时间" align="left">
              <template scope="scope">
                  <ExpireTime :expireTime="scope.row.expire_time" />
              </template>
            </el-table-column>
            <el-table-column prop="loading_name" label="负载均衡规则" align="center" min-width="108">
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template scope="scope">
                <span class="package-outer-btn"  @click="editRuleList(scope.row)">编辑</span>
                <span style="color:#848484;">|</span>
                <span class="package-outer-btn" @click="goToTcpConfigPage(scope.row)">控制台</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </ComboTable>
    <el-dialog title="添加转发规则" :visible.sync="dialogVisible" size="large" @close="handleCancelAdd">
      <el-form label-width="110px" v-loading="dialogLoading" ref="addOuterRuler">
        <el-form-item label="选择套餐">
          <el-select v-model="addNewRuleDialog.package_id" filterable placeholder="请选择">
            <el-option v-for="item in packageListSelect" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转发协议/端口">
          <el-col :span="7">
            <el-select v-model="addNewRuleDialog.outerTcp" filterable placeholder="请选择">
            <el-option v-for="item in outerTcpSelect" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            ：
          </el-col>
          <el-col :span="6">
            <el-input placeholder="请输入端口号" v-model="addNewRuleDialog.outerTcpNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负载均衡规则">
          <el-select v-model="addNewRuleDialog.carryRule" placeholder="请选择">
          <el-option v-for="item in carryRuleSelect" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="源IP/源端口">
          <el-button class="add-item" icon="plus" type="primary" @click="addNewRuleItem"></el-button>
          <el-col :span="20">
            <el-table :data="addNewRuleDialog.ipNumList">
              <el-table-column label="源站IP" align="center" min-width="150">
                <template scope="scope">
                  <el-input v-model="scope.row.ip" size="small" placeholder="0.0.0.0"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="端口" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.port" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="IP类型" align="center" width="110">
                <template scope="scope">
                  <el-select v-model="scope.row.line" placeholder="请选择" size="small">
                  <el-option v-for="item in lineTypeSelect" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="80">
                <template scope="scope">
                  <el-button type="text" @click="delNewRuleItem(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="fr dialog-footer">
        <el-button @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="addNewRuleFun">确认添加</el-button>
      </div>
    </el-dialog>
    <!-- 编辑转发规则弹出框 -->
    <el-dialog title="编辑转发规则" :visible.sync="editDialogVisible" size="large">
      <el-form label-width="110px" v-loading="editDialogLoading">
        <el-form-item label="转发协议/端口">
          <el-col :span="6">
            <el-select v-model="editNewRuleDialog.outerTcp" filterable placeholder="请选择">
            <el-option v-for="item in outerTcpSelect" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            ：
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入端口号" v-model="editNewRuleDialog.outerTcpNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负载均衡规则">
          <el-select v-model="editNewRuleDialog.carryRule" filterable placeholder="请选择">
          <el-option v-for="item in carryRuleSelect" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="源IP/源端口">
          <el-button class="add-item" icon="plus" type="primary" @click="addNewRuleItemCopy"></el-button>
          <el-col :span="20">
            <el-table :data="editNewRuleDialog.ipNumList">
              <el-table-column label="源站IP" align="center" min-width="150">
                <template scope="scope">
                  <el-input v-model="scope.row.value" size="small" placeholder="0.0.0.0"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="端口" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.port" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="IP类型" align="center" width="110">
                <template scope="scope">
                  <el-select v-model="scope.row.view" placeholder="请选择" size="small">
                  <el-option v-for="item in editLineTypeSelect" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="90">
                <template scope="scope">
                  <el-button type="text" @click="delEditRuleItem(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="fr dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="editRuleFun">确认保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../../resource/TaichiPlusResource'
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ShowBox from '../../Component/ShowBox'
import Verify from 'common/utils/verify'
export default {
  components: {
    ComboTable,
    ShowBox,
    ExpireTime
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      editDialogVisible: false,
      editDialogLoading: false,
      package_id_cache: 0,
      outer_num_cache: 0,
      tableData: [],
      outerTcpSelect: [{ label:'TCP', value:1 }, { label: 'UDP', value:2 }],
      carryRuleSelect: [{ label:'轮询', value:1 }, { label: 'IP哈希', value:2 }],
      lineTypeSelect: [{ label:'主IP', value:1 }, { label: '备用IP', value:2 }],
      editLineTypeSelect: [{ label:'主IP', value: 'primary' }, { label: '备用IP', value: 'backup' }],
      packageValue: '',
      packageListSelect:[],
      searchKey:'',
      tableMultipleSelection: [],
      addNewRuleDialog: {
        package_id: '',
        outerTcp: 1,
        outerTcpNum: '',
        carryRule: 1,
        ipNumList: [{ ip:'', port:'', line: 1 }]
      },
      editNewRuleDialog: {
        package_id: '',
        outerTcp: '',
        outerTcpNum: '',
        carryRule: '',
        ipNumList: []
      },
      edittingCache: {},
      summaryList: [],
      nearlyOutTimeNum: 0,
      pageSizes: [5, 10, 20],
      pageSize: 5,
      total: 0,
      currentPage: 0
    }
  },
  created() {
    this.init()
    this.getPackageListSelect()
    this.getSummaryInfo()
  },
  mounted() {
  },
  methods: {
    getTableData(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.init()
    },
    getSummaryInfo() {
      TaichiPlusResource.getSummaryInfo().then(response => {
        const res = response.data.data
        this.summaryList = res.list
        this.nearlyOutTimeNum = res.expire_total
      })
    },
    packageChange() {
      this.init()
    },
    cancelAdd() {
      const a = this.addNewRuleDialog
      a.package_id =  this.packageListSelect[0].value
      a.outerTcpNum = ''
      a.outerTcp =  a.carryRule = 1
      a.ipNumList = [{ ip:'', port:'', line: 1 }]
      this.dialogVisible = false
    },
    handleCancelAdd() {
      this.$refs.addOuterRuler.resetFields()
    },
    addNewRuleFun() {
      const value = this.addNewRuleDialog
      const params = {
        package_id: Number(value.package_id),
        protocol: value.outerTcp,
        protocol_port: Number(value.outerTcpNum),
        loading: value.carryRule,
        source_ip: [],
        source_port: [],
        backup: [],
        actions: 'add'
      }
      let flag = true
      let isNum = true
      let isInRange = true
      let ipTypeNum = 0
      let notPrivate = true
      let notSameData = true
      this.addNewRuleDialog.ipNumList.forEach((v, i) => {
        //数据格式预校验部分

        //用户添加的表格数据中，源IP和源端口不能同时相同
        this.addNewRuleDialog.ipNumList.forEach((v2, i2) => {
          if (v.ip === v2.ip && v.port === v2.port && i !== i2) {
            notSameData = false
          }
        })
        if (Verify.ipReg.test(v.ip) === false) {
          flag = false
        }
        if (Verify.ipReg192.test(v.ip) ||
          Verify.ipReg10.test(v.ip) ||
          Verify.ipReg172.test(v.ip)) {
          notPrivate = false
        }
        if (isNaN(v.port) || v.port === '') {
          isNum = false
        }
        if (v.port < 1 || v.port > 65535) {
          isInRange = false
        }
        if (v.line === 1) {
          ipTypeNum++
        }
        params.source_ip.push(v.ip)
        params.source_port.push(v.port)
        params.backup.push(v.line)
      })

      // 数据格式判断部分
      if (flag === false) {
        this.$message({
          showClose: true,
          message: '源IP格式不正确',
          type: 'warning'
        })
        return
      }
      if (notPrivate === false) {
        this.$message({
          showClose: true,
          message: '源IP不能添加私网IP',
          type: 'warning'
        })
        return
      }
      if (isNum === false) {
        this.$message({
          showClose: true,
          message: '源端口必须为数字',
          type: 'warning'
        })
        return
      }
      if (isInRange === false) {
        this.$message({
          showClose: true,
          message: '源端口必须在1～65535之间',
          type: 'warning'
        })
        return
      }
      if (value.outerTcpNum === '' || params.source_ip.length === 0 ||
    params.source_port.length === 0) {
          this.$message({
            showClose: true,
            message: '添加信息不能为空',
            type: 'warning'
          })
          return
        }
      if (ipTypeNum === 0) {
        this.$message({
          showClose: true,
          message: '线路必须包含主线路',
          type: 'warning'
        })
        return
      }
      if (isNaN(value.outerTcpNum)) {
        this.$message({
          showClose: true,
          message: '转发协议端口号必须为数字',
          type: 'warning'
        })
        return
      }
      if (value.outerTcpNum < 1 || value.outerTcpNum > 65535) {
        this.$message({
          showClose: true,
          message: '转发端口号范围为1～65535',
          type: 'warning'
        })
        return
      }
      if (notSameData === false) {
        this.$message({
          showClose: true,
          message: '源IP/源端口重复',
          type: 'warning'
        })
        return
      }
      this.dialogLoading = true
      TaichiPlusResource.addNewRuleFun(params).then(response => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        const a = this.addNewRuleDialog
        a.package_id =  this.packageListSelect[0].value
        a.outerTcpNum = ''
        a.outerTcp =  a.carryRule = 1
        a.ipNumList = [{ ip:'', port:'', line: 1 }]
        this.dialogLoading = false
        this.dialogVisible = false
        this.init()
      }).catch(response => {
        this.dialogLoading = false
      })
    },
    editRuleFun() {
      const value = this.editNewRuleDialog
      const params = {
        package_id: this.package_id_cache,
        protocol: value.outerTcp,
        protocol_port: Number(value.outerTcpNum),
        loading: value.carryRule,
        source_ip: [],
        source_port: [],
        backup: [],
        actions: 'edit',
        protocol_port_old: this.outer_num_cache
      }
      let flag = true
      let isNum = true
      let isInRange = true
      let ipTypeNum = 0
      let notPrivate = true
      let notSameData = true
      this.editNewRuleDialog.ipNumList.forEach((v, i) => {
        //用户添加的表格数据中，源IP和源端口不能同时相同
        this.editNewRuleDialog.ipNumList.forEach((v2, i2) => {
          if (v.value === v2.value && v.port === v2.port && i !== i2) {
            notSameData = false
          }
        })
        if (Verify.ipReg.test(v.value) === false) {
          flag = false
        }
        if (Verify.ipReg192.test(v.value) ||
          Verify.ipReg10.test(v.value) ||
          Verify.ipReg172.test(v.value)) {
          notPrivate = false
        }
        if (isNaN(v.port) || v.port === '') {
          isNum = false
        }
        if (v.port < 1 || v.port > 65535) {
          isInRange = false
        }
        if (v.line === 1) {
          ipTypeNum++
        }
        params.source_ip.push(v.value)
        params.source_port.push(v.port)
        // 获取和编辑两个部分的属性名不匹配，产生了撕裂，这是被后台API所限制的，无奈之下只能进行额外的转换
        if (v.view === 'primary') {
          ipTypeNum++
          params.backup.push(1)
        } else if (v.view === 'backup') {
          params.backup.push(2)
        }
      })
      // 数据格式校验部分 > > > >
      if (flag === false) {
        this.$message({
          showClose: true,
          message: 'IP格式不正确',
          type: 'warning'
        })
        return
      }
      if (notPrivate === false) {
        this.$message({
          showClose: true,
          message: '源IP不能添加私网IP',
          type: 'warning'
        })
        return
      }
      if (isNum === false) {
        this.$message({
          showClose: true,
          message: '源端口必须为数字',
          type: 'warning'
        })
        return
      }
      if (isInRange === false) {
        this.$message({
          showClose: true,
          message: '源端口必须在1～65535之间',
          type: 'warning'
        })
        return
      }
      if (value.outerTcpNum === '' || params.source_ip.length === 0 ||
    params.source_port.length === 0) {
          this.$message({
            showClose: true,
            message: '添加信息不能为空',
            type: 'warning'
          })
          return
        }
      if (ipTypeNum === 0) {
        this.$message({
          showClose: true,
          message: '线路必须包含主线路',
          type: 'warning'
        })
        return
      }
      if (isNaN(value.outerTcpNum)) {
        this.$message({
          showClose: true,
          message: '转发协议端口号必须为数字',
          type: 'warning'
        })
        return
      }
      if (value.outerTcpNum < 1 || value.outerTcpNum > 65535) {
        this.$message({
          showClose: true,
          message: '转发端口号范围为1～65535',
          type: 'warning'
        })
        return
      }
      if (notSameData === false) {
        this.$message({
          showClose: true,
          message: '源IP/源端口重复',
          type: 'warning'
        })
        return
      }
      this.editDialogLoading = true
      TaichiPlusResource.addNewRuleFun(params).then(response => {
        this.$message({
          showClose: true,
          message: '编辑成功',
          type: 'success'
        })
        this.editDialogLoading = false
        this.editDialogVisible = false
        this.init()
      }).catch(response => {
        this.editDialogLoading = false
      })
    },
    delNewRuleItem(index) {
      this.addNewRuleDialog.ipNumList.splice(index, 1)
    },
    delEditRuleItem(index) {
      this.editNewRuleDialog.ipNumList.splice(index, 1)
    },
    addNewRuleItem() {
      this.addNewRuleDialog.ipNumList.push({ ip:'', port:'', line: 1 })
    },
    addNewRuleItemCopy() {
      this.editNewRuleDialog.ipNumList.push({ value:'', port:'', view: 'primary' })
    },
    editRuleList(row) {
      const a = this.editNewRuleDialog
      this.rowCache = row
      this.edittingCache = JSON.parse(JSON.stringify(row))
      this.package_id_cache = Number(row.package_id)
      this.outer_num_cache = Number(row.protocol_port)
      a.outerTcp = Number(row.protocol)
      a.outerTcpNum = Number(row.protocol_port)
      a.carryRule = Number(row.loading)
      a.ipNumList = row.records
      this.editDialogVisible = true
    },
    cancelEdit() {
      for (const key in this.edittingCache) {
        this.rowCache[key] = this.edittingCache[key]
      }
      this.editDialogVisible = false
    },
    delDomainList() {
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
      const params = {
        ids: []
      }
      params.ids = this.tableMultipleSelection
      TaichiPlusResource.batchDeleteRule(params).then(
        res => {
          this.$message({
            showClose: true,
            message: '域名批量删除成功',
            type: 'success'
          })
          this.tableMultipleSelection = []
          this.init()
        })
    },
    handleTableSelectionChange(selection) {
      this.tableMultipleSelection = []
      selection.forEach((value, index) => {
        this.tableMultipleSelection = this.tableMultipleSelection.concat(value.ids)
      })
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
      TaichiPlusResource.getRuleList(params).then(response => {
        this.tableData = response.data.data.list
        this.total = Number(response.data.data.total)
        this.tableLoading = false
        sessionStorage.setItem('packageIdSelectedCache', '')
      }).catch(response => {
        this.tableLoading = false
      })
    },
    goToTcpConfigPage(row) {
      this.$router.push(`/ProtectRuleManage/TcpConfigPage/${row.package_id}`)
    },
    getPackageListSelect() {
      TaichiPlusResource.getPackageList().then(response => {
        this.packageListSelect = response.data.data.list
        this.addNewRuleDialog.package_id = this.packageListSelect[0].value
      })
    }
  }
}
</script>

<style scope>
.input-width-control {
  width: 200px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.dialog-footer {
  margin-bottom: 26px;
}
.add-item.el-button {
  height: 38px;
  width: 47px;
  margin-right: -4px;
  margin-top: 1px;
  border-radius: 0;
  float: left;
}
button.package-outer-btn, .package-outer-btn{
  color: rgb(45,144,230);
  cursor: pointer;
  padding: 0 9px;
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
.package-surround {
  display: inline-block;
  width:90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 8px;
}
div.list-container {
  display: inline-block;
}
.page-layout-control {
  padding: 12px;
  background-color: var(--wrap-background);
}
.el-table__header-wrapper{
  th:nth-child(3).is-left {
    padding-left: 26px;
  }
}
</style>
