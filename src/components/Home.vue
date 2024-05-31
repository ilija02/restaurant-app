<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to our Chinese Restaurant!</h1>
    <p class="mb-4">
      Discover our delicious menu and enjoy the best Chinese food in town.
    </p>
    <h2 class="text-xl font-semibold mb-2">Top Rated Dishes</h2>
    <ul class="list-disc list-inside">
      <li v-for="dish in topRatedDishes" :key="dish.id" class="mb-1">
        {{ dish.name }} - {{ dish.rating }}⭐
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const topRatedDishes = computed(() => {
      return store.state.dishes.sort((a, b) => b.rating - a.rating).slice(0, 3);
    });

    return { topRatedDishes };
  },
};
</script>
