<template lang="html">
<website-layout>
  <div class="">
    <div class="about-bg">
      <div class="link-list">
        <ul>
          <router-link :to="item.path"  active-class="about-active" tag="li" v-for="(item,index) in routerInfo" :key="index" :class="item.class">{{item.title}}</router-link>
        </ul>
      </div>
    </div>

  </div>
  <router-view></router-view>
</website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'

export default {
  data() {
    return {
      routerInfo: [{
        path: '/introduce',
        title: '了解我们',
        class: 'default'
      }, {
        path: '/advantage',
        title: '优势',
        class: 'default'
      }, {
        path: '/cooperation',
        title: '合作',
        class: 'default'
      }, {
        path: '/events',
        title: '大事记',
        class: 'default'
      }, /*{
        path: '/mediaReport',
        title: '媒体报道',
        class: 'default'
      },*/ {
        path: '/legalNotice',
        title: '法律声明',
        class: 'default'
      }]
    }
  },
  components: {
    websiteLayout
  }
}
</script>

<style lang="css" scoped>
.about-bg {
  width: 100%;
  height: 659px;
  background: url('../../static/images/about-part/banner.jpg')center center no-repeat;
  background-size: cover;
  position: relative;
}
/*.about-container{
  margin-top: 126px;
}*/
.link-list {
  width: 100%;
  position: absolute;
  bottom: 0;
  ul {
    width: 650px;
    margin: 0 auto;
    li {
      color: #fff;
      display: inline-block;
      font-size: 16px;
      padding: 15px 40px;
      cursor: pointer;
    }
  }
}
.about-active{
  background: #1d90e6;
}
</style>
