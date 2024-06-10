<template>
    <div class="container mx-auto p-4">
        <Header />
        <div class="bg-white rounded-lg shadow-md p-6" v-if="dish">
            <img :src="dish.image" alt="" class="h-60 w-full object-cover rounded-lg shadow-inner shadow-black">
            <div class="mt-6">
                <h2 class="text-2xl font-bold text-gray-900">{{ dish_lang.name }}</h2>
                <p class="text-gray-600 mt-2">{{ dish_lang.description }}</p>
                <p class="text-gray-500 mt-2">{{ dish_lang.category }}</p>
                <div class="flex items-center space-x-1 mt-2">
                    <fa v-for="star in 5" :key="star" :icon="['fas', star <= rating() ? 'star' : 'star-half-alt']"
                        class="text-yellow-400"
                        @click="setRating(star)"
                        @mouseover="setHoverRating(star)"
                        @mouseleave="resetHoveredRating(star)"></fa>
                    <span class="text-sm text-gray-500">{{ rating() }} out of 5</span>
                </div>
                <p v-if="rated()" class="font-bold mt-2">{{ $t('menu.rating') }}: {{ getMyRating() }}</p>
                <div class="mt-6">
                    <div class="flex items-center space-x-4 mb-4">
                        <input type="radio" name="portionSize" value="s" id="smallPortion" v-model="tip" class="hidden">
                        <label for="smallPortion"
                            class="cursor-pointer text-primary-500 font-bold p-2 border rounded-lg"
                            :class="{ 'bg-primary-900 text-white': tip === 's' }">
                            {{ $t("menu.small_portion") }}: ${{ dish.smallPortion }}
                        </label>
                        <input type="radio" name="portionSize" value="l" id="largePortion" v-model="tip" class="hidden">
                        <label for="largePortion"
                            class="cursor-pointer text-primary-500 font-bold p-2 border rounded-lg"
                            :class="{ 'bg-primary-900 text-white': tip === 'l' }">
                            {{ $t("menu.large_portion") }}: ${{ dish.largePortion }}
                        </label>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label for="quantity" class="text-gray-700">{{ $t('menu.quantity') }}:</label>
                        <input type="number" id="quantity" v-model="broj" @input="handleInput" min="1"
                            class="border border-gray-300 rounded-md w-20 text-center">
                    </div>
                </div>
                <div class="mt-6 flex space-x-4">
                    <button
                        class="px-4 py-2 bg-accent-400 text-white rounded-lg hover:bg-accent-500 transition-colors duration-300"
                        @click="back">
                        <fa :icon="['fas', 'times']" class="mr-2" /> {{ $t('cancel') }}
                    </button>
                    <button v-if="has_this"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                        @click="removeFromCart">
                        <fa :icon="['fas', 'trash']" class="mr-2" /> {{ $t('remove from cart') }}
                    </button>
                    <button
                        class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                        @click="addToCart">
                        <fa :icon="['fas', 'cart-plus']" class="mr-2" /> {{ $t('add to cart') }}
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { dishes } from '@/data/dishes';
import Header from '@/components/layout/Header.vue';

export default {
    name: "DishDetail",
    components: {
        Header
    },
    data() {
        return {
            tip: 's',
            broj: 1,
            dish: null,
            cartItems: [],
            ratings: [],
            myRatings: [],
            hoverRating: 0
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
        },
        has_this() {
            return this.cartItems.some(item => item.dish.name === this.dish.name && item.quantity[this.tip] > 0);
        }
    },
    methods: {
        fetchDish() {
            const dishId = parseInt(this.$route.params.id);
            this.dish = dishes.find(dish => dish.id === dishId);
        },
        addToCart() {
            const price = this.tip === 's' ? this.dish.smallPortion : this.dish.largePortion;
            const quantity = parseInt(this.broj);
            const totalPrice = price * quantity;

            const existingItem = this.cartItems.find(item => item.dish.name === this.dish.name);

            if (existingItem) {
                existingItem.quantity[this.tip] += quantity;
                existingItem.price += totalPrice;
            } else {
                const newItem = {
                    dish: this.dish,
                    quantity: {
                        s: 0,
                        l: 0
                    },
                    price: totalPrice
                };
                newItem.quantity[this.tip] = quantity;
                this.cartItems.push(newItem);
            }

            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            this.$router.push('/my-account');
        },
        handleInput() {
            if (this.broj < 1) {
                this.broj = 1;
            }
        },
        back() {
            this.$router.back();
        },
        getMyRating() {
            let ret = this.myRatings.find(rating=>rating.id == this.dish.id);
            return ret.rating;
        },
        rated() {
            if (this.myRatings.find(rating=>rating.id == this.dish.id)) {
                return true;
            } else {
                return false;
            }
        },
        setRating(rating) {
            if (!this.rated()) {
                let ret = this.getRating();
                ret.numRatings += 1;
                ret.sumRatings += rating;

                let new_my_rating = {
                    id: this.dish.id,
                    rating: rating
                };
                this.myRatings.push(new_my_rating);
                localStorage.setItem("ratings", JSON.stringify(this.ratings));
                localStorage.setItem("myRatings", JSON.stringify(this.myRatings));
            }
        },
        removeFromCart() {
            const quantity = parseInt(this.broj);

            const existingItem = this.cartItems.find(item => item.dish.name === this.dish.name);

            if (existingItem) {
                const currentQuantity = existingItem.quantity[this.tip];
                const removeQuantity = Math.min(quantity, currentQuantity);
                const price = this.tip === 's' ? this.dish.smallPortion : this.dish.largePortion;
                const totalPrice = price * removeQuantity;

                existingItem.quantity[this.tip] -= removeQuantity;
                existingItem.price -= totalPrice;

                if (existingItem.quantity.s === 0 && existingItem.quantity.l === 0) {
                    this.cartItems = this.cartItems.filter(item => item !== existingItem);
                }

                localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                this.$router.push('/my-account');
            }
        },
        getRating() {
            let ret = this.ratings.find(rating=>rating.id == this.dish.id);
            return ret;
        },
        rating() {
            if (!this.rated() && this.hoverRating != 0) {
                return this.hoverRating;
            }

            let ret = this.getRating();
            return (ret.sumRatings / ret.numRatings).toFixed(2);
        },
        setHoverRating(rating) {
            this.hoverRating = rating;
        },
        resetHoveredRating(rating) {
            this.hoverRating = 0;
        }
    },
    created() {
        this.fetchDish();

        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            this.cartItems = JSON.parse(storedCartItems);
        } else {
            this.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify([]));
        }
        
        this.ratings = localStorage.getItem("ratings");
        if (this.ratings) {
            this.ratings = JSON.parse(this.ratings);
        } else {
            this.ratings = [
                { id: 1, numRatings: 5, sumRatings: 20 },
                { id: 2, numRatings: 2, sumRatings: 9 },
                { id: 3, numRatings: 5, sumRatings: 21 },
                { id: 4, numRatings: 5, sumRatings: 20 },
                { id: 5, numRatings: 5, sumRatings: 22 },
                { id: 6, numRatings: 10, sumRatings: 41 },
                { id: 7, numRatings: 5, sumRatings: 24 },
                { id: 8, numRatings: 10, sumRatings: 47 },
                { id: 9, numRatings: 4, sumRatings: 18 },
                { id: 10, numRatings: 10, sumRatings: 43 },
                { id: 11, numRatings: 5, sumRatings: 23 }
            ];
            localStorage.setItem("ratings", JSON.stringify(this.ratings));
        }

        this.myRatings = localStorage.getItem("myRatings")
        this.myRatings = this.myRatings ? JSON.parse(this.myRatings) : []
    }
};
</script>

<style scoped>
/* Add any additional scoped styles here */
</style>
