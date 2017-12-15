<template lang="html">
<console-page-layout title="消息通知设置">
  <div class="Tip-simulation">
    本月赠送云端短信条数{{systemSmsNumber}}条，账号剩余短信条数<span>{{usableSmsNumber}}</span>条，为避免短信条数用完后，您无法收到短信提醒，请保证您账号具有充足的短信条数&nbsp;&nbsp;<button size="small" type="info" @click="buySms" class="buy-sms">购买短信条数</button>
  </div>
  <div class="wrap-background">
    <el-table :data="tableData.data" v-loading="tableData.loading" element-loading-text="拼命加载中" class="notice-config-table">
      <el-table-column prop="project_name" label="通知项目" align="left">
      </el-table-column>
      <el-table-column prop="project_des" label="描述" align="left">
      </el-table-column>
      <el-table-column label="通知方式" align="right">
        <template scope="scope">
          <el-checkbox-group v-model="scope.row.noticeConfig" :id="scope.row.id" @change="updateNoticeConfig(scope.row)">
            <el-checkbox label="1" disabled>站内</el-checkbox>
            <el-checkbox label="2">邮件</el-checkbox>
            <el-checkbox label="3">短信</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
  </el-table>
  </div>
  

</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import MessageCenterResource from '../../resource/MessageCenterResource'
export default {
  components: {
    ConsolePageLayout
  },
  methods: {
    init() {
      this.tableData.loading = true
      const params = {
        user_id: 27037
      }
        MessageCenterResource.getNoticeConfigList(params).then(
        result => {
            const noticeList = Object.values(result.data.data.list)
              for (let i = 0;i < noticeList.length;i++) {
                if (noticeList[i].noticeConfig === undefined) {
                  noticeList[i].noticeConfig = []
                }
                  noticeList[i].noticeConfig[0] = noticeList[i].switch_msg === '0' ? '0' : '1'
                  noticeList[i].noticeConfig[1] = noticeList[i].switch_email === '0' ? '0' : '2'
                  noticeList[i].noticeConfig[2] = noticeList[i].switch_sms === '0' ? '0' : '3'
              }
            this.tableData.data = noticeList
            console.log(this.tableData.data)
            this.tableData.loading = false
        }
      )
    },
    updateNoticeConfig(row) {
      this.tableData.loading = true
      const midValueArray = [0, 0, 0]
      row.noticeConfig.forEach((value, index) => {
        if (value === '1') {
          midValueArray[0] = 1
        } else if (value === '2') {
          midValueArray[1] = 1
        } else if (value === '3') {
          midValueArray[2] = 1
        }
      })
      MessageCenterResource.updateNoticeConfig({
     message_setting_id: row.id,
     project_key: row.project_key,
     switch_email: midValueArray[1],
     switch_sms: midValueArray[2],
     switch_msg: midValueArray[0]
    }).then(response => {
      this.$message({
        showClose: false,
        message: '通知方式更改成功',
        type: 'success'
      })
      this.tableData.loading = false
    }).catch(response => {
      this.tableData.loading = false
    })
  },
  buySms() {
    window.location.href = '/payment#/setting-message'
  },
  getLastSms() {
    MessageCenterResource.getLastSms().then(response => {
      this.systemSmsNumber = Number(response.data.data.system_presented)
      this.usableSmsNumber = response.data.data.total_usable_sms_number
    })
  }
  },
  data() {
    return {
      tableData : {
        data: [],
        titles: [],
        loading: false
      },
      buttonType : 0,
      checkArr:{},
      systemSmsNumber: 0,
      usableSmsNumber: 0
    }
  },
  created() {
    this.init()
    this.getLastSms()
  }
}
</script>

<style lang="css" scoped>
.notice-config-table {
  min-height: 120px;
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
</style>
