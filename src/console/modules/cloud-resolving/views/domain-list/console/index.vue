<template>
  <console-page-layout :title="title">
    <div slot="tab">
      <el-tabs v-model="tabActiveName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'

export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      domain: '',
      taocan: '',
      tabActiveName: this.$route.fullPath.split('/')[4],
      tabOptions: [{
          label: '记录管理',
          name: 'record'
        }
        // 配置和操作日志两个选项卡暂时不上
        // {
        //   label: '配置',
        //   name: 'config'
        // },
        // {
        //   label: '操作日志',
        //   name: 'log'
        // }
      ]
    }
  },
  computed: {
    title() {
      return `控制台（${this.domain}）${this.taocan}`
    }
  },
  created() {
    this.fetchGet('CloudDns.Domain.DnsDomain.info', {
      domain_id: this.$route.params.id
    }).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data) {
              this.domain = res.data.domain
              this.taocan = res.data.level_list[res.data.level_id]
            }
          })
        }
      },
      e => {}
    )
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      // const fromDepth = from.fullPath.split('/')
      this.tabActiveName = `${toDepth[4]}`
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push(`${tab.name}`)
    }
  }
}
</script>
