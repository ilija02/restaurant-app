<template>
  <!-- TODO Extract menu items into data section to clear up the template -->
  <nav class="bg-gray-100 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" :src="logo" alt="Chinese Restaurant Logo" />
            <span class="ml-3 text-2xl font-semibold text-primary-500">
              <router-link to="/">{{ $t("restaurant.name") }}</router-link>
            </span>
          </div>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/" class="text-gray-800 hover:text-primary-500">{{ $t("nav.home") }}</router-link>
          <!-- Menu with submenu -->
          <div class="relative">
            <router-link to="/menu" class="text-gray-800 hover:text-primary-500" @mouseover="showSubmenu"
              @mouseleave="hideSubmenu">{{ $t("nav.menu") }}
              <span class="text-primary-500">
                <fa icon="caret-down" v-if="submenuOpen" />
                <fa icon="caret-right" v-else />
              </span>
            </router-link>
            <!-- Submenu -->
            <div v-show="submenuOpen"
              class="absolute top-full left-0 bg-white shadow-lg py-2 mt-1 w-40 rounded-md overflow-visible z-10"
              @mouseover="showSubmenu" @mouseleave="hideSubmenu">
              <router-link to="/menu/appetizers"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500">{{ $t("menu.appetizers")
                }}</router-link>
              <router-link to="/menu/main-courses"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500">{{ $t("menu.main")
                }}</router-link>
              <router-link to="/menu/desserts"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500">{{ $t("menu.desserts")
                }}</router-link>
            </div>
          </div>
          <!-- End of Menu with submenu -->
          <router-link to="/about" class="text-gray-800 hover:text-primary-500">{{ $t("nav.about") }}</router-link>
          <router-link to="/gallery" class="text-gray-800 hover:text-primary-500">{{ $t("nav.gallery") }}</router-link>
          <router-link to="/my-account" class="text-gray-800 hover:text-primary-500">{{ $t("nav.account") }}</router-link>
        </div>
        <button type="button"
          class="md:hidden text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500"
          @click="toggleMenu">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile menu, show/hide based on menuOpen state. -->
    <div v-if="menuOpen" class="md:hidden transition ease-in-out duration-150">
      <div class="px-2 pt-4 pb-3 space-y-2 sm:px-3 shadow-primary-500 shadow-md">
        <router-link to="/" class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">{{
          $t("nav.home") }}</router-link>
        <!-- Mobile submenu -->
        <div class="relative z-10" @click="toggleSubmenu">
          <router-link to="#"
            class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">{{ $t("nav.menu")
            }}
            <span class="text-primary-500">
              <fa icon="caret-down" v-if="submenuOpen" />
              <fa icon="caret-right" v-else />
            </span>
          </router-link>
          <!-- Submenu -->
          <div v-if="submenuOpen"
            class="absolute top-full left-0 bg-white shadow-lg py-2 mt-1 w-full rounded-md overflow-visible">
            <router-link to="/menu/all" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500"
              @click="hideSubmenu">{{ $t("menu.all") }}</router-link>
            <router-link to="/menu/appetizers"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500" @click="hideSubmenu">{{
                $t("menu.appetizers") }}</router-link>
            <router-link to="/menu/main-courses"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500">{{ $t("menu.main")
              }}</router-link>
            <router-link to="/menu/desserts"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary-500">{{ $t("menu.desserts")
              }}</router-link>
          </div>
        </div>
        <!-- End of Mobile submenu -->
        <router-link to="/about" class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">{{
          $t("nav.about") }}</router-link>
        <router-link to="/gallery" class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">{{
          $t('nav.gallery') }}</router-link>
        <router-link to="/my-account" class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">{{
          $t('nav.account') }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: "Header",
  data() {
    return {
      menuOpen: false,
      submenuOpen: false,
      logo,
      timeoutId: -1
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    showSubmenu() {
      if (this.timeoutId !== -1) {
        clearTimeout(this.timeoutId);
        this.timeoutId = -1;
      }
      this.submenuOpen = true;
    },
    hideSubmenu() {
      this.timeoutId = setTimeout(() => this.submenuOpen = false, 100);
    },
    toggleSubmenu() {
      this.submenuOpen = !this.submenuOpen;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
