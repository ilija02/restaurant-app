<!-- src/components/Header.vue -->
<template>
  <nav class="bg-gray-100 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" :src="logo" alt="Chinese Restaurant Logo" />
            <span class="ml-3 text-2xl font-semibold text-primary-500">
              <router-link to="/">Chinese Restaurant</router-link>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="#" class="text-gray-800 hover:text-primary-500">Home</router-link>
            <router-link to="#" class="text-gray-800 hover:text-primary-500">Menu</router-link>
            <router-link to="#" class="text-gray-800 hover:text-primary-500">About</router-link>
            <router-link to="#" class="text-gray-800 hover:text-primary-500">Gallery</router-link>
            <router-link to="#" class="text-gray-800 hover:text-primary-500">My account</router-link>
          </div>
          <button type="button"
            class="md:hidden text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500"
            @click="toggleMenu">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu, show/hide based on menuOpen state. -->
    <div v-if="menuOpen" class="md:hidden">
      <div class="px-2 pt-4 pb-3 space-y-2 sm:px-3 shadow-primary-500 shadow-md">
        <router-link to="#"
          class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">Home</router-link>
        <router-link to="#"
          class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">Menu</router-link>
        <router-link to="#"
          class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">About</router-link>
        <router-link to="#"
          class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">Gallery</router-link>
        <router-link to="#" class="block text-gray-800 hover:bg-gray-200 hover:text-primary-500 py-1 px-2 rounded-md">My
          account</router-link>
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
      logo
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
