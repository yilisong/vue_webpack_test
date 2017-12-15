<!-- 套餐设置 -->
<template lang="html">
  <!-- 记录配置 -->
  <el-dialog title="源IP" size="small" :visible.sync="editPortVisible" class="small_el_dialog" :before-close="closeEditPortDialog">
    <el-row :gutter="12" class="first_row">
     <el-col :span="6">
        <span>源IP<!--/源端口--></span>
      </el-col>
      <el-col :span="14">
        <el-input v-model="inputIPVal" placeholder="请输入IP"></el-input>
      </el-col>
      <!-- <el-col :span="4">
        <el-input v-model="inputPortVal" placeholder="请输入端口"></el-input>
      </el-col> -->
      <el-col :span="4" class="addPortBtn">
        <el-button type="primary" size="small" @click="addIPAndPort">添 加</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="test">
      <el-table :data="getTotalIPAndPort" style="width: 100%" class="ipPortTable" v-loading="loading">
        <el-table-column prop="" label="源IP" align="left">
          <template scope="scope">
            <el-input type="text" :value="scope.row.source_ip" :disabled="true"></el-input>
          </template>
        </el-table-column>
       <!--  <el-table-column prop="port" label="源端口" align="left">
          <template scope="scope">
            <el-input type="text" :value="scope.row.source_port" :disabled="true"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="left" width="200">
          <template scope="scope">
            <el-button type="text" class="editIPAndPort" size="small" @click="editIPAndPort($event, scope.$index)">编辑</el-button> |
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, getTotalIPAndPort)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div slot="footer">
      <el-button @click="closeEditPortDialog" size="small">取 消</el-button>
      <el-button type="primary" @click="handleEditPortDialogSubmit" size="small" :data-comboid="comboId" :data-getserverid="getServerId" :data-getport="getTotalIPAndPort" :data-get="editPortVisible">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Rul from 'common/utils/verify'

export default {
  components: {
    Rul
  },
  data() {
    return {
      inputPortVal: '',
      inputIPVal: '',
      ipAndPortStatus:[],
      loading: true
    }
  },
  computed: {
    editPortVisible: {
      get() {
        this.loading = true
        return this.$store.state.dialog.editPort.visible
      },
      set: newValue => {}
    },
    comboId() {
      return this.$store.state.id.package.gameComboId
    },
    getTotalIPAndPort() {
      this.loading = false
      for (let i = 0; i < this.$store.state.gameOperation.sourceList.length; i++) {
        this.ipAndPortStatus[i] = 'b'
      }
      return this.$store.state.gameOperation.sourceList
    },
    getServerId() {
      return this.$store.state.gameOperation.serverId
    }
  },
  created() {

  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    ...mapActions([
      'triggerEditPortVisible',
      'saveSourceIPAndPort',
      'getGameByPage',
      'addPort'
    ]),
    getGameOperationList(current, size) {
      this.getGameByPage({
        page: current,
        per_page: size
      })
    },
    closeEditPortDialog() {
      this.triggerEditPortVisible(false)
    },
    handleEditPortDialogSubmit() {
      const sourceIp = []
      const sourcePort = []
      for (let i = 0; i < this.getTotalIPAndPort.length; i++) {
        if (this.ipAndPortStatus[i] === 'a') {
          this.showMessageInfo('请确认保存当前所有信息后再提交','error')
          return false
        }
        sourceIp[i] = this.getTotalIPAndPort[i].source_ip
        sourcePort[i] = this.getTotalIPAndPort[i].source_port
      }
      const data = {
        package_id: this.comboId,
        server_id: this.getServerId,
        source_ip: sourceIp,
        source_port: sourcePort
      }
      const pageSize = this.$store.state.gameOperation.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      this.saveSourceIPAndPort(params)
      setTimeout(() => {
        const statusCode = this.$store.state.gameOperation.statusCode
        if (statusCode === 1) {
          this.triggerEditPortVisible(false)
        }
      },1000)
    },
    showMessageInfo(correctMessage,typeInfo) {
      this.$message({
        showClose: true,
        message: correctMessage,
        type: typeInfo
      })
    },
    addIPAndPort() {
      const ipReg = Rul.ipReg
      const reg192 = Rul.ipReg192
      const reg10 = Rul.ipReg10
      const reg172 = Rul.ipReg172
      const expPort = Rul.expPort
      let correctMessage
      let typeInfo
      if (this.inputIPVal === '') { /* || this.inputPortVal === ''*/
        correctMessage = '当前提交的IP不能为空'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      } else if (!ipReg.test(this.inputIPVal)) {
        correctMessage = '当前提交的IP格式不正确'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      } else if (reg192.test(this.inputIPVal) || reg10.test(this.inputIPVal)
        || reg172.test(this.inputIPVal)) {
        correctMessage = '当前提交的IP为私有IP'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      // } else if (!expPort.test(this.inputPortVal) || this.inputPortVal < 0
      //   || this.inputPortVal > 65535) {
      //   correctMessage = '当前提交的端口格式不正确'
      //   typeInfo = 'error'
      //   this.showMessageInfo(correctMessage,typeInfo)
      } else {
        this.addPort({
          ip: this.inputIPVal
          // port: this.inputPortVal
        })
        this.inputIPVal = ''
        // this.inputPortVal = ''
      }
    },
    editIPAndPort(e, index) {
      const current = e.target || e.srcElement
      const parent = current.parentNode.parentNode
      const parentTrNode = parent.parentNode.parentNode
      if (!current.firstElementChild) {
        if (current.childNodes[0].nodeValue === '编辑') {
          this.ipAndPortStatus[index] = 'a'
          parentTrNode.getElementsByTagName('input')[0].disabled = false
          // parentTrNode.getElementsByTagName('input')[1].disabled = false
          parentTrNode.getElementsByTagName('input')[0].style.border = '1px solid #ccc'
          // parentTrNode.getElementsByTagName('input')[1].style.border = '1px solid #ccc'
          current.childNodes[0].nodeValue = '保存'
        } else if (current.childNodes[0].nodeValue === '保存') {
          const inputIPVal = parentTrNode.getElementsByTagName('input')[0].value
          const ipReg = Rul.ipReg
          const reg192 = Rul.ipReg192
          const reg10 = Rul.ipReg10
          const reg172 = Rul.ipReg172
          const expPort = Rul.expPort
          let correctMessage
          let typeInfo
          if (inputIPVal === '') { /* || this.inputPortVal === ''*/
            correctMessage = '当前提交的IP不能为空'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else if (!ipReg.test(inputIPVal)) {
            correctMessage = '当前提交的IP格式不正确'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else if (reg192.test(inputIPVal) || reg10.test(inputIPVal)
            || reg172.test(inputIPVal)) {
            correctMessage = '当前提交的IP为私有IP'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else {
            this.ipAndPortStatus[index] = 'b'
            parentTrNode.getElementsByTagName('input')[0].disabled = true
            // parentTrNode.getElementsByTagName('input')[1].disabled = true
            parentTrNode.getElementsByTagName('input')[0].style.border = 'none'
            // parentTrNode.getElementsByTagName('input')[1].style.border = 'none'
            current.childNodes[0].nodeValue = '编辑'
            this.getTotalIPAndPort[index].source_ip = parentTrNode.getElementsByTagName('input')[0].value
            // this.getTotalIPAndPort[index].source_port = 
            //parentTrNode.getElementsByTagName('input')[1].value
          }
        }
      } else {
        if (current.childNodes[2].innerText === '编辑') {
          this.ipAndPortStatus[index] = 'a'
          parent.parentNode.getElementsByTagName('input')[0].disabled = false
          // parent.parentNode.getElementsByTagName('input')[1].disabled = false
          parent.parentNode.getElementsByTagName('input')[0].style.border = '1px solid #ccc'
          // parent.parentNode.getElementsByTagName('input')[1].style.border = '1px solid #ccc'
          current.childNodes[2].innerText = '保存'
        } else if (current.childNodes[2].innerText === '保存') {
          const inputIPVal = parent.parentNode.getElementsByTagName('input')[0].value
          const ipReg = Rul.ipReg
          const reg192 = Rul.ipReg192
          const reg10 = Rul.ipReg10
          const reg172 = Rul.ipReg172
          const expPort = Rul.expPort
          let correctMessage
          let typeInfo
          if (inputIPVal === '') { /* || this.inputPortVal === ''*/
            correctMessage = '当前提交的IP不能为空'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else if (!ipReg.test(inputIPVal)) {
            correctMessage = '当前提交的IP格式不正确'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else if (reg192.test(inputIPVal) || reg10.test(inputIPVal)
            || reg172.test(inputIPVal)) {
            correctMessage = '当前提交的IP为私有IP'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else {
            this.ipAndPortStatus[index] = 'b'
            parent.parentNode.getElementsByTagName('input')[0].disabled = true
            // parent.parentNode.getElementsByTagName('input')[1].disabled = true
            parent.parentNode.getElementsByTagName('input')[0].style.border = 'none'
            // parent.parentNode.getElementsByTagName('input')[1].style.border = 'none'
            current.childNodes[2].innerText = '编辑'
            this.getTotalIPAndPort[index].source_ip =  parent.parentNode.getElementsByTagName('input')[0].value
            // this.getTotalIPAndPort[index].source_port = 
            // parent.parentNode.getElementsByTagName('input')[1].value
          }
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.el-row {
  margin-top: 20px;
  line-height: 30px;
}
.first_row {
  margin-top: 0px;
}
.addIP{
  float: right;
}
.el-row .el-button+.el-button{
  margin-left: -5px;
}
.ipPortTable .el-button--small {
     padding: 9px 0px!important; 
    font-size: 12px;
    border-radius: 4px;
}
</style>
<style>
.el-input .el-input__inner:disabled {
  border-color: #d1dbe5!important;
  color: #333!important;
  cursor: not-allowed!important;
}
.ipPortTable input{
  border: none;
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff!important;
  border-color: #d1dbe5!important;
  color: #333!important;
  cursor: pointer!important;
}
.test {
  margin-left: 0px!important;
  margin-right: 0px!important;
}
.addPortBtn {
  float: right!important;
  width: auto!important;
}
</style>
