<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <header class="relative">
      <img class="w-full h-60 md:h-96 object-cover" src="../assets/background.jpg" alt="Chinese Restaurant" />
      <div
        class="absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-start sm:items-center p-16">
        <h1 class="text-3xl md:text-5xl text-white font-bold">
          Welcome to Our Chinese Restaurant
        </h1>
        <h2 class="text-xl md:text-3xl text-white font-light mt-4 hidden md:block">
          Experience Authentic Flavors and Culinary Masterpieces
        </h2>
        <button class="btn-action mt-6">Discover our menu</button>
      </div>
    </header>
  </div>
</template>

<script>
import Header from '../components/layout/Header.vue';
export default {
  name: "HomePage",
  components: {
    Header,
  },
};
</script>

<style scoped></style>
