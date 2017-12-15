<template>
<el-dialog title="资产认证"
  :visible.sync="verifyPropertyVisible"
  :close-on-click-modal="false"
  size="tiny"
  @open="handleVerifyPropertyOpen"
  @close="handleVerifyPropertyClose">
  <el-radio-group v-model="verifyType"
    @change="handleVerifyTypeChange">
    <el-radio :label="0" :disabled="isIp">使用txt记录认证</el-radio>
    <el-radio :label="1">使用文件认证</el-radio>
  </el-radio-group>
  <hr class="inner-separator" />
  <template v-if="verifyCode">
    <template v-if="verifyType === 0">
      <p>
        如果你是域名的所有者，请到域名当前解析商处给该域名添加如下TXT记录：
      </p>
      <p>
        主机记录：{{ verifyCode.record_value }}
      </p>
      <p>
        记录值：{{ verifyCode.code }}
      </p>
      <p>
        添加记录成功后，系统会自动扫描您添加的TXT记录（扫描过程大约需要1分钟），
      </p>
      <p>
        验证成功后通过微信或邮件通知你，您还可以点击确认按钮立即进行验证。
      </p>
    </template>
    <template v-else-if="verifyType === 1">
      <p>
        第一步：创建内容为{{ verifyCode.code }}的{{ verifyCode.file_name }}文件
      </p>
      <p>
        第二步：将{{ verifyCode.file_name }}文件上传到网站{{ verifyCode.property_object }}的根目录下
      </p>
      <p>
        完成操作后请点击“完成认证”按钮
      </p>
    </template>
  </template>
  <div slot="footer">
    <el-button type="primary"
      @click="handleVerifyProperty">完成认证</el-button>
    <el-button type="default"
      @click="verifyPropertyVisible = false">取消</el-button>
  </div>
</el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import verify from 'common/utils/verify'
import ListQuery from '../../constants/ListQuery'

export default {
  created() {
    this.$store.watch(
      state => state.property.verifyProperty.visible,
      visible => {
        this.verifyPropertyVisible = visible
      }
    )
  },
  data() {
    return {
      verifyPropertyVisible: false,
      verifyType: 0,
      isIp: false
    }
  },
  computed: {
    verifyInfo() {
      return this.$store.state.property.verifyProperty.info
    },
    verifyCode() {
      return this.$store.state.property.verifyProperty.code
    }
  },
  methods: {
    ...mapActions([
      'triggerVerifyPropertyVisible',
      'getPropertyList',
      'verifyProperty',
      'getVerifyCode',
      'clearVerifyCode'
    ]),
    handleVerifyPropertyOpen() {
      this.isIp = verify.ipReg.test(this.verifyInfo.property_object)
      if (this.isIp) {
        this.verifyType = 1
      }
      this.handleVerifyTypeChange()
    },
    handleVerifyTypeChange() {
      this.verifyInfo &&
        this.getVerifyCode({
          property_id: this.verifyInfo.id,
          code_type: this.verifyType
        })
    },
    reset() {
      this.verifyType = 0
      this.ip = false
    },
    handleVerifyPropertyClose() {
      this.triggerVerifyPropertyVisible({ visible: false, info: null })
      this.clearVerifyCode()
      this.reset()
    },
    async handleVerifyProperty() {
      try {
        await this.verifyProperty({
          property_id: this.verifyInfo.id,
          code_type: this.verifyType
        })

        this.handleVerifyPropertyClose()

        this.getPropertyList({
          ...ListQuery
        })
      } catch (err) {}
    }
  }
}
</script>
