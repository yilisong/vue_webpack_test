<template lang="html">
  <div class="section4">
    <div class="content">
      <p class="title">合作伙伴</p>
      <section>
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div v-for="(item, index) in 8" class="swiper-slide"></div>
          </div>
          <div class="swiper-button-prev swiper-button-black"></div>
          <div class="swiper-button-next swiper-button-black"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import GoNextBtn from '../components/GoNextBtn'

export default {
  name: 'section4',
  components: {
    GoNextBtn
  },
  data() {
    return {
      nextName: '加入方式'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },
  methods: {
    initSwiper() {
      const mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 30,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'
      })
    }
  }
}
</script>

<style scoped>
.swiper-slide {
  background: url('../assets/images/friendLogo.png') no-repeat;
  text-align: center;
  margin: 0 !important;
  width: 237px !important;
}

.swiper-slide:nth-child(1) {
  background-position-y: 0;
}

.swiper-slide:nth-child(2) {
  background-position-y: -86px;
}

.swiper-slide:nth-child(3) {
  background-position-y: -172px;
}

.swiper-slide:nth-child(4) {
  background-position-y: -258px;
}

.swiper-slide:nth-child(5) {
  background-position-y: -346px;
}

.swiper-slide:nth-child(6) {
  background-position-y: -432px;
}

.swiper-slide:nth-child(7) {
  background-position-y: -518px;
}

.swiper-slide:nth-child(8) {
  background-position-y: -604px;
}

.section4 {
  position: absolute;
  z-index: 3;
  padding-top: 5vh;
  width: 100%;
}

.title {
  margin: 30vh 0 10vh 0;
  font-size: 36px;
}

.content {
  width: 1200px;
  margin: auto;
  text-align: center;
}

.swiper-container {
  width: 1185px;
  height: 86px;
}
</style>
<style>
