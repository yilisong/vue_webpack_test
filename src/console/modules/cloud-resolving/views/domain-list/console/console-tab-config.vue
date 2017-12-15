<template lang="">
<div>
  <div>
  </div>
  <div class="tools-data">
    <p>域名过户 当前账号：3189161745@qq.com，您可以将此域名过户给其他YUNDUN账户</p>
    <p>1.域名状态须为未被锁定</p>
    <p>2.域名过户需要输入接收方邮箱账号,接收方须为YUNDUN注册用户</p>
    <el-button :plain="true" type="success" @click="handleButtonDomainTransfer">过户</el-button>
    <el-button :plain="true" type="success" @click="handleButtonPasswordSetting">设置解锁密码</el-button>
    <el-switch v-model="switchValue" on-color="#13ce66" off-color="#ff4949"></el-switch>
  </div>

  <el-dialog title="域名过户" v-model="domainTransferDialog.visible" size="small" :close-on-click-modal="false" @close="handleDomainTransferDialogClose">
    <el-form :model="domainTransferDialog.editForm" :rules="domainTransferDialog.formRule" ref="domainTransferDialogForm" label-width="150px" label-position="left">
      <el-form-item label="此账户登录密码：" prop="password" :rules="domainTransferDialog.formRule.password">
        <el-input v-model="domainTransferDialog.editForm.password"></el-input>
      </el-form-item>
      <el-form-item label="接收方邮箱：" prop="email" :rules="domainTransferDialog.formRule.email">
        <el-input v-model="domainTransferDialog.editForm.email"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handleDomainTransferDialogClose">取 消</el-button>
      <el-button type="primary" @click="handleDomainTransferDialogSubmit" :loading="domainTransferDialog.submitting">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="解锁密码设置" v-model="passwordSettingDialog.visible" size="small" :close-on-click-modal="false" @close="handlePasswordSettingDialogClose">
    <el-form :model="passwordSettingDialog.editForm" :rules="passwordSettingDialog.formRule" ref="passwordSettingDialogForm" label-width="150px" label-position="left">
      <el-form-item label="设置解锁密码：" prop="password" :rules="passwordSettingDialog.formRule.password">
        <el-input v-model="passwordSettingDialog.editForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认解锁密码：" prop="password2" :rules="passwordSettingDialog.formRule.password2">
        <el-input v-model="passwordSettingDialog.editForm.password2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handlePasswordSettingDialogClose">取 消</el-button>
      <el-button type="primary" @click="handlePasswordSettingDialogSubmit" :loading="passwordSettingDialog.submitting">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="解锁密码修改" v-model="passwordResetDialog.visible" size="small" :close-on-click-modal="false" @close="handlePasswordResetDialogClose">
    <el-form :model="passwordResetDialog.editForm" :rules="passwordResetDialog.formRule" ref="passwordResetDialogForm" label-width="150px" label-position="left">

    </el-form>
    <div slot="footer">
      <el-button @click="handlePasswordResetDialogClose">取 消</el-button>
      <el-button type="primary" @click="handlePasswordResetDialogSubmit" :loading="passwordResetDialog.submitting">保存</el-button>
    </div>
  </el-dialog>

  <el-dialog title="解锁密码找回" v-model="passwordRecoveryDialog.visible" size="small" :close-on-click-modal="false" @close="handlePasswordRecoveryDialogClose">
    <el-form :model="passwordRecoveryDialog.editForm" :rules="passwordRecoveryDialog.formRule" ref="passwordRecoveryDialogForm" label-width="150px" label-position="left">

    </el-form>
    <div slot="footer">
      <el-button @click="handlePasswordRecoveryDialogClose">取 消</el-button>
      <el-button type="primary" @click="handlePasswordRecoveryDialogSubmit" :loading="passwordRecoveryDialog.submitting">保存</el-button>
    </div>
  </el-dialog>

  <password-verify-dialog ref="passwordVerifyDialog" @hello="handleCloseSuccess">
  </password-verify-dialog>
</div>
</template>

<script>
import PasswordVerifyDialog from './password-verify-dialog'
export default {
  components: {
    PasswordVerifyDialog
  },
  data() {
    return {
      switchValue: true,
      domainTransferDialog: {
        visible: false,
        submitting: false,
        editForm: {
          password: '',
          email: ''
        },
        formRule: {
          password: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }]
        }
      },
      passwordSettingDialog: {
        visible: false,
        submitting: false,
        editForm: {
          password: '',
          password2: ''
        },
        formRule: {
          password: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          password2: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }]
        }
      },
      passwordResetDialog: {
        visible: false,
        submitting: false,
        editForm: {

        },
        formRule: {

        }
      },
      passwordRecoveryDialog: {
        visible: false,
        submitting: false,
        editForm: {

        },
        formRule: {

        }
      }
    }
  },
  watch: {
    switchValue(value) {
      if (!value) {
        this.switchValue = true
        this.$refs.passwordVerifyDialog.open()
      } else {}
    }
  },
  methods: {
    handleButtonDomainTransfer() {
      this.domainTransferDialog.visible = true
    },
    handleButtonPasswordSetting() {
      this.passwordSettingDialog.visible = true
    },
    handleCloseSuccess() {
      this.switchValue = false
    },
    handleDomainTransferDialogClose() {
      this.domainTransferDialog.visible = false
    },
    handleDomainTransferDialogSubmit() {
      // this.domainTransferDialog.submitting = true

      this.$refs.domainTransferDialogForm.validate(valid => {
        if (valid) {
          const params = {
            //
          }
          this.fetchPostJSON('', params).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.$message({
                    showClose: true,
                    message: '域名过户提交成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
            }
          })
        } else {}
      })
    },
    handlePasswordSettingDialogClose() {
      this.passwordSettingDialog.visible = false
    },
    handlePasswordSettingDialogSubmit() {
      this.$refs.passwordSettingDialogForm.validate(valid => {
        if (valid) {} else {

        }
      })
    },
    handlePasswordResetDialogClose() {
      this.passwordResetDialog.visible = false
    },
    handlePasswordResetDialogSubmit() {
      this.$refs.passwordResetDialogForm.validate(valid => {
        if (valid) {} else {

        }
      })
    },
    handlePasswordRecoveryDialogClose() {
      this.passwordRecoveryDialog.visible = false
    },
    handlePasswordRecoveryDialogSubmit() {
      this.$refs.passwordRecoveryDialogForm.validate(valid => {
        if (valid) {} else {

        }
      })
    }
  }
}
</script>

<style lang="">

</style>
