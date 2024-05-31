<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Menu</h1>
    <div>
      <h2 class="text-xl font-semibold mb-2">Appetizers</h2>
      <ul class="list-disc list-inside">
        <li
          v-for="dish in filteredDishes('Appetizers')"
          :key="dish.id"
          class="mb-1"
        >
          {{ dish.name }} - ${{ dish.price }}
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-2">Main Courses</h2>
      <ul class="list-disc list-inside">
        <li
          v-for="dish in filteredDishes('Main Courses')"
          :key="dish.id"
          class="mb-1"
        >
          {{ dish.name }} - ${{ dish.price }}
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-2">Desserts</h2>
      <ul class="list-disc list-inside">
        <li
          v-for="dish in filteredDishes('Desserts')"
          :key="dish.id"
          class="mb-1"
        >
          {{ dish.name }} - ${{ dish.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["dishes"]),
    filteredDishes() {
      return (category) => {
        return this.dishes.filter((dish) => dish.category === category);
      };
    },
  },
};
</script>
