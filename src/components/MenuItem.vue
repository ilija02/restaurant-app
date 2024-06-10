<template>
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <img v-bind:src="dish.image" alt="" class="h-40 w-full object-cover rounded-lg shadow-inner shadow-black">
        <div class="mt-4">
            <div class="flex flex-row justify-between items-end">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900">{{ dish_lang.name }}</h3>
                    <p class="text-gray-600">{{ dish_lang.category }}</p>
                    <div>
                        <div class="flex items-center space-x-1 mt-1">
                            <fa v-for="star in 5" :key="star"
                                :icon="['fas', star <= dish.rating ? 'star' : 'star-half-alt']" class="text-yellow-400">
                            </fa>
                        </div>
                        <span class="text-sm text-gray-300">{{ dish.rating }} out of 5</span>
                    </div>

                    <p class="text-primary-500 font-bold mt-2">${{ dish.price }}</p>
                </div>
                <button
                    class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                    @click="addToCart">
                    <fa :icon="['fas', 'cart-plus']" /> <span class="text-white text-sm pl-2">{{ $t("add to cart")
                        }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuItem",
    props: {
        dish: {
            required: true
        }
    },
    computed: {
        dish_lang() {
            const ret = {
                name: this.$i18n.locale === 'en' ? this.dish.name : this.dish.name_sr,
                category: this.$i18n.locale === 'en' ? this.dish.category : this.dish.category_sr
            };

            return ret;
        }
    },
    methods: {
        addToCart() {
            // TODO: Implement add to cart functionality
        }
    },
};
</script>

<style scoped></style>
