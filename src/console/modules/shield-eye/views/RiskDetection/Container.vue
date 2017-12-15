<template>
<console-page-layout title="内容监测">
  <div slot="tab">
    <el-tabs v-model="activeTab"
             @tab-click="handleTabClick">
      <el-tab-pane :label="DetectionList.name"
                   :name="DetectionList.path"></el-tab-pane>
      <el-tab-pane :label="EventList.name"
                   :name="EventList.path"></el-tab-pane>
    </el-tabs>
  </div>
  <Tip :content="tipContent"
       className="warn" />
  <router-view></router-view>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import routeTable from '../../router/routeTable'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  methods: {
    ...mapActions(['getRiskScanMeal']),
    handleTabClick(tab) {
      this.$router.push(tab.name)
    },
    fullSiteText(meal) {
      const isFullSite = meal.meal_flag === 'FC003B'
      return !isFullSite ? `(监测频率${meal.meal_min_frequency / 60}min)` : ''
    },
    tipInit() {
      this.tipContent = [
        <div>
          <span>剩余内容监测套餐：</span>
          {this.riskScanMealList.length !== 0
            ? this.riskScanMealList.map((meal, index) => (
                <span>
                  {`${meal.product_meal_name} ${this.fullSiteText(
                    meal
                  )} ${meal.surplus_number}个`}
                  {index === this.riskScanMealList.length - 1 ? '，' : '、'}
                </span>
              ))
            : '0个，'}
          <a href="/payment#setting-shield-eye?service_type=1">购买更多监测套餐</a>
        </div>
      ]
    }
  },
  watch: {
    scanNumber: {
      handler() {
        this.tipInit()
      }
    }
  },
  computed: {
    riskScanMealList() {
      return this.$store.state.detection.riskScanMealList
    }
  },
  async created() {
    const path = this.$route.fullPath.split('/')
    this.activeTab = `/${path[1]}/${path[2]}`

    await this.getRiskScanMeal()
    this.tipInit()
  },
  data() {
    return {
      tipContent: [],
      DetectionList: routeTable.RiskDetection.DetectionList,
      EventList: routeTable.RiskDetection.EventList
    }
  }
}
</script>
