<template lang="html">
  <div class="section1">
    <div class="animate-block">
      <p>
        <img class="placate" src="../assets/images/yundun-title.svg" alt="">
        <!-- <span class="yundun">云盾</span>
        <span class="title">“安孵计划”</span> -->
      </p>
      <p class="describe">
        致力于帮助非营利性组织或初创企业构建优质、免费的业务安全保障
      </p>
      <a class="join-btn" @click="moveToEnd">
        立即加入
      </a>
      <a class="participation-btn" @click="moveToEnd">
        共同扶持
      </a>
      <!-- <p class="link">已加入安孵计划？<a href="#" class="go-console">前往管理后台</a></p> -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import GoNextBtn from '../components/GoNextBtn'

export default {
  name: 'section1',
  components: {
    GoNextBtn
  },
  data() {
    return {
      nextName: '安孵计划'
    }
  },
  methods: {
    clickSlideDown() {
      $.fn.fullpage.moveSectionDown()
    },
    moveToEnd() {
      $.fn.fullpage.moveTo(5, 0)
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/main.css";
.section1 {
  padding-top: 30vh;
  position: absolute;
  width: 1200px;
  z-index: 4;
}

.animate-block {
  color: #ffffff;
  text-align: center;
}

.yundun {
  font-size: 46px;
}

.title {
  font-size: 72px;
}

.describe {
  font-size: 20px;
  margin: 22px 0 40px 0;
}

@define-extend btn {
  display: inline-block;
  width: 180px;
  height: 48px;
  font-size: 18px;
  line-height: 48px;
  cursor: pointer;
}

.join-btn {
  margin-right: 18px;
  @extend btn;
  background-color: var(--primary-blue);
}

.participation-btn {
  margin-left: 18px;
  @extend btn;
  border: 1px solid #ffffff;
}

.animate-block {
  animation-name: fadeUp;
  animation: fadeUp 3s alternate;
}

@-webkit-keyframes fadeUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    -ms-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}

.go-console {
  font-size: 18px;
  color: #ffffff;
}

.link {
  margin-top: 22px;
}

.placate {
  width: 440px;
}
</style>
