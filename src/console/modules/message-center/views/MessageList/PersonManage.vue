<template lang="html">
<console-page-layout title="消息接收人管理">
  <div class="Tip-simulation">
    本月赠送云端短信条数{{systemSmsNumber}}条，账号剩余短信条数<span>{{usableSmsNumber}}</span>条，为避免短信条数用完后，您无法收到短信提醒，请保证您账号具有充足的短信条数&nbsp;&nbsp;<button size="small" type="info" @click="buySms" class="buy-sms">购买短信条数</button>
  </div>
    <ComboTable class="wrap-background" :total="pageObj.totalPage" :page-size="pageObj.per_page" :page-sizes="[5, 10, 20, 50]" @on-size-change="handleSizeCurrentChangeFun" @on-current-change="handleSizeCurrentChangeFun">
      <div slot="headerLeft">
        <el-button @click="dialogFormVisible = true">新增联系人</el-button>
        <el-button @click="addNewGroupDialogVisible = true">新建组</el-button>
        <el-button @click="delPersonList">删除</el-button>
      </div>
      <div slot="headerRight">
        <div>
          <el-tag v-for="tag in groupList" :key="tag.name" :closable="true" :type="tag.type" @close="handleGroupDel(tag)">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <div slot="body">
        <el-table :data="tableDataFinalValue" style="width: 100%" v-loading="tableData.loading" element-loading-text="拼命加载中" @selection-change="handleSelectChange" class="person-manage-table">
          <el-table-column type="selection" width="26" :selectable="checkBasePerson"></el-table-column>
          <el-table-column prop="member_name" label="姓名" align="left">
            <template scope="scope">
              <div v-show="scope.row.id !== editingId">
                {{scope.row.member_name}}
              </div>
              <div v-show="scope.row.id === editingId">
                <el-input v-model="scope.row.member_name"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" align="center">
            <template scope="scope">
              <div v-show="scope.row.id !== editingId">
                {{scope.row.email}}
                <el-popover ref="mobilePop" placement="top" width="160" trigger="hover">
                  邮箱未验证，不能接收消息<br /><br />
                  <div>
                    <el-button :disabled="scope.row.time !== 60 && scope.row.time !== 0" size="small" type="primary" @click="sendEmailReg(scope.row)" class="regBtn">点击验证</el-button>
                  </div>
                  <div v-show="scope.row.time !== 60 && scope.row.time !== 0">
                    验证码已发送（{{scope.row.time}}秒后可再次发送）
                  </div>
                </el-popover>
                <el-button v-popover:mobilePop type="text" v-if="scope.row.email_status === '0'"><i class="iconfont el-icon-verification"></i></el-button>
              </div>
              <div v-show="scope.row.id === editingId">
                <el-input v-model="scope.row.email"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机" align="center">
            <template scope="scope">
              <div v-show="scope.row.id !== editingId">
                {{scope.row.mobile}}
                <el-popover ref="mobilePop" placement="top" width="160" trigger="hover">
                  手机未验证，不能接收消息<br /><br />
                  <div>
                    <el-button :disabled="scope.row.time2 !== 60 && scope.row.time2 !== 0" size="small" type="primary" @click="sendMobileReg(scope.row)" class="regBtn">点击验证</el-button>
                  </div>
                  <div v-show="scope.row.time2 !== 60 && scope.row.time2 !== 0">
                    验证码已发送（{{scope.row.time2}}秒后可再次发送）
                  </div>
                </el-popover>
                <el-button v-popover:mobilePop type="text" v-if="scope.row.mobile_status === '0'"><i class="iconfont el-icon-verification"></i></el-button>
              </div>
              <div v-show="scope.row.id === editingId">
                <el-input v-model="scope.row.mobile"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="belong_group" label="隶属组" align="center">
            <template scope="scope">
              <div v-show="scope.row.id !== editingId">
                <span v-for="item in scope.row.groupLabel">{{item}} / </span>
              </div>
              <div v-show="scope.row.id === editingId">
                <el-select v-model="scope.row.group_ids" multiple placeholder="请选择">
                  <el-option v-for="item in tableGroupList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template scope="scope">
              <div v-show="scope.row.id !== editingId">
                <el-button v-if="scope.row.type !== '1'" type="text" @click="handleEditBegin(scope.row)">编辑</el-button>
              </div>
              <div v-show="scope.row.id === editingId">
                <el-button type="text" @click="cancelEdit(scope.row)">取消</el-button>
                <el-button type="text" @click="saveEditPerson(scope.row)">保存</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
    <el-dialog title="新增联系人" size="tiny" v-model="dialogFormVisible" @close="handleCancelAddPerson">
      <el-form :model="addNewUser.data" ref="addNewUserDialog" :rules="addPersonRules" v-loading="addNewUserLoading" element-loading-text="拼命加载中">
        <el-form-item label="姓名" :label-width="addNewUser.formLabelWidth" prop="member_name">
          <el-input v-model.trim="addNewUser.data.member_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="addNewUser.formLabelWidth" prop="email">
          <el-input v-model="addNewUser.data.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="addNewUser.formLabelWidth" prop="mobile">
          <el-input v-model="addNewUser.data.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUserFun">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增接收组" size="tiny" v-model="addNewGroupDialogVisible" @close="handleCancelAddGroup">
      <el-form :model="addNewGroup" ref="addNewGroupDialog" label-width="90px" v-loading="addNewGroupLoading">
        <el-form-item label="组名称" prop="groupName">
          <el-input v-model="addNewGroup.groupName" auto-complete="off" placeholder="请输入消息接收组名称"></el-input>
        </el-form-item>
        <el-form-item label="选取联系人" prop="selectPerson">
          <el-select v-model="addNewGroup.selectPerson" multiple placeholder="请选择" id="selectPerson">
            <el-option v-for="item in addNewGroup.selectOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewGroupFun">添加</el-button>
      </div>
    </el-dialog>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import TableComponent from './Components/ComponentTable'
import ComboTable from 'common/components/ComboTable/ComboTable'
import MessageCenterResource from '../../resource/MessageCenterResource'
import Tip from 'common/components/Tip/Tip'
import verify from 'common/utils/verify'
export default {
  components: {
    ConsolePageLayout,
    TableComponent,
    ComboTable,
    Tip
  },
  data() {
    const validateMemberName = function(rule,value,callback) {
      if (!value) {
        callback(new Error('联系人姓名不能为空'))
      } else {
        callback()
      }
    }
    const validateEmail = function(rule,value,callback) {
      if (!value) {
        callback(new Error('邮箱不能为空'))
      } else if (!verify.EmailReg.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateMobile = function(rule,value,callback) {
      if (!value) {
        callback(new Error('手机号码不能为空'))
      } else if (!verify.strictMobile.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      editingId: -1,
      groupList: [],
      tableGroupList: [],
      tableMidValue: [],
      tableData: {
        data: [],
        titles: [],
        loading:false
      },
      pageObj: {
        per_page: 10,
        page: 1,
        totalPage: 0
      },
      usergroupselect: '',
      store: 1,
      addNewUser: {
        data: {
          member_name: '',
          email: '',
          mobile: ''
        },
        formLabelWidth: '50px'
      },
      addNewGroup:{
        groupName:'',
        selectPerson:[],
        selectOptions:[]
      },
      selectedItems:[],
      edittingCache: {},
      dialogFormVisible: false,
      addNewGroupDialogVisible: false,
      addNewGroupLoading : false,
      addNewUserLoading : false,
      addPersonRules: {
        member_name: [
          { validator: validateMemberName,trigger:'blur' }
        ],
        email:[
          { validator: validateEmail,trigger:'blur' }
        ],
        mobile:[
          { validator: validateMobile,trigger:'blur' }
        ]
      },
      systemSmsNumber: 0,
      usableSmsNumber: 0
    }
  },
  computed: {
    tableDataFinalValue() {
      this.tableMidValue.forEach((value1, index1) => {
        value1.group_ids.forEach((groupId, index) => {
          this.groupList.forEach((value2, index2) => {
            if (groupId === value2.id) {
              if (value1.groupLabel === undefined) {
                value1.groupLabel = []
              }
              if (value1.groupLabel.indexOf(value2.name) === -1) {
                value1.groupLabel.push(value2.name)
              }
            }
          })
        })
      })
      return this.tableMidValue
    }
  },
  methods: {
    checkBasePerson(row) {
      if (row.type === '1') {
        return false
      } else {
        return true
      }
    },
    handleCancelAddGroup() {
      this.$refs.addNewGroupDialog.resetFields()
    },
    handleCancelAddPerson() {
      this.$refs.addNewUserDialog.resetFields()
    },
    handleEditBegin(row) {
      this.editingId = row.id
      this.edittingCache = JSON.parse(JSON.stringify(row))
    },
    cancelEdit(row) {
      this.editingId = -1
      this.init()
    },
    handleGroupDel(tag) {
      this.$confirm('确定要删除该分组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.loading = true
          MessageCenterResource.delGroupList({
            group_id: tag.id
          }).then(response => {
            this.$message({
              showClose: false,
              message: '隶属组删除成功',
              type: 'success'
            })
            this.init()
            this.getGroupList()
          })
        }).catch(() => {

        })
    },
    getPersonList() {
      const params = this.pageObj
      MessageCenterResource.getPersonManageList(params).then(response => {
        this.addNewGroup.selectOptions = []
        response.data.data.list.forEach((value, index) => {
          this.addNewGroup.selectOptions.push({
            value:value.id,
            label:value.member_name
          })
        })
      })
    },
    saveEditPerson(row) {
      this.tableData.loading = true
      MessageCenterResource.updatePersonList({
        notice_member_id: row.id,
        member_name: row.member_name,
        email: row.email,
        mobile: row.mobile,
        group_ids: row.group_ids
      }).then(response => {
        this.$message({
          showClose: false,
          message: '修改成功',
          type: 'success'
        })
        this.editingId = -1
        this.init()
      }).catch(response => {
        this.tableData.loading = false
      })
    },
    delPersonList() {
      if (this.selectedItems.length === 0) {
        this.$message({
          showClose: false,
          message: '勾选的联系人不能为空',
          type: 'warning'
        })
        return
      }
      this.tableData.loading = true
      MessageCenterResource.delPersonList({
        notice_member_id: this.selectedItems
      }).then(response => {
        this.$message({
          showClose: false,
          message: '删除成功',
          type: 'success'
        })
        this.init()
        this.getPersonList()
      }).catch(response => {
        this.tableData.loading = false
      })
    },
    getGroupList() {
      MessageCenterResource.getGroupList().then(response => {
        // 接收组列表获得
        this.groupList = []
        this.tableGroupList = []
        response.data.data.list.forEach((value, index) => {
          this.groupList.push({
            name: value.group_name,
            id: value.id,
            type: 'primary'
          })
          this.tableGroupList.push({
            label: value.group_name,
            value: value.id
          })
        })
      }).catch(response => {

      })
    },
    addNewGroupFun() {
      if (this.groupList.length === 5) {
        this.$message({
          showClose: false,
          message: '隶属组数量达到最大值',
          type: 'warning'
        })
        return
      }
      if (this.addNewGroup.groupName === '') {
        this.$message({
          showClose: false,
          message: '隶属组名不能为空',
          type: 'warning'
        })
        return
      }
      // document.querySelector('ul.el-scrollbar__view.el-select-dropdown__list').style.display = 'none'
      // console.log(document.querySelector('ul.el-scrollbar__view.el-select-dropdown__list').style.display)
      this.addNewGroupLoading = true
      const params = {
        group_name: this.addNewGroup.groupName,
        notice_member_id: this.addNewGroup.selectPerson
      }
      MessageCenterResource.addNewGroup(params).then(response => {
        this.$message({
          showClose: false,
          message: '分组添加成功',
          type: 'success'
        })
        this.tableMidValue = []
        this.addNewGroup.groupName = ''
        this.addNewGroup.selectPerson = []
        this.addNewGroupLoading = false
        this.addNewGroupDialogVisible = false
        this.init()
        this.getGroupList()
      }).catch(response => {
        this.addNewGroupLoading = false
      })
    },
    handleSelectChange(selection) {
      this.selectedItems = []
      selection.forEach((value, index) => {
        this.selectedItems.push(Number(value.id))
      })
    },
    handleSizeCurrentChangeFun(current, size) {
      this.pageObj.page = current
      this.pageObj.per_page = size
      this.init()
    },
    // 获取接收人列表数据
    init() {
      this.tableData.loading = true
      const params = this.pageObj
      MessageCenterResource.getPersonManageList(params).then(
        result => {
          result.data.data.list.forEach((value, index) => {
            value.time = 60
            value.time2 = 60
          })
          this.tableMidValue = result.data.data.list
          this.pageObj.totalPage = Number(result.data.data.total)
          this.tableData.titles = ['姓名', '邮箱', '手机', '微信', '隶属组', '操作']
          this.tableData.loading = false
        }
      ).catch(result => {
        this.tableData.loading = false
      })
    },

    //添加接收人
    addNewUserFun() {
      this.addNewUserLoading = true
      MessageCenterResource.addNewUser(this.addNewUser.data).then(
        response => {
          this.$message({
            showClose: false,
            message: '数据添加成功',
            type: 'success'
          })
          this.addNewUser.data.member_name = ''
          this.addNewUser.data.email = ''
          this.addNewUser.data.mobile = ''
          this.addNewUserLoading = false
          this.dialogFormVisible = false
          this.init()
          this.getPersonList()
        }
      ).catch(response => {
        this.addNewUserLoading = false
      })
    },
    buySms() {
      window.location.href = '/payment#/setting-message'
    },
    sendVerification(row) {
      row.time = 59
      row.interval = setInterval(() => {
        this.timer(row)
      }, 1000)
    },
    timer(row) {
      row.time--
      if (row.time === 0) {
        clearInterval(row.interval)
      }
    },
    sendVerification2(row) {
      row.time2 = 59
      row.interval2 = setInterval(() => {
        this.timer2(row)
      }, 1000)
    },
    timer2(row) {
      row.time2--
      if (row.time2 === 0) {
        clearInterval(row.interval2)
      }
    },
    getLastSms() {
      MessageCenterResource.getLastSms().then(response => {
        this.systemSmsNumber = Number(response.data.data.system_presented)
        this.usableSmsNumber = response.data.data.total_usable_sms_number
      })
    },
    sendEmailReg(row) {
      this.tableData.loading = true
      const params = {
        notice_member_id: Number(row.id),
        verify_control: 'email'
      }
      MessageCenterResource.sendEmailSmsReg(params).then(response => {
        if (response.data.status.code === 1) {
          this.sendVerification(row)
          this.tableData.loading = false
        }
      })
    },
    sendMobileReg(row) {
      this.tableData.loading = true
      const params = {
        notice_member_id: Number(row.id),
        verify_control: 'mobile'
      }
      MessageCenterResource.sendEmailSmsReg(params).then(response => {
        if (response.data.status.code === 1) {
          this.sendVerification2(row)
          this.tableData.loading = false
        }
      })
    }
  },
  created() {
    this.getPersonList()
    this.getGroupList()
    this.init()
    this.getLastSms()
  }
}
</script>

<style lang="css" scoped>
.person-manage-table {
  min-height: 120px;
}
.el-icon-verification {
  color:rgb(255,153,52);
  font-size: 18px;
  cursor: pointer;
}
.Tip-simulation {
  border: 1px solid rgb(255,153,52);
  padding:16px;
  margin-bottom: 12px;
}
.buy-sms {
  background-color: rgb(255,153,52);
  padding:6px 8px;
  border-radius: 3px;
  border:1px solid rgb(255,153,52);
  color: #555;
  cursor: pointer;
}
.regBtn {
  margin:0 auto 16px;
}
</style>
