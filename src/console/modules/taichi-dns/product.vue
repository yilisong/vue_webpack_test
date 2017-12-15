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
import 'src/common/components/ConsoleProduct/taichi-dns/styles/TaichiDns.css'

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
          title: '抗攻击效果出众',
          description: [
            '太极抗D DNS版可抵御超大流量的DDoS攻击和高密度的DNS查询攻击，最大防御能力可达亿级QPS，完美保障网站解析业务正常运行。'
          ]
        },
        {
          title: '智能解析',
          description: [
            '支持多线路智能解析，覆盖全国各省市和海外32个国家和地区，根据用户解析所在地区智能判断提供最佳的访问解析地址，使访问用户获得最快捷、最流畅的体验。'
          ]
        },
        {
          title: '多种接入模式',
          description: ['支持域名解析托管，可定制私有NS名称及服务器集群，针对自建DNS客户使用高防IP云备灾方案（参见云解析']
        }
      ],
      banner: {
        title: '太极抗D - DNS版',
        description: [
          '对于突发大量随机HOST A记录查询攻击、递归DNS穿透攻击、DNS流量攻击等多种针对域名解析的攻击提供高效的防护服务。'
        ]
      },
      name: 'taichiDns'
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
