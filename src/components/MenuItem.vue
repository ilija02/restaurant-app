<template>
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <router-link :to="{ name: 'DishDetail', params: { id: dish.id } }">
            <img v-bind:src="dish.image" alt="" class="h-40 w-full object-cover rounded-lg shadow-inner shadow-black">
        </router-link>
        <div class="mt-4">
            <div class="flex flex-row justify-between items-end">
                <div>
                    <router-link :to="{ name: 'DishDetail', params: { id: dish.id } }">
                        <h3 class="text-xl font-semibold text-gray-900">{{ dish_lang.name }}</h3>
                    </router-link>
                    <p class="text-gray-600">{{ dish_lang.category }}</p>
                    <div>
                        <div class="flex items-center space-x-1 mt-1">
                            <fa v-for="star in 5" :key="star"
                                :icon="['fas', star <= dish.rating ? 'star' : 'star-half-alt']" class="text-yellow-400">
                            </fa>
                        </div>
                        <span class="text-sm text-gray-300">{{ dish.rating }} out of 5</span>
                    </div>

                    <p v-if="!on_account_page" class="text-primary-500 font-bold mt-2">{{ $t('menu.avg') }}: ${{
                        dish.price }}</p>
                    <div v-if="on_account_page" class="rounded-md bg-gray-100 p-2 mr-2">
                        <p class="text-gray-600 font-bold mt-2">{{ $t('myaccount.quantitys') }}: {{ quantitys }}</p>
                        <p class="text-gray-600 font-bold mt-2">{{ $t('myaccount.quantityl') }}: {{ quantityl }}</p>
                        <p class="text-lime-700 font-bold mt-2">{{ $t('myaccount.price') }}: ${{ price }}</p>
                    </div>
                </div>
                <button
                    class="px-4 py-3 mb-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                    @click="addToCart">
                    <fa :icon="['fas', 'cart-plus']" /> <span class="text-white text-sm pl-2">{{ $t("edit cart")
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
        },
        on_account_page: {
            required: true
        },
        quantitys: {
            required: false
        },
        quantityl: {
            required: false
        },
        price: {
            required: false
        },
        category: {
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
            this.$router.push('/dish/' + this.dish.id)
        }
    },
};
</script>

<style scoped></style>