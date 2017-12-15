<!-- <template lang="html">
<console-page-layout title="自定义线路">
  <div>
    <!-- 暂时不上 -->
    <!-- <el-button :plain="true" type="success" icon="plus" size="small" @click="handleButtonAdd">
      添加
    </el-button> -->
  </div>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-table textalign :data="viewList" v-loading="tableLoading" element-loading-text="拼命加载中" fit stripe highlight-current-row style="width: 100%">
        <el-table-column header-align="center" prop="name" label="线路名称" min-width="120"></el-table-column>
        <el-table-column header-align="center" prop="ip_block" label="IP段" min-width="120"></el-table-column>
        <el-table-column header-align="center" label="操作" min-width="190">
          <template scope="scope">
              <div>
                <!-- <el-button type="text" size="small" @click="handleViewOperate('edit', scope.row)">修改</el-button> -->
                <el-popover ref="popover" placement="top" width="160" v-model="popoverArray[scope.$index].flag" trigger="click">
                  <p style="word-break: break-all;">您确定删除线路 {{scope.row.name}} 吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click.native.prevent="handleViewOperate('deleteCancel', scope.row, scope.$index)">取消</el-button>
                    <el-button size="mini" type="primary" @click.native.prevent="handleViewOperate('deleteOk', scope.row, scope.$index)">确定</el-button>
                  </div>
                </el-popover>
                <el-button type="text" size="small" v-popover:popover>删除</el-button>
              </div>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" :page-sizes="paginationParam.pageSizes" :page-size="paginationParam.pageSize" :total="paginationParam.totalCount"
          :current-page="paginationParam.currentPage">
      </el-pagination>
    </el-tabs>
  </div>


  <el-dialog title="新增线路" v-model="viewAddDialog.visible" size="small" :close-on-click-modal="false" @close="handleViewAddDialogClose">
    <!-- <div class="sub-title"></div> -->
    <p>1.自定义线路,请填写IP段(用-分割如:1.1.1.1-1.2.2.2)</p>
    <p>支持CIDR表示方式比如：192.168.1.1/24</p>
    <p>2.多个线路之间不容许有IP交叉</p>
    <el-form :model="viewAddDialog.editForm" :rules="viewAddDialog.formRule" ref="viewAddDialogForm" label-width="100px">
      <el-form-item label="线路名称" prop="name" :rules="viewAddDialog.formRule.name">
        <el-input v-model.trim="viewAddDialog.editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP段" prop="ipblock" :rules="viewAddDialog.formRule.ipblock">
        <el-input v-model.trim="viewAddDialog.editForm.ipblock" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="viewAddDialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="handleViewAddDialogSubmit" :loading="viewAddDialog.submitting">添 加</el-button>
    </div>
  </el-dialog>

  <el-dialog title="编辑线路" v-model="viewEditDialog.visible" size="small" :close-on-click-modal="false" @close="handleViewEditDialogClose">
    <el-form :model="viewEditDialog.editForm" :rules="viewEditDialog.formRule" ref="viewEditDialogForm" label-width="100px">
      <el-form-item label="线路名称" prop="name" :rules="viewEditDialog.formRule.name">
        <el-input v-model.trim="viewEditDialog.editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="IP段" prop="ipblock" :rules="viewEditDialog.formRule.ipblock">
        <el-input v-model.trim="viewEditDialog.editForm.ipblock" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="viewEditDialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="handleViewEditDialogSubmit" :loading="viewEditDialog.submitting">添 加</el-button>
    </div>
  </el-dialog>

</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ResolvingResource from '../../resource/ResolvingResource'
export default {
  components: {
    ConsolePageLayout
  },
  data() {
    return {
      popoverArray: [],
      tableLoading: false,
      activeName: 'first',

      viewList: [],
      paginationParam: {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
      },
      viewAddDialog: {
        visible: false,
        submitting: false,
        editForm: {},
        formRule: {
          name: [{
            required: true,
            message: '请输入线路名称',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          ipblock: [{
            required: true,
            message: '请输入IP段',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }]
        }
      },
      viewEditDialog: {
        visible: false,
        submitting: false,
        editForm: {},
        formRule: {
          name: [{
            required: true,
            message: '请输入线路名称',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          ipblock: [{
            required: true,
            message: '请输入IP段',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }]
        }
      }
    }
  },
  created() {
    this.fetchViewList()
  }
  // methods: {
  //   handleViewOperate(operate, row, index) {
  //     const id = row.id
  //     switch (operate) {
  //       case 'edit': // 编辑
  //         this.viewEditDialog.editForm = {
  //           name: row.name,
  //           ipblock: row.ip_block
  //         }
  //         this.viewEditDialog.visible = true
  //         break
  //       case 'deleteCancel':
  //         this.popoverArray[index].flag = false
  //         break
  //       case 'deleteOk': // 删除
  //         this.popoverArray[index].flag = false
  //         this.fetchPost('CloudDns.DiyViews.delete', {
  //           id
  //         }).then(res => {
  //           if (res.ok) {
  //             res.json().then(data => {
  //               if (data && data.status.code === 1) {
  //                 this.$message({
  //                   showClose: true,
  //                   message: '删除成功',
  //                   type: 'success'
  //                 })
  //               } else {
  //                 this.$message({
  //                   showClose: true,
  //                   message: data.status.message,
  //                   type: 'error'
  //                 })
  //               }
  //             })
  //             this.fetchViewList()
  //           }
  //         })
  //         break
  //       default:
  //     }
  //   },
  //   handleButtonAdd() {
  //     this.viewAddDialog.editForm = {}
  //     this.viewAddDialog.visible = true
  //   },
  //   handleClick(tab, event) {
  //     console.log(tab, event)
  //   },
  //   handlePaginationSizeChange(size) {
  //     this.paginationParam.pageSize = size
  //     this.fetchViewList(true)
  //   },
  //   handlePaginationCurrentPageChange(currentPage) {
  //     this.paginationParam.currentPage = currentPage
  //     this.fetchViewList()
  //   },
  //   formatter(data) {
  //     const result = data
  //     result.forEach(v => {
  //       this.popoverArray.push({
  //         flag: false
  //       })
  //     })
  //     return result
  //   },
  //   fetchViewList(resetPage = false) {
  //     this.tableLoading = true
  //     this.paginationParam.currentPage = resetPage ? 1 : this.paginationParam.currentPage
  //     const params = {
  //       page: this.paginationParam.currentPage,
  //       per_page: this.paginationParam.pageSize
  //     }
  //     this.fetchGet('CloudDns.DiyViews.list', params).then(
  //       result => {
  //         if (result.ok) {
  //           result.json().then(res => {
  //             if (res && (res.status.code === 1) && res.data && res.data.list) {
  //               this.viewList = this.formatter(res.data.list)
  //               this.paginationParam.totalCount = Number(res.data.total)
  //             }
  //           })
  //         }
  //         this.tableLoading = false
  //       },
  //       e => {
  //         this.tableLoading = false
  //       })
  //   },
  //   handleViewAddDialogClose() {
  //     this.viewAddDialog.visible = false
  //     this.viewAddDialog.submitting = false
  //     this.$refs.viewAddDialogForm.resetFields()
  //   },
  //   handleViewAddDialogSubmit() {
  //     this.viewAddDialog.submitting = true
  //
  //     this.$refs.viewAddDialogForm.validate(valid => {
  //       if (valid) {
  //         this.fetchPost('CloudDns.DiyViews.add', {
  //           name: this.viewAddDialog.editForm.name,
  //           ip_block: this.viewAddDialog.editForm.ipblock
  //         }).then(res => {
  //           if (res.ok) {
  //             res.json().then(data => {
  //               if (data && data.status.code === 1) {
  //                 this.$message({
  //                   showClose: true,
  //                   message: '添加成功',
  //                   type: 'success'
  //                 })
  //               } else {
  //                 this.$message({
  //                   showClose: true,
  //                   message: data.status.message,
  //                   type: 'error'
  //                 })
  //               }
  //             })
  //             this.viewAddDialog.visible = false
  //             this.fetchViewList(true)
  //           }
  //         })
  //       } else {
  //         this.viewAddDialog.submitting = false
  //         return false
  //       }
  //     })
  //   },
  //   handleViewEditDialogClose() {
  //     this.viewEditDialog.visible = false
  //     this.viewEditDialog.submitting = false
  //     this.$refs.viewEditDialogForm.resetFields()
  //   },
  //   handleViewEditDialogSubmit() {
  //     this.viewEditDialog.submitting = true
  //
  //     this.$refs.viewEditDialogForm.validate(valid => {
  //       if (valid) {
  //         this.fetchPost('CloudDns.DiyViews.edit', {
  //           id: '',
  //           name: this.viewEditDialog.editForm.name,
  //           ip_block: this.viewEditDialog.editForm.ipblock
  //         }).then(res => {
  //           if (res.ok) {
  //             res.json().then(data => {
  //               if (data && data.status.code === 1) {
  //                 this.$message({
  //                   showClose: true,
  //                   message: '修改成功',
  //                   type: 'success'
  //                 })
  //               } else {
  //                 this.$message({
  //                   showClose: true,
  //                   message: data.status.message,
  //                   type: 'error'
  //                 })
  //               }
  //             })
  //             this.viewEditDialog.visible = false
  //             this.fetchViewList(true)
  //           }
  //         })
  //       } else {
  //         this.viewEditDialog.submitting = false
  //         return false
  //       }
  //     })
  //   }
  // }
}
</script>

<style>
.el-table .cell {
  text-align: center;
}
</style>
