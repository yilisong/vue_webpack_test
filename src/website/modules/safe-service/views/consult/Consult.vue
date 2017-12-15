<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">等保咨询</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        遵循国家等级保护要求，协助客户进行定级、差距评估、整改方案设计、安全加固、整理测评资料和协助通过测评，最终帮助客户完成信息系统达标建设，通过测评中心的测评。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">咨询概述</li>
        <li @click="goPosition('target')">咨询目标</li>
        <li @click="goPosition('according')">咨询依据</li>
        <li @click="goPosition('system')">咨询体系</li>
        <li @click="goPosition('superiority')">服务优势</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="summarize" :text="summarize" class="distribution"/>
    <Distribution id="target" :text="target" class="distribution"/>
  </div>
  <div id="according">
    <According :text="according" class="according" />
  </div>
  <div class="system" id="system">
    <SafePic :text="system"><img src="./images/system.png" alt=""></SafePic>
  </div>
  <div class="sub-layout" id="superiority">
    <Distribution :text="superiority" class="distribution"/>
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
    title: '等保咨询-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '等保咨询, 等级保, 合规, 定级, 差距评估, 安全服务'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '等保咨询, 等级保护, 合规, 定级, 差距评估, 安全服务'
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
        title: '咨询概述',
        describe: [
          '为了贯彻落实《中华人民共和国网络安全法》、《国家信息化领导小组关于加强信息安全保障工作的意见》、《关于信息安全等级保护工作的实施意见》和《信息安全等级保护管理办法》的精神，上海云盾信息技术有限公司按照国家《信息安全技术信息系统安全等级保护定级指南》、《计算机信息系统安全保护等级划分准则》、《信息系统安全等级保护基本要求》、《信息系统安全等级保护测评准则》的要求，对信息系统进行全面的信息安全检查和评估，有效提升信息系统的安全防护能力，建立常态化的等级保护工作机制，深化信息安全等级保护工作，提高信息系统的安全保障与运维能力。'
        ]
      },
      target: {
        title: '咨询目标',
        describe: [
          '按照国家相关法规、政策和标准，根据使用单位的安全需求，对信息系统进行业务影响分析及安全管理梳理，提高整体安全保障与运维能力，减少信息安全风险，降低信息安全事件发生的概率，构建信息系统的整体安全架构，确保信息系统高效稳定运行。'
        ]
      },
      system: {
        title: '咨询体系',
        describe: [
          '等级保护咨询服务主要有系统定级、系统自查、建设和整改和协助测评等方面的内容。咨询服务体系如下图所示'
        ]
      },
      superiority: {
        title: '服务优势',
        describe: [
          '上海云盾具有专业的安全咨询服务团队，多年的咨询服务经验，深入理解《网络安全法》和等级保护的相关法律法规，从多个维度更好的帮助客户进行等级保护建设和整改项目咨询，为客户顺利通过等级保护测评保驾护航。'
        ]
      },
      according: {
        title: '咨询依据',
        subtitle:
          '信息系统等级保护咨询服务依据《信息系统安全等级保护基本要求》、《信息系统安全等级保护测评要求》，对信息系统提供安全技术和安全管理咨询服务。主要参考标准如下：',
        describe: [
          '《中华人民共和国网络安全法》（2017年6月1日起施行）',
          '《计算机信息系统安全保护等级划分准则》- GB17859-1999',
          '《信息安全技术 信息系统安全等级保护定级指南》（GB/T 22240-2008）',
          '《信息安全技术  信息系统安全等级保护实施指南》（GB/T 25058-2010）',
          '《信息安全技术 信息系统安全等级保护基本要求》（GB/T 22239-2008）',
          '《信息安全技术  信息系统安全等级保护测评要求》（GB/T 28448-2012）',
          '《信息技术安全 信息系统等级保护安全设计技术要求》（GB/T 25070-2010）',
          '《信息安全风险评估规范》（GB/T 20984-2007）',
          '《信息安全技术 信息系统通用安全技术要求》（GB/T20271-2006）',
          '《信息安全技术 网络基础安全技术要求》（GB/T20270-2006）',
          '《信息安全技术 操作系统安全技术要求》（GB/T20272-2006）',
          '《信息安全技术 数据库管理系统安全技术要求》（GB/T20273-2006）',
          '《信息安全技术 服务器技术要求》（GB/T21028-2007）',
          '《信息安全技术 终端计算机系统安全等级技术要求》（GA/T671-2006）'
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
  height: 300px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}
</style>
