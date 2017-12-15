<template>
<ComboTable :total="riskCountTotal"
  :page-size="pageSize"
  :page-sizes="pageSizes"
  @on-size-change="handleRiskCountListChange"
  @on-current-change="handleRiskCountListChange">
  <div slot="headerLeft">
    <el-button @click="switchRiskTask({
        detection_id: selectionId,
        status: 1
      })">启动</el-button>
    <el-button @click="switchRiskTask({
        detection_id: selectionId,
        status: 0
      })">暂停</el-button>
    <el-button @click="handleDeleteRiskTask">删除</el-button>
  </div>
  <div slot="body">
    <el-table :data="riskCountLisk"
      @select="handleRowSelect"
      @select-all="handleRowSelect"
      style="width: 100%">
      <el-table-column type="selection"
        width="30">
      </el-table-column>
      <el-table-column prop="property_object"
        label="监测对象"
        min-width="130">
      </el-table-column>
      <el-table-column prop="detection_page"
        label="监测页面"
        min-width="68"
        align="center">
        <template scope="scope">
          {{ codemap.page.get(scope.row.detection_page) }}
        </template>
      </el-table-column>
      <el-table-column prop="detection_pattern"
        label="监测模式"
        min-width="68"
        align="center">
        <template scope="scope">
          {{ codemap.pattern.get(scope.row.detection_pattern) }}
        </template>
      </el-table-column>
      <el-table-column prop="tamper"
        label="篡改"
        min-width="50"
        align="center">
      </el-table-column>
      <el-table-column prop="keyword"
        label="关键词"
        min-width="50"
        align="center">
      </el-table-column>
      <el-table-column prop="sensitive_word"
        label="敏感字"
        min-width="50"
        align="center">
      </el-table-column>
      <el-table-column prop="abnormal_status_code"
        label="异常状态码"
        min-width="80"
        align="center">
      </el-table-column>
      <el-table-column prop="new_update_time"
        label="更新时间"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column prop="meal_expiry_time"
        label="到期时间"
        width="120"
        align="center">
        <template scope="scope">
          <ExpireTime :expireTime="scope.row.meal_expiry_time" />
        </template>
      </el-table-column>
      <el-table-column prop="status"
        label="监测状态"
        align="center">
        <template scope="scope">
          {{ codemap.status.get(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作"
        min-width="120"
        align="right">
        <template scope="scope">
          <el-button type="text"
                     size="small"
                     @click="$router.push({ path: ConsolePanel.path, query: { id: scope.row.id, domain: scope.row.property_object }})">
                     控制台
          </el-button>
          <span class="vertical-separator">|</span>
          <el-button type="text" size="small" @click="triggerAddDetectionVisible({visible: true, info: scope.row})">配置</el-button>
          </template>
      </el-table-column>
    </el-table>
    <AddDetection modify />
  </div>
</ComboTable>
</template>

<script>
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import ComboTable from 'common/components/ComboTable/ComboTable'
import ListQuery from '../../constants/ListQuery'
import AddDetection from '../PropertyList/AddDetection'
import routeTable from '../../router/routeTable'
import { mapActions } from 'vuex'

export default {
  components: {
    ComboTable,
    AddDetection,
    ExpireTime
  },
  methods: {
    ...mapActions([
      'getRiskCountList',
      'switchRiskTask',
      'deleteRiskTask',
      'triggerAddDetectionVisible'
    ]),
    handleRiskCountListChange(current, size) {
      this.getRiskCountList({
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
    handleDeleteRiskTask() {
      this.selectionId.length === 0
        ? this.$message({
            type: 'info',
            message: '请选择监测对象'
          })
        : this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRiskTask({
              detection_id: this.selectionId
            })
          })
    }
  },
  computed: {
    riskCountLisk() {
      return this.$store.state.detection.riskCount.list
    },
    riskCountTotal() {
      return this.$store.state.detection.riskCount.total
    }
  },
  created() {
    this.getRiskCountList({
      ...ListQuery
    })
  },
  data() {
    return {
      codemap: {
        page: new Map([['0', '首页'], ['1', '全站'], ['2', '自定义']]),
        pattern: new Map([['0', '快速'], ['1', '标准'], ['2', '全面']]),
        status: new Map([['0', '未开始'], ['1', '检测中'], ['2', '已关闭'], ['3', '已到期']])
      },
      pageSizes: [10, 20],
      pageSize: 10,
      selectionId: [],
      ConsolePanel: routeTable.RiskDetection.ConsolePanel
    }
  }
}
</script>
