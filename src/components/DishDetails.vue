<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-900" @click="$emit('close')">
                <fa icon="times" />
            </button>
            <div class="flex flex-col md:flex-row">
                <img :src="dish.image" alt=""
                    class="w-full md:w-1/2 h-60 md:h-auto object-cover rounded-lg shadow-inner shadow-black">
                <div class="md:ml-8 mt-4 md:mt-0 flex-1">
                    <h3 class="text-2xl font-semibold text-gray-900">{{ dish.name }}</h3>
                    <p class="text-gray-600">{{ dish.category }}</p>
                    <div class="mt-4">
                        <p class="text-gray-700">{{ dish.description }}</p>
                        <p class="text-primary-500 font-bold mt-2">Small: ${{ dish.smallPortion }}</p>
                        <p class="text-primary-500 font-bold">Large: ${{ dish.largePortion }}</p>
                        <div class="mt-4">
                            <label for="portionSize" class="block text-gray-700">Portion Size:</label>
                            <select id="portionSize" v-model="portionSize"
                                class="w-full p-2 border border-gray-300 rounded-md">
                                <option value="small">Small</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div class="mt-4">
                            <label for="quantity" class="block text-gray-700">Quantity:</label>
                            <input type="number" id="quantity" v-model.number="quantity" min="1"
                                class="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div class="mt-4">
                            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                                @click="addToCart">
                                <fa icon="cart-plus" /> <span class="text-white text-sm pl-2">Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8">
                <h4 class="text-xl font-semibold text-gray-900">Rating</h4>
                <div class="flex items-center mt-2">
                    <Rating :rating="dish.rating" />
                    <span class="ml-2 text-gray-700">{{ dish.rating.toFixed(1) }} / 5</span>
                </div>
                <div class="mt-4">
                    <label for="newRating" class="block text-gray-700">Leave a Rating:</label>
                    <input type="number" id="newRating" v-model.number="newRating" min="1" max="5"
                        class="w-full p-2 border border-gray-300 rounded-md" />
                    <button class="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                        @click="leaveRating">
                        Submit Rating
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from './Rating.vue'; // You'll create this component next

export default {
    name: "DishDetails",
    components: {
        Rating
    },
    props: {
        dish: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            portionSize: 'small',
            quantity: 1,
            newRating: null
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.dish, this.portionSize, this.quantity);
        },
        leaveRating() {
            // Implement functionality to leave a rating
            if (this.newRating >= 1 && this.newRating <= 5) {
                console.log(`New rating for ${this.dish.name}: ${this.newRating}`);
            } else {
                alert('Please enter a rating between 1 and 5.');
            }
        }
    }
};
</script>

<style scoped></style>