<template lang="html">
<website-layout>
  <div class="">
    <div class="activity-tfc-bg">
      <div class="activity-tfc-box">
        <div class="activity-left">
          <ul class="activity-left-content">
            <li class="game-title">本活动只针对游戏行业</li>
            <li v-for="content in des">{{content}}</li>
          </ul>
        </div>

        <div class="activity-right">
          <a href="/taichiddosApp" class="tjkd-btn">
            <img src="./images/tjkd.png" alt="">
          </a>
          <a href="#" class="contact-btn" @click="findHelp">
            <img src="./images/btn.png" alt="">
          </a>
          <div class="content-box">
            <ul>
              <li class="block">
                <div class="content-left">
                  <i class="iconst"></i><span class="first">100%防CC</span><img src="./images/1.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.first">{{item}}</li>
                </ul>
              </li>
              <li class="block">
                <div class="content-left">
                  <i class="iconnd"></i><span class="second">共同成长抗D</span><img src="./images/2.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.second">{{item}}</li>
                </ul>
              </li>
              <li class="block">
                <div class="content-left">
                  <i class="iconrd"></i><span class="third">无计量抗D</span><img src="./images/3.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.third">{{item}}</li>
                </ul>
              </li>
              <li class="block">
                <div class="content-left">
                  <i class="icon4th"></i><span class="forth">融合抗D节点</span><img src="./images/4.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.forth">{{item}}</li>
                </ul>
              </li>
              <li class="block">
                <div class="content-left">
                  <i class="icon5th"></i><span>多种接入方式</span><img src="./images/5.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.fifth">{{item}}</li>
                </ul>
              </li>
              <!-- <li class="block">
                <div class="content-left">
                  <i class="icon6th"></i><span>无宽带费用</span><img src="./images/6.png" alt="">
                </div>
                <ul class="content-right">
                  <li v-for="item in description.sixth">{{item}}</li>
                </ul>
              </li> -->
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import 'common/assets/styles/style-reset.css'
import help from 'common/utils/help'
export default {
  components: {
    websiteLayout
  },
  methods: {
    findHelp() {
      help.linkService()
    }
  },
  data() {
    return {
      des: [
        '本活动针对的产品为太极抗D  APP版',
        '活动体验有效期从2017年10月16日到2017年11月15日',
        '参加体验的用户，在活动体验结束后1月内购买产品服务，将享受1次性的5折价格购买优惠',
        '体验结束后1月内未购买产品服务的用户，将不再享受购买时折扣优惠',
        '未参加体验的用户不享受购买时折扣优惠',
        '以前已经付费的用户在2017年12月15日前可享受1次性的5折价格续费优惠'
      ],
      description: {
        first: [
          '游戏空链接、慢链接',
          '游戏报文黑名单',
          '权威僵尸网络库',
          'YUNDUN研究院攻击溯源',
          '踢人外挂，针对游戏网关和游戏战斗服务器的攻击'
        ],
        second: [
          '根据玩家数量阶梯式计费',
          '抗D高性价比',
          '与客户一起成长的专属方案'
        ],
        third: [
          '拒绝按XXGbps/月防御带宽计费',
          '提供数十个节点的无限防御'
        ],
        forth: [
          '自有超大抗D数据中心',
          '第三方清洗资源',
          '拥有Tbj级单节点清洗能力'
        ],
        fifth: ['支持API、SDK、客户端等方式接入'],
        sixth: ['每月最低赠送200G流量，无需再支付宽带费用']
      }
    }
  }
}
</script>

<style lang="css" scoped>
.activity-left,
.activity-right {
  display: inline-block;
  vertical-align: top;
  width: 49.8%;
  background-size: cover;
  height: 100%;
  position: relative;
}

.activity-left-content {
  position: absolute;
  bottom: 20px;
  right: 25px;
  text-align: right;
  color:#444;
  font-size: 12px;
}

.activity-left-content li {
  line-height: 24px;
}

.activity-right {}

.activity-tfc-bg {
  width: 100%;
  height: 1191px;
  background: url('./images/bg.jpg')center center no-repeat;
  background-size: cover;
}

.activity-tfc-box {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.game-title {
  font-style: italic;
  color: #0080ab;
  line-height: 24px;
}

.tjkd-btn {
  display: block;
  position: absolute;
  top: 280px;
  left: 28px;
}

.contact-btn {
  display: block;
  position: absolute;
  top: 420px;
  left: 20px;
}

.content-box {
  position: absolute;
  bottom: 20px;
  left: 28px;
  color: #fff;
  .block {
    margin-top: 25px;
  }
}

.content-left,
.content-right {
  display: inline-block;
  vertical-align: top;
}

.content-left {
  i {
    display: inline-block;
    vertical-align: top;
    width: 74px;
    height: 80px;
    background-image: url('./images/icon.png');
  }
  img {
    display: inline-block;
    margin-top: 10px;
    vertical-align: top;
  }
  span {
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
    font-size: 18px;
    font-style: italic;
  }
  .first {
    margin-top: 49px;
  }
  .second {
    margin-top: 25px;
  }
  .third {
    margin-top: 15px;
  }
  .forth {
    margin-top: 26px;
  }
}

.content-right {
  line-height: 24px;
}

.iconst {
  margin-top: 16px;
}

.iconnd {
  background-position: 0 400px;
  margin-top: -7px;
}

.iconrd {
  background-position: 0 -160px;
  margin-top: -17px;
}

.icon4th {
  background-position: 0 240px;
  margin-top: -8px;
}

.icon5th {
  background-position: 0 -320px;
  margin-top: -29px;
}

.icon6th {
  background-position: 0 80px;
  margin-top: -35px;
}

</style><style media="screen">.nav-bar {
  position: absolute!important;
  background: rgba(0, 0, 0, .6)!important;
}
.nav-bar:hover {
  background: rgba(0, 0, 0, .9)!important;
  transition: all .5s!important;
}
</style>
