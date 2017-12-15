<template>
  <console-page-layout title="资产列表">
    <Tip :content="tipContent" className="warn" />
    <ComboTable :total="propertyTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="handlePropertyListChange" @on-current-change="handlePropertyListChange">
      <div slot="headerLeft">
        <el-button type="primary" @click="triggerAddPropertyVisible(true)">添加资产</el-button>
        <el-button @click="handleDeleteProperty">删除</el-button>
      </div>
      <div slot="body">
        <el-table :data="propertyList" @select="handleRowSelect" @select-all="handleRowSelect" style="width: 100%">
          <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="资产" min-width="150">
            <template scope="scope">
              <div class="property-wrapper">
                <div class="property" @click="$router.push({ path: PropertyDetail.path, query: { property: scope.row.property_object }})">
                  <ul>
                    <li class="truncate">
                      <el-tooltip effect="dark" :content="scope.row.property_name" placement="top">
                        <span>{{ scope.row.property_name }}</span>
                      </el-tooltip>
                    </li>
                    <li class="truncate">
                      <el-tooltip effect="dark" :content="scope.row.property_object" placement="top">
                        <span>{{ scope.row.property_object }}</span>
                      </el-tooltip>
                    </li>
                  </ul>
                </div>
                <div class="verification">
                  <template v-if="scope.row.status === '0'">
                    <el-tooltip effect="dark" content="点击认证" placement="right">
                      <img class="not-verified" src="../../images/not-certified.svg" @click="triggerVerifyPropertyVisible({ visible: true, info: scope.row })" />
                    </el-tooltip>
                  </template>
                  <template v-else-if="scope.row.status === '1'">
                    <el-tooltip effect="dark" content="已认证" placement="right">
                      <img class="verified" src="../../images/certified.svg" />
                    </el-tooltip>
                  </template>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="漏洞个数(高/中/低)" min-width="148" align="center">
            <template scope="scope">
              <ul class="vulnerability">
                <li>
                  <img class="vulnerability-icon" src="../../images/vulnerability-high.svg" />
                  <span class="vulnerability-text">{{ scope.row.level_high }}</span>
                </li>
                <li>
                  <img class="vulnerability-icon" src="../../images/vulnerability-middle.svg" />
                  <span class="vulnerability-text">{{ scope.row.level_middle }}</span>
                </li>
                <li>
                  <img class="vulnerability-icon" src="../../images/vulnerability-low.svg" />
                  <span class="vulnerability-text">{{ scope.row.level_low }}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="篡改" align="center" min-width="58">
            <template scope="scope">
              <span :class="{ 'red-text':  scope.row.tamper > 0}">{{ scope.row.tamper }}</span>
            </template>
          </el-table-column>
          <el-table-column label=" 关键词" align="center" min-width="58">
            <template scope="scope">
              <span :class="{ 'red-text':  scope.row.keyword > 0}">{{ scope.row.keyword }}</span>
            </template>
          </el-table-column>
          <el-table-column label="敏感字" align="center" min-width="58">
            <template scope="scope">
              <span :class="{ 'red-text':  scope.row.sensitive_word > 0}">{{ scope.row.sensitive_word }}</span>
            </template>
          </el-table-column>
          <el-table-column label="异常状态码" align="center" min-width="88">
            <template scope="scope">
              <span :class="{ 'red-text':  scope.row.abnormal_status_code > 0}">{{ scope.row.abnormal_status_code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="new_update_time" label="更新时间" align="center" width="80">
          </el-table-column>
          <el-table-column label="操作" min-width="170" align="right">
            <template scope="scope">
              <template v-if="scope.row.status === '1'">
                <el-button type="text" size="small" @click="triggerAddScanVisible({visible: true, info: scope.row})">添加扫描</el-button>
                <span class="vertical-separator">|</span>
                <template v-if="scope.row.risk_status === '1'">
                  <el-button type="text" size="small" @click="triggerAddDetectionVisible({visible: true, info: scope.row})">添加监测</el-button>
                </template>
                <template v-else>
                  <el-tooltip class="button-disabled" effect="dark" content="已添加" placement="top">
                    <el-button type="text" size="small">添加监测</el-button>
                  </el-tooltip>
                </template>
                <span class="vertical-separator">|</span>
              </template>
              <template v-else>
                <el-tooltip class="button-disabled" effect="dark" content="需先进行资产认证" placement="top">
                  <el-button type="text" size="small">添加扫描</el-button>
                </el-tooltip>
                <span class="vertical-separator">|</span>
                <el-tooltip class="button-disabled" effect="dark" content="需先进行资产认证" placement="top">
                  <el-button type="text" size="small">添加监测</el-button>
                </el-tooltip>
                <span class="vertical-separator">|</span>
              </template>
              <el-button type="text" size="small" @click="$router.push({ path: PropertyDetail.path, query: { property: scope.row.property_object }})">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
    <AddProperty/>
    <VerifyProperty/>
    <AddScan/>
    <AddDetection/>
  </console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import AddProperty from './AddProperty'
import VerifyProperty from './VerifyProperty'
import AddScan from './AddScan'
import AddDetection from './AddDetection'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import ListQuery from '../../constants/ListQuery'
import routeTable from '../../router/routeTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Tip,
    AddProperty,
    VerifyProperty,
    AddScan,
    AddDetection
  },
  directives: {
    tip: TipDirective
  },
  methods: {
    ...mapActions([
      'getPropertyList',
      'triggerAddPropertyVisible',
      'triggerAddScanVisible',
      'triggerVerifyPropertyVisible',
      'triggerAddDetectionVisible',
      'getRiskScanMeal',
      'deleteProperty'
    ]),
    handlePropertyListChange(current, size) {
      this.getPropertyList({
        page: current,
        per_page: size
      })
    },
    handleRowSelect(selection) {
      const selectionId = []

      selection.forEach(row => {
        selectionId.push(row.id)
      })

      this.selectionId = selectionId
    },
    tipInit() {
      this.tipContent = [
        <div>
          当前账号剩余扫描次数：{this.scanNumber} 次，<a href="/payment#setting-shield-eye?service_type=0">
            购买更多扫描
          </a>
        </div>,
        <div>
          <span>剩余内容监测套餐：</span>
          {this.riskScanMealList.length !== 0
            ? this.riskScanMealList.map((meal, index) => (
                <span>
                  {`${meal.product_meal_name} (监测频率${meal.meal_min_frequency /
                    60}min) ${meal.surplus_number}个`}
                  {index === this.riskScanMealList.length - 1 ? '，' : '、'}
                </span>
              ))
            : '0个，'}
          <a href="/payment#setting-shield-eye?service_type=1">购买更多监测套餐</a>
        </div>
      ]
    },
    handleDeleteProperty() {
      this.selectionId.length === 0
        ? this.$message({
            type: 'info',
            message: '请选择资产'
          })
        : this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteProperty({
              property_id: this.selectionId
            })
          })
    }
  },
  computed: {
    propertyList() {
      return this.$store.state.property.list
    },
    propertyTotal() {
      return this.$store.state.property.total
    },
    ...mapGetters(['scanNumber', 'riskScanMealList'])
  },
  watch: {
    scanNumber: {
      handler() {
        this.tipInit()
      }
    }
  },
  async created() {
    this.getPropertyList({
      ...ListQuery
    })

    await this.getRiskScanMeal()
    this.tipInit()
  },
  data() {
    return {
      PropertyDetail: routeTable.PropertyDetail,
      selectionId: [],
      tipContent: [],
      pageSizes: [10, 20],
      pageSize: 10
    }
  }
}
</script>

<style scoped>
.property-wrapper {
  clear: fix;

  .property {
    float: left;
    max-width: 10vw;
    cursor: pointer;
  }

  .verification {
    float: left;
    margin-top: 12px;
    margin-left: 16px;

    img {
      width: 12px;
      height: 12px;
    }

    .not-verified {
      cursor: pointer;
    }

    .verified {
      cursor: default !important;
    }
  }
}
</style>

<style>
.button-disabled {
  cursor: default !important;
  color: gray;

  &:focus,
  &:hover {
    color: gray !important;
    border-color: gray !important;
  }
}
</style>
