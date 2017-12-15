<template lang="html">
  <Website-layout>
    <ActivityPage />
    <Faq :name="whichFaq" :document="faqDoc" />
    <YundunBar />
  </Website-layout>
</template>
<script>
import WebsiteLayout from 'common/components/layout/website-layout'
import YundunBar from 'website/components/YundunBar'
import ActivityPage from './ActivityPage'
import { PersonalGameProtect } from '../../assets/js/document'
import Faq from 'website/components/Faq/Faq'
import 'common/assets/styles/style-reset.css'
export default {
  components: {
    WebsiteLayout,
    YundunBar,
    ActivityPage,
    Faq
  },
  methods: {

  },
  data() {
    return {
      whichFaq: 'PersonalGameProtect',
      faqDoc: PersonalGameProtect
    }
  }
}
</script>

<style scoped>

</style>
