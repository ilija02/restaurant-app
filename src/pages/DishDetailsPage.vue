<template>
    <div class="container mx-auto p-4">
        <Header />
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
                    <input type="radio" name="radio" value="s" id="radios" v-model="tip" checked>&nbsp;
                    <label for="radios" class="text-primary-500 font-bold">
                        {{ $t("menu.small_portion") }}: ${{ dish.smallPortion }}
                    </label>
                    <br>
                    <input type="radio" name="radio" value="l" id="radiol" v-model="tip">&nbsp;
                    <label for="radiol" class="text-primary-500 font-bold">
                        {{ $t("menu.large_portion") }}: ${{ dish.largePortion }}
                    </label>
                    <br>
                    <label for="numberQ" class="mr-1">{{ $t('menu.quantity') }}: </label>
                    <input type="number" value="1" @input="handleInput()" id="numberQ" class="border border-gray-300 rounded-md mr-6" v-model="broj">
                </div>
                <button
                    class="mt-4 px-4 py-2 mr-2 bg-accent-400 text-white rounded-lg hover:bg-accent-500 transition-colors duration-300"
                    @click="back()">
                    <fa :icon="['fas', 'fa-times']" /> <span class="text-white text-sm pl-2">{{ $t('cancel') 
                        }}</span>
                </button>
                <button v-if="has_this"
                    class="mt-4 px-4 py-2 mr-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors duration-300"
                    @click="removeFromCart">
                    <fa :icon="['fas', 'fa-trash']" /> <span class="test-white text-sm pl-2">{{$t('remove from cart')
                        }}</span>
                </button>
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
import { dishes } from '@/data/dishes';
import Header from '@/components/layout/Header.vue'
import { withDirectives } from 'vue';
import BreadCrumbs from '@/components/navigation/BreadCrumbs.vue';

export default {
    name: "DishDetail",
    components: {
        Header,
        BreadCrumbs
    },
    data() {
        return {
            tip: 's',
            broj: 1,
            dish: null,
            cartItems: [],
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
            let found = -1;
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].dish.name == this.dish.name) {
                    found = i;
                    break;
                }
            }

            if (found != -1 && this.cartItems[found].quantity[this.tip] > 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        fetchDish() {
            const dishId = parseInt(this.$route.params.id);
            this.dish = dishes.find(dish => dish.id === dishId);
        },
        addToCart() {
            let cena = parseInt(this.broj) * (this.tip === 's' ? parseInt(this.dish.smallPortion) : parseInt(this.dish.largePortion));

            let found = -1;
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].dish.name == this.dish.name) {
                    found = i;
                    break;
                }
            }

            if (found !== -1) {
                let item = this.cartItems[found];
                item.quantity[this.tip] += parseInt(this.broj);
                item.price += cena;
            } else {
                let new_item = {
                    dish: this.dish,
                    quantity: {
                        's': 0,
                        'l': 0
                    },
                    price: cena
                };
                new_item.quantity[this.tip] = parseInt(this.broj);
                this.cartItems.push(new_item);
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
        removeFromCart() {
            let cnt = parseInt(this.broj);

            let found = -1;
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].dish.name === this.dish.name) {
                    found = i;
                    break;
                }
            }

            let item = this.cartItems[found];
            if (item.quantity[this.tip] < cnt) {
                cnt = item.quantity[this.tip];
            }
            let cena = cnt * (this.tip === 's' ? parseInt(this.dish.smallPortion) : parseInt(this.dish.largePortion));
            item.quantity[this.tip] -= cnt;
            item.price -= cena;

            if (item.quantity['s'] == 0 && item.quantity['l'] == 0) {
                this.cartItems.splice(found, 1)
            }

            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            this.$router.push('/my-account');
        }
    },
    created() {
        this.fetchDish();

        this.cartItems = localStorage.getItem("cartItems");
        if (this.cartItems) {
            this.cartItems = JSON.parse(this.cartItems);
        } else {
            this.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify([]));
        }
    }
};
</script>

<style scoped></style>