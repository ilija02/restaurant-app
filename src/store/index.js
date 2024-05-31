import { createStore } from "vuex";

const store = createStore({
  state: {
    dishes: [
      {
        id: 1,
        name: "Spring Rolls",
        category: "Appetizers",
        price: 5,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Sweet and Sour Pork",
        category: "Main Courses",
        price: 10,
        rating: 4.8,
      },
      {
        id: 3,
        name: "Fried Ice Cream",
        category: "Desserts",
        price: 6,
        rating: 4.7,
      },
    ],
    cart: [],
  },
  mutations: {
    addToCart(state, dish) {
      state.cart.push(dish);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {},
  modules: {},
});

export default store;
