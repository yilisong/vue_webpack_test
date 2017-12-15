<template lang="html">
<website-layout>
  <div class="register-box">
    <div class="info-box">
      <h4 class="title">账号注册</h4>
      <el-form :model="ruleForm" :rules="rules" :show-message=false ref="ruleForm" class="register-form">
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" class="website-common-input" @focus="holder.email=false" @blur="judgeContent('email')"></el-input>
          <tipbox v-bind:message="tip.msg.email" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.email"></tipbox>
          <span class="tip-block" v-show="holder.email">邮箱</span>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input type="text" v-model="ruleForm.mobile" auto-complete="off" class="website-common-input" @focus="holder.mobile=false" @blur="judgeContent('mobile')"></el-input>
          <tipbox v-bind:message="tip.msg.phone" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.phone"></tipbox>
          <span class="tip-block" v-show="holder.mobile">手机号</span>
        </el-form-item>
        <el-form-item prop="cap" class="splitline-box">
          <el-input type="text" v-model="ruleForm.cap" auto-complete="off" class="website-common-input" @focus="holder.cap=false" @blur="judgeContent('cap')">
            <el-button slot="append" v-on:click.native="sendCode($event)" class="into-btn">发送验证码</el-button>
          </el-input>
          <tipbox v-bind:message="tip.msg.cap" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.cap"></tipbox>
          <span class="tip-block" v-show="holder.cap">短信验证码</span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" class="website-common-input" @focus="focusPass" @blur="blurPass"></el-input>
          <tipbox v-bind:message="message" v-bind:isError="isError" v-bind:isShow="isShow"></tipbox>
          <tipbox v-bind:message="tip.msg.password" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.password"></tipbox>
          <span class="tip-block" v-show="holder.password">密码</span>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input type="password" v-model="ruleForm.password_repeat" auto-complete="off" class="website-common-input" @focus="holder.password_repeat=false" @blur="judgeContent('password_repeat')"></el-input>
          <tipbox v-bind:message="tip.msg.password_repeat" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.password_repeat"></tipbox>
          <span class="tip-block" v-show="holder.password_repeat">确认密码</span>
        </el-form-item>
        <el-form-item class="state-position">
          注册表示您同意并遵守<a href="about#/legalNotice" target="_blank">《服务条款》</a><a href="/login" class="jump-login">已有账号?</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="register-btn">注册</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import {
  judgeSend,
  dataSwitch
} from '../../static/js/normal'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  addTimer,
  validate,
  asciiValidate,
  addDisable,
  returnOrigin,
  JSONP
} from 'common/assets/js/normal'
import tipbox from '../../components/tipbox'
import SourceWebResource from '../../static/js/SourceWebResource'
export default {
  data() {
    // var validateEmail = (rule, value, callback) =>
    const that = this

    function validateEmail(rule, value, callback) {
      if (value) {
        if (validate.email.test(value) === false) {
          that.tip.msg.email = '请输入正确的邮箱格式'
          dataSwitch('email', that.tip.isShow)
          callback(new Error())
        } else {
          that.tip.isShow.email = false
        }
      } else {
        that.tip.isShow.email = false
      }
      callback()
    }

    function validateMobile(rule, value, callback) {
      if (value) {
        if (validate.phone.test(value) === false) {
          that.tip.msg.phone = '请输入正确的手机格式'
          dataSwitch('phone', that.tip.isShow)
          callback(new Error())
        } else {
          that.tip.isShow.phone = false
        }
      } else {
        that.tip.isShow.phone = false
      }
      callback()
    }

    function validatePass(rule, value, callback) {
      const psdLevel = asciiValidate(value)
      const containSpace = value.indexOf(' ')
      const valLen = value.length
      if (value) {
        if (that.ruleForm.password_repeat !== '') {
          that.$refs.ruleForm.validateField('password_repeat')
        }
        if (!(psdLevel >= 2 && psdLevel <= 4) || containSpace !== -1 || valLen < 6 || valLen > 20) {
          that.tip.msg.password = '请输入正确的密码格式'
          dataSwitch('password', that.tip.isShow)
          callback(new Error())
        } else {
          that.tip.isShow.password = false
        }
      } else {
        that.isShow = false
        that.tip.isShow.password = false
      }
      callback()
    }

    function validatePass2(rule, value, callback) {
      if (value === '') {
        callback()
        that.tip.isShow.password_repeat = false
      } else if (value !== that.ruleForm.password) {
        that.tip.msg.password_repeat = '两次密码输入不一致'
        dataSwitch('password_repeat', that.tip.isShow)
        callback(new Error())
      } else {
        callback()
        that.tip.isShow.password_repeat = false
      }
    }
    return {
      ruleForm: {
        email: '',
        mobile: '',
        cap: '',
        password: '',
        password_repeat: ''
      },
      info: {
        email: '邮箱',
        mobile: '手机号',
        cap: '短信验证码',
        password: '密码',
        password_repeat: '确认密码'
      },
      rules: {
        email: [{
          validator: validateEmail,
          trigger: 'blur'
        }],
        mobile: [{
          validator: validateMobile,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        password_repeat: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      },
      tip: {
        msg: {
          email: '',
          phone: '',
          cap: '',
          password: '',
          password_repeat: ''
        },
        isShow: {
          email: false,
          phone: false,
          cap: false,
          password: false,
          password_repeat: false
        },
        isError: true
      },
      message: '长度6——20位，含大写字母，小写字母、数字及标点中的两种',
      isError: false,
      isShow: false,
      holder: {
        email: true,
        mobile: true,
        cap: true,
        password: true,
        password_repeat: true
      }
    }
  },
  mounted() {
    SourceWebResource.getUserInfo().then(response => {
      if (response.status === 200) {
        if (!(
            response.data.http_status_code &&
            response.data.http_status_code === 204
          ))
          window.location = returnOrigin()
      }
    }).catch(error => {
      JSONP.getJSON(
        BASE_URL + '/sso/V4/attach', {
          callback: '?'
        },
        res => {}
      )
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (judgeSend(this.ruleForm, this.info) === true) {
            SourceWebResource.register(this.ruleForm)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message({
                    message: response.data.status.message,
                    type: 'success',
                    duration: 2000,
                    onClose() {
                      window.location = returnOrigin() + '/login'
                    }
                  })
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
              .catch(error => {
                if (error.response.status === 500 && error.response.data.error === 'No token') {
                  SourceWebResource.getToken()
                } else {
                  this.$message.error(error.response.data.error)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    sendCode(e) {
      const tar = e.target || e.srcElement
      this.tip.isShow.cap = false
      if (this.ruleForm.mobile === '' || validate.phone.test(this.ruleForm.mobile) === false) {
        this.tip.msg.cap = '手机格式错误'
        this.tip.isShow.cap = true
      } else {
        SourceWebResource.getCap({
            mobile: this.ruleForm.mobile
          })
          .then(response => {
            if (response.data.status.code === 1) {
              addDisable(tar)
              addTimer(tar, 60)
            } else {
              this.tip.msg.cap = response.data.status.message
              this.tip.isShow.cap = true
            }
          })
      }
    },
    judgeContent(type) {
      for (const i in this.holder)
        this.holder[i] = this.ruleForm[i] === ''
    },
    focusPass() {
      this.tip.isShow.password === false ? this.isShow = true : this.isShow = false
      this.holder.password = false
    },
    blurPass() {
      this.isShow = false
      this.judgeContent('password')
    }
  },
  components: {
    websiteLayout,
    tipbox
  }
}
</script>
<style lang="css">
@import '../../static/css/common.css';
</style><style lang="css" scoped>.register-box a {
  color: #2d90e6;
}

.register-box {
  width: 1200px;
  margin: 0 auto;
}

.info-box {
  width: 350px;
  margin: 120px auto;
}

.info-box .title {
  font-size: 18px;
  font-weight: 100;
  color: #333;
  margin-bottom: 52px;
}

.splitline-box::after {
  content: "";
  display: block;
  width: 600px;
  margin: 27px 0;
  height: 1px;
  background: linear-gradient(to right, #fff, #e2e2e2, #ccc, #e2e2e2, #fff);
  margin-left: -117px;
}


/*.register-box .register-btn {
  padding: 10px 45px;
}*/

.register-box .state-position {
  margin-top: -13px;
}

.register-box .jump-login {
  margin-left: 52px;
}

.register-form .el-form-item {
  margin-bottom: 12px;
}

.register-btn {
  padding: 10px 45px;
}

.tip-block {
  position: absolute;
  top: 1px;
  left: 12px;
  color: #97a8be;
}

</style><style>.register-box .el-form-item__content {
  min-width: 1000px;
  max-width: 1200px;
}

.register-box .el-input {
  width: 343px;
}
</style>
