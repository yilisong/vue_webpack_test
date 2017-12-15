<template lang="html">
<console-page-layout :title="title">
  <div class="" v-loading="contentLoading" element-loading-text="拼命加载中">
     <div class="left-layout">
       <div class="main-title">
         域名
       </div>
       <div class="main-title">
         套餐版本
       </div>
       <div class="main-title">
         具体配置
       </div>
     </div>
     <div class="right-layout">
       <div class="top-msg">
         {{domain}}
       </div>
       <div class="top-msg">
         免费版
       </div>
       <table class="bugfixed">
         <tr v-for="item in datas.level_setting">
           <td>
             {{item.title}}
           </td>
           <td class="table-msg-layout">
             <i class='el-icon-circle-check' style="color:rgb(132,200,54)" v-if="item.show==='√'"></i>
             <i class='el-icon-circle-close' style="color:#ccc" v-else-if="item.show=='×'"></i>
             <div v-else>{{item.show}}</div>
           </td>
         </tr>
       </table>
     </div>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      title: '套餐详情',
      contentLoading: false,
      datas:{},
      domain:''
    }
  },
  created() {
    this.contentLoading = true

    this.fetchGet('CloudDns.Domain.DnsDomain.PackageInfo', {
      domain_id: this.$route.params.id
    }).then(
      result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data) {
              this.datas = res.data
            }
          })
        }
        this.contentLoading = false
      },
      e => {
        this.contentLoading = false
      })
      this.fetchGet('CloudDns.Domain.DnsDomain.info',{
        domain_id: this.$route.params.id
      }).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                this.domain = res.data.domain
              }
            })
          }
        }
      )
  }
}
</script>

<style scoped>
.main-title{
  width: 120px;
  height: 50px;
  font-size: 20px;
  text-indent: 10px;
  padding-top: 20px;
  font-family: "microsoft-yahei"
}
.right-layout{
  float: left;
}
.left-layout{
  float: left;
}
.top-msg{
  padding-top: 21px;
  padding-left: 70px;
  font-size: 16px;
  height: 50px;
}
.bugfixed{
  margin-left: 60px;
  margin-top: 10px;
  border-spacing: 10px;
  border-collapse: separate;
  font-size: 14px;
}
i{
  font-size: 20px;
}
.table-msg-layout {
  text-align: center;
}
</style>
