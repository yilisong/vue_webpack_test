<template lang="html">
<console-page-layout title="发票管理">
  <ComboTable :total="invoiceTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getInvoiceList" @on-current-change="getInvoiceList"class="add-wrap">
    <div slot="headerRight">
      <el-input class="filter" v-model="keyword" icon="search" placeholder="请输入需要筛选的发票信息" :on-icon-click="handleFilter"></el-input>
    </div>
    <div slot="body">
      <el-table :data="invoiceList" style="width: 100%" v-loading="isLoaded">
        <el-table-column prop="invoice_code" label="发票单号" :formatter="formatInvoiceCode" min-width="200">
        </el-table-column>
        <el-table-column prop="order_code" label="对应订单号" min-width="200">
        </el-table-column>
        <el-table-column prop="product_flag_desc" label="订单所属套餐" min-width="120">
        </el-table-column>
        <el-table-column prop="price" label="发票金额/元" width="100" align="right">
        </el-table-column>
        <el-table-column label="发票申请时间" width="100" align="center">
          <template scope="scope">
            {{ scope.row.created_at.split(' ')[0] }}
            <br>
            {{ scope.row.created_at.split(' ')[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="status_desc" label="状态">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template scope="scope">
            <el-button type="text" @click="showInvoiceDetails(scope.row)">发票详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <InvoiceInfo/>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import InvoiceInfo from './Dialogs/invoiceInfo'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    InvoiceInfo,
    ComboTable
  },
  methods: {
    ...mapActions([
      'triggerInvoiceInfoVisible',
      'getInvoiceByPage'
    ]),
    getInvoiceList(current, size) {
      if (this.resetPage) {
        this.getInvoiceByPage({
          page: current,
          per_page: size
        })
      }
    },
    showInvoiceDetails(row) {
      this.$store.commit({
        type: 'RECEIVE_INVOICE_ID',
        id: row.id
      })
      this.$store.commit({
        type: 'RECEIVE_INVOICE_STATUS',
        status: row.status
      })
      this.triggerInvoiceInfoVisible(true)
    },
    handleFilter() {
      this.resetPage = false
      this.getInvoiceByPage({
        page: 1,
        per_page: this.pageSize,
        searchCond: this.keyword
      })
    },
    formatInvoiceCode(row) {
      if (row.status_desc === '待处理' || row.status_desc === '处理中') {
        return ''
      } else {
        return row.invoice_code
      }
    }
  },
  computed: {
    invoiceList() {
      return this.$store.state.invoice.list
    },
    invoiceTotal() {
      return this.$store.state.invoice.total
    },
    isLoaded() {
      return this.$store.state.invoice.isLoaded
    }
  },
  created() {
    const searchCond = this.$route.query.order_code
    if (searchCond) {
      this.keyword = searchCond
      this.getInvoiceByPage({
        page: 1,
        per_page: this.pageSize,
        searchCond
      })
    } else {
      this.getInvoiceList(1, this.pageSize)
    }
  },
  data() {
    return {
      // state manage
      pageSizes: [5, 10, 20],
      pageSize: 5,
      resetPage: true,
      keyword: ''
    }
  }
}
</script>

<style scoped>
.filter {
  width: 250px;
}
</style>
