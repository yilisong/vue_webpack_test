<template lang="html">
<div class="about-container">
  <div class="about-title">
    <h1>云盾机房分布图</h1>
    <!-- <span>Legal Statement</span> -->
    <ul class="switch-menu">
      <li@click="isChina=true" v-bind:class="{'active':isChina}">中国</li>
        <li @click="isChina=false" v-bind:class="{'active':!isChina}">全球</li>
    </ul>
    <p v-show="isChina">主要为湖州、杭州、嘉兴、金华、福州、台州</p>
    <p v-show="!isChina">主要为韩国、美国、加拿大、巴西、澳大利亚、爱尔兰.....</p>
  </div>
  <div class="advantage-box china clearfix" v-show="isChina">
    <img src="../../../../static/images/about-part/mapChina.png" class="map map-china" alt="">
    <div class="host-box">
      <div class="host-show">
        <h3>浙江省抗D数据中心</h3>
        <ul>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/huz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              湖州
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/jx.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              嘉兴
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/hz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              杭州
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/jh.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fourStar.png" alt="">
            </div>
            <div class="content-box">
              金华
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/tz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              台州
            </div>
          </li>
        </ul>
      </div>
      <div class="host-show host-fj">
        <h3>福建省抗D数据中心</h3>
        <ul>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/fz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              福州
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/qz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              泉州
            </div>
          </li>
          <li>
            <div class="image-box">
              <img src="../../../../static/images/about-part/qz.png" alt="">
              <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
            </div>
            <div class="content-box">
              厦门
            </div>
          </li>
        </ul>
        <div class="host-show position-js">
          <h3>江苏省抗D数据中心</h3>
          <ul>
            <li>
              <div class="image-box">
                <img src="../../../../static/images/about-part/cz.png" alt="">
                <img class="star-mark" src="../../../../static/images/about-part/fiveStar.png" alt="">
              </div>
              <div class="content-box">
                常州
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <p class="mark-state"><i class="blue">抗D数据中心</i><i class="gray">加速节点</i></p>
  </div>
  <div class="advantage-box world" v-show="!isChina">
    <img src="../../../../static/images/about-part/map.png" class="map-world" alt="">
    <div class="host-world-Korea host-box">
      <h3>韩国抗D数据中心</h3>
      <ul>
        <li>
          <img src="../../../../static/images/about-part/fiveStar.png" alt="">
          <div class="national-box">
            首尔
          </div>
        </li>
        <li>
          <img src="../../../../static/images/about-part/fiveStar.png" alt="">
          <div class="national-box">
            仁川
          </div>
        </li>
      </ul>
    </div>
    <div class="host-world-America host-box">
      <h3>美国抗D数据中心</h3>
      <ul>
        <li>
          <img class="" src="../../../../static/images/about-part/fiveStar.png" alt="">
          <div class="national-box">
            洛杉矶
          </div>
        </li>
        <li>
          <img class="" src="../../../../static/images/about-part/fiveStar.png" alt="">
          <div class="national-box">
            亚特兰大
          </div>
        </li>
      </ul>
    </div>
    <p class="mark-state"><i class="blue">抗D数据中心</i><i class="gray">加速节点</i></p>
  </div>
  <div class="four-advantage">
    <h1>4大优势，让客户用得放心</h1>
    <ul>
      <li><strong>DDoS</strong> 多年抗DDoS经验
      </li>
      <li><strong>WAF</strong>感知、防御、追溯、推演</li>
      <li><strong>7X24</strong>7x24小时管家式服务</li>
      <li><strong>Young</strong>年轻化团队</li>
    </ul>
    <p>提供全业务的整体抗D解决方案我们从事网络安全研究和DDoS防护工作多年，我们有信心保护您的业务免受任何攻击威胁。</p>
  </div>
  <div class="system">
    <h1>稳定高效的安全产品体系</h1>
    <img src="../../../../static/images/about-part/tu.png" alt="">
  </div>
  <YundunBar />
</div>
</template>

<script>
import YundunBar from '../../../../components/YundunBar'
export default {
  components: {
    YundunBar
  },
  data() {
    return {
      isChina: true
    }
  }
}
</script>
<style lang="css" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}

.clearfix:after {
  clear: both;
}

.about-container {
  margin-top: 100px;
  .about-title {
    position: relative;
    z-index: 9999;
    p {
      position: absolute;
      left: 44.5%;
      top: 77px;
      font-size: 16px;
    }
  }
  h1 {
    font-size: 42px;
    font-weight: 100;
    text-align: center;
  }
  span {
    font-size: 16px;
    display: block;
    padding: 12px 0;
  }
}

.switch-menu {
  position: absolute;
  top: 65px;
  left: 33%;
  z-index: 9999;
  li {
    padding: 10px 35px;
    display: inline-block;
    border: 1px solid #ACACAC;
    background: #fff;
    cursor: pointer;
  }
  li+li {
    margin-left: -5px;
  }
  .active {
    background: #2d90e6;
    color: #fff;
    border-color: #2d90e6;
  }
}

.advantage-box {
  padding-bottom: 120px;
  .map,
  .host-box,
  .host-show {
    display: inline-block;
    vertical-align: top;
  }
  .map {
    width: 52.5%;
    float: left;
  }
  .host-box {
    li+li {
      margin-top: 15px;
    }
    .image-box,
    .content-box {
      display: inline-block;
      vertical-align: top;
    }
    .image-box {
      position: relative;
      padding-right: 35px;
      .star-mark {
        position: absolute;
        top: 18px;
        left: 29px;
      }
    }
    .content-box {
      margin-top: 25px;
    }
    h3 {
      font-size: 16px;
      font-weight: 100;
      position: relative;
      margin-bottom: 30px;
    }
    h3::before {
      content: '';
      display: block;
      width: 3px;
      height: 20px;
      background: #2d90e6;
      position: absolute;
      left: -10px;
      top: -1px;
    }
  }
}

.mark-state {
  position: absolute;
  bottom: 4%;
  width: 100%;
  text-align: center;
  i {
    font-style: normal;
  }
  i+i {
    margin-left: 10px;
  }
  .blue::before,
  .gray::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
  .blue::before {
    background-color: #2d90e6;
  }
  .gray::before {
    background-color: #B2B2B2;
    margin-top: -3px;
  }
}

.china {
  position: relative;
  .host-box {
    width: 35%;
    position: absolute;
    right: 10.5%;
    top: 145px;
  }
}

.world {
  position: relative;
  .map-world {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .host-world-Korea {
    position: absolute;
    left: 41.3%;
    top: 40%;
  }
  .host-world-America {
    position: absolute;
    right: 19%;
    top: 37%;
  }
  .national-box {
    display: inline-block;
    margin-left: 5px;
    vertical-align: top;
    display: inline-block;
    margin-top: 7px;
  }
}

.four-advantage {
  padding-top: 100px;
  padding-bottom: 120px;
  background: #F7F7F7;
  text-align: center;
  ul {
    width: 1200px;
    margin: 50px auto 65px;
    li+li {
      border-left: 1px solid rgba(172, 172, 172, .5);
    }
    li {
      display: inline-block;
      width: 24%;
      height: 157px;
      font-size: 20px;
      strong {
        display: block;
        font-size: 35px;
        padding: 26px 0;
        position: relative;
      }
      strong::after {
        content: "";
        display: none;
        width: 55px;
        height: 3px;
        background: #2d90e6;
        margin: 0 auto;
        margin-top: 23px;
        transition: all .5s;
        position: absolute;
        top: 120%;
        left: 0;
        right: 0;
      }
    }
  }
}

.four-advantage ul {
  li:hover strong {
    background-image: linear-gradient(to right, #2139b7 0%, #00c6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all .5s;
  }
  li:hover strong::after {
    display: block;
  }
}

.system {
  margin-bottom: 130px;
  h1 {
    margin: 100px auto 40px;
  }
  img {
    width: 75%;
    margin: 0 auto;
    display: block;
  }
}

@media screen and (min-width: 1199px) and (max-width: 1600px) {
  .china .host-box {
    position: absolute;
    right: 0;
    top: 80px;
  }
  .about-container .about-title p {
    position: absolute;
    left: 50.5%;
    top: 77px;
    font-size: 16px;
  }
  .advantage-box .map {
    width: 49%;
  }
}

.host-fj {
  margin-left: 20%;
}

.position-js {
  margin-top: 25px;
}
</style>
