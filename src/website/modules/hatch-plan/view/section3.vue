<template lang="html">
  <div class="section3">
    <div class="content">
      <div class="layout">
        <div class="title">
          <p class="title-main">“安孵计划”内容</p>
          <p class="title-sub">上海云盾“安孵计划”为非营利组织和初创企业提供以下产品和服务</p>
        </div>
        <section class="modules">
          <ul class="modules-block">
            <li v-for="(item, index) in contentArray"  @click="showModal(index, $event)">
              <div class="item-bg"></div>
              <p>
                {{ item }}
              </p>
            </li>
          </ul>
          <div v-show="modal" class="modal" id="modal">
            <p class="modal-title">
              <div class="modal-icon" id="modal-icon">
              </div>
              <span class="modal-describe">
                {{ describe.title }}
              </span>
            </p>
            <p class="describe">{{ describe.detail }}<span class="back" @click="modal = false">返回</span></p>
          </div>
        </section>
      </div>
    </div>
    <SphereBackground class="sphere"/>
  </div>
</template>

<script>
import $ from 'jquery'
import GoNextBtn from '../components/GoNextBtn'
import SphereBackground from '../components/SphereBackground'

export default {
  name: 'section3',
  components: {
    GoNextBtn,
    SphereBackground
  },
  data() {
    return {
      nextName: '合作伙伴',
      modal: false,
      contentArray: [
        '免费安全DNS解析服务',
        '限时免费CDN加速服务',
        '免费可用性监控服务',
        '免费SSL证书服务',
        '免费抗DDoS应急响应',
        '免费漏洞扫描服务',
        '免费培训服务',
        '免费服务器防护',
        '更多……',
        '更多……'
      ],
      describe: {
        title: '',
        detail: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    showModal(index, event) {
      this.modal = true
      switch (index) {
        case 0:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon1')
          this.describe = {
            title: '免费安全DNS解析服务',
            detail:
              'DNS作为互联网的基础服务非常容易遭受攻击。上海云盾“安孵计划”为非营利性组织和初创企业业务系统域名免费提供基于超强性能服务器、全球领先的分布式集群技术和全球智能解析线路组成的权威DNS解析服务，并在此基础上额外提供解析线路定制、独家A-P和CNAME-P负载均衡轮询解析协议、免费的10G抗DDoS及10万QPS的流量攻击和查询攻击防护，保障业务系统解析的安全、稳定和智能。'
          }
          break
        case 1:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon2')
          this.describe = {
            title: '限时免费CDN加速服务',
            detail:
              'WEB性能和可用率是应用系统重要指标，访问速度慢、页面打不开将直接影响非营利性组织和初创企业业务系统访问体验及用户的留存。上海云盾“安孵计划”为非营利性组织和初创企业限时免费提供专业的WEB和移动端CDN加速服务，可全面提升业务系统访问速度。除此之外我们还限时免费提供精细化的业务数据报表和安全服务，助力非营利性组织和创业者业务腾飞。'
          }
          break
        case 2:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon3')
          this.describe = {
            title: '免费可用性监控服务',
            detail:
              '业务系统需要进行实时、高效的监控，防止业务系统宕机后无法快速获知并且恢复，从而导致用户流失。上海云盾“安孵计划”通过遍布全球的探针节点为非营利性组织和初创企业业务系统提供7ⅹ24全天候持续智能监控服务，可及时发现业务系统故障、秒级告警，快速定位并解决问题。同时配合安全DNS解析服务可做到宕机智能切换至备用服务器，保障业务系统服务持续运行，让运维效率提高10倍。'
          }
          break
        case 3:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon4')
          this.describe = {
            title: '免费SSL证书服务',
            detail:
              '数据在网络传输过程中很容易遭受黑客监听，从而导致信息泄漏。上海云盾“安孵计划”与亚洲诚信达成战略合作，为非营利性组织和初创企业业务系统提供免费SSL证书服务，零成本启用全站HTTPS。同时支持以更优惠的价格购买付费版证书，提供更强的加密防御能力，保证数据在网络传输过程的完整性和保密性。'
          }
          break
        case 4:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon5')
          this.describe = {
            title: '免费抗DDoS应急响应',
            detail:
              'DDoS攻击大致分为两种，一是通过大流量攻击压垮网络带宽，二是刻意制造大量无法完成的请求快速耗尽服务资源，最终导致业务系统无法对外提供服务，严重威胁非营利性组织和初创企业业务系统安全和稳定。上海云盾为非营利性组织和初创企业定制了免费的抗D应急响应服务，可在受到攻击时免费进行应急防御。'
          }
          break
        case 5:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon6')
          this.describe = {
            title: '免费漏洞扫描服务',
            detail:
              '业务系统因研发周期、技术选型、研发经验以及0day的曝光可能会存在各种安全漏洞。而漏洞将导致系统入侵、篡改、数据泄漏等安全问题。上海云盾“安孵计划”为非营利性组织和初创企业每个应用系统免费提供两次漏洞扫描服务。首次扫描后提供详细的漏洞报告和详细的漏洞修复方案，修复后再免费提供一次安全复测，检测漏洞是否被修复，保证非营利性组织和初创企业业务系统安全且健壮的运行。'
          }
          break
        case 6:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon7')
          this.describe = {
            title: '免费培训服务',
            detail:
              '非营利性组织和初创企业因安全人才储备和安全资金投入不足，无法快速构建自身安全体系。上海云盾“安孵计划”通过和      等知名安全平台合作，为非营利性组织和初创企业提供免费融合了技术和管理的要素的安全培训服务。借助各项培训课程，我们的专业培训人员将向客户传授阶梯式的、全方位的安全知识与技能培训，包括一般性的安全意识、具体的安全攻防操作、高级的信息安全管理等内容，从而提升非营利性组织和初创企业在信息安全实践中“人”这个决定因素的关键作用，有效提升非营利性组织和初创企业信息安全水平。'
          }
          break
        case 7:
          $('#modal-icon').removeClass().addClass('modal-icon').addClass('icon8')
          this.describe = {
            title: '免费服务器防护',
            detail:
              '近年来针对服务器端的黑客攻击、网络病毒等屡见不鲜，严重影响非营利性组织和初创企业服务器安全。上海云盾“安孵计划”通过和    等国内一流服务器安全防护厂商合作，为非营利性组织和初创企业服务器提供一站式安全解决方案，保障服务器安全，防止病毒入侵、文件篡改、暴力破解等安全问题。'
          }
          break
        case 8:
          $('#modal-icon').removeClass()
          this.describe = {
            title: '敬请期待',
            detail: ''
          }
          break
        case 9:
          $('#modal-icon').removeClass()
          this.describe = {
            title: '敬请期待',
            detail: ''
          }
          break
        default:
      }
    }
  }
}
</script>

<style scoped>
.section3 {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.sphere {
  position: absolute;
  z-index: 1;
}

.content {
  width: 100%;
  text-align: center;
  z-index: 3;
  padding-top: 12vh;
  position: absolute;
}

.title {
  margin-top: 2%;
}

.title-main {
  margin-top: 2%;
  font-size: 36px;
  color: var(--primary-blue);
}

.title-sub {
  margin-top: 1%;
  margin-bottom: 3%;
  font-size: 14px;
  color: #333333;
}

.modules {
  position: relative;
  padding-top: 5vh;
  .modal {
    position: absolute;
    width: 1200px;
    height: 342px;
    background-color: rgba(255, 255, 255, 0.8);
    /*display: none;*/
  }
}

.modules-block {
  text-align: center;
  li {
    cursor: pointer;
    display: inline-block;
    float: left;
    width: 235px;
    height: 171px;
    border-right: 1px solid #cdcdcd;
  }
  li:hover {
    background: url('../assets/images/hoverBg.png') no-repeat center;
    background-size: cover;
    .item-bg:nth-child(1) {
      background-position-y: -41px;
    }
  }
  li:nth-child(5),
  li:nth-child(10) {
    border-right: none;
  }
  li:nth-child(1),
  li:nth-child(2),
  li:nth-child(3),
  li:nth-child(4),
  li:nth-child(5) {
    border-bottom: 1px solid #cdcdcd;
  }
}

.modal-title {
  font-size: 22px;
  line-height: 41px;
  margin-top: 35px;
}

.modal-describe {
  position: relative;
  line-height: 41px;
  top: -14px;
  font-size: 16px;
}

.modal-icon {
  display: inline-block;
  width: 48px;
  height: 41px;
  margin-right: 10px;
}

.back {
  color: var(--primary-blue);
  margin-left: 5px;
  cursor: pointer;
}

.describe {
  text-align: left;
  line-height: 25px;
}

.item-bg {
  margin: 25px 0;
  display: inline-block;
  width: 48px;
  height: 41px;
}

li:nth-child(1) {
  .item-bg {
    background: url('../assets/images/item1.png') no-repeat;
  }
}

li:nth-child(2) {
  .item-bg {
    background: url('../assets/images/item2.png') no-repeat;
  }
}

li:nth-child(3) {
  .item-bg {
    background: url('../assets/images/item3.png') no-repeat;
  }
}

li:nth-child(4) {
  .item-bg {
    background: url('../assets/images/item4.png') no-repeat;
  }
}

li:nth-child(5) {
  .item-bg {
    background: url('../assets/images/item5.png') no-repeat;
  }
}

li:nth-child(6) {
  .item-bg {
    background: url('../assets/images/item6.png') no-repeat;
  }
}

li:nth-child(7) {
  .item-bg {
    background: url('../assets/images/item7.png') no-repeat;
  }
}

li:nth-child(8) {
  .item-bg {
    background: url('../assets/images/item8.png') no-repeat;
  }
}

.icon1 {
  background: url('../assets/images/item1.png') no-repeat left bottom;
}

.icon2 {
  background: url('../assets/images/item2.png') no-repeat left bottom;
}

.icon3 {
  background: url('../assets/images/item3.png') no-repeat left bottom;
}

.icon4 {
  background: url('../assets/images/item4.png') no-repeat left bottom;
}

.icon5 {
  background: url('../assets/images/item5.png') no-repeat left bottom;
}

.icon6 {
  background: url('../assets/images/item6.png') no-repeat left bottom;
}

.icon7 {
  background: url('../assets/images/item7.png') no-repeat left bottom;
}

.icon8 {
  background: url('../assets/images/item8.png') no-repeat left bottom;
}
</style>
