<template>
  <purchase-layout>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </purchase-layout>
</template>

<script>
import purchaseLayout from 'common/components/layout/purchase-layout'

export default {
  components: {
    purchaseLayout
  }
}
</script>
