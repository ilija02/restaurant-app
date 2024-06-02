<!-- src/components/Menu.vue -->
<template>
  <section id="menu" class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Menu</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MenuItem v-for="dish in dishes" :key="dish.id" :dish="dish" />
      </div>
    </div>
  </section>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
  name: "Menu",
  components: {
    MenuItem
  },
  data() {
    return {
      dishes: [
        { id: 1, name: "Spring Rolls", category: "Appetizers", price: 5, image: "img/food/spring-rolls.jpg" },
        { id: 2, name: "Sweet and Sour Pork", category: "Main Courses", price: 10, image: "img/food/sweet-sour-pork.jpg" },
        { id: 3, name: "Fried Ice Cream", category: "Desserts", price: 6, image: "img/food/fried-ice-cream.jpg" },
        // Add more dishes as needed
      ],
    };
  },
};
</script>

<style scoped></style>
