<template lang="html">
<console-page-layout title="消息列表">
  <div class="Tip-simulation">
    本月赠送云端短信条数{{systemSmsNumber}}条，账号剩余短信条数<span>{{usableSmsNumber}}</span>条，为避免短信条数用完后，您无法收到短信提醒，请保证您账号具有充足的短信条数&nbsp;&nbsp;<button size="small" type="info" @click="buySms" class="buy-sms">购买短信条数</button>
  </div>
  <Tip :content="tipContent" mode="dynamic" className="warn" ref="tip"/>
  <div class="tableHeader">
      <span class="type-change-btn" :class="{typeBtnActive:(noticeType === '')}" @click="MessageTypeChangeFun(0)">
        <i class="yun-icon yun-msg-center-all" v-if="noticeType === ''"></i>
        <i class="yun-icon yun-msg-center-all-c" v-else></i>
        全部消息({{this.unread_list.total}})
      </span>
      <span class="type-change-btn" :class="{typeBtnActive:(noticeType === 2)}" @click="MessageTypeChangeFun(1)">
        <i class="yun-icon yun-msg-center-safe" v-if="noticeType === 2"></i>
        <i class="yun-icon yun-msg-center-safe-c" v-else></i>
        安全消息({{this.unread_list.security_notice}})
      </span>
      <span class="type-change-btn" :class="{typeBtnActive:(noticeType === 3)}" @click="MessageTypeChangeFun(2)">
        <i class="yun-icon yun-msg-center-wrong" v-if="noticeType === 3"></i>
        <i class="yun-icon yun-msg-center-wrong-c" v-else></i>
        故障消息({{this.unread_list.fault_notice}})
      </span>
      <span class="type-change-btn" :class="{typeBtnActive:(noticeType === 4)}" @click="MessageTypeChangeFun(3)">
        <i class="yun-icon yun-msg-center-act" v-if="noticeType === 4"></i>
        <i class="yun-icon yun-msg-center-act-c" v-else></i>
        活动消息({{this.unread_list.event_notice}})
      </span>
      <span class="type-change-btn" :class="{typeBtnActive:(noticeType === 1)}" @click="MessageTypeChangeFun(4)">
        <i class="yun-icon yun-msg-center-ser" v-if="noticeType === 1"></i>
        <i class="yun-icon yun-msg-center-ser-c" v-else></i>
        服务消息({{this.unread_list.service_notice}})
      </span>
    </div>
  <div class="wrap-background">
    <div style="margin-bottom:12px;">
      <el-button @click="deleteFun">删除</el-button>
      <el-button @click="updateMseeageType">标记为已读</el-button>
    </div>
    <ComboTable :total="tableParams.total" :page-size="tableParams.pageSize" :page-sizes="tableParams.pageSizes" @on-size-change="getTableData" @on-current-change="getTableData">
      <div slot="body">
        <el-table :data="tableData" @selection-change="handleSelectChange" header-align="center" v-loading="tableLoading" current-row-key="sss" element-loading-text="拼命加载中" class="message-list-table">
          <el-table-column type="selection" align="center" width="26">
          </el-table-column>
          <el-table-column prop="msg_title" label="标题" align="left">
            <template scope="scope">
              <span type="text" class="message-title" :class="{ hasRead: scope.row.read_flag === '1' }" @click="messageDetail(scope.row)">{{ scope.row.msg_title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="notice_type" label="消息类型" align="center">
            <template scope="scope">
              <span>{{scope.row.notice_type}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="通知方式" align="center">
            <template scope="scope">
              <i title="站内消息通知" class="iconfont el-icon-notice iconfont-active"></i>
              <i title="邮件通知" class="iconfont el-icon-email" :class="{ 'iconfont-active': scope.row.switch_email === '1' }"></i>
              <i title="短信通知" class="iconfont el-icon-message" :class="{ 'iconfont-active': scope.row.switch_sms === '1' }"></i>
            </template>
          </el-table-column>
          <el-table-column prop="notice_time" label="时间" align="right" min-width="165">
            <template scope="scope">
              <span>{{scope.row.notice_time}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import MessageCenterResource from '../../resource/MessageCenterResource'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import ComboTable from 'common/components/ComboTable/ComboTable'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    Tip,
    ComboTable
  },
  directives: {
    tip: TipDirective
  },
  created() {
    this.init()
    this.getLastSms()
  },
  data() {
    return {
      noticeType : '',
      selectedItems: [],
      unread_list: {},
      tableParams: {
        type: 0,
        total:0,
        page:1,
        pageSize: 5,
        pageSizes: [5,10,20]
      },
      tableStatusParams: {
        user_id: 27037,
        web_message_id: [],
        status: 1
      },
      tableDeleteParams: {
        user_id: 27037,
        web_message_id: []
      },
      messageListSelectedArr: [],
      tableData: [],
      tableLoading: false,
      tableReadedNum: 0,
      tablenotReadNum: 0,
      value: '',
      timeSelect: '',
      value7: '',
      fuzzyQuery: '',
      tipContent: [],
      systemSmsNumber: 0,
      usableSmsNumber: 0
    }
  },
  methods: {
    ...mapActions([
      'getUnReadNumber'
    ]),
    getTableData(current, size) {
      this.tableParams.page = current
      this.tableParams.pageSize = size
      this.init()
    },
    updateMseeageType() {
      if (this.selectedItems.length === 0) {
        this.$message({
          showClose: false,
          message: '勾选消息不能为空',
          type: 'warning'
        })
        return
      }
      this.tableLoading = true
      MessageCenterResource.updateMseeageType({
        message_id: this.selectedItems,
        read_flag: 1
      }).then(response => {
        this.$message({
          showClose: false,
          message: '消息状态更改成功',
          type: 'success'
        })
        this.init()
      }).catch(response => {
        this.tableLoading = false
      })
    },
    deleteFun() {
      if (this.selectedItems.length === 0) {
        this.$message({
          showClose: false,
          message: '勾选消息不能为空',
          type: 'warning'
        })
        return
      }
      this.tableLoading = true
      MessageCenterResource.delMessageList({
        message_id: this.selectedItems
      }).then(response => {
        this.$message({
          showClose: false,
          message: '删除成功',
          type: 'success'
        })
        this.selectedItems = []
        this.init()
      }).catch(response => {
        this.tableLoading = false
      })
    },
    onSubmit() {},
    messageDetail(row) {
      this.$router.push(`/messageList/detail/${row.id}`)
    },
    handleSelectChange(selection) {
      this.selectedItems = []
      selection.forEach((value, index) => {
        this.selectedItems.push(Number(value.id))
      })
    },
    MessageTypeChangeFun(param) {
      this.noticeType = param
      switch (param) {
        case 0:
          this.noticeType = ''
          this.init()
          break
        case 1:
          this.noticeType = 2
          this.init()
          break
        case 2:
          this.noticeType = 3
          this.init()
          break
        case 3:
          this.noticeType = 4
          this.init()
          break
        default:
          this.noticeType = 1
          this.init()
      }
    },
    init() {
      this.tableLoading = true
      MessageCenterResource.getWebsiteList({
        notice_type: this.noticeType,
        page: this.tableParams.page,
        per_page: this.tableParams.pageSize
      }).then(
        result => {
          const { event_notice, fault_notice, security_notice, service_notice,
          total } = result.data.data.unread_list
          this.unread_list.event_notice = event_notice
          this.unread_list.fault_notice = fault_notice
          this.unread_list.security_notice = security_notice
          this.unread_list.service_notice = service_notice
          this.unread_list.total = total
          this.getUnReadNumber(this.unread_list.total)
          this.tableData = result.data.data.list
          this.tableParams.total = Number(result.data.data.total)
          this.tableLoading = false
        }
      )
      MessageCenterResource.getWebsiteList({
        notice_type: this.noticeType
      }).then(result => {
        sessionStorage.setItem('messageCenterList', JSON.stringify(result.data.data.list))
      })
    },
    messageTypeChange() {
      this.tableLoading = true
      this.messageTypeSelectData = []
      if (this.noticeType === '全部通知') {
        this.messageTypeSelectData = this.tableData
      } else {
        this.tableData.forEach((value, index) => {
          if (value.notice_type === this.noticeType) {
            this.messageTypeSelectData.push(value)
          }
        })
      }
      this.tableLoading = false
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
  }
}
</script>
<style lang="css" scoped>
.formCtrl {
  width: 500px;
}

.timeSelect {
  float: right;
  margin-right: 30px;
}

i {
  font-size: 18px;
  color: #aaa;
}

div.el-select {
  margin-left: 30px;
}

div.el-input-group__append {
  background-color: #2d90e6;
  cursor: pointer;
}

div.fuzzyQuery {
  float: right;
  width: 260px;
  margin-right: 58px;
}

.tableHeader {
  margin-bottom: 12px;
}

.readNum {
  color: #2d90e6;
}
.type-change-btn {
  display: inline-block;
  width: 140px;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
  box-sizing: border-box;
  cursor: pointer;
}
.type-change-btn i {
  margin-right: 4px;
  margin-left: 10px;
}
.typeBtnActive {
  background-color: #2d90e6;
  color: #fff;
}
.typeBtnActive i {
  color:#fff;
}
.message-operate-icon {
  color: #2d90e6;
  margin-right: 12px;
  cursor: pointer;
}
.message-title {
  cursor: pointer;
  font-weight: 900;
}
.message-title.hasRead {
  font-weight: 300;
}

.iconfont {
  font-size: 20px;
  margin-right: 6px;
}
.iconfont-active {
  color: #2d90e6;
}
.message-list-table {
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
.yun-icon {
  width: 22px;
  height: 22px;
}
</style>
