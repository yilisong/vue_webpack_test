<template lang="html">
  <Website-layout>
    <ActivityPage />
    <Faq :name="whichFaq" :document="faqDoc" />
    <YundunBar />
  </Website-layout>
</template>
<script>
import WebsiteLayout from 'common/components/layout/website-layout'
import ActivityPage from './ActivityPage'
import YundunBar from 'website/components/YundunBar'
import 'common/assets/styles/style-reset.css'
import { CustomMadeYearly } from '../../assets/js/document'
import Faq from 'website/components/Faq/Faq'
export default {
  components: {
    WebsiteLayout,
    YundunBar,
    ActivityPage,
    Faq
  },
  created() {

  },
  methods: {

  },
  data() {
    return {
      whichFaq: 'yearlyCustomMade',
      faqDoc: CustomMadeYearly
    }
  }
}
</script>

<style scoped>

</style>
