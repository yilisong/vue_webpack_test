<template lang="html">
<console-page-layout title="域名列表">
  <yd-pagination-table v-loading="tableLoading" class="pagi-table" element-loading-text="拼命加载中" :pageTotalCount="pageTotalCount" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" ref="paginationTable">
    <div class="domain-list-header">
      <el-button type="primary" @click="handleButtonDomainAdd" style="margin-right: 10px;">添加域名</el-button>
      <el-button @click="delDomainList">删除</el-button>
      <div style="float:right;">
      </div>
    </div>
    <el-table :data="domainList" style="width: 100%" @select="handleTableSelectionChange" @select-all="handleTableSelectionChange">
      <el-table-column type="selection" width="24"></el-table-column>
      <el-table-column prop="domain" label="名称" align="left"></el-table-column>
      <el-table-column prop="trust_status" label="托管状态" width="150" align="center">
        <template scope="scope">
          <div v-if="scope.row.trust_status === '0'">
            <el-popover ref="popover1" placement="top" trigger="hover" content="未检测到DNS">
            </el-popover>
            <el-button type="text" v-popover:popover1><i class="yun-icon yun-unbind"></i></el-button>
          </div>
          <div v-else-if="scope.row.trust_status === '2'">
            <el-popover ref="popover2" placement="top" trigger="hover" content="未接入">
            </el-popover>
            <el-button type="text" v-popover:popover2><i class="yun-icon yun-operate-fork"></i></el-button>
          </div>
          <div v-else-if="scope.row.trust_status === '3'">
            <el-popover ref="popover3" placement="top" trigger="hover" content="未使用指定DNS">
            </el-popover>
            <el-button type="text" v-popover:popover3><i class="yun-icon yun-unappoint"></i></el-button>
          </div>
          <div v-else>
            <el-popover ref="popover4" placement="top" trigger="hover" content="已接入">
            </el-popover>
            <el-button type="text" v-popover:popover4><i class="yun-icon yun-success"></i></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="域名状态" align="center">
        <template scope="scope">
          <div v-if="scope.row.status === '1'">
            <i class="succceed-dot"></i>正常
          </div>
          <div v-else-if="scope.row.status === '3'">
            <i class="fail-dot"></i>禁用
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="level_desc" label="套餐版本" align="center"></el-table-column>
      <el-table-column prop="expiry_time" label="到期日期" align="center">
        <template scope="scope">
          <div v-if="scope.row.level_desc === '免费版'">
            ——
          </div>
          <div v-else>
            {{scope.row.expiry_time}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" min-width="172">
        <template scope="scope">
          <div class="operation">
            <el-button type="text" size="small" @click="handleDomainOperate('statistics', scope.row)">统计</el-button>
            <el-button type="text" size="small" @click="handleDomainOperate('console', scope.row)">管理</el-button>
            <!-- <el-button type="text" size="small" @click="handleDomainOperate('aliasBind', scope.row)">别名绑定</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </yd-pagination-table>

  <el-dialog title="添加域名" v-model="domainAddDialog.visible" size="tiny" :close-on-click-modal="false" @close="handleDomainAddDialogClose">
      <el-form :model="domainAddDialog.editForm" :rules="websiteRules" ref="domainAddDialogForm" label-width="100px">
        <el-form-item label="域名名称" prop="domain">
          <el-input v-model.trim="domainAddDialog.editForm.domain" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="domainAddDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleDomainAddDialogSubmit" :loading="addDomainLoading">添 加</el-button>
      </div>
  </el-dialog>

  <el-dialog title="别名绑定" v-model="aliasBindDialog.visible" :close-on-click-modal="false" @close="handleAliasBindDialogClose">
    <Tip :content="contentTips"></Tip>
    <el-form :inline="true" :model="aliasBindDialog.editForm" :rules="websiteRules" ref="aliasBindDialogForm" label-width="70px">
      <el-form-item class='addAliasItem' label="添加别名">
        <el-input class="add-input" v-model.trim="aliasBindDialog.editForm.alias_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="addBtn" @click="handleAliasBindDialogSubmit">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="domainAliasList" v-loading="aliasTableLoading" style="width: 100%">
      <el-table-column prop="alias_name" label="别名名称">
      </el-table-column>
      <el-table-column prop="status_label" label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-popover ref="delAliasPopover" placement="top" width="160" v-model="delAliasVisible">
            <p>您确定删除吗？</p><br />
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="delAliasVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleButtonAliasDelete(scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="text" size="small" @click="" v-popover:delAliasPopover>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-button @click="aliasBindDialog.visible = false">关闭</el-button>
    </div>
  </el-dialog>
</console-page-layout>
</template>
<script>
import Tip from 'common/components/Tip/Tip'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import YdPaginationTable from 'common/components/yd-pagination-table'
import ResolvingResource from '../../resource/ResolvingResource'
import verify from 'common/utils/verify'
export default {
  components: {
    ConsolePageLayout,
    YdPaginationTable,
    Tip
  },
  computed: {

  },
  data() {
    const validateDomain = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写域名'))
      } else if (!verify.domain.test(value)) {
        callback(new Error('域名格式不正确'))
      } else if (value.length > 255) {
        callback(new Error('域名长度不超过255个字符'))
      } else {
        callback()
      }
    }
    const validateOtherDomain = function(rule,value,callback) {
      if (!value) {
        callback(new Error('请填写域名'))
      } else if (!verify.domain.test(value)) {
        callback(new Error('域名格式不正确'))
      } else if (value.length > 255) {
        callback(new Error('域名长度不超过255个字符'))
      } else {
        callback()
      }
    }
    return {
      delAliasVisible: false,
      contentTips:['1, 添加的别名需要人工审核','2, 只需填入主域名'],
      popoverArray: [],
      domainAliasList: [],
      aliasTableLoading: false,
      visible2: false,
      domainList: [],
      tableMultipleSelection: [],
      tableLoading: false,
      formLoading: false,
      addDomainLoading: false,
      pageTotalCount: 0,
      searchParam: {
        domain: ''
      },
      domainAddDialog: {
        visible: false,
        submitting: false,
        editForm: {}
      },
      websiteRules: {
        domain: [
          { validator: validateDomain,trigger:'blur' }
        ],
        alias_name:[
          { validator: validateOtherDomain,trigger:'blur' }
        ]
      },
      domainRetrieveDialog: {
        visible: false,
        submitting: false,
        radio: '1'
      },
      aliasBindDialog: {
        visible: false,
        submitting: false,
        editForm: {
          alias_name: ''
        },
        formRule: {
          alias_name: [{
            required: true,
            message: '请输入别名名称',
            trigger: 'blur'
          }, {
            min: 1,
            max: 64,
            message: '别名名称不能超过64个字符',
            trigger: 'blur'
          }]
        }
      },
      domainRemarkDialog: {
        visible: false,
        submitting: false,
        editForm: {}
      }
    }
  },
  watch: {

  },
  mounted() {
    this.fetchDomainList()
  },
  methods: {
    delDomainList() {
      if (this.tableMultipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择删除项！',
          type: 'warning'
        })
        return
      }
      let flag = true
      this.tableMultipleSelection.forEach((value, index) => {
        if (value.status === '3') {
            flag = false
        }
      })
      if (flag === false) {
        this.$message({
          showClose: true,
          message: '您勾选的域名中，包含已被禁用的域名，无法删除',
          type: 'warning'
        })
        return
      }
      this.$confirm('此操作将永久删除该域名, 是否继续?', '提示', {
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
        domain_ids: []
      }
      this.tableMultipleSelection.forEach((item, index) => {
        domainIds.domain_ids.push(item.id)
      })
      ResolvingResource.batchDeleteDomain(domainIds).then(
        res => {
          console.log(res)
              if (res && res.data.status.code === 1) {
                this.$message({
                  showClose: true,
                  message: '域名批量删除成功',
                  type: 'success'
                })
                this.tableMultipleSelection = []
              } else {
                const arr = Object.keys(res.data.data)
                arr.forEach((value,index) => {
                  this.tableMultipleSelection.forEach((v,i) => {
                    if (v.id === value) {
                      this.$message({
                        showClose: true,
                        message: '其中名为:' + v.domain + '的域名因为' + res.data[value].message.slice(0,res.data[value].message.length - 1) + ',删除失败。',
                        type: 'warning'
                      })
                    }
                  })
                })
                this.tableMultipleSelection = []
              }
            this.fetchDomainList()
        })
    },
    handleButtonDomainAdd() {
      this.domainAddDialog.editForm = {}
      this.domainAddDialog.visible = true
    },
    handleButtonSearch() {
      this.fetchDomainList(true)
    },
    handleTableSelectionChange(selection) {
      this.tableMultipleSelection = selection
    },
    handleDomainOperate(operate, row, index) {
      const id = row.id
      const resolvingDomain = row.domain
      switch (operate) {
        case 'details': // 详情
          this.$router.push(`/domainList/details/${id}`)
          break
        case 'upgrade': // 升级
          // this.$router.push(`/domainList/upgrade/${id}`)
          break
        case 'renew': // 续费
          // this.$router.push(`/domainList/renew/${id}`)
          break
        case 'statistics': // 统计
          this.$store.commit('getDomain', row.domain)
          // sessionStorage.setItem('resolvingDomain', row.domain)
          this.$router.push(`/domainList/statistics/${resolvingDomain}`)
          break
        case 'console': // 控制台
          this.$router.push(`/domainList/console/${id}/record`)
          break
        case 'aliasBind': // 别名绑定
          this.domainAliasList = []
          this.aliasBindDialog.editForm = {
            domain_id: id
          }
          this.aliasBindDialog.visible = true
          this.fetchDomainAliasList()
          break
        case 'deleteCancel':
          this.popoverArray[index].flag = false
          break
        case 'remark': // 信息备注
          this.domainRemarkDialog.visible = true
          this.fetchDomainRemarkInfo(id)
          break
        default:
      }
    },
    handlePaginationSizeChange(size) {
      this.fetchDomainList(true)
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.fetchDomainList()
    },
    fetchDomainList(resetPage = false) {
      this.tableLoading = true
      // this.paginationParam.currentPage = resetPage ? 1 : this.paginationParam.currentPage
      const params = {
        domain: this.searchParam.domain,
        page: this.$refs.paginationTable.currentPage,
        per_page: this.$refs.paginationTable.pageSize
      }
      if (resetPage) {
        params.page = this.$refs.paginationTable.currentPage = 1
      }
      ResolvingResource.getDomainList(params).then(
        result => {
            const resultList = result.data.data.list
            resultList.forEach(v => {
              this.popoverArray.push({
                flag: false
              })
            })
            this.domainList = resultList
            console.log('this.domainList', this.domainList)
            this.pageTotalCount = Number(result.data.data.total)
            this.tableLoading = false
        }).catch(result => {
          this.tableLoading = false
        })
    },
    handleDomainAddDialogClose() {
      this.domainAddDialog.visible = false
      this.domainAddDialog.submitting = false
      this.$refs.domainAddDialogForm.resetFields()
    },
    handleDomainAddDialogSubmit() {
      if (this.domainAddDialog.editForm.domain === '' ||
    this.domainAddDialog.editForm.domain === undefined) {
        this.$message({
         showClose: true,
         message: '域名不能为空',
         type: 'warning'
       })
       return
      }
      if (!verify.domain.test(this.domainAddDialog.editForm.domain)) {
        this.$message({
         showClose: true,
         message: '域名格式错误',
         type: 'warning'
       })
       return
      }
      // this.domainAddDialog.submitting = true
      this.addDomainLoading = true
      ResolvingResource.addDomainList({
        domain: this.domainAddDialog.editForm.domain.toLowerCase()
      }).then(res => {
           this.$message({
            showClose: true,
            message: '域名添加成功',
            type: 'success'
          })
      this.addDomainLoading = false
      this.domainAddDialog.visible = false
      this.fetchDomainList(true)
    }).catch(res => {
      this.addDomainLoading = false
    })
    },
    handleButtonDomainBatchAdd() {
      this.handleDomainAddDialogClose()
      // this.$nextTick(this.$router.push('/domainList/batch-domain-add'))
      this.$router.push('/domainList/batch-domain-add')
    },
    handleButtonDomainRetrieve() {
      this.handleDomainAddDialogClose()
      // this.domainRetrieveDialog.editForm = {}
      this.domainRetrieveDialog.visible = true
    },
    fetchDomainAliasList() {
      this.aliasTableLoading = true

      const params = {
        domain_id: this.aliasBindDialog.editForm.domain_id
      }
      ResolvingResource.getAliasList(params).then(
        res => {
          const result = res.data.data.list
          result.forEach(dd => {
            dd.status_label = res.data.data.status_list[dd.status]
          })
          this.domainAliasList = result
          this.aliasTableLoading = false
        }).catch(res => {
          this.aliasTableLoading = false
        })
    },

    handleDomainRetrieveDialogClose() {
      this.domainRetrieveDialog.visible = false
      this.domainRetrieveDialog.submitting = false
      // this.$refs.domainRetrieveDialogForm.resetFields()
    },
    handleDomainRetrieveDialogSubmit() {},
    handelDomainRetrieveDialogRadioChange(radioLabel) {

    },
    handleAliasBindDialogClose() {
      this.aliasBindDialog.visible = false
      this.aliasBindDialog.submitting = false
      this.$refs.aliasBindDialogForm.resetFields()
    },
    handleAliasBindDialogSubmit() {
      if (this.aliasBindDialog.editForm.alias_name === '' ||
    this.aliasBindDialog.editForm.alias_name === undefined) {
        this.$message({
          showClose: true,
          message: '别名不能为空',
          type: 'warning'
        })
        return
      }
      if (!verify.domain.test(this.aliasBindDialog.editForm.alias_name)) {
        this.$message({
          showClose: true,
          message: '域名格式错误',
          type: 'warning'
        })
        return
      }
      ResolvingResource.addAliasName({
        domain_id: this.aliasBindDialog.editForm.domain_id,
        alias_name: this.aliasBindDialog.editForm.alias_name.toLowerCase()
      }).then(res => {
            if (res.data.status.code === 1) {
              this.$message({
                showClose: true,
                message: '别名添加成功',
                type: 'success'
              })
              this.aliasBindDialog.editForm.alias_name = ''
              this.fetchDomainAliasList(true)
            }
          })
    },
    handleButtonAliasDelete(row) {
      this.delAliasVisible = false
      this.aliasTableLoading = true
      ResolvingResource.delAliasName({
        domain_id: row.domain_id,
        alias_id: row.id
      }).then(res => {
       this.$message({
         showClose: true,
         message: '别名删除成功',
         type: 'success'
       })
      this.domainAliasList = []
      this.fetchDomainAliasList()
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.data.status.message,
          type: 'error'
        })
      })
    },
    handleDomainRemarkDialogClose() {
      this.domainRemarkDialog.visible = false
      this.domainRemarkDialog.submitting = false
      this.$refs.domainRemarkDialogForm.resetFields()
    }
  }
}
</script>
<style>
#del-domain-btn {
  margin-left: 16px;
  width:80px;
  padding:6px 6px;
}
</style>
<style lang="css" scoped>
.icon-success{
  font-size:18px;
  color:rgb(133,199,57);
}
.icon-locked{
  color:#ccc;
  font-size: 17px;
}
.divide {
  border-left: 2px solid #20a0ff;
  margin-left: 6px;
  margin-right: 10px;
}

.el-button+.el-button {
  margin-left: 0;
}

.operation .el-button:after {
  content: "";
  width: 0;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid;
}

.operation .el-button:last-child:after {
  content: none;
}

.more-dropdown {
  font-size: 12px;
  color: #20a0ff;
}

.el-dropdown-menu {
  font-size: 12px;
  color: #20a0ff;
}

.el-dropdown-menu__item {
  line-height: 28px;
}
.tips-wrap{
  border:1px solid #20a0ff;
  border-radius: 9px;
  padding: 5px 0 5px 20px;
  margin-bottom: 10px;
}
.addAliasItem{
  float: left;
  margin-right: 10px;
}
.popover-array-tips{
  font-size: 16px;
}
.domain-list-header {
  margin-bottom: 12px;
}
.yun-icon {
  width: 12px;
  height: 12px;
}
.fail-dot, .succceed-dot {
  margin-bottom: 2px;
  margin-right: 8px;
}
.pagi-table {
  padding: 12px;
  background-color: var(--wrap-background);
}
</style>
