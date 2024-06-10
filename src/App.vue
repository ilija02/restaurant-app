<template>
  <TopBar />
  <router-view />
  <!-- So the language switch doesn't interfere with page content -->
  <Footer />
  <LanguageSwitch />
</template>

<script>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
import Footer from '@/components/layout/Footer.vue';
import TopBar from './components/layout/TopBar.vue';
export default {
  name: "App",
  components: {
    TopBar,
    LanguageSwitch,
    Footer,

  },
};
</script>
