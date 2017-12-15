<template lang="html">
<div class="">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="user-parent">
    <el-tab-pane label="个人认证" name="first" value="personal" v-if="tab.personal"></el-tab-pane>
    <el-tab-pane label="企业认证" name="second" value="company" v-if="tab.company"></el-tab-pane>
    <el-tab-pane label="政府或事业单位认证" name="third" value="govern" v-if="tab.govern"></el-tab-pane>
  </el-tabs>
  <hr class="tab">
  <div class="content-box">
    <msgbox></msgbox>
    <Tip :content="content" className="error" ref="tip" v-show="isFailed" />
    <personalbox v-if="show.personal"></personalbox>
    <companybox v-else-if="show.company"></companybox>
    <governBox v-else-if="show.govern"></governBox>
  </div>
</div>
</template>

<script>
import msgBox from '../components/msgBox'
import personalBox from '../components/personalBox'
import companyBox from '../components/companyBox'
import governBox from '../components/governBox'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
export default {
  data() {
    return {
      content: [],
      singleShow: false,
      activeName: 'first',
      tab: {
        personal: true,
        company: true,
        govern: true
      },
      show: {
        personal: true,
        company: false,
        govern: false
      },
      personal: true,
      company: false,
      govern: false,
      personalTabShow: true,
      companyTabShow: true,
      governTabShow: true,
      isFailed: false
    }
  },
  mounted() {
    console.log(this.$store.state.authentiStore.status, '!!!!!!!')
    console.log(this.$store.state.authentiStore.type, '??????')
    if ((this.$store.state.authentiStore.status === 3 &&
        this.$store.state.authentiStore.type === 2) ||
      this.$store.state.authentiStore.status === 5) {
      this.dataShow(this.tab, 'company')
      this.dataShow(this.show, 'company')
      this.activeName = 'second'
      this.$store.state.authentiStore.status === 3 ? this.content = ['企业审核不通过'] :
        this.content = ['个人升级为企业审核不通过']
      this.isFailed = true
    } else if (this.$store.state.authentiStore.status === 3 &&
      this.$store.state.authentiStore.type === 1) {
      this.dataShow(this.tab, 'personal')
      this.dataShow(this.show, 'personal')
      this.activeName = 'first'
      this.content = ['个人审核不通过']
      this.isFailed = true
    } else if (this.$store.state.authentiStore.status === 8 || this.$store.state.authentiStore.status === 3 &&
      this.$store.state.authentiStore.type === 3) {
      this.dataShow(this.tab, 'govern')
      this.dataShow(this.show, 'govern')
      this.$store.state.authentiStore.status === 7 ? this.content = ['政府审核不通过'] :
        this.content = ['个人升级为政府审核不通过']
      this.activeName = 'third'
      this.isFailed = true
    }
    this.content.push(this.$store.state.authentiStore.reason)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.$el.getAttribute('value'))
      const val = tab.$el.getAttribute('value')
      this.dataShow(this.show, val)
    },
    dataShow(data, val) {
      for (const i in data)
        data[i] = i === val
    }
  },
  components: {
    msgbox: msgBox,
    personalbox: personalBox,
    companybox: companyBox,
    Tip,
    governBox
  },
  directives: {
    tip: TipDirective
  }
}
</script>

<style lang="css" scoped>
.user-parent {
  margin-left: 18px;
}

.content-box {
  /*margin-top: 8px;*/
  padding: 7px 20px;
  /*background: #fff;*/
}

.tab {
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #F0F0F0;
  height: 7px;
  box-shadow: 0 0 10px #efefef;
}
</style>
