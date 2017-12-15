<template lang="html">
<div class="user-box">
  <div class="title-box">
    <h4 class="user-title">修改密码</h4>
  </div>
  <div class="modify-box">
    <el-form :model="dynamicValidateForm" :rules="rules" ref="ruleForm" label-width="100px" class="read-box" label-position="left">
      <el-form-item label="手机或邮箱" prop="username">
        <el-input v-model="dynamicValidateForm.username" class="user-input"> </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="dynamicValidateForm.captcha">
          <el-button slot="append" @click="mobileCode($event)" class="send-btn" v-bind:disabled="usernameDisabled">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPassword">
        <el-input type="password" v-model="dynamicValidateForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repeatNewPassword">
        <el-input type="password" v-model="dynamicValidateForm.repeatNewPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register-btn" @click="modifyPass">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import SourceUserResource from '../../assets/js/resource/SourceUserResource'
import {
  addTimer,
  validate,
  asciiValidate,
  addDisable
} from 'common/assets/js/normal'
import {
  judgeEmpty
} from '../../assets/js/normal'
export default {
  data() {
    const that = this

    function validateUsername(rule, value, callback) {
      if (value === '' || validate.phone.test(value) === true || validate.email.test(value) === true) {
        callback()
      } else {
        callback(new Error('请输入正确的手机或邮箱格式'))
      }
    }

    function validatePass(rule, value, callback) {
      const psdLevel = asciiValidate(value)
      const containSpace = value.indexOf(' ')
      const valLen = value.length
      if (value) {
        if (that.dynamicValidateForm.newPassword !== '') {
          that.$refs.ruleForm.validateField('repeatNewPassword')
        }
        if (!(psdLevel >= 2 && psdLevel <= 4) || containSpace !== -1 || valLen < 6 || valLen > 20) {
          callback(new Error('长度6——20位，含大写字母，小写字母、数字及标点中的两种'))
        }
      }
      callback()
    }

    function validatePass2(rule, value, callback) {
      if (value === '') {
        callback()
      } else if (value !== that.dynamicValidateForm.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }

    function validateCaptcha(rule, value, callback) {
      if (value) {
        if (validate.code.test(value) === false) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      usernameDisabled: false,
      dynamicValidateForm: {
        username: '',
        captcha: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      info: {
        username: '手机或邮箱',
        captcha: '验证码',
        newPassword: '密码',
        repeatNewPassword: '重复密码'
      },
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        // captcha: [{
        //   validator: validateCaptcha,
        //   trigger: 'blur'
        // }],
        newPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        repeatNewPassword: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    mobileCode(e) {
      const tar = e.target || e.srcElement
      if (this.dynamicValidateForm.username === '') {
        this.$message.error('手机或邮箱格式错误')
      } else {
        SourceUserResource.modifyPassSendCap({
            username: this.dynamicValidateForm.username
          })
          .then(response => {
            if (response.data.status.code === 1) {
              addDisable(tar)
              addTimer(tar, 60)
            } else {
              this.$message.error(response.data.status.message)
            }
          })
      }
    },
    modifyPass() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.dynamicValidateForm, this.info) === true) {
            SourceUserResource.modifyPass(this.dynamicValidateForm)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message({
                    message: response.data.status.message,
                    type: 'success',
                    duration: 2000,
                    onClose() {
                      window.location.reload()
                    }
                  })
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
            // .catch(error => {
            //   if (error.response.status === 500 && error.response.data.error === 'No token') {
            //     SourceWebResource.getToken()
            //   } else {
            //     this.$message.error(error.response.data.error)
            //   }
            // })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
h4 {
  font-weight: 100;
}

.user-box {
  margin: 15px;
  background: #fff;
}

.read-box {
  width: 433px;
}

.modify-box {
  padding: 25px;
}

.send-btn {
  cursor: pointer;
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
</style>
