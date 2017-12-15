<template>
<console-page-layout title="操作记录">
  <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes"
  @on-size-change="getOperateLogCurrent" @on-current-change="getOperateLogCurrent" class="wrap-background">
    <div slot="headerRight">
      <span>时间范围选择：</span>
      <el-date-picker class="data-picker" v-model="timeRange" type="daterange" placeholder="选择时间范围"
       :picker-options="pickerOptions" @change="timeSelectFun" format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </div>
    <div slot="body">
      <el-table :data="operateRecordTable" style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="updated_at" label="操作时间" align="center">
          <template scope="scope">
            <div v-if="scope.row.updated_at === ''">
              -
            </div>
            <div v-else>
              {{scope.row.updated_at}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="操作IP" align="center">
          <template scope="scope">
            <div v-if="scope.row.ip === ''">
              -
            </div>
            <div v-else>
              {{scope.row.ip}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="操作详情" align="center">
          <template scope="scope">
            <div v-if="scope.row.detail === ''">
              -
            </div>
            <div v-else>
              {{scope.row.detail}}
            </div>
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
import TaichiResource from '../../resource/TaichiResource'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable
  },
  directives: {},
  methods: {
    ...mapActions([
      // 'getOperateLog'
    ]),
    getTableData() {},
    getOperateLogCurrent(currentPage, pageSize) {
      this.tableLoading = true
      const thisparmas = {
        page: currentPage,
        per_page: pageSize,
        start_time: this.params.start_time,
        end_time: this.params.end_time
      }
      this.getOperateLog(thisparmas)
    },
    getOperateLog(params) {
      this.tableLoading = true
      if (params === undefined) {
        params = {
          page: this.currentPage,
          per_page: this.pageSize,
          start_time: this.params.start_time,
          end_time: this.params.end_time
        }
      }
      TaichiResource.getOperateLog(params).then(response => {
        if (response.data.status.code === 1 && response.data.data) {
          console.log('response.data.data',response.data.data)
          this.operateRecordTable = response.data.data.list
          this.total = Number(response.data.data.total)
          this.tableLoading = false
        }
      })
    },
    timeSelectFun(timeRange) {
      this.params.start_time = timeRange.slice(0, 19)
      this.params.end_time = timeRange.slice(-19)
      this.getOperateLog()
    }
  },
  computed: {
    // operateRecordTable() {
    //   return this.$store.state.operateRecord.operateRecordTable
    // },
    operateRecordTotal() {
      return this.$store.state.operateRecord.operateRecordTotal
    }
  },
  created() {
    this.getOperateLog()
  },
  data() {
    return {
      tableLoading:false,
      operateRecordTable: [],
      pageSizes: [5, 10, 20],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      timeRange: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
                 time.getTime() >= Date.now()
        }
      },
      params: {
        start_time: '',
        end_time: ''
      }
    }
  }
}
</script>
<style>
.data-picker.el-date-editor.el-input {
  margin-right: 30px;
  width: 360px;
}
</style>
