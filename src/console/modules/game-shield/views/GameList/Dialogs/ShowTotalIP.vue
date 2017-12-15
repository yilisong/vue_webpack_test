<!-- 套餐设置 -->
<template lang="html">
  <!-- 记录配置 -->
  <el-dialog title="测试/防御节点" size="small" :visible.sync="showTotalIPVisible" class="small_el_dialog" :before-close="closeTriggerShowTotalIPVisible">
    <el-row :gutter="12">
      <ComboTable :total="gameOperationTotal" :page-size="pageSizeDig" :page-sizes="pageSizeDigs" @on-size-change="getTotalIPList" @on-current-change="getTotalIPList" v-loading="loading">
        <div slot="body">
          <el-table :data="gameIpTotalList" element-loading-text="拼命加载中" style="width: 100%">
            <el-table-column prop="ip_string" label="防御节点"  align="left">
            </el-table-column>
          </el-table>
        </div>
      </ComboTable>
    </el-row>
    <div slot="footer">
      <el-button @click="closeTriggerShowTotalIPVisible" size="small">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import ComboTable from 'common/components/ComboTable/ComboTable'

export default {
  components: {
    ComboTable
  },
  data() {
    return {
      pageSizeDigs: [10, 15, 20, 25],
      pageSizeDig: 10,
      loading: true
    }
  },
  created() {
  },
  computed: {
    showTotalIPVisible: {
      get() {
        this.loading = true
        return this.$store.state.dialog.showTotalIP.visible
      },
      set: newValue => {}
    },
    comboId() {
      return this.$store.state.id.package.gameComboId
    },
    gameIpTotalList() {
      this.loading = false
      return this.$store.state.gameOperation.totalList
    },
    gameOperationTotal() {
      return this.$store.state.gameOperation.ipTotal
    }
  },
  methods: {
    ...mapActions([
      'triggerShowTotalIPVisible',
      'getTotalIP'
    ]),
    closeTriggerShowTotalIPVisible() {
      this.pageSizeDigs = [10, 15, 20, 25]
      this.triggerShowTotalIPVisible(false)
    },
    getTotalIPList(current, size) {
      this.getTotalIP({
        page: current,
        per_page: size,
        package_id: this.comboId
      })
    }
  }
}
</script>

<style lang="css" scoped>
.el-row {
  margin-top: 20px;
  line-height: 30px;
}
.first_row {
  margin-top: 0px;
}
.addIP{
  float: right!important;
}
.el-row .el-button+.el-button{
  margin-left: -5px;
}
</style>
