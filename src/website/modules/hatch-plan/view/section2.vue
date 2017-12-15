<template lang="html">
  <div class="section2">
    <div class="layout">
      <div class="content">
        <p class="title">什么是“安孵计划”</p>
        <p class="describe">“安孵计划”是上海云盾通过整合内外优质资源推出的针对非营利性组织和初创企业的《安全扶持计划》。上海云盾作为创业公司，一路走来深知创业艰辛：面临的人力、资金、技术压力，以及业务上升期业务系统面临的安全、稳定和体验压力。业务系统安全、稳定运行直接影响非营利性组织的官方形象和初创企业的存活已成不争的事实，但迫于资金压力、人力不足和技术缺失，使非营利性组织和初创企业无法有效保障自身业务系统安全稳定。“安孵计划”旨在赋能非营利性组织和初创企业，降低非营利性组织和创业企业的 IT 管理成本和研发成本，提升业务系统安全与稳定。</p>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'

export default {
  name: 'section2',
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {}
}
</script>

<style scoped>
.section2 {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: auto;
}
.content {
  height: 100%;
  width: 1200px;
  text-align: center;
  z-index: 3;
  padding-top: 30vh;
}
.title {
  color: var(--primary-blue);
  font-size: 36px;
}
.describe {
  font-size: 14px;
  line-height: 24px;
  width: 1000px;
  text-align: left;
  display: inline-block;
  margin-top: 4%;
}
</style>
