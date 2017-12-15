<template>
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
  </console-layout>
</template>

<script>
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'

export default {
  mixins: [
    routerSync(require('./constants/AppMenu'))
  ],
  components: {
    ConsoleLayout
  }
}
</script>

<style>
.el-table {
  font-size: 12px !important;
  color: #333 !important;

  .cell {
    line-height: 17px !important;
  }
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.red-text {
  color: #FF1500;
}

.el-date-editor--datetimerange.el-input {
  width: 250px !important;
}

.el-table .cell, .el-table th>div {
  padding-left: 6px !important;
  padding-right: 6px !important;
}

.separator {
  padding: 0 4px;
}

.vertical-separator {
  padding: 0 7px;
}

@define-extend separator-border {
  border-bottom: 1px solid #E1E2E5;
}

.separator {
  @extend separator-border;
  margin: 20px 0;
}

.outer-separator {
  @extend separator-border;
  margin: 20px -10px;
}

.inner-separator {
  @extend separator-border;
  margin: 10px 0;
}

.vulnerability {
  li {
    display: inline;
    &:not(:first-child) {
      margin-left: 8px;
    }

    .vulnerability-icon {
      width: 14px;
      vertical-align: top;
    }
  }
}

.step {
  padding: 20px 20px 0 20px;
}
</style>
