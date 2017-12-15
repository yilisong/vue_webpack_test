<template lang="html">
<div class="">
  <div class="about-container center-position">
    <div class="about-title">
      <h1>法律声明</h1>
      <span>Legal Statement</span>
    </div>
    <div class="about-content">
      <nav class="side-menu">
        <h4>内容</h4>
        <ul class="nav-bar">
          <li v-bind:class="{'nav-active':isService}" @click="isService=true">服务条款</li>
          <li v-bind:class="{'nav-active':!isService}" @click="isService=false">隐私声明</li>
        </ul>
        <i class="split-line"></i>
      </nav>
      <div class="legal-detail">
        <transition name="about-fade">
          <Service v-show="isService" />
        </transition>
        <transition name="about-fade">
          <Privacy v-show="!isService" />
        </transition>
      </div>
    </div>
  </div>
  <YundunBar />
</div>
</template>

<script>
// import 'element-ui/lib/theme-defaut/base.css'
import Service from './components/Service'
import Privacy from './components/Privacy'
import YundunBar from '../../../../components/YundunBar'
export default {
  components: {
    Service,
    Privacy,
    YundunBar
  },
  data() {
    return {
      isService: true,
      privacy: [{
        title: '',
        content: ''
      }]
    }
  },
  mounted() {
    console.log(this.service, '----')
  },
  methods: {
    switchContent(e) {
      console.log(e, '-----000-0')
    }
  }
}
</script>

<style lang="css">
.about-fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.about-fade-enter,
.fade-leave-to
/* .fade-leave-active in below version 2.1.8 */

{
  opacity: 0
}

.center-position {
  width: 1200px;
  margin: 0 auto;
}

.about-container {
  margin-top: 100px;
  h1 {
    font-size: 42px;
    font-weight: 100;
  }
  span {
    font-size: 16px;
    display: block;
    padding: 12px 0;
  }
  .about-title {
    text-align: center;
  }
  /*.about-content{
    position: relative;
  }
  .side-menu{
    position: absolute;
    left: 0;
  }*/
  .side-menu {
    display: inline-block;
    position: relative;
    vertical-align: top;
    font-size: 16px;
    h4 {
      font-weight: 100;
      font-size: 16px;
    }
    h4::before {
      content: "";
      display: inline-block;
      width: 2px;
      height: 17px;
      background: #2d90e6;
      vertical-align: middle;
      margin-right: 6px;
    }
    .split-line {
      display: block;
      width: 1px;
      height: 168px;
      background: #efefef;
      position: absolute;
      right: 0;
      top: -8px;
    }
    .nav-bar {
      margin-top: 16px;
      li {
        width: 200px;
        height: 42px;
        line-height: 42px;
        box-sizing: border-box;
        padding-left: 24px;
        border-bottom: 1px solid #efefef;
        cursor: pointer;
      }
      .nav-active {
        background: #2d90e6;
        color: #fff;
        position: relative;
      }
      .nav-active::after {
        content: '>';
        position: absolute;
        right: 10px;
        color: #fff;
      }
    }
  }
  .legal-detail {
    display: inline-block;
    vertical-align: top;
    width: 80%;
    box-sizing: border-box;
    padding: 30px;
    p {
      line-height: 1.5;
    }
    h3 {
      margin: 32px auto 36px auto;
      font-size: 18px;
    }
  }
}
</style>
