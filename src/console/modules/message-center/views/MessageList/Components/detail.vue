<template lang="html">
<console-page-layout :title="title" v-loading="detailLoading">
{{data.msg_title}}<br />
时间：{{data.notice_time}}<br />
通知方式：<span>站内  </span><span v-show="data.switch_email === '1'">邮件  </span><span v-show="data.switch_sms === '1'">短信</span><br />
<div class="single-line"></div>
<div class="message-content">
  <div id="content-div"></div><br />
  <!-- {{data.msg_content}} -->
</div>
<div class="single-line"></div>
<el-button @click="goBack">返回</el-button>
<!-- <el-button @click="getPreviousMessage">上一条</el-button><el-button @click="getNextMessage">下一条</el-button>
<span class="vertical-line"></span> <span v-show="nextMessageId !== undefined">下一封<i v-show="nextFlag === '0'">未读</i><i v-show="nextFlag === '1'">已读</i>：</span><span>{{nextTitle}}</span> -->
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import MessageCenterResource from '../../../resource/MessageCenterResource'
import SourceWebResource from 'src/website/static/js/SourceWebResource'
import { mapActions } from 'vuex'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      messageListIdArray: [],
      detailLoading: false,
      nextMessageId: 0,
      previousMessageId: 0,
      title: '详情',
      data: {},
      messageCenterList: []
    }
  },
  methods: {
    ...mapActions([
      'getUnReadNumber'
    ]),
    init(param) {
      this.detailLoading = true
      let id = this.$route.params.id
      if (param !== undefined) {
        id = param
      }
      // 获取未读消息数
      SourceWebResource.getUnreadMessage().then(response => {
        this.getUnReadNumber(Number(response.data.data.total))
      })

      MessageCenterResource.messageDetail({
        message_id: id
      }).then(response => {
        this.data = response.data.data
        const element = document.getElementById('content-div')
        element.innerHTML = this.data.msg_content
        this.detailLoading = false
      }).catch(response => {
        this.detailLoading = false
      })
      this.messageCenterList = JSON.parse(sessionStorage.getItem('messageCenterList'))
      this.messageCenterList.forEach((value, index) => {
        this.messageListIdArray.push({
          id: value.id,
          flag: value.read_flag,
          title: value.msg_title
        })
      })
      this.messageListIdArray.forEach((value, index) => {
        if (value.id === this.$route.params.id) {
          if (this.messageListIdArray[index + 1] === undefined) {
            this.nextFlag = ''
            this.nextTitle = ''
          } else {
            this.nextFlag = this.messageListIdArray[index + 1].flag
            this.nextTitle = this.messageListIdArray[index + 1].title
          }
        }
      })
    },
    getPreviousMessage() {
      this.messageListIdArray.forEach((value, index) => {
        if (value.id === this.$route.params.id && this.messageListIdArray[index - 1]) {
          this.previousMessageId = this.messageListIdArray[index - 1].id
          return
        } else if (value.id === this.$route.params.id && index === 0) {
          this.previousMessageId = undefined
        }
      })
      if (this.previousMessageId === undefined) {
        this.$message({
          showClose: false,
          message: '没有上一条了',
          type: 'warning'
        })
        return
      }
      this.$router.push(`/messageList/detail/${this.previousMessageId}`)
      this.init(this.previousMessageId)
    },
    getNextMessage() {
      this.messageListIdArray.forEach((value, index) => {
        if (value.id === this.$route.params.id && this.messageListIdArray[index + 1]) {
          this.nextMessageId = this.messageListIdArray[index + 1].id
        } else if (value.id === this.$route.params.id &&
          index === this.messageListIdArray.length - 1) {
          this.nextMessageId = undefined
        }
      })
      if (this.nextMessageId === undefined) {
        this.$message({
          showClose: false,
          message: '没有下一条了',
          type: 'warning'
        })
        return
      }
      this.$router.push(`/MessageList/detail/${this.nextMessageId}`)
      this.init(this.nextMessageId)
    },
    goBack() {
      this.$router.push('/MessageList')
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>
.single-line {
  border-top: 1px solid #ccc;
  margin: 16px 0;
}
.message-content {
  min-height: 160px;
}
.vertical-line {
  display: inline-block;
  height:26px;
  border-left: 1px solid #ccc;
  margin: 0 16px;
  position: relative;
  top:8px;
}
</style>
