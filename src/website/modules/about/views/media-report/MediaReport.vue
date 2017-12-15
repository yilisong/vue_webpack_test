<template lang="html">
<div class="center-position">
  <div class="common-title">
    <h1>媒体报道</h1>
    <p>Media news</p>
  </div>
  <div class="plan-tab center-position">
    <el-tabs v-model="activeName" class="main-tab">
      <el-tab-pane label="新闻报道" name="first">
        <News />
      </el-tab-pane>
      <el-tab-pane label="云盾发布" name="second">
        <Issue />
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import Issue from './components/Issue'
import News from './components/News'
export default {
  components: {
    Issue,
    News
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="css">
.event-container {
  padding-bottom: 65px;
}

.common-title {
  text-align: center;
  padding-top: 126px;
  h1 {
    font-size: 42px;
    font-weight: 100;
  }
  p {
    padding-top: 16px;
    font-size: 18px;
    color: #333;
  }
}

.center-position {
  width: 1200px;
  margin: 0 auto;
}

.main-tab {
  margin-top: 20px;
  .el-tabs__nav {
    width: 180px;
    margin: 0 auto;
    float: none;
  }
}
</style>
