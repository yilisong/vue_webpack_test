<template lang="">
<yd-pagination-table v-loading="tableLoading" element-loading-text="拼命加载中" :pageTotalCount="pageTotalCount" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" ref="paginationTable">

  <div class="first-change" slot="header">
    <el-dropdown trigger="click" size="small" @command="handleDropdownCommand">
      <el-button size="small">
        操作类型<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(value, index) in dropdownOptions" :key="index" :command="index">{{value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-date-picker v-model="datePickerValue" type="daterange" size="small" align="right" placeholder="选择日期范围" @change="handleDatePickerRangeChange" format="yyyy-M-dd">
    </el-date-picker>

    <el-input placeholder="日志关键字" v-model="logKeywords" size="small" style="width: 300px;"></el-input>
    <el-button type="default" size="small" @click="handleButtonSearch">查询</el-button>
    <el-button type="default" size="small" @click="handleButtonExport">导出</el-button>
  </div>
  <el-table :data="dataList" style="width: 100%">
    <el-table-column prop="created_at" label="操作时间" width="180"></el-table-column>
    <el-table-column prop="client_ip" label="操作IP" width="180"></el-table-column>
    <el-table-column prop="op_type" label="操作类型"></el-table-column>
    <el-table-column prop="info" label="操作内容"></el-table-column>
  </el-table>
</yd-pagination-table>
</template>

<script>
import YdPaginationTable from 'common/components/yd-pagination-table'
export default {
  components: {
    YdPaginationTable
  },
  data() {
    return {
      pageTotalCount: 0,
      tableLoading: false,
      dropdownValue: '',
      datePickerValue: '',
      datePickerStartTime: '',
      datePickerEndTime: '',
      logKeywords: '',
      dropdownOptions: {},
      dataList: []
    }
  },
  mounted() {
    this.fetchTableData()
  },
  methods: {
    fetchTableData() {
      this.tableLoading = true

      const params = {
        domain_id: this.$route.params.id,
        // log_type: '',
        op_type: this.dropdownValue,
        info: this.logKeywords,
        start_time: this.datePickerStartTime,
        end_time: this.datePickerEndTime,
        page: this.$refs.paginationTable.currentPage,
        per_page: this.$refs.paginationTable.pageSize
      }

      this.fetchGet('CloudDns.DomainRecordsLogs.list', params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                this.pageTotalCount = Number(res.data.total)
                this.dropdownOptions = res.data.record_log_types
                this.dataList = res.data.list
              }
            })
          }
          this.tableLoading = false
        },
        e => {
          this.tableLoading = false
        })
    },
    handleDropdownCommand(command) {
      this.dropdownValue = command
    },
    handleDatePickerRangeChange(formattedValue) {
      const dates = formattedValue.split(' - ')
      this.datePickerStartTime = dates[0]
      this.datePickerEndTime = dates[1]
    },
    handleButtonSearch() {
      this.fetchTableData()
    },
    handleButtonExport() {
      const params = {
        domain_id: this.$route.params.id,
        // log_type: '',
        op_type: this.dropdownValue,
        info: this.logKeywords,
        start_time: this.datePickerStartTime,
        end_time: this.datePickerEndTime,
        page: this.$refs.paginationTable.currentPage,
        per_page: this.$refs.paginationTable.pageSize
      }
      this.fetchGet('CloudDns.DomainRecordsLogs.export', params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {

              }
            })
          }
        },
        e => {})
    },
    handlePaginationSizeChange(size) {
      this.fetchTableData()
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.fetchTableData()
    }
  }
}
</script>

<style lang="" scoped>


</style>
