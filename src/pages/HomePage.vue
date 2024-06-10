<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <header class="relative">
      <img class="w-full h-60 md:h-96 object-cover" src="../assets/background.jpg" alt="Chinese Restaurant" />
      <div
        class="absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-start sm:items-center p-16">
        <h1 class="text-3xl md:text-5xl text-white font-bold">
          {{ $t('home.welcome') }}
        </h1>
        <h2 class="text-xl md:text-3xl text-white font-light mt-4 hidden md:block">
          {{ $t('home.subtitle') }}
        </h2>

        <router-link to="/menu">
          <button class="btn-action mt-6">
            {{ $t(
              'home.menu'
            ) }}</button>
        </router-link>
      </div>
    </header>
    <div class="px-12 py-6 border-b-2 border-gray-200 border-dashed">
      <AboutComponent @click="redirect()" />

    </div>
    <div id="top-dishes" class="px-4 py-6 border-b-2 border-dashed border-gray-200">
      <TopDishes class="mx-4" />
    </div>
    <DealsComponent />
    <div class="px-4 py-6">
      <TestimonialsComponent />

    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import TopDishes from '@/components/TopDishes.vue'
import DealsComponent from '@/components/DealsComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import Footer from '@/components/layout/Footer.vue'
export default {
  name: "HomePage",
  components: {
    Header,
    TopDishes,
    DealsComponent,
    TestimonialsComponent,
    AboutComponent,
    Footer
  },
  methods: {
    redirect() {
      this.$router.push('/about')
    }
  }
};
</script>

<style scoped></style>
