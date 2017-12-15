<!-- 套餐设置 -->
<template lang="html">
  <!-- 记录配置 -->
  <el-dialog title="套餐设置" size="small" :visible.sync="comboSetVisible" class="small_el_dialog" :before-close="closeGameComboSetVisible">
    <div v-loading="loading">
      <el-row :gutter="15" class="first_row">
        <el-col :span="6">
          <span>游戏类型</span>
        </el-col>
        <el-col :span="18">
          <template>
            <el-radio-group v-model="packageInfoTypeValue" :data-id="packageInfoType">
              <el-radio :label="1">端游</el-radio>
              <!-- <el-radio :label="2">页游</el-radio> -->
            </el-radio-group>
          </template>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="6">
          <div v-if="packageInfoTypeValue === 1">
            <span :data-val="packageInfoPath">游戏默认安装路径</span>
          </div>
          <div v-else>
            <span>游戏登录首页</span>
          </div>
        </el-col>
        <el-col :span="15">
          <div>
            <el-input v-model="packageInfoPathInput" placeholder="请输入相应信息" :maxlength="200"></el-input>
          </div>
        </el-col>
        <el-row :span="3"></el-row>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="6">
          <span>广告IP白名单</span>
        </el-col>
        <el-col :span="15">
          <el-input v-model="ipInput" placeholder="可输入IP或者IP:端口，如123.123.123.123:80"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" class="addIP" size="small" @click="handleComboSetDialogAdd">增加</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="15" class="test">
        <el-table :data="ipWhiteList" style="width: 100%" class="gameset">
          <el-table-column prop="ip_string" label="IP" ></el-table-column>
          <el-table-column label="操作" width="80%">
           <template scope="scope">
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, ipWhiteList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    
    <div slot="footer">
      <el-button @click="closeGameComboSetVisible" size="small">取 消</el-button>
      <el-button type="primary" @click="handleComboSetDialogSubmit" size="small">确 定</el-button>
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
      ipInput: '',
      portInput: '',
      packageInfoTypeValue: '',
      packageInfoPathInput: '',
      loading: true
    }
  },
  created() {

  },
  computed: {
    comboSetVisible: {
      get() {
        this.loading = true
        return this.$store.state.dialog.gameComboSet.visible
      },
      set: newValue => {}
    },
    comboId() {
      return this.$store.state.id.package.gameComboId
    },
    ipWhiteList() {
      this.loading = false
      return this.$store.state.gameOperation.packageInfo.ipWhiteList
    },
    packageInfoPath() {
      this.loading = false
      const path = this.$store.state.gameOperation.packageInfo.packageInfoList.packageInfoPath
        return this.packageInfoPathInput = path
    },
    packageInfoType() {
      return  this.packageInfoTypeValue =
      this.$store.state.gameOperation.packageInfo.packageInfoList.packageInfoType
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    ...mapActions([
      'triggerGameComboSetVisible',
      'modifyConfigurationInformation',
      'getPackageInfo',
      'addConfig'
    ]),
    handleComboSetDialogSubmit() {
      const ipWhiteListArr = []
      for (let i = 0; i < this.ipWhiteList.length; i++) {
        ipWhiteListArr[i] = this.ipWhiteList[i].ip_string
        ipWhiteListArr[i] = this.ipWhiteList[i].ip_string
      }
      const data = {
        package_id: this.comboId,
        package_game_type: this.packageInfoTypeValue,
        package_game_default_path: this.packageInfoPathInput,
        white_ip_list: ipWhiteListArr
      }
      const pageSize = this.$store.state.gameOperation.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      if (this.packageInfoPathInput === '') {
        console.log('packageInfoPathInput', this.packageInfoPathInput)
        this.showMessageInfo('路径不能为空且最大字符长度为200', 'error')
        return false
      } else {
        this.modifyConfigurationInformation(params)
        setTimeout(() => {
          const statusCode = this.$store.state.gameOperation.statusCode
          if (statusCode === 1) {
            this.triggerGameComboSetVisible(false)
          }
        },1000)
      }
    },
    closeGameComboSetVisible() {
      this.portInput = ''
      this.packageInfoTypeValue = ''
      this.packageInfoPathInput = ''
      this.triggerGameComboSetVisible(false)
    },
    showMessageInfo(correctMessage,typeInfo) {
      this.$message({
        showClose: true,
        message: correctMessage,
        type: typeInfo
      })
    },
    regCheck(ipVal, portVal) {
      const ipReg = Rul.ipReg
      const reg192 = Rul.ipReg192
      const reg10 = Rul.ipReg10
      const reg172 = Rul.ipReg172
      const expPort = Rul.expPort
      let correctMessage
      let typeInfo
       if (ipVal === '') {
        correctMessage = '当前提交的IP不能为空'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      } else if (!ipReg.test(ipVal)) {
        correctMessage = '当前提交的IP格式不正确'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      } else if (reg192.test(ipVal) || reg10.test(ipVal)
        || reg172.test(ipVal)) {
        correctMessage = '当前提交的IP为私有IP'
        typeInfo = 'error'
        this.showMessageInfo(correctMessage,typeInfo)
        return false
      } else {
        if (portVal) {
          if (!expPort.test(portVal)) {
            console.log(portVal)
            correctMessage = '端口格式错误，只能为数字'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          } else if (portVal > 65535 || portVal < 1) {
            correctMessage = '端口范围1~65535'
            typeInfo = 'error'
            this.showMessageInfo(correctMessage,typeInfo)
            return false
          }
          const ipAndPortValue = ipVal + ':' + portVal
          this.addConfig(ipAndPortValue)
        } else {
          this.addConfig(ipVal)
        }
        this.ipInput = ''
      }
    },
    handleComboSetDialogAdd() {
      const ipVal = this.ipInput
      let ipValue = []
      if (ipVal.split(':').length === 2) {
        ipValue = ipVal.split(':')
        this.regCheck(ipValue[0], ipValue[1])
      } else if (ipVal.split(':').length < 2) {
        this.regCheck(ipVal)
      } else {
        this.showMessageInfo('当前提交的白名单格式不正确', 'error')
        return false
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
</style>
<style>
  .test {
    margin-left: 0px!important;
    margin-right: 0px!important;
  }
  .el-button--small {
    padding: 9px 9px!important;
    font-size: 12px;
    border-radius: 4px;
  }
  .gameset .el-button--small{
    margin-left: -9px;
  }
</style>
