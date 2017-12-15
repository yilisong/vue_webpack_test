<template lang="html">
<div class="">

  <div class="box">
    <h4>个人升级为企业</h4>
    <el-form :model="dynamicValidateForm" :rules="rules" ref="companyForm" label-width="100px" class="dynamic-box">
      <el-form-item prop="company_name" label="企业名称">
        <el-input v-model="dynamicValidateForm.company_name"></el-input>
      </el-form-item>
      <el-form-item class="company_tyshxy_card" prop="company_tyshxy_card" label="统一社会信用代码">
        <el-input v-model="dynamicValidateForm.company_tyshxy_card"></el-input>
      </el-form-item>
      <div class="">
        <label for="" class="tip-required">&nbsp;营业执照</label>
        <el-upload class="upload-box-company" drag :action="uploadAdd" :before-upload="limit" :fileList="fileList" list-type="picture" :on-success="getPicUrl" :on-remove="handleRemove" name="company_yyzz_pic">
          <i class="el-icon-upload"></i>
          <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>

      </div>
    </el-form>
  </div>
  <div class="box example-company">
    <span class="word">示例：</span>
    <img class="image-company" src="../../../assets/images/business_license.png" alt="营业执照示例">
  </div>
  <hr>
  <div class="contact-container">
    <div class="box">
      <h4>联系信息</h4>
      <el-form :model="dynamicValidateForm" ref="contactInfo" :rules="rules2" label-width="100px" class="dynamic-box">
        <el-form-item prop="company_concat_name" label="姓名">
          <el-input v-model="dynamicValidateForm.company_concat_name"></el-input>
        </el-form-item>
        <el-form-item prop="company_concat_mobile" label="手机号码">
          <el-input v-model="dynamicValidateForm.company_concat_mobile"></el-input>
        </el-form-item>
        <el-form-item class>
          <el-button type="primary" @click="submitForm('companyForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import personalBox from './personalBox'
import SourceUserResource from '../../../assets/js/resource/SourceUserResource'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  judgeEmpty
} from '../../../assets/js/normal'
import {
  validate
} from 'common/assets/js/normal'
export default {
  components: {
    personalbox: personalBox
  },
  data() {
    function validateCompanySocialCode(rule, value, callback) {
      if (value) {
        if (validate.socialCode.test(value) === false) {
          callback(new Error('请输入正确的统一社会信用代码'))
        }
      }
      callback()
    }

    function validateCompanyCompanyName(rule, value, callback) {
      if (value) {
        if (validate.companyName.test(value) === false) {
          callback(new Error('请输入正确的公司名称'))
        }
      }
      callback()
    }

    // function validateContactName(rule,value,callback){
    //   if (value) {
    //     if (validate.companyName.test(value) === false) {
    //       callback(new Error('请输入正确的联系人名称'))
    //     }
    //   }
    //   callback()
    // }
    function validateContactMobile(rule, value, callback) {
      if (value) {
        if (validate.phone.test(value) === false) {
          callback(new Error('请输入正确的手机格式'))
        }
      }
      callback()
    }

    return {
      fileList: [],
      uploadAdd: BASE_URL + '/sso/V4/upload/yyzzPic',
      dynamicValidateForm: {
        company_name: '',
        company_tyshxy_card: '',
        company_yyzz_pic: '',
        company_concat_name: '',
        company_concat_mobile: ''
      },
      info: {
        company_name: '企业名称',
        company_tyshxy_card: '统一社会信用代码',
        company_yyzz_pic: '营业执照',
        company_concat_name: '姓名',
        company_concat_mobile: '手机号码'
      },
      rules: {
        company_name: [{
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          },
          {
            validator: validateCompanyCompanyName,
            trigger: 'blur'
          }
        ],
        company_tyshxy_card: [{
          validator: validateCompanySocialCode,
          trigger: 'blur'
        }]
      },
      rules2: {
        company_concat_name: [{
          min: 2,
          max: 32,
          message: '长度在 2 到 32 个字符',
          trigger: 'blur'
        }],
        company_concat_mobile: [{
          validator: validateContactMobile,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleRemove(file) {
      this.dynamicValidateForm.company_yyzz_pic = ''
    },
    limit(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG/PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    submitForm(formName) {
      // this.$refs.companyForm.validate(valid => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })

      this.$refs[formName].validate(valid => {
        if (valid) {
          if (judgeEmpty(this.dynamicValidateForm, this.info) === true) {
            SourceUserResource.personalUpgradeCompany(this.dynamicValidateForm)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$store.dispatch('getBasicinfo')
                } else {
                  this.$message({
                    message: response.data.status.message,
                    type: 'error'
                  })
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$refs.companyForm.validate(valid => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    getPicUrl(response, file, fileList) {
      if (response.code === 1) {
        this.dynamicValidateForm.company_yyzz_pic = response.data.real_url
        this.fileList.push({
          name: response.data.key,
          url: response.data.real_url
        })
        console.log(this.fileList, '00000dsds000000099999')
        if (this.fileList.length !== 1) {
          this.fileList.forEach((item, i) => {
            if (item.name !== file.name)
              this.fileList.splice(i, 1)
          })
        }
      } else {
        this.fileList = []
        this.$message({
          message: response.status.message,
          type: 'error'
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  display: inline-block;
  vertical-align: top;
  width: 600px;
}

.example-company {
  position: relative;
  height: 467px;
}

.tip-required {
  font-size: 14px;
  color: #48576a;
  margin-top: 5px;
  margin-left: -3px;
}

.tip-required span {
  color: red;
}


/*.tip-required:first-letter{
  color: red;
}*/

.upload-box-company {
  width: 333px;
  margin-left: 112px;
  margin-bottom: 30px;
  display: inline-block;
  margin-left: 127px;
}

.btn-location-company {
  margin-left: 0;
}

.image-company {
  padding: 5px 110px;
  border: 1px dashed #D6D6D6;
  border-radius: 5px;
  position: absolute;
  bottom: 108px;
  left: 100px;
}

.word {
  position: absolute;
  bottom: 213px;
  left: 10px;
  color: #2EA1E9;
  font-size: 14px;
}

hr {
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #efefef;
  height: 1px;
  margin-top: -9px;
}

.contact-container {
  margin-top: 25px;
}

</style><style>.dynamic-box .el-form-item__content {
  display: inline-block;
  vertical-align: top;
  margin-left: 87px!important;
}

.dynamic-box input {
  width: 333px;
}

.upload-box-company .el-upload-dragger {
  width: 333px;
}

.upload-box-company .el-upload__tip {
  color: red!important;
}

.dynamic-box .btn-location-company .el-form-item__content {
  margin-left: 0!important;
  margin-bottom: 0 !important;
}


/*.dynamic-box .el-button--primary {
  padding: 10px 54px!important;
  letter-spacing: 2px;
  display: block;
}*/

.dynamic-box .company-code label {
  width: 139px!important;
}

.dynamic-box .company-code .el-form-item__content {
  margin-left: 48px!important;
}

</style><style lang="css" scoped>.box {
  display: inline-block;
  vertical-align: top;
  width: 600px;
}

.example {
  position: relative;
  height: 525px;
}

.tip-required {
  font-size: 14px;
  color: #48576a;
  margin-top: 5px;
}

.tip-required span {
  color: red;
}


/*.tip-required:first-letter{
  color: red;
}*/

.upload-box {
  width: 333px;
  margin-left: 98px;
  margin-bottom: 30px;
  display: inline-block;
}

.btn-location {
  margin-left: 0;
}

.image {
  width: 330px;
  border: 1px dashed #D6D6D6;
  border-radius: 5px;
  position: absolute;
  bottom: 108px;
  left: 100px;
}

.word {
  position: absolute;
  bottom: 213px;
  left: 10px;
  color: #2EA1E9;
  font-size: 14px;
}
</style>
