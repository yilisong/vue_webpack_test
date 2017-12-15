<template lang="html">
  <div class="">
    <div id="fullpage">
      <div class="section">
        <div class="special special1">
        </div>
      </div>
    	<div class="section">
        <div class="special special2" v-bind:class="{ guest1: flag }" @click="change">
        </div>
    	</div>
    	<div class="section">
        <div class="special special3">
        </div>
    	</div>
    	<div class="section">
        <div class="special special4">
        </div>
    	</div>
    	<div class="section">
        <div class="special special5">
        </div>
    	</div>
    </div>
  </div>
<!--  -->
</template>

<script>
import 'website/static/css/common.css'
import $ from 'jquery'
import 'fullpage.js/dist/jquery.fullpage'

export default {
  metaInfo: {
    title: '上海云盾“安孵计划”-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '云盾专题页面'
      }
    ]
  },
  components: {
  },
  data() {
    return {
      flag: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      const $nav = $('#nav-bar')
      this.tipText = '计划内容'
      $('#fullpage').fullpage({
        onLeave(index, nextIndex, direction) {}
      })
    })
  },
  methods: {
    change() {
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>
.section:nth-child(1) {
  background: url('../assets/images/bg1.jpg') no-repeat left top;
  background-size: cover;
}

.section:nth-child(2) {
  background: url('../assets/images/bg234.jpg') no-repeat left top;
  background-size: cover;
}

.section:nth-child(3) {
  background: url('../assets/images/bg234.jpg') no-repeat left top;
  background-size: cover;
}

.section:nth-child(4) {
  background: url('../assets/images/bg234.jpg') no-repeat left top;
  background-size: cover;
}

.section:nth-child(5) {
  background: url('../assets/images/bg5.jpg') no-repeat left top;
  background-size: cover;
}

.special {
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}

.special1 {
  background: url('../assets/images/special1.png') no-repeat;
  background-size: contain;
  background-position-y: 20vh;
}

.special2 {
  background: url('../assets/images/guest1.png') no-repeat;
  position: relative;
  top: 20vh;
  background-size: contain;
  cursor: pointer;
}

.guest1 {
  background: url('../assets/images/guest2.png') no-repeat;
  position: relative;
  top: 20vh;
  background-size: contain;
  cursor: pointer;
}

.special3 {
  background: url('../assets/images/special3.png') no-repeat;
  background-size: contain;
  position: relative;
  top: 20vh;
}

.special4 {
  background: url('../assets/images/special4.png') no-repeat;
  background-size: contain;
  position: relative;
  top: 20vh;
}

.special5 {
  background: url('../assets/images/special5.png') no-repeat;
  background-size: contain;
  position: relative;
  top: 20vh;
}
</style>
<style>
.nav-bar {
  position: fixed !important;
}
</style>
