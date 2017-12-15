<template lang="html">
<div class="authentication-box">
  <!-- <div class="bg"> -->
  <div class="title-box">
    <h4 class="user-title">用户认证</h4>
  </div>
  <unauthorized v-if="this.$store.state.authentiStore.status === 0||this.$store.state.authentiStore.status === 3||this.$store.state.authentiStore.status === 5||this.$store.state.authentiStore.status === 8"> </unauthorized>
  <inreview v-else-if="this.$store.state.authentiStore.status === 2||this.$store.state.authentiStore.status === 4||this.$store.state.authentiStore.status === 7"></inreview>
  <audited v-else-if="this.$store.state.authentiStore.status === 1||this.$store.state.authentiStore.status === 6"></audited>
</div>
</template>
<script>
import Unauthorized from './modules/unauthorized'
import inReview from './modules/inReview'
import Audited from './modules/audited'
export default {
  data() {
    return {
      status: '',
      type: ''
    }
  },
  mounted() {
    this.$store.dispatch('getBasicinfo')
  },
  methods: {
    handleClick(tab, event) {
      const val = tab.$el.getAttribute('value')
      val === 'personal' ? this.personal = true : this.personal = false
    }
  },
  components: {
    unauthorized: Unauthorized,
    inreview: inReview,
    audited: Audited
  }
}
</script>

<style lang="css" scoped>
h4 {
  font-weight: normal;
  margin: 0;
}

.authentication-box {
  margin: 15px;
  background: #fff;
  /*padding: 10px;*/
}

.title-box {
  padding: 20px;
  border-bottom: 1px solid #efefef;
}

.user-title::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 20px;
  background: #2EA1E9;
  vertical-align: text-bottom;
  margin-right: 10px;
}

.bg {
  background: #fff;
  box-shadow: 1px 1px 10px #ccc;
}

</style><style media="screen">.page-area {
  overflow: auto;
}

.user-parent div {
  border-bottom: none;
}
</style>
