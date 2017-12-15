<template lang="html">
  <div class="">
    <div id="fullpage">
      <div class="section">
        <div class="layout">
          <section1 />
        </div>
        <GoNextBtn :name="nextName1"/>
      </div>
    	<div class="section">
        <!-- <div class="layout"> -->
          <section2 />
        <!-- </div> -->
        <GoNextBtn :name="nextName2"/>
    	</div>
    	<div class="section">
        <!-- <div class="layout"> -->
          <section3 />
        <!-- </div> -->
        <GoNextBtn :name="nextName3"/>
    	</div>
    	<div class="section">
        <!-- <div class="layout"> -->
          <section4 />
        <!-- </div> -->
        <GoNextBtn :name="nextName4"/>
    	</div>
    	<div class="section">
        <div class="layout">
          <section5 />
        </div>
        <footer class="footer">
          <ul class="">
            <li>
              <a href="/" class="yundun-logo"><img src="../assets/images/yundun.png" alt=""></a>
            </li>
            <li>
              <span>了解<a href="/about#/introduce" class="logo">YUNDUN</a></span>
            </li>
            <li>
              <a href="/about#/advantage">优势</a>
            </li>
            <li>
              <a href="/about#/cooperation">合作</a>
            </li>
            <li>
              <a href="/about#/events">大事记</a>
            </li>
            <!-- <li>
              <a href="#">媒体报道</a>
            </li> -->
            <li>
              <a href="/about#/legalNotice">法律声明</a>
            </li>
            <li>
              <a target="_blank" href="http://v4.yundun.com/informwebsite/index">举报</a>
            </li>
          </ul>
          <p>Copyright YUNDUN, All Rights Reserved. 上海云盾信息技术有限公司版权所有 沪ICP备11032572号 沪备ICP31011202001043号 上海网警网络110 上海工商</p>
        </footer>
    	</div>
    </div>
  </div>
<!--  -->
</template>

<script>
import GoNextBtn from '../components/GoNextBtn'
import 'website/static/css/common.css'
import $ from 'jquery'
import 'fullpage.js/dist/jquery.fullpage'
import section1 from './section1'
import section2 from './section2'
import section3 from './section3'
import section4 from './section4'
import section5 from './section5'

export default {
  metaInfo: {
    title: '上海云盾“安孵计划”-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '"安孵计划"旨在赋能非营利性组织和初创企业,降低非营利性组织和创业企业的IT管理成本和研发成本,提升业务系统安全与稳定。'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '"安孵计划",创业扶持,安全扶持计划'
      }
    ]
  },
  components: {
    section1,
    section2,
    section3,
    section4,
    section5,
    GoNextBtn
  },
  data() {
    return {
      nextName1: '安孵计划',
      nextName2: '计划内容',
      nextName3: '合作伙伴',
      nextName4: '加入方式'
    }
  },
  created() {
    this.$nextTick(() => {
      const $nav = $('#nav-bar')
      const $goNext = $('.go-next')
      const $goNextDot = $('.go-next > i')
      // $nav.css({
      //   background: 'rgba(0, 0, 0, 0.5)'
      // })
      this.tipText = '计划内容'
      $('#fullpage').fullpage({
        onLeave(index, nextIndex, direction) {
          if (Object.is(index, 1) && Object.is(nextIndex, 2)) {
            $nav.css({
              background: 'rgba(0, 0, 0, 1)'
            })
            $goNext.css({
              border: '2px solid black',
              color: 'black'
            })
            $goNextDot.css({
              background: 'black'
            })
          } else if (Object.is(index, 2) && Object.is(nextIndex, 1)) {
            $nav.css({
              background: 'rgba(0, 0, 0, 0.5)'
            })
            $goNext.css({
              border: '2px solid white',
              color: 'white'
            })
            $goNextDot.css({
              background: 'white'
            })
          }
        }
      })
    })
  },
  methods: {}
}
</script>

<style scoped>
.section:nth-child(1) {
  background: url('../assets/images/banner.png') no-repeat left top;
  background-size: cover;
}

.section:nth-child(2) {
  background: url('../assets/images/waveBanner.png') no-repeat left bottom;
  background-size: contain;
}

.footer {
  z-index: 3;
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
  text-align: center;
  .logo {
    color: var(--primary-blue);
  }
  .yundun-logo {
    position: relative;
    top: -5px;
  }
  ul {
    a {
      color: #000000;
    }
    a:hover {
      color: var(--primary-blue);
    }
    display: inline-block;
    li {
      float: left;
      display: inline-block;
      padding: 0 12px;
      border-left: 1px solid #464646;
    }
    li:nth-child(1),
    li:nth-child(2) {
      border-left: 0;
    }
  }
}
</style>
<style>
.nav-bar {
  position: fixed !important;
}
</style>
