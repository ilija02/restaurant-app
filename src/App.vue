<template>
  <router-view />
  <LanguageSwitch />
</template>

<script>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
export default {
  name: "App",
  components: {
    LanguageSwitch
  },
};
</script>
