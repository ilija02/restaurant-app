<template>
    <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-md p-4" v-if="dish">
            <img :src="dish.image" alt="" class="h-60 w-full object-cover rounded-lg shadow-inner shadow-black">
            <div class="mt-4">
                <h2 class="text-2xl font-bold text-gray-900">{{ dish_lang.name }}</h2>
                <p class="text-gray-600">{{ dish_lang.description }}</p>
                <p class="text-gray-500 mt-2">{{ dish_lang.category }}</p>
                <div class="flex items-center space-x-1 mt-1">
                    <fa v-for="star in 5" :key="star" :icon="['fas', star <= dish.rating ? 'star' : 'star-half-alt']"
                        class="text-yellow-400">
                    </fa>
                    <span class="text-sm text-gray-500">{{ dish.rating }} out of 5</span>
                </div>
                <div class="mt-4">
                    <p class="text-primary-500 font-bold">{{ $t("menu.small_portion") }}: ${{ dish.smallPortion }}</p>
                    <p class="text-primary-500 font-bold">{{ $t("menu.large_portion") }}: ${{ dish.largePortion }}</p>
                </div>
                <button
                    class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                    @click="addToCart">
                    <fa :icon="['fas', 'cart-plus']" /> <span class="text-white text-sm pl-2">{{ $t("add to cart")
                        }}</span>
                </button>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { dishes } from '@/data/dishes'; // Adjust the import path according to your project structure

export default {
    name: "DishDetail",
    data() {
        return {
            dish: null
        };
    },
    computed: {
        dish_lang() {
            if (!this.dish) return {};
            return {
                name: this.$i18n.locale === 'en' ? this.dish.name : this.dish.name_sr,
                description: this.$i18n.locale === 'en' ? this.dish.description : this.dish.description_sr,
                category: this.$i18n.locale === 'en' ? this.dish.category : this.dish.category_sr
            };
        }
    },
    methods: {
        fetchDish() {
            const dishId = parseInt(this.$route.params.id);
            this.dish = dishes.find(dish => dish.id === dishId);
        },
        addToCart() {
            // TODO: Implement add to cart functionality
        }
    },
    created() {
        this.fetchDish();
    }
};
</script>

<style scoped></style>