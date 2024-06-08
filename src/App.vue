<template>
  <div class="bg-gray-600 text-accent-50 text-sm py-1 flex justify-between items-center px-4 md:px-8">
    <div>
      <span class="hidden md:inline">
        <fa icon="home" />
      </span> Mon-Fri: 10:00 AM - 10:00 PM, Sat-Sun: 11:00 AM - 11:00 PM
    </div>
    <div>
      <span class="hidden md:inline">
        <fa icon="phone" />
      </span> <a href="tel:+1234567890">+123 456 7890</a>
    </div>
  </div>
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
