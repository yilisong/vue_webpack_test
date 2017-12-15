<template lang="html">
  <console-page-layout title="操作记录">
    <ComboTable class="wrap-background" :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getTableData" @on-current-change="getTableData">
      <div slot="headerRight">
        <el-date-picker v-model="startTimevalue2" type="date" placeholder="选择开始时间" :picker-options="pickerOptions" @change="timeSelectStar2" format="yyyy-MM-dd"></el-date-picker>
        <span class="demonstration">到</span>
        <el-date-picker v-model="endTimevalue2" type="date" placeholder="选择结束时间" :picker-options="pickerOptions" @change="timeSelectEnd2" format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" @click="handleDateChange">查询</el-button>
      </div>
      <div slot="body">
        <el-table :data="tableData" style="width: 100%" v-loading="tabLoading">
          <el-table-column prop="created_at" label="操作时间" align="left" width="180">
          </el-table-column>
          <el-table-column prop="user_ip" label="操作IP" align="left" width="180">
            <template scope="scope">
              <div v-if="scope.row.user_ip">
                {{scope.row.user_ip}}
              </div>
              <div v-else>
                ——
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="package_name" label="操作套餐" align="center" width="180">
          </el-table-column>
          <el-table-column label="操作详情" align="center">
            <template scope="scope">
              <span>{{scope.row.content}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ComboTable>
  </console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import TaichiPlusResource from '../../resource/TaichiPlusResource'

export default {
  components: {
    ConsolePageLayout,
    ComboTable
  },
  data() {
    return {
      startTimevalue2: '',
      endTimevalue2: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
                 time.getTime() >= Date.now()
        }
      },
      pageSizes: [10, 15, 20, 25],
      pageSize: 10,
      tableData: [],
      total: 0,
      tabLoading: true
    }
  },
  created() {
    this.getTableData(1, 10)
  },
  mounted() {
  },
  methods: {
    timeSelectStar2(timeRange) {
      this.startTimevalue2 = timeRange + ' ' + '00:00:00'
    },
    timeSelectEnd2(timeRange) {
      this.endTimevalue2 = timeRange + ' ' + '23:59:59'
    },
    handleDateChange() {
      if (this.startTimevalue2 === '') {
        this.$message({
          showClose: true,
          message: '开始时间不能为空',
          type: 'error'
        })
        return false
      }
      if (this.endTimevalue2 === '') {
        this.$message({
          showClose: true,
          message: '结束时间不能为空',
          type: 'error'
        })
        return false
      }
      if (this.startTimevalue2 > this.endTimevalue2) {
        this.$message({
          showClose: true,
          message: '开始时间必须小于结束时间',
          type: 'error'
        })
        return false
      }
      const params = {
        page: 1,
        per_page: 10,
        type: 'ForwardingRule',
        start_time: this.startTimevalue2,
        end_time: this.endTimevalue2
      }
      this.getLogTableData(params)
    },
    getTableData(current, size) {
      console.log('run!!!')
      const params = {
        page: current,
        per_page: size,
        type: 'ForwardingRule',
        start_time: this.startTimevalue2,
        end_time: this.endTimevalue2
      }
      console.log(params)
      this.getLogTableData(params)
    },
    getLogTableData(params) {
      this.tabLoading = true
      TaichiPlusResource.getLogTableData(params).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.total = Number(data.total)
          this.tableData = data.list
        } else {
          this.total = 0
          this.tableData = []
        }
        this.tabLoading = false
      })
    }
  }
}
</script>

<style scope>
  .data-picker {
    margin-right: 26px;
  }
  .plusLogDetails {
    width: 800px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
