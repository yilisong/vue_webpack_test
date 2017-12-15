<template lang="html">
  <el-dialog title="添加证书" :visible.sync="sslConfigVisible" :close-on-click-modal="true" class="addCertificate" @close="resetForm('sslForm')">
    <Tip :content="tipContent" mode="static"/>
    <el-form ref="sslForm" :model="form" :rules="certificateRules" label-width="70px">
      <el-form-item class="is-required" label="证书名称" prop="ca_name">
        <el-input class="input" v-model="form.ca_name" auto-complete="off" placeholder="请填写证书名称"></el-input>
      </el-form-item>
      <el-form-item label="证书文件" prop="ca_crt_file_name">
        <el-input class="input" v-model="form.ca_crt_file_name" auto-complete="off" placeholder="上传公钥" :disabled="true">
        </el-input>
        <label class="inputfile" for="ca_crt" @click="monitorUpload('ca_crt')">上传</label>
        <input class="hide" type="file" name="ca_crt" id="ca_crt">
      </el-form-item>
      <el-form-item label="证书私钥" prop="ca_key_file_name">
        <el-input class="input" v-model="form.ca_key_file_name" auto-complete="off" placeholder="上传私钥" :disabled="true">
        </el-input>
        <label class="inputfile" for="ca_key" @click="monitorUpload('ca_key')">上传</label>
        <input class="hide" type="file" name="ca_key" id="ca_key">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" v-if="!underIE10" @click="submitForm('sslForm')">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import 'common/assets/styles/helper-class.css'
import Tip from 'common/components/Tip/Tip'
import { mapActions } from 'vuex'

export default {
  components: {
    Tip
  },
  created() {
    if (navigator.userAgent.indexOf('MSIE 9.0') > -1) {
      this.tipContent.unshift('0.添加证书需要IE10或以上版本支持,请更新或者换其他浏览器')
      this.underIE10 = true
    }
    this.$store.watch(
      state => state.dialog.sslConfig.visible,
      visible => {
        this.sslConfigVisible = visible
      }
    )
  },
  methods: {
    ...mapActions([
      'triggerSSLConfigVisible',
      'addCertificate'
     ]),
    // validate form before submiting
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleAdd()
        } else {
          this.$message({
            message: '你提交的信息不符规范，请核对后再提交',
            type: 'info'
          })
        }
      })
    },
    // @close reset sslForm
    resetForm(formName) {
      this.$refs[formName].resetFields()
      document.forms[0].reset()
      this.triggerSSLConfigVisible(false)
    },
    monitorUpload(id) {
      const dom = document.getElementById(id)
      dom.addEventListener('change',() => {
        const fileName = dom.files[0].name
        if (id === 'ca_crt') {
          this.form.ca_crt_file_name = fileName
        } else {
          this.form.ca_key_file_name = fileName
        }
      })
    },
    // add certificate
    handleAdd() {
      const input = document.querySelectorAll('input[type="file"]')
      const data = new FormData()
      const length = input.length
      for (let i = 0; i < length; i++) {
        const name = input[i].name
        const file = input[i].files[0]
        data.append(name, file)
      }
      for (const i in this.form) {
        data.append(i, this.form[i])
      }
      this.addCertificate(data)
    },
    handleCancel() {
      this.triggerSSLConfigVisible(false)
    }
  },
  data() {
    function validateName(rule, value, callback) {
      if (!value) {
        callback(new Error('请填写证书名称'))
      } else if (value.length < 4) {
        callback(new Error('证书名称至少需要4个字符'))
      } else if (value.length > 30) {
        callback(new Error('证书名称最长不超过30个字符'))
      } else if (!(/^[a-zA-Z0-9\u4e00-\u9fa5]{4,30}$/g.test(value))) {
        callback(new Error('证书名称仅支持英文字母、数字、汉字'))
      }  else {
        callback()
      }
    }
    return {
      // add certificate
      underIE10: false,
      sslConfigVisible: false,
      // certificate form
      form: {
        ca_name: '',
        ca_crt_file_name: '',
        ca_key_file_name: ''
      },
      certificateRules: {
        ca_name: [
          { validator: validateName, trigger: 'blur' }
        ],
        ca_crt_file_name: [
          { required: true, message: '请选择证书文件', trigger: 'blur' }
        ],
        ca_key_file_name: [
          { required: true, message: '请选择证书私钥', trigger: 'blur' }
        ]
      },
      // data
      tipContent: [
        '1.证书私钥格式只支持pem格式，其他格式需要转换为pem格式,',
        '2.如果私钥有密码，请先去掉密码,',
        '3.证书名称仅支持英文字母、数字、汉字，最长30个字符'
      ]
    }
  }
}
</script>

<style>
/*reset UI-form*/
.addCertificate .el-form-item__label {
  text-align: left;
}
.addCertificate .el-form-item {
  margin-bottom: 20px;
}
.addCertificate .el-form-item:last-child {
  margin-bottom: 0;
}
.addCertificate .input {
  width: 300px;
  vertical-align: top;
}
/*reset UI-dialog*/
.addCertificate .el-dialog {
  width: 580px;
}
.addCertificate .el-dialog__body {
  padding: 16px;
  overflow: hidden;
}
.addCertificate .el-dialog__footer {
  padding: 8px 16px 16px;
}
/*beautify input[type="file"]*/
.inputfile{
  display: inline-block;
  margin-left: 10px;
  padding: 0 15px;
  height: 28px;
  font-size: 12px;
  line-height: 28px;
  color: #000;
  background: #fff;
  border: 1px solid #adadad;
  border-radius: 2px;
  cursor: pointer;
  vertical-align: top;
}
.inputfile:hover {
  color: #fff;
  background-color: #2d90e6;
  border: 1px solid #2d90e6;
}
.inputfile:active {
  color: #fff;
  background-color: #2d90cc;
  border: 1px solid #2d90cc;
}
</style>
