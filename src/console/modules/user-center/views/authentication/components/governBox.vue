<template lang="html">
<div class="">

  <div class="box">
    <h4>政府资料信息</h4>
    <el-form :model="governData" :rules="rules" ref="governForm" :label-position="'right'" label-width="150px" class="govern-box">
      <el-form-item prop="organization_name" label="机构名称">
        <el-input v-model="governData.organization_name"></el-input>
      </el-form-item>
      <el-form-item prop="organization_code" label="组织机构代码">
        <el-input v-model="governData.organization_code"></el-input>
      </el-form-item>
      <el-form-item prop="charge_man_name" label="法定 / 负责人姓名">
        <el-input v-model="governData.charge_man_name"></el-input>
      </el-form-item>
      <el-form-item prop="office_phone" label="办公室电话(选填)">
        <el-input v-model="governData.office_phone" placeholder="包括区号、电话、分机号，以“-”隔开"></el-input>
      </el-form-item>
      <el-form-item prop="organization_address" label="机构地址(选填)">
        <el-input v-model="governData.organization_address" placeholder="能够收发信件的有效地址"></el-input>
      </el-form-item>
      <div class="">
        <label for="" class="tip-required">事业单位法人证书或组织机构代码证(选填)</label>
        <el-upload class="upload-box-company" drag :action="uploadAdd" :before-upload="limit" :fileList="fileList" list-type="picture" :on-success="getPicUrl" :on-remove="handleRemove" :data="typeData" name="organization_certificate_pic">
          <i class="el-icon-upload"></i>
          <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
      </div>
      <div class="box example-company">
        <span class="word">示例：</span>
        <img class="image-company" src="../../../assets/images/governPic.jpg" alt="营业执照示例">
      </div>
      <hr>
      <h4>联系信息</h4>
      <el-form-item prop="contact_name" label="姓名">
        <el-input v-model="governData.contact_name"></el-input>
      </el-form-item>
      <el-form-item prop="contact_mobile" label="手机号码">
        <el-input v-model="governData.contact_mobile"></el-input>
      </el-form-item>
      <el-form-item prop="contact_qq" label="联系QQ">
        <el-input v-model="governData.contact_qq"></el-input>
      </el-form-item>
      <el-form-item class="btn-location">
        <el-button type="primary" @click="submitForm('companyForm')">{{typeTip}}</el-button>
      </el-form-item>

    </el-form>
  </div>

</div>
</template>

<script>
import personalBox from './personalBox'
import {
  BASE_URL
} from 'common/config/interceptor'
import SourceUserResource from '../../../assets/js/resource/SourceUserResource'
import {
  validate
} from 'common/assets/js/normal'
import verify from 'common/utils/verify'
export default {
  components: {
    personalbox: personalBox
  },

  data() {
    function validateOrganizationCode(rule, value, callback) {
      if (value) {
        if (verify.organizationCode.test(value) === false) {
          callback(new Error('请输入正确的组织机构代码'))
        }
      }
      callback()
    }

    function validateOfficePhone(rule, value, callback) {
      if (value) {
        console.log(verify, 'uuuuuu')
        if (verify.landline.test(value) === false) {
          callback(new Error('请输入正确的办公室电话'))
        }
      }
      callback()
    }

    function validateAddress(rule, value, callback) {
      if (value) {
        console.log(verify, 'uuuuuu')
        if (verify.address.test(value) === false) {
          callback(new Error('请输入正确的地址'))
        }
      }
      callback()
    }

    function validateContactMobile(rule, value, callback) {
      if (value) {
        if (verify.strictMobile.test(value) === false) {
          callback(new Error('请输入正确的手机格式'))
        }
      }
      callback()
    }

    function validateName(rule, value, callback) {
      if (value) {
        if (verify.name.test(value) === false) {
          callback(new Error('请输入正确的姓名格式'))
        }
      }
      callback()
    }

    function validateQQ(rule, value, callback) {
      if (value) {
        if (verify.qq.test(value) === false) {
          callback(new Error('请输入正确的QQ格式'))
        }
      }
      callback()
    }
    return {
      typeData: {
        fileKey: 'organization_certificate_pic'
      },
      fileList: [],
      typeTip: '提交',
      uploadAdd: BASE_URL + '/sso/V4/upload/uploadPic',
      governData: {
        organization_name: '',
        organization_code: '',
        charge_man_name: '',
        office_phone: '',
        organization_address: '',
        organization_certificate_pic: '',
        contact_mobile: '',
        contact_qq: '',
        contact_name: ''
      },
      info: {
        organization_name: '机构名称',
        organization_code: '组织机构代码',
        charge_man_name: '法定代表人/负责人姓名',
        contact_mobile: '联系人手机号',
        contact_qq: '联系人QQ',
        contact_name: '联系人姓名'
      },
      rules: {
        organization_name: [{
          min: 2,
          max: 32,
          message: '长度在 2 到 32 个字符',
          trigger: 'blur'
        }],
        organization_code: [{
          validator: validateOrganizationCode,
          trigger: 'blur'
        }],
        charge_man_name: [{
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }, {
          validator: validateName,
          trigger: 'blur'
        }],
        office_phone: [{
          validator: validateOfficePhone,
          trigger: 'blur'
        }],
        organization_address: [{
          min: 2,
          max: 32,
          message: '长度在 2 到 32 个字符',
          trigger: 'blur'
        }],
        contact_name: [{
          min: 2,
          max: 32,
          message: '长度在 2 到 32 个字符',
          trigger: 'blur'
        }, {
          validator: validateName,
          trigger: 'blur'
        }],
        contact_mobile: [{
          validator: validateContactMobile,
          trigger: 'blur'
        }],
        contact_qq: [{
          validator: validateQQ,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    if (this.$store.state.authentiStore.status === 3 ||
      this.$store.state.authentiStore.status === 5) {
      this.typeTip = '重新提交'
      // for (const item in this.dynamicValidateForm)
      //   this.dynamicValidateForm[item] = this.$store.state.authentiStore.info.company[item]
    }
  },
  methods: {
    governEmpty(data, info) {
      let result = true
      for (const item in info) {
        console.log(info, 'info')
        console.log(item, 'iiii')
        console.log(data[item], 'yisss')
        if (data[item] === '') {
          result = false
          return this.$message.error(info[item] + '不能为空')
        } else {
          result = true
        }
      }
      return result
    },
    handleRemove(file) {
      this.governData.organization_certificate_pic = ''
    },
    limit(file) {
      console.log(file, 'fillll')
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
      this.$refs.governForm.validate(valid => {
        if (valid) {
          console.log(this.governData, '---govern')
          if (this.governEmpty(this.governData, this.info) === true) {
            if (this.$store.state.authentiStore.status === 8 ||
              this.$store.state.authentiStore.status === 3) {
              SourceUserResource.updateGovernmentCertification(this.governData)
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
            } else if (this.$store.state.authentiStore.status === 1) {
              SourceUserResource.personalUpgradeGovernment(this.governData)
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
            } else {
              SourceUserResource.addGovernmentCertification(this.governData)
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
          }
        } else {
          return false
        }
      })
    },
    getPicUrl(response, file, fileList) {
      if (response.code === 1) {
        this.governData.organization_certificate_pic = response.data.real_url
        this.fileList.push({
          name: response.data.key,
          url: response.data.real_url
        })
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
    },
    removeDomain(item) {
      const index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
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
}

.tip-required span {
  color: red;
}


/*.tip-required:first-letter{
  color: red;
}*/

.upload-box-company {
  width: 333px;
  margin-left: 129px;
  margin-bottom: 30px;
  display: inline-block;
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
  margin-top: -14px;
}

</style><style>.dynamic-box label,
.tip-required {
  text-align: left;
  /*margin-right: 87px;*/
  display: inline-block;
  vertical-align: top;
}

.dynamic-box div {}

.dynamic-box .el-form-item__content {
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

.dynamic-box .btn-location .el-form-item__content {
  margin-left: 0!important;
}

.dynamic-box .el-button--primary {
  padding: 10px 54px!important;
  letter-spacing: 2px;
  display: block;
}

.govern-box {
  width: 450px;
}
</style>
