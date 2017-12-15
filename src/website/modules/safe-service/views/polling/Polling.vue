<template lang="html">
<div class="">
  <div class="top-banner">
    <div class="sub-layout banner-text">
      <p>
        <span class="title">安全巡检</span>
        <!-- <img src="./images/title-icon.png" alt=""> -->
      </p>
      <p class="sub-title">
        通过对信息资产（网络，服务器、数据库、WEB等）进行定期的本地安全审查，包括漏洞、配置、日志、行为等进行审计和分析，提炼并分析出可能的安全隐患，并对安全隐患按照防护要求进行本地安全加固，保障信息资产的整体安全。
      </p>
      <LinkService />
    </div>
    <div class="link-list" id="link-list">
      <ul>
        <li @click="goPosition('summarize')">服务概述</li>
        <li @click="goPosition('system')">服务框架</li>
        <li @click="goPosition('superiority')">服务优势</li>
      </ul>
    </div>
  </div>
  <div class="sub-layout">
    <Distribution id="summarize" :text="summarize" class="distribution"/>
  </div>
  <div class="system" id="system">
    <SafePic :text="system"><img src="./images/system.png" alt=""></SafePic>
  </div>
  <div class="sub-layout">
    <Distribution id="superiority" :text="superiority" class="distribution"/>
  </div>
</div>
</template>

<script>
import Distribution from 'website/components/distribution/Distribution'
import toolJquery from 'common/utils/helpWithJquery'
import SafePic from 'website/components/safePic/SafePic'
import LinkService from 'website/components/LinkService'
import 'website/static/css/link.css'

export default {
  metaInfo: {
    title: '安全审查-上海云盾（YUNDUN）',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '安全审查,安全加固,漏洞扫描,安全审计,配置核查,安全服务'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: '安全审查,安全加固,漏洞扫描,安全审计,配置核查,安全服务'
      }
    ]
  },
  components: {
    Distribution,
    SafePic,
    LinkService
  },
  data() {
    return {
      summarize: {
        title: '服务概述',
        describe:
          ['为有效检测评估现有主机系统、网络、应用和数据库的安全现状，充分发现其中潜在的风险和漏洞，进一步提高主机系统（含虚拟机）、网络、应用、数据库的安全性和抗攻击能力，全面检查和审计主机系统、网络、应用和数据库的安全配置和访问记录，从而对操作系统、数据库进行安全加固。']
      },
      superiority: {
        title: '服务优势',
        describe:
          ['上海云盾有专业的安全服务团队，团队成员在漏洞扫描、配置检查、风险评估、安全加固、渗透测试和安全审计等方面，均有丰富的工作经验，所有问题的解决方案均由团队成员根据多年经验总结而来，帮助用户解决安全问题。']
      },
      system: {
        title: '服务框架',
        describe: [
          '上海云盾提供安全巡检服务，包括漏洞扫描、配置核查、安全审计以及安全加固。漏洞扫描是利用专业工具对信息系统进行漏洞检查和评估，配置核查是通过人工方式进行主机、网络、应用和数据库的配置检查和测试，安全审计是对操作系统、网络访问行为以及应用系统进行总体的审计分析，安全加固是对检测存在的漏洞和风险进行加固和规避:'
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
  height: 490px;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
}
</style>
