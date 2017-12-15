<template lang="html">
<div class="box-container">
  <div class="box">
    <h4>个人信息</h4>
    <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" label-width="100px" class="dynamic-box">
      <el-form-item label="姓名" prop="personal_name">
        <el-input v-model="dynamicValidateForm.personal_name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="personal_id_card">
        <el-input v-model="dynamicValidateForm.personal_id_card"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="personal_mobile">
        <el-input v-model="dynamicValidateForm.personal_mobile"></el-input>
      </el-form-item>
      <div class="">
        <label for="" class="tip-required">&nbsp;身份证正反面</label>
        <el-upload class="upload-box" drag :action="uploadAdd" :before-upload="limit" :file-list="fileList" list-type="picture" name="personal_id_card_pic" :on-success="getPicUrl" :multiple=false :on-remove="handleRemove">
          <i class="el-icon-upload"></i>
        </el-upload>
        <el-upload class="upload-box upload-second-box" drag :action="uploadAdd" :before-upload="limit" :file-list="fileListAnother" list-type="picture" name="personal_id_card_pic" :on-success="getAnotherPicUrl" :multiple=false :on-remove="handleRemoveAnother">
          <i class="el-icon-upload"></i>
          <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
        <!-- <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </div>
      <el-form-item class="btn-location">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">{{typeTip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <div class="box example">
    <span class="word">示例：</span>
    <img class="image image-front" src="../../../assets/images/IDcard_example2.png" alt="手持身份证示例">
    <img class="image image-another" src="../../../assets/images/IDcard_example.png" alt="手持身份证示例">
  </div> -->
</div>
</template>

<script>
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  judgeEmpty
} from '../../../assets/js/normal'
import SourceUserResource from '../../../assets/js/resource/SourceUserResource'
import {
  validate
} from 'common/assets/js/normal'
export default {
  data() {
    // const validateIDnumber = (rule, value, callback) => {
    //   console.log(value, '-0-')
    //   //   if (codebtn.innerText === '发送验证码')
    //   //     codebtn.disabled = false
    //   //   callback()
    //   // }
    // }
    function validateName(rule, value, callback) {
      callback()
    }

    function validateIDnumber(rule, value, callback) {
      if (value) {
        if (validate.IDnumber.test(value) === false) {
          callback(new Error('请输入正确的身份证号'))
        }
      }
      callback()
    }

    function validateMobile(rule, value, callback) {
      if (value) {
        if (validate.phone.test(value) === false) {
          callback(new Error('请输入正确的手机号'))
        }
      }
      callback()
    }
    return {
      fileList: [],
      fileListAnother: [],
      dialogImageUrl: '',
      dialogVisible: false,
      typeTip: '提交',
      uploadAdd: BASE_URL + '/sso/V4/upload/IdCardPic',
      dynamicValidateForm: {
        personal_name: '',
        personal_id_card: '',
        personal_mobile: '',
        personal_id_card_pic: '',
        personal_id_card_pic_negative: ''
      },
      info: {
        personal_name: '姓名',
        personal_id_card: '身份证号码',
        personal_mobile: '手机号码',
        personal_id_card_pic: '手持身份证正面',
        personal_id_card_pic_negative: '手持身份证反面'
      },
      rules: {
        personal_name: [{
          min: 2,
          max: 32,
          message: '长度在 2 到 32 个字符',
          trigger: 'blur'
        }, {
          validator: validateName,
          trigger: 'blur'
        }],
        personal_id_card: [{
          validator: validateIDnumber,
          trigger: 'blur'
        }],
        personal_mobile: [{
          validator: validateMobile,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    if (this.$store.state.authentiStore.status === 3) {
      this.typeTip = '重新提交'
      // for (const item in this.dynamicValidateForm)
      //   this.dynamicValidateForm[item] = this.$store.state.authentiStore.info.personal[item]
    }
  },
  methods: {
    handleRemove(file) {
      this.dynamicValidateForm.personal_id_card_pic = ''
      // this.fileList.forEach((item, i) => {
      //   if (item.name === file.name)
      //     this.fileList.splice(i, 1)
      //   if (file.url === this.dynamicValidateForm.personal_id_card_pic)
      //     this.dynamicValidateForm.personal_id_card_pic = ''
      // })
    },
    handleRemoveAnother(file) {
      this.dynamicValidateForm.personal_id_card_pic_negative = ''
      // this.fileListAnother.forEach((item, i) => {
      //   if (item.name === file.name)
      //     this.fileListAnother.splice(i, 1)
      //   if (file.url === this.dynamicValidateForm.personal_id_card_pic_negative)
      //     this.dynamicValidateForm.personal_id_card_pic_negative = ''
      // })
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
    handlePictureCardPreview(file) {
      console.log(file, 'file')
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs.dynamicValidateForm.validate(valid => {
        if (valid) {
          if (judgeEmpty(this.dynamicValidateForm, this.info) === true) {
            if (this.$store.state.authentiStore.status === 0) {
              SourceUserResource.addPersonalCertification(this.dynamicValidateForm)
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
              SourceUserResource.updatePersonalCertification(this.dynamicValidateForm)
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
    },
    getPicUrl(response, file, fileList) {
      if (response.code === 1) {
        this.dynamicValidateForm.personal_id_card_pic = response.data.real_url
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
    getAnotherPicUrl(response, file, fileList) {
      if (response.code === 1) {
        this.dynamicValidateForm.personal_id_card_pic_negative = response.data.real_url
        this.fileListAnother.push({
          name: response.data.key,
          url: response.data.real_url
        })
        if (this.fileListAnother.length !== 1) {
          this.fileListAnother.forEach((item, i) => {
            if (item.name !== file.name)
              this.fileListAnother.splice(i, 1)
          })
        }
      } else {
        this.fileListAnother = []
        this.$message({
          message: response.status.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.box-container {
  min-width: 1200px;
  overflow: hidden;
}

.box {
  display: inline-block;
  vertical-align: top;
  width: 600px;
}

.example {
  position: relative;
  height: 525px;
  width: 400px;
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

.avatar {
  width: 100%;
  height: inherit;
}


/*.tip-required:first-letter{
  color: red;
}*/

.upload-box {
  width: 333px;
  margin-left: 100px;
  margin-bottom: 30px;
  display: inline-block;
}

.upload-second-box {
  margin-left: 188px;
  display: block;
}

.btn-location {
  margin-left: 0;
}

.image {
  width: 290px;
  border: 1px dashed #D6D6D6;
  border-radius: 5px;
  position: absolute;
  left: 100px;
}

.image-front {
  bottom: 140px;
}

.image-another {
  bottom: -82px;
}

.word {
  position: absolute;
  bottom: 213px;
  left: 10px;
  color: #2EA1E9;
  font-size: 14px;
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

.upload-box .el-upload-dragger {
  width: 333px;
}

.upload-box .el-upload__tip {
  color: red!important;
}

.dynamic-box .btn-location .el-form-item__content {
  margin-left: 0!important;
}

.dynamic-box .el-button--primary {
  padding: 10px 54px!important;
  letter-spacing: 2px;
  display: block;
}
</style>
