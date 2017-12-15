<template lang="html">
<div>
  <div class="user-box">
    <div class="title-box">
      <h4 class="user-title">用户信息</h4>
    </div>
    <div class="info-box">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="read-box" label-position="left">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dynamicValidateForm.email" class="user-input" readonly="readonly" unselectable="on"> <span slot="append" class="user-status" v-bind:class="[infoStatus.bindEmail===0 ? 'unbind' : 'binded']">{{infoStatus.bindEmail|filterEmail}}</span></el-input>
          <el-button class="fitsize" @click="emailFormVisible = true" v-if="infoStatus.bindEmail===0">绑定</el-button>
          <el-button class="fitsize" v-bind:class="{'bindStyle':infoStatus.bindEmail===0}" @click="emailEditFormVisible=true">修改</el-button>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="dynamicValidateForm.mobile" readonly="readonly"><span slot="append" class="user-status" v-bind:class="[infoStatus.bindMobile===0 ? 'unbind' : 'binded']">{{infoStatus.bindMobile|filterMobile}}</span></el-input>
          <el-button class="fitsize" @click="phoneBindFormVisible=true" v-if="infoStatus.bindMobile===0">绑定</el-button>
          <el-button class="fitsize" @click="phoneFormVisible=true" v-else>修改</el-button>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="dynamicValidateForm.wechat" readonly="readonly"><span slot="append" class="user-status" v-bind:class="[infoStatus.bindWechat===0 ? 'unbind' : 'binded']">{{infoStatus.bindWechat|filterWechat}}</span></el-input>
          <el-button class="fitsize" @click="bindWeixin" v-if="infoStatus.bindWechat===0">绑定</el-button>
          <el-button class="fitsize" @click="unBindWeiXin" v-else>解绑</el-button>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="dynamicValidateForm.qq" readonly="readonly"><span slot="append" class="user-status" v-bind:class="[dynamicValidateForm.qq ? 'binded' : 'unbind']">{{dynamicValidateForm.qq|filterQQ}}</span></el-input>
          <el-button class="fitsize" @click="qqFormVisible=true">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <!--邮箱绑定模态窗-->
  <el-dialog title="绑定邮箱" v-model="emailFormVisible" size="tiny" @close="clearInfo('emailInfo')">
    <el-form :rules="emailRules" :model="emailInfo" ref="emailInfo">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="emailInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="emailInfo.captcha">
          <el-button slot="append" @click="emailCode($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="emailFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="bindEmail()">确 定</el-button>
    </div>
  </el-dialog>
  <!--邮箱修改模态窗-->
  <el-dialog title="邮箱修改" v-model="emailEditFormVisible" size="tiny" @close="clearInfo('modifyEmail')">
    <el-form :rules="modifyEmailRules" :model="modifyEmail" ref="modifyEmail">
      <el-form-item label="原邮箱或手机" prop="username">
        <el-input v-model="modifyEmail.username"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="modifyEmail.oldCaptcha">
          <el-button slot="append" @click="modifyOldEmail($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新邮箱" prop="newEmail">
        <el-input v-model="modifyEmail.newEmail"></el-input>
      </el-form-item>
      <el-form-item label="新邮箱验证码">
        <el-input v-model="modifyEmail.newEmailCaptcha">
          <el-button slot="append" @click="modifyNewEmail($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="emailEditFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyEmailHandle()">确 定</el-button>
    </div>
  </el-dialog>
  <!--手机绑定模态窗-->
  <el-dialog title="绑定手机" v-model="phoneBindFormVisible" size="tiny" @close="clearInfo('bindMobile')">
    <el-form :rules="mobileRules" :model="bindMobile" ref="bindMobile">
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="bindMobile.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="bindMobile.captcha">
          <el-button slot="append" @click="mobileCode($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="phoneBindFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="bindPhone()">确 定</el-button>
    </div>
  </el-dialog>
  <!--手机修改模态窗-->
  <el-dialog title="手机号码修改" v-model="phoneFormVisible" size="tiny" @close="clearInfo('modifyMobile')">
    <el-form :rules="modifyMobileRules" :model="modifyMobile" ref="modifyMobile">
      <el-form-item label="原手机或邮箱" prop="username">
        <el-input v-model="modifyMobile.username"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="modifyMobile.oldCaptcha">
          <el-button slot="append" @click="modifyOldMobile($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新手机号" prop="newMobile">
        <el-input v-model="modifyMobile.newMobile"></el-input>
      </el-form-item>
      <el-form-item label="新手机验证码">
        <el-input v-model="modifyMobile.newMobileCaptcha">
          <el-button slot="append" @click="modifyNewMobile($event)" class="send-btn">发送验证码</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="phoneFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyPhone()">确 定</el-button>
    </div>
  </el-dialog>
  <!--微信模态窗-->
  <el-dialog title="绑定微信" v-model="wechatFormVisible" size="tiny" @close="updateData">
    <div class="fit2D">
      <img :src=wechatInfo.img alt="二维码" class="code-img">
      <h5 class="state">请扫描二维码绑定</h5>
    </div>
  </el-dialog>
  <!--qq模态窗-->
  <el-dialog title="修改QQ" v-model="qqFormVisible" size="tiny" @close="clearInfo('userInfo')">
    <el-form :rules="qqRules" :model="userInfo" ref="userInfo">
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="userInfo.qq"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="qqFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editQQ">确 定</el-button>
    </div>
  </el-dialog>
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
    function validateUsername(rule, value, callback) {
      if (value === '' || validate.phone.test(value) === true || validate.email.test(value) === true) {
        callback()
      } else {
        callback(new Error('请输入正确的手机或邮箱格式'))
      }
    }

    function validateEmail(rule, value, callback) {
      if (value) {
        if (validate.email.test(value) === false) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      }
      callback()
    }

    function validateCaptcha(rule, value, callback) {
      if (value) {
        if (validate.code.test(value) === false) {
          callback(new Error('请输入正确的验证码格式'))
        } else {
          callback()
        }
      }
      callback()
    }

    function validateMobile(rule, value, callback) {
      if (value) {
        if (validate.phone.test(value) === false) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      callback()
    }

    function validateQQ(rule, value, callback) {
      if (value) {
        if (validate.qq.test(value) === false) {
          callback(new Error('请输入正确的QQ格式'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      emailRules: {
        email: [{
          validator: validateEmail,
          trigger: 'blur'
        }]
        // captcha: [{
        //   validator: validateCaptcha,
        //   trigger: 'blur'
        // }]
      },
      modifyEmailRules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        newEmail: [{
          validator: validateEmail,
          trigger: 'blur'
        }],
        oldCaptcha: [{
          validator: validateCaptcha,
          trigger: 'blur'
        }],
        newEmailCaptcha: [{
          validator: validateCaptcha,
          trigger: 'blur'
        }]
      },
      mobileRules: {
        mobile: [{
          validator: validateMobile,
          trigger: 'blur'
        }],
        captcha: [{
          validator: validateCaptcha,
          trigger: 'blur'
        }]
      },
      modifyMobileRules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        newMobile: [{
          validator: validateMobile,
          trigger: 'blur'
        }],
        oldCaptcha: [{
          validator: validateCaptcha,
          trigger: 'blur'
        }],
        newMobileCaptcha: [{
          validator: validateCaptcha,
          trigger: 'blur'
        }]
      },
      qqRules: {
        qq: [{
          validator: validateQQ,
          trigger: 'blur'
        }]
      },
      dynamicValidateForm: {
        email: '',
        mobile: '',
        wechat: '',
        qq: ''
      },
      infoStatus: {
        bindEmail: 0,
        bindMobile: 0,
        bindWechat: 0
      },
      emailBindFormVisible: false,
      emailFormVisible: false,
      emailEditFormVisible: false,
      phoneBindFormVisible: false,
      phoneFormVisible: false,
      wechatFormVisible: false,
      unbindWechatVisible: false,
      qqFormVisible: false,
      loginFormVisible: false,
      emailInfo: {
        email: '',
        captcha: ''
      },
      emailTip: {
        email: '邮箱',
        captcha: '验证码'
      },
      modifyEmail: {
        username: '',
        oldCaptcha: '',
        newEmail: '',
        newEmailCaptcha: ''
      },
      modifyEmailTip: {
        username: '原邮箱或手机',
        oldCaptcha: '验证码',
        newEmail: '新邮箱',
        newEmailCaptcha: '新邮箱验证码'
      },
      wechatInfo: {
        size: '',
        img: '',
        name: ''
      },
      userInfo: {
        account_type: '',
        email: '',
        mobile: '',
        qq: ''

      },
      userInput: {
        username: ''
      },
      bindMobile: {
        mobile: '',
        captcha: ''
      },
      mobileTip: {
        mobile: '手机号',
        captcha: '验证码'
      },
      modifyMobile: {
        username: '',
        oldCaptcha: '',
        newMobile: '',
        newMobileCaptcha: ''
      },
      modifyMobileTip: {
        username: '原手机或邮箱',
        oldCaptcha: '验证码',
        newMobile: '新手机号',
        newMobileCaptcha: '新手机验证码'
      },
      loginInfo: {
        username: '',
        password: ''
      }
    }
  },
  filters: {
    filterEmail(value) {
      if (value === 0) {
        return '未绑定'
      } else {
        return '已绑定'
      }
    },
    filterMobile(value) {
      if (value === 0) {
        return '未绑定'
      } else {
        return '已绑定'
      }
    },
    filterWechat(value) {
      if (value === 0) {
        return '未绑定'
      } else {
        return '已绑定'
      }
    },
    filterQQ(value) {
      if (value) {
        return '已设置'
      } else {
        return '未设置'
      }
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    clearInfo(type) {
      for (const item in this[type]) {
        this[type][item] = ''
      }
      this.$refs[type].resetFields()
    },
    emailCode(e) {
      const tar = e.target || e.srcElement
      if (this.emailInfo.email === '' || validate.email.test(this.emailInfo.email) === false) {
        this.$message.error('邮箱格式错误')
      } else {
        SourceUserResource.emailCode({
            email: this.emailInfo.email
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
    modifyOldEmail(e) {
      const tar = e.target || e.srcElement
      if (this.modifyEmail.username === '') {
        this.$message.error('用户名格式错误')
      } else {
        SourceUserResource.modifyEmailSendOldCap({
            username: this.modifyEmail.username
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
    modifyNewEmail(e) {
      const tar = e.target || e.srcElement
      if (this.modifyEmail.newEmail === '' || validate.email.test(this.modifyEmail.newEmail) === false) {
        this.$message.error('邮箱格式错误')
      } else {
        SourceUserResource.modifyEmailSendNewEmailCap({
            newEmail: this.modifyEmail.newEmail
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
    mobileCode(e) {
      const tar = e.target || e.srcElement
      if (this.bindMobile.mobile === '' || validate.phone.test(this.bindMobile.mobile) === false) {
        this.$message.error('手机格式错误')
      } else {
        SourceUserResource.mobileCode({
            mobile: this.bindMobile.mobile
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
    modifyOldMobile(e) {
      const tar = e.target || e.srcElement
      if (this.modifyMobile.username === '') {
        this.$message.error('用户名格式错误')
      } else {
        SourceUserResource.modifyMobileSendOldCap({
            username: this.modifyMobile.username
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
    modifyNewMobile(e) {
      const tar = e.target || e.srcElement
      if (this.modifyMobile.newMobile === '' || validate.phone.test(this.modifyMobile.newMobile) === false) {
        this.$message.error('手机格式错误')
      } else {
        SourceUserResource.modifyMobileSendNewMobileCap({
            newMobile: this.modifyMobile.newMobile
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
    bindEmail() {
      this.$refs.emailInfo.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.emailInfo, this.emailTip) === true) {
            SourceUserResource.bindEmail(this.emailInfo)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message.success(response.data.status.message)
                  this.updateData()
                  this.emailFormVisible = false
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modifyEmailHandle() {
      this.$refs.modifyEmail.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.modifyEmail, this.modifyEmailTip) === true) {
            SourceUserResource.modifyEmail(this.modifyEmail)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message.success(response.data.status.message)
                  this.updateData()
                  this.emailEditFormVisible = false
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    bindPhone() {
      this.$refs.bindMobile.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.bindMobile, this.mobileTip) === true) {
            SourceUserResource.bindMobile(this.bindMobile)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message.success(response.data.status.message)
                  this.updateData()
                  this.phoneBindFormVisible = false
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    bindWeixin() {
      this.wechatFormVisible = true
      SourceUserResource.bindWechat()
        .then(response => {
          if (response.data.status.code === 1) {
            this.wechatInfo.img = response.data.data.qrcodeURL
          } else {
            this.$message.error(response.data.status.message)
          }
        })
    },
    modifyPhone() {
      this.$refs.modifyMobile.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.modifyMobile, this.modifyMobileTip) === true) {
            SourceUserResource.modifyMobile(this.modifyMobile)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message.success(response.data.status.message)
                  this.updateData()
                  this.phoneFormVisible = false
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    unBindWeiXin() {
      SourceUserResource.unBindWeiXin()
        .then(response => {
          if (response.data.status.code === 1) {
            this.$message.success(response.data.status.message)
            this.updateData()
          } else {
            this.$message.error(response.data.status.message)
          }
        })
    },
    editQQ() {
      this.$refs.userInfo.validate(valid => {
        if (valid) {
          if (this.userInfo.qq !== '') {
            SourceUserResource.modifyQq({
                qq: this.userInfo.qq
              })
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message.success(response.data.status.message)
                  this.qqFormVisible = false
                  this.updateData()
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateData() {
      SourceUserResource.getUserInfo()
        .then(response => {
          if (response.status === 200 && response.data.addtime) {
            this.dynamicValidateForm.email = response.data.email
            this.dynamicValidateForm.mobile = response.data.mobile
            this.dynamicValidateForm.qq = response.data.qq
            this.infoStatus.bindEmail = response.data.bindEmail
            this.infoStatus.bindMobile = response.data.bindMobile
            const wechatSize = response.data.weiXin.length
            if (wechatSize !== 0) {
              this.infoStatus.bindWechat = 1
              this.dynamicValidateForm.wechat = response.data.weiXin.nickname
            } else {
              this.infoStatus.bindWechat = 0
              this.dynamicValidateForm.wechat = ''
            }
          }
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="css" scoped>
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

.info-box {
  margin: 27px;
  padding: 1px 10px;
}

.info-box .fitsize {
  position: absolute;
  top: 0;
  left: 103%;
  height: 35px;
  box-sizing: border-box;
}

.user-status {
  font-size: 12px;
  color: #333;
}

.read-box {
  width: 433px;
}

.binded::before,
.unbind::before {
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  right: 85%;
  top: 10px;
}

.binded::before {
  background: url(../../assets/images/bind.svg);
}

.unbind::before {
  background: url(../../assets/images/unbind.svg);
}

.send-btn {
  cursor: pointer;
}

</style><style media="screen">.info-box .el-input-group__append {
  position: absolute;
  /* left: 100%; */
  left: 275px;
  top: 0;
  height: 36px;
  line-height: 36px;
  background: transparent;
  border: 0;
}

.info-box .el-input-group--append {
  position: relative;
}

.info-box .el-input-group--append .el-input__inner {
  border-radius: 4px;
}

.user-input input {
  user-select: none;
}

.fit2D {
  text-align: center;
}

.code-img {
  width: 30%;
}

.info-box .read-box .bindStyle {
  left: 122%;
}
</style>
