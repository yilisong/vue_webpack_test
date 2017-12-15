<template lang="html">
<el-dialog title="域名过户" v-model="visible" size="small" :close-on-click-modal="false" @close="handleDialogClose">
  <el-form :model="editForm" :rules="formRule" ref="dialogForm" label-width="120px" label-position="left">
    <el-input v-model="editForm.input" placeholder="请输入内容"></el-input>
  </el-form>
  <div slot="footer">
    <el-button @click="handleDialogClose">取 消</el-button>
    <el-button type="primary" @click="handleDialogSubmit" :loading="submitting">保存</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      submitting: false,
      editForm: {
        input: ''
      },
      formRule: {

      }
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    handleDialogClose() {
      console.log('???????')
      this.visible = false
    },
    handleDialogSubmit() {
      // this.$refs.dialogForm

      const params = {
        // domain_id
      }
      this.fetchPostJSON('CloudDns.Domain.DomainLock.setUnLockPass', params).then(result => {

      })
    }
  }
}
</script>

<style lang="css">

</style>
