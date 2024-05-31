<template>
  <nav class="bg-primary-500 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="../assets/logo.png" alt="logo" class="h-8 w-8 mr-2" />
        <span class="font-bold text-xl">Bing Chilling</span>
      </div>
      <button
        @click="toggleMenu"
        class="md:hidden block text-white focus:outline-none"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div
        :class="{ block: menuOpen, hidden: !menuOpen }"
        class="w-full md:flex md:items-center md:w-auto md:text-lg"
      >
        <div class="flex flex-col md:flex-row md:flex-grow">
          <router-link
            to="/"
            class="block mt-4 md:mt-0 text-gray-100 hover:bg-accent rounded-md hover px-2 py-1 md:px-2 md:py-0 transition-colors duration-300 ease-in-out"
            >Home</router-link
          >
          <router-link
            to="/gallery"
            class="block mt-4 md:mt-0 text-gray-100 hover:bg-accent rounded-md hover px-2 py-1 md:px-2 md:py-0 transition-colors duration-300 ease-in-out"
            >Gallery</router-link
          >
          <router-link
            to="/menu"
            class="block mt-4 md:mt-0 text-gray-100 hover:bg-accent rounded-md hover px-2 py-1 md:px-2 md:py-0 transition-colors duration-300 ease-in-out"
            >Menu</router-link
          >
          <router-link
            to="/my-account"
            class="block mt-4 md:mt-0 text-gray-100 hover:bg-accent rounded-md hover px-2 py-2 md:px-2 md:py-0 transition-colors duration-300 ease-in-out"
            >My account</router-link
          >
          <router-link
            to="/about"
            class="block mt-4 md:mt-0 text-gray-100 hover:bg-accent rounded-md hover px-2 py-1 md:px-2 md:py-0 transition-colors duration-300 ease-in-out"
            >About</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped></style>
