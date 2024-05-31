<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">My Account</h1>
    <h2 class="text-xl font-semibold mb-2">Cart</h2>
    <ul class="list-disc list-inside">
      <li v-for="(item, index) in cart" :key="index" class="mb-1">
        {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
        <button @click="removeFromCart(index)" class="ml-2 text-red-600">
          Remove
        </button>
      </li>
    </ul>
    <button
      @click="clearCart"
      class="mt-4 bg-red-600 text-white px-4 py-2 rounded"
    >
      Clear Cart
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const removeFromCart = (index) => {
      store.commit("removeFromCart", index);
    };
    const clearCart = () => {
      store.commit("clearCart");
    };

    return { cart, removeFromCart, clearCart };
  },
};
</script>
