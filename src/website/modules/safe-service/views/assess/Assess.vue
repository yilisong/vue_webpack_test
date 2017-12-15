<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">风险评估</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        针对客户关键业务信息系统从管理上和技术上两方面开展全面的评估活动，包括关键资产识别、脆弱性识别与分析、威胁的识别与分析，得到客户目前所面临的主要风险以及不同风险值的大小，并提出相应风险处置建议，为信息安全规划提供参考。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">概念定义</li>
        <li @click="goPosition('target')">评估范围</li>
        <li @click="goPosition('according')">参考依据</li>
        <li @click="goPosition('system')">评估流程</li>
        <li @click="goPosition('superiority')">服务优势</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="summarize" :text="summarize" class="distribution"/>
    <Distribution id="target" :text="target" class="distribution"/>
  </div>
  <According :text="according" id="according" class="according" />
  <div class="system" id="system">
    <SafePic :text="system"><img src="./images/system.png" alt=""></SafePic>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
  </div>
</div>
</template>

<script>
import According from 'website/components/according/According'
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import SafePic from 'website/components/safePic/SafePic'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  metaInfo: {
    title: '风险评估-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '风险识别,资产识别,威胁识别,脆弱性识别'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '风险评估,资产识别,威胁识别,脆弱性识别'
      }
    ]
  },
  components: {
    Distribution,
    According,
    SafePic,
    LinkService
  },
  data() {
    return {
      summarize: {
        title: '概念定义',
        describe:
          ['风险评估是指通过对信息系统进行资产识别、威胁识别与分析以及脆弱性识别与分析，从物理脆弱性、网络脆弱性、管理脆弱性和应用脆弱性（包括服务器、数据库、应用软件和终端）四个方面进行科学赋值，并对信息系统的资产进行风险统计和计算，综合分析存在的风险和已采取的安全措施，给出风险控制建议。']
      },
      target: {
        title: '评估范围',
        describe:
          ['风险评估涉及信息系统的软硬件资源，包括服务器，网络设备，安全设备，业务应用系统，以及安全策略和管理制度等。通过收集、分析使用单位所提交资料进行多次调研、分析使用单位信息系统基础架构和应用，然后对上述过程收集的数据、资料和现场核查分析。']
      },
      superiority: {
        title: '服务优势',
        describe:
          ['上海云盾具有专业的风险评估服务团队，资深的安全服务人员，经验丰富的渗透测试工程师，从系统安全、应用安全和数据安全等多个维度发现信息系统存在安全风险，帮助客户更好的发现和应对风险，及时采取有效措施规避风险，降低客户的经济损失。']
      },
      system: {
        title: '评估流程',
        describe: [
          '风险评估服务流程如下图所示:'
        ]
      },
      according: {
        title: '参考依据',
        subtitle:
          '在整个风险评估分析过程中，遵循和参照以下信息安全标准、规范，作为评估实施的基本原则：',
        describe: [
          'GB/T 20984-2007《信息安全技术 信息安全风险评估规范》',
          'GB18336（ISO15408）：《信息安全技术 信息技术安全评估准则》',
          'ISO27001：信息安全管理体系指南',
          'CVE：通用脆弱性标准',
          'OCTAVE：可操作的关键威胁、资产和脆弱性评价',
          '在风险评估项目中，重点参照GB/T 20984-2007《信息安全技术 信息安全风险评估规范》来开展相应的分析工作'
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      toolJquery.bindScroll('link-list')
    })
  },
  methods: {
    goPosition(pname) {
      toolJquery.position(pname)
    }
  }
}
</script>

<style scoped>
.top-banner {
  width: 100%;
  background: url('./images/banner.png')center center no-repeat;
  background-size: cover;
  position: relative;
  .sub-title {
    margin-top: 20px;
  }
  .title {
    font-size: 36px;
    color: #ffffff;
    margin-right: 20px;
  }
  .sub-title {
    color: #ffffff;
  }
}

p {
  line-height: 1.5;
  font-size: 14px;
}

.according {
  padding-bottom: 50px;
  background: url('./images/ballBg.png')center center no-repeat;
  background-size: cover;
}

.system {
  height: 940px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}
</style>
