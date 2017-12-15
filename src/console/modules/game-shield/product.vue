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
import 'src/common/components/ConsoleProduct/game-shield/styles/GameShield.css'

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
          title: '分布式抗D节点，防护效果出众',
          description: [
            '全国多所自建超大防护抗D数据中心;拥有海量清洗资源，数千台LVS集群服务器;全网储备带宽3TB，黑洞牵引能力10TB'
          ]
        },
        {
          title: '智能防CC',
          description: ['太极抗D App版包含防御CC服务集群;通过自研智能通信驱动;支持客户端应用行业特有的CC攻击防护']
        },
        {
          title: '多种接入方式，适应不同场景',
          description: ['针对不同客户需求;提供API,SDK和客户端三种接入模式供用户灵活选择']
        }
      ],
      banner: {
        title: '太极抗D - APP版',
        description: [
          '太极抗D APP版主要是针对游戏行业的一站式安全解决方案，同时也为常规PC应用和移动端应用提供抗D保护。针对客户端应用的复杂场景下DDoS攻击、CC攻击等问题，太极抗D APP版针对客户端应用的特点，制定完美的安全解决方案。'
        ]
      },
      name: 'gameShield'
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

<style scope>
</style>
