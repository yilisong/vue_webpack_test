<template lang="html">
<div class="user-box">
  <div class="title-box">
    <h4 class="user-title">登录日志</h4>
  </div>
  <div class="table-box">
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="created_at" label="登录时间" width="300">
      </el-table-column>
      <el-table-column prop="ip" label="登录IP段">
      </el-table-column>
      <el-table-column prop="address" label="登录状态" width="200">
        <template scope="scope">
        <div><i class="again-dot"v-bind:class='[scope.row.detail.code===1 ? "succceed-dot" : "fail-dot"]'></i>{{scope.row.detail.code|filterStatus}}</div>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[20, 30, 50, 100, 200]" :page-size="this.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
    </el-pagination>
  </div>

</div>
</template>

<script>
import SourceUserResource from '../../assets/js/resource/SourceUserResource'
export default {
  data() {
    return {
      isSuccess: '',
      currentPage: 1,
      totalPage: 1,
      pageSize: 20,
      records: []
    }
  },
  mounted() {
    this.pagination(1, 20)
  },
  filters: {
    filterStatus(value) {
      let valState = ''
      value === 1 ? valState = '成功' : valState = '失败'
      return valState
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.pagination(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.pagination(val, this.pageSize)
    },
    pagination(currentPage, pageSize) {
      SourceUserResource.getLoginLog({
          page: currentPage,
          per_page: pageSize
        })
        .then(response => {
          if (response.data.status.code === 1) {
            // this.loading = false
            console.log(response.data, '------------')
            this.records = response.data.data.logList
            this.totalPage = parseInt(response.data.data.count, 0)
          } else {
            this.$Message.error(response.data.status.message)
          }
        })
    }
  }
}
</script>

<style lang="css">
.user-box {
  margin: 15px;
  background: #fff;
}

.title-box {
  padding: 20px;
  border-bottom: 1px solid #efefef;
}

.user-title::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 20px;
  background: #2EA1E9;
  vertical-align: text-bottom;
  margin-right: 10px;
}

.table-box {
  margin: 25px;
  padding-bottom: 14px;
}
</style>
