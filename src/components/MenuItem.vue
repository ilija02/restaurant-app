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
                                :icon="['fas', star <= rating() ? 'star' : 'star-half-alt']" class="text-yellow-400"
                                @click="setRating(star)"
                                @mouseover="setHoverRating(star)"
                                @mouseleave="resetHoveredRating(star)">
                            </fa>
                        </div>
                        <span class="text-sm text-gray-300">{{ rating() }} out of 5</span>
                    </div>
                    <p v-if="rated()" class="font-bold mt-2">{{ $t('menu.rating') }}: {{ getMyRating() }}</p>
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
    data() {
        return {
            ratings: [],
            myRatings: [],
            hoverRating: 0
        }
    },
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
    created: function() {
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
            this.$router.push('/dish/' + this.dish.id);
        },
        rated() {
            if (this.myRatings.find(rating=>rating.id == this.dish.id)) {
                return true;
            } else {
                return false;
            }
        },
        getMyRating() {
            let ret = this.myRatings.find(rating=>rating.id == this.dish.id);
            return ret.rating;
        },
        getRating() {
            let ret = this.ratings.find(rating=>rating.id == this.dish.id);
            return ret;
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
};
</script>

<style scoped></style>