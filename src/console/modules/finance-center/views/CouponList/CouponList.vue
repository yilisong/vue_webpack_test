<template lang="html">
<console-page-layout title="优惠码管理">
  <ComboTable :total="orderTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getCouponList" @on-current-change="getCouponList" class="add-wrap">
    <div slot="body">
      <el-table :data="couponList" style="width: 100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="code" label="优惠码" width="100">
        </el-table-column>
        <el-table-column prop="amount" label="优惠" :formatter="formatAmount" align="right">
        </el-table-column>
        <el-table-column prop="min_order_amount" label="最低消费额/元" :formatter="formatMinAmout" min-width="100" align="right">
        </el-table-column>
        <el-table-column prop="order_code" label="绑定订单号" min-width="200">
        </el-table-column>
        <el-table-column prop="start_date" label="生效时间" width="90" align="center">
        </el-table-column>
        <el-table-column prop="end_date" label="过期时间" width="90" align="center">
        </el-table-column>
        <el-table-column prop="use_range" label="使用范围" min-width="80" align="right">
        </el-table-column>
        <el-table-column prop="use_status_desc" label="使用状态" align="right" min-width="80">
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable
  },
  created() {
    this.getCouponList(1, this.pageSize)
  },
  computed: {
    couponList() {
      return this.$store.state.coupon.list
    },
    orderTotal() {
      return this.$store.state.coupon.total
    }
  },
  methods: {
    ...mapActions([
      'getCouponByPage'
    ]),
    getCouponList(current, size) {
      this.getCouponByPage({
        page: current,
        per_page: size
      })
    },
    formatAmount(row) {
      const amount = Number(row.amount).toFixed(2)
      if (row.type === 'F') {
        return `${amount} 元`
      } else if (row.type === 'P') {
        return `${amount * 10} 折`
      } else {
        throw new Error('lack of type')
      }
    },
    formatMinAmout(row) {
      const minOrderMmount = Number(row.min_order_amount).toFixed(2)
      if (isNaN(minOrderMmount)) {
        return row.min_order_amount
      } else {
        return minOrderMmount
      }
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 20],
      pageSize: 5
    }
  }
}
</script>
