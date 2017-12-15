<template lang="html">
<console-page-layout title="自有证书列表">
  <ComboTable :total="CertificateTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getCertificateList" @on-current-change="getCertificateList">
    <div class="reset" slot="headerLeft">
      <el-button type="primary" @click="handleUpload">上传自有证书</el-button>
      <el-button @click="handleDel">删除</el-button>
    </div>
    <div class="reset" slot="body">
      <el-table :data="CertificateList" style="width: 100%" @select="getSelected" @select-all="getSelected" v-loading="loading">
        <el-table-column type="selection" class-name="selection" width="26">
        </el-table-column>
        <el-table-column prop="ca_name" label="证书名称" width="180">
          <template scope="scope">
            <el-tooltip :disabled="isShowCAName(scope)" effect="dark" :content="scope.row.ca_name" placement="top">
              <span v-show="!scope.row.isEditing">{{ caName(scope) }}</span>
            </el-tooltip>
            <el-input v-show="scope.row.isEditing" v-model="caNames[scope.$index]" :placeholder="scope.row.ca_name"></el-input>
            <span class="separator">|</span>
            <el-button class="handle-ssl" v-show="!scope.row.isEditing" type="text" @click="editSSLName(scope)">编辑</el-button>
            <el-button class="handle-ssl" v-show="scope.row.isEditing" type="text" @click="saveSSLName(scope)">确定</el-button>
            <el-button class="handle-ssl" v-show="scope.row.isEditing" type="text" @click="cancelEditSSLName(scope)">取消</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ca_domain" label="证书绑定域名">
          <template scope="scope">
            <drop-box :list="scope.row.ca_domain"></drop-box>
          </template>
        </el-table-column>
        <el-table-column prop="issuer" label="颁发机构">
        </el-table-column>
        <el-table-column prop="issuer_start_time" label="颁发时间" align="center">
          <template scope="scope">
            {{ scope.row.issuer_start_time.split(' ')[0] }}
            <br>
            {{ scope.row.issuer_start_time.split(' ')[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="issuer_expiry_time" label="到期时间" align="center" width="90">
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <SSLConfig/>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import DropBox from 'common/components/DropBox/drop-box'
import SSLConfig from './Dialogs/ssl-config'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    DropBox,
    SSLConfig
  },
  created() {
    this.getCertificateList(1, this.pageSize)
  },
  computed: {
    loading() {
      return this.$store.state.certificate.loading
    },
    CertificateList() {
      return this.$store.state.certificate.list
    },
    CertificateTotal() {
      return this.$store.state.certificate.total
    }
  },
  methods: {
    ...mapActions([
      'getCertificateByPage',
      'triggerSSLConfigVisible',
      'delCertificate',
      'changeEditStatus',
      'editCertificate'
    ]),
    getCertificateList(current, size) {
      this.getCertificateByPage({
        page: current,
        per_page: size
      })
    },
    handleUpload() {
      this.$store.commit({
        type: 'FETCH_PAGESIZE',
        pageSize: this.pageSize
      })
      this.triggerSSLConfigVisible(true)
    },
    getSelected(selection, row) {
      this.ids = ''
      const length = selection.length
      for (let i = 0; i < length; i++) {
        this.ids += ',' + selection[i].id
      }
      this.ids = this.ids.substring(1)
    },
    handleDel() {
      if (this.ids === '') {
        this.$message({
          showClose: true,
          message: '请勾选列表中需要删除的证书'
        })
      } else {
        this.$confirm('此操作将删除选中的证书，是否继续？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit({
            type: 'FETCH_PAGESIZE',
            pageSize: this.pageSize
          })
          this.delCertificate({
            ids: this.ids
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    caName(scope) {
      let caName = scope.row.ca_name
      const length = caName.length
      if (length < 21) {
        return caName
      } else {
        caName = caName.substring(0,21)
        return caName + '...'
      }
    },
    editSSLName(scope) {
      this.$set(this.caNames,scope.$index,'')
      this.changeEditStatus({
        index: scope.$index,
        status: true
      })
    },
    cancelEditSSLName(scope) {
      this.changeEditStatus({
        index: scope.$index,
        status: false
      })
    },
    saveSSLName(scope) {
      let notice = ''
      const caName = this.caNames[scope.$index]
      if (!caName.length) {
        notice = '请填写证书名称'
      } else if (caName.length < 4) {
        notice = '证书名称至少需要4个字符'
      } else if (caName.length > 30) {
        notice = '证书名称最长不超过30个字符'
      } else if (!(/^[a-zA-Z0-9\u4e00-\u9fa5]{4,30}$/g.test(caName))) {
        notice = '证书名称仅支持英文字母、数字、汉字'
      }
      if (notice) {
        this.$message({
          showClose: true,
          message: notice
        })
        return
      } else {
        this.editCertificate({
          id: scope.row.id,
          ca_name: caName
        })
      }
    },
    isShowCAName(scope) {
      const length = scope.row.ca_name.length
      return length < 21
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 20],
      pageSize: 5,
      ids: '',
      caNames: []
    }
  }
}
</script>

<style>
.reset > .el-table td {
  height: 48px;
}
.selection.is-leaf .cell {
  padding-right: 0;
}
.el-pagination {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>

<style scoped>
.handle-ssl {
  padding: 0;
}
.separator {
  color: #d7d7d7;
}
</style>
