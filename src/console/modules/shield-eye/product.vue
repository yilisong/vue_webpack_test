<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn" v-on:click="goToService">咨询商务</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import help from 'common/utils/help'
import 'src/common/components/ConsoleProduct/shield-eye/styles/ShieldEye.css'

export default {
  mixins: [routerSync(require('./constants/AppMenu'))],
  components: {
    ConsoleProduct,
    ConsoleLayout
  },
  data() {
    return {
      content: [
        {
          title: '高准确性',
          description: [
            '采用双引擎扫描机制，支持主动网页爬取或云内日志被动式抓取，基于云内云外安全大数据的漏洞规则库，结合安全专家团队的0Day漏洞挖掘能力，实现了应用系统漏洞发现的高准确性和完整性。'
          ]
        },
        {
          title: '全面实时',
          description: [
            'YUNDUN的监测探针分布在全球各地，通过分布式任务集群进行大数据存储与分析，独家支持对应用系统的实时监测。'
          ]
        },
        {
          title: '可视化呈现',
          description: [
            '直观展示实时、全面的风险观测数据、历史统计分析数据，精准感知系统整体安全态势，为安全事件处置和安全能力优化提供数据决策支撑。'
          ]
        },
        {
          title: '零部署、灵活扩展',
          description: ['SAAS模式，用户无需部署任何软硬件，支持根据用户需求灵活扩展监测规则。']
        },
        {
          title: '篡改联动',
          description: ['可第一时间精准捕获网站异常、智能识别篡改并联动替身镜像迅速恢复。']
        }
      ],
      banner: {
        title: '盾眼 - 风险观测',
        description: [
          '盾眼提供全维度、高效实时的应用安全风险识别服务，利用分布式集群和大数据分析模型，精准洞察应用漏洞、迅速捕获应用异常、高效直观呈现观测数据。'
        ]
      },
      name: 'shieldEye'
    }
  },
  created() {},
  methods: {
    goToService() {
      help.linkService()
    }
  }
}
</script>

<style scoped>
</style>
