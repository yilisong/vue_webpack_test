<template lang="html">
<div class="list-container">
  <ul class="web-origin-domain" v-bind:class="{'active-web-origin-domain':contentShow}">
    <li v-if="" @click="showList">
      <i class="el-icon-caret-bottom el-icon--right position-adjust" :class="{'position-fix': contentShow}" v-if="webListLength>2"></i>
    </li>
    <li v-for="(item,index) in webList" v-show="index <= 1 ||contentShow" :value="index">
      <span v-show="item.view !== undefined" class="yun-icon circuit-type" v-bind:class="[item.view==='primary'?'yun-view-main':'yun-view-backup']"></span>
      <span class="domain-value">{{item.value}}</span>
      <span v-show="item.port">/{{item.port}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import 'common/assets/styles/yundun-theme/index.css'
export default {
  mounted() {
    const $body = document.getElementsByTagName('body')[0]
    $body.addEventListener('click', this.closeView, false)
  },
  computed: {
    webListLength() {
      if (this.webList)
        return this.webList.length
    }
  },
  data() {
    return {
      contentShow: false,
      contentStatus: false,
      content: []
    }
  },
  methods: {
    showList() {
      this.contentShow = !this.contentStatus
      this.contentStatus = this.contentShow
    },
    closeView(e) {
      if (!this.$el.contains(e.target))
        this.contentShow = false
    }
  },
  props: {
    webList: {
      type: null
    },
    iconShow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="css">
.list-container {
  width: 100%;
  margin: 0 auto;
  ul {
    li {
      line-height: 18px;
    }
  }
}

.web-origin-domain.active-web-origin-domain {
  text-align: left;
  padding: 10px 26px 10px 10px;
  border: 1px solid #d6d6d6;
  box-shadow: 0 0 25px var(--border-gray);
  background: #fff;
  z-index: 9999;
  position: absolute !important;
  top: 6px;
  li {
    .position-adjust {
      position: absolute;
      top: 2px;
      right: -14px;
    }
  }
}

.web-origin-domain {
  margin:0 auto;
  width: inherit;
  text-align: left;
  padding: 10px;
  li {
    position: relative;
    .circuit-type {
      width: 12px;
      height: 12px;
    }
    .position-adjust {
      position: absolute;
      width: 12px;
      height: 12px;
      right: 2px;
      top: 12px;
      z-index: 999;
      cursor: pointer;
    }
    .position-fix {
      top: 20px;
    }
    .domain-value {
      /*margin-left: 20px;*/
      text-align: center;
    }
  }
}
</style>
