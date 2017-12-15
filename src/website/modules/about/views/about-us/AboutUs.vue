<template lang="html">
<div class="about-container">
  <h1 class="introduce-title center-position">YUNDUN</h1>
  <div class="character-box center-position">
    <ul>
      <li>
        <div class="introduce-character">
          <strong class="plus">WAF</strong>
          <p>下一代云WAF</p>
        </div>
        <img src="../../../../static/images/about-part/detection.png" alt="" class="detection">
      </li>
      <li>
        <div class="">
          <strong>DDoS</strong>
          <p>无上限清洗</p>
        </div>
        <img src="../../../../static/images/about-part/protect.png" alt="" class="protect">
      </li>
      <li>
        <div class="">
          <strong>SAAS</strong>
          <p>YUNDUN.COM</p>
        </div>
        <img src="../../../../static/images/about-part/govern.png" alt="" class="govern">
      </li>
      <li>
        <div class="">
          <strong class="plus">私有</strong>
          <p>私有节点/私有云</p>
        </div>
      </li>
    </ul>
  </div>
  <p class="introduce-first center-position">上海云盾信息技术有限公司（YUNDUN）创立于2011年，是新兴的智慧云安全服务商，致力于网络空间安全的<em>观测、</em><em>保护、</em><em>治理。</em>专注于Anti-DDoS、应用安全、大数据安全和智慧城市安全等领域，曾先后为93阅兵、三届世界互联网大会、G20峰会、世界健康大会、金砖五国会议等重大活动提供全方位网络安全保障。</p>
  <p class="introduce-first center-position">上海云盾具备多年一线抗攻击实战经验，以超过8000万的投资自建数个超级抗D数据中心，总体储备带宽达Tb级。以数据智能和网络协同为双引擎的下一代ADS，无损的贴合用户业务，全天候解决任何级别的攻击威胁。</p>
  <p class="introduce-first center-position">旗下基础云、云加速、应用安全、太极抗D产品系列(YUNDUN.COM)，通过在线公共服务的方式为用户提供全生命周期的业务护航。资深的行业专家组成的云盾研究院专注于技术研究，为客户输出专业的安全服务能力，提供全天候管家式服务。</p>
  <div class="emphasis-box center-position">
    <i>以<em>客户的客户</em>满意为服务宗旨&emsp;&emsp;以探索创新为核心竞争力&emsp;&emsp;让智慧安全成为普惠科技&emsp;&emsp;助力网络空间安全治理&emsp;&emsp;践行网络空间守护者使命</i>
  </div>
  <div class="case-box">
    <div class="center-position">
      <h2>安全服务案例</h2>
    </div>
    <ul class="cases center-position">
      <li>2017金砖五国会议保障</li>
      <li>2016年11月全球健康促进大会安保</li>
      <li>2016年11月第三届互联网大会</li>
      <li>2016配合福州网安破获特大DDoS攻击</li>
      <li>2016年9月浙江G20峰会保障</li>
      <li>2016某电商客户大促活动保障</li>
      <li>2016某游戏客户公测活动保障</li>
      <li>2015年12月第二届互联网大会</li>
      <li>2015年93阅兵保障</li>
    </ul>

  </div>
  <div class="center-position">
    <div class="title-part">
      <h2>资质荣誉</h2>
      <p>YUNDUN一路走来，共获取了20多项专项认证，是国内认证最完备的云平台</p>
    </div>
    <div class="honor-box">
      <ul>
        <li @mouseenter="switchCard('isISP')" @mouseleave="judgeAll('isISP')" v-bind:class="{'active-box':!qualification.isISP}">
          <div class="breviary-box" v-show="qualification.isISP">
            <img src="../../../../static/images/about-part/teleservice.png" alt="" class="honor-pic">
            <h4>ISP证</h4>
          </div>
          <div class="detail-box" v-show="!qualification.isISP">
            <h3>ISP证（中华人民共和国增值电信业务经营许可证）</h3>
            <hr>
            <p>上海云盾信息技术有限公司获准经营的业务种类、服务项目和业务覆盖范围： 一． 第一类增值电信业务中的互联网数据中心业务 二． 第一类增值电信业务中的互联网接入服务业务
            </p>
          </div>
        </li>
        <li @mouseenter="switchCard('isSell')" @mouseleave="judgeAll('isSell')" v-bind:class="{'active-box':!qualification.isSell}">
          <div class="breviary-box" v-show="qualification.isSell">
            <img src="../../../../static/images/about-part/buy.jpg" alt="" class="honor-pic">
            <h4>销售许可证</h4>
          </div>
          <div class="detail-box" v-show="!qualification.isSell">
            <h3>销售许可证</h3>
            <hr>
            <p>上海云盾产品红网卫士和YUNDUN-云防护平台分别通过了《信息安全技术 Web应用防火墙安全技术》和《信息安全技术 网站云安全防御产品安全检测条件 JCTJ 002-2016》检验。是国内首家拥有公安部颁发的云安全防御销售许可证的安全厂商。
            </p>
          </div>
        </li>
        <li @mouseenter="switchCard('isCAS')" @mouseleave="judgeAll('isCAS')" v-bind:class="{'active-box':!qualification.isCAS}">
          <div class="breviary-box" v-show="qualification.isCAS">
            <img src="../../../../static/images/about-part/management.png" alt="" class="honor-pic">
            <h4>CAS认证</h4>
          </div>
          <div class="detail-box" v-show="!qualification.isCAS">
            <h3>CAS认证（管理体系认证）</h3>
            <hr>
            <p>经现场评审上海云盾满足：GB/T19001-2008/ISO9001:2008 质量管理体系要求。认证范围：计算机网络信息技术（网站安全加速服务）软件开发（除资质许可证）。
            </p>
          </div>
        </li>
        <li @mouseenter="switchCard('isSupport')" @mouseleave="judgeAll('isSupport')" v-bind:class="{'active-box':!qualification.isSupport}">
          <div class="breviary-box" v-show="qualification.isSupport">
            <img src="../../../../static/images/about-part/honor.jpg" alt="" class="honor-pic">
            <h4>多省市网络与信息通报中心支持单位</h4>
          </div>
          <div class="detail-box" v-show="!qualification.isSupport">
            <h3>多省市网络与信息通报中心支持单位</h3>
            <hr>
            <p>上海云盾先后成为了福建省、上海市、重庆市、金华市、丽水市、萧山区等多省市网络安全技术支持单位和网络与信息安全信息通报中心支撑单位。
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="research-box">
    <div class="center-position title-box">
      <div class="main-title">
        <h2>云盾研究院</h2>
        <p><em>YunDun </em> Institute of network security</p>
        <img class="main-icon" src="../../../../static/images/about-part/shape.png" alt="">
      </div>
      <ul>
        <li>课题和安全技术研究</li>
        <li>威胁情报分析</li>
        <li>威胁攻击溯源</li>
        <li>攻防实战培训</li>
      </ul>
    </div>
  </div>
  <div class="center-position contact-container">
    <div class="contact-normal">
      <div class="contact-box">
        <h2>联系我们</h2>
        <ul>
          <li><span>公司地址</span>上海市闵行区中春路7001号（明谷科技园）F栋705</li>
          <li><span>全国服务热线</span><em>400-999-7070</em> (7x24小时)</li>
          <li><span>传真</span>021-60310100</li>
        </ul>
      </div>
      <div class="contact-box">
        <h2>技术支持</h2>
        <ul>
          <li>有关售后技术问题、帮助处理故障，提交BUG等，请致电: <em>(86)021-60310101-116</em></li>
          <li><span>邮箱</span>support@yundun.com</li>
          <li><span>企业QQ</span>800090007</li>
        </ul>
      </div>
    </div>
    <div class="contact-normal">
      <img src="../../../../static/images/about-part/dz.png" alt="">
    </div>
  </div>
  <YundunBar />
</div>
</template>

<script>
import YundunBar from '../../../../components/YundunBar'
export default {
  data() {
    return {
      qualification: {
        isISP: false,
        isSell: true,
        isCAS: true,
        isSupport: true
      }
    }
  },
  components: {
    YundunBar
  },
  methods: {
    switchCard(type) {
      for (const i in this.qualification) {
        this.qualification[i] = !(i === type)
      }
    },
    judgeAll(type) {
      let isAll = false
      for (const i in this.qualification) {
        if (i !== type)
          isAll = this.qualification[i]
      }
      this.qualification[type] = !isAll
    }
  }
}
</script>

<style lang="css" scoped>
p {
  line-height: 1.5;
  font-size: 14px;
}

.center-position {
  width: 1200px;
  margin: 0 auto;
}

.about-container {
  margin-top: 100px;
}

.introduce-title {
  text-align: center;
  font-size: 42px;
  font-weight: 100;
}

em {
  font-size: 18px;
  font-weight: bold;
}


/*.introduce-first {
  margin: 30px 0;
}*/

.introduce-first+.introduce-first {
  margin-top: 30px;
}

.introduce-character {
  div {
    display: inline-block;
  }
  .first-part {
    width: 60%;
  }
  .second-part {
    width: 30%;
  }
}

.character-box {
  width: 1200px;
  margin: 90px auto 70px auto;
  ul {
    li {
      display: inline-block;
      width: 24%;
      position: relative;
      box-sizing: border-box;
      div {
        text-align: center;
      }
      strong {
        font-size: 50px;
        color: #2d90e6;
        position: relative;
      }
      p {
        font-size: 15px;
      }
    }
  }
}

.detection {
  position: absolute;
  right: -87px;
  top: -44px;
}

.protect {
  position: absolute;
  right: -35px;
  top: -33px;
}

.govern {
  position: absolute;
  right: -58px;
  top: -33px;
}


/*.plus::after {
  content: "+";
  font-weight: 100;
  font-size: 35px;
  position: absolute;
  top: -3px;
  right: -16px;
  color: #acacac;
}*/

.emphasis-box {
  margin: 60px auto 120px auto;
  i {
    display: block;
    padding: 25px 50px;
    font-size: 17px;
    background: url('../../../../static/images/about-part/RectangleBg.png')center center no-repeat;
    background-size: cover;
    color: #fff;
  }
}

.case-box {
  height: 460px;
  background: url('../../../../static/images/about-part/ballBg.png')center center no-repeat;
  background-size: cover;
  div {
    h2 {
      padding: 65px 0 40px 0;
      font-weight: 100;
    }
  }
  .cases {
    li {
      padding-left: 35px;
      padding-top: 13px;
      border-left: 1px dashed #1d8fe6;
      position: relative;
      font-size: 15px;
    }
    li::before {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #1d8fe6;
      position: absolute;
      left: -4px;
      top: 18px;
    }
  }
}

.title-part {
  margin: 60px auto 30px auto;
  h2 {
    font-weight: 100;
    font-size: 22px;
  }
}

.active-box {
  width: 320px;
  height: 350px;
  margin-top: -16px;
  box-sizing: border-box;
}

.honor-box {
  ul {
    font-size: 0;
    height: 360px;
    li {
      display: inline-block;
      vertical-align: top;
      transition: all .3s cubic-bezier(.4, 0, .2, 1), z-index 0s .12s;
      .breviary-box {
        width: 280px;
        height: 318px;
        box-sizing: border-box;
        padding: 50px 0;
        text-align: center;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        border-left: 1px solid #efefef;
        h4 {
          font-size: 16px;
          padding-top: 12px;
          font-weight: 100;
        }
      }
      .honor-pic {
        width: 124px;
        margin-top: 49px;
        display: block;
        margin: 0 auto;
      }
      .detail-box {
        /*width: 320px;
        height: 350px;
        margin-top: -16px;
        box-sizing: border-box;*/
        height: 100%;
        background: #2d90e6;
        color: #fff;
        h3 {
          font-size: 16px;
          font-weight: 100;
          padding: 45px 45px 25px 45px;
        }
        hr {
          width: 90%;
          height: 1px;
          background: rgba(255, 255, 255, .5);
        }
        p {
          padding: 35px;
          line-height: 1.5;
        }
      }
    }
  }
}

.research-box {
  height: 761px;
  position: relative;
  margin-top: -135px;
  background: url('../../../../static/images/about-part/zs.png')center center no-repeat;
  background-size: cover;
  .title-box {
    height: 54px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    div,
    ul,
    ul li {
      display: inline-block;
    }
    ul {
      vertical-align: top;
      margin-top: 10px;
      li {
        font-size: 17px;
        padding-left: 100px;
      }
    }
    .main-title {
      position: relative;
      .main-icon {
        position: absolute;
        top: -6px;
        right: 106%;
      }
      p {
        line-height: 1.8;
        em {
          font-size: 16px;
        }
      }
    }
  }
}

.contact-container {
  margin-top: -100px;
}

.contact-normal {
  width: 49.5%;
  display: inline-block;
  vertical-align: middle;
}

.contact-box {
  h2 {
    font-size: 20px;
    padding-bottom: 35px;
  }
  ul {
    li+li {
      margin-top: 15px;
    }
    li {
      span {
        display: inline-block;
        width: 120px;
      }
      em {
        font-size: 19px;
        color: #2d90e6;
      }
    }
  }
}

.contact-box+.contact-box {
  margin-top: 64px;
}
</style>
