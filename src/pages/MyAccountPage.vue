<template>
    <div min-h-screen bg-gray-100>
        <Header />
        <BreadCrumbs :crumbs="crumbs" class="mx-8" />
        <h1 class="text-2xl font-bold my-4 mx-8">{{ username }} - {{ $t('myaccount.cart') }}</h1>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div v-if="cartItems.length > 0" class="flex flex-col md:flex-row md:justify-between">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="item in cartItems" :key="item.id" class="my-2">
                        <MenuItem :dish="item.dish" :on_account_page="true" :quantitys="item.quantity['s']"
                            :quantityl="item.quantity['l']" :price="item.price" :category="false" />
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center items-center">
                <p class="font-bold italic">{{ $t('myaccount.empty') }}</p>
            </div>
        </div>
        <div class="flex justify-end border-b-2 border-gray-200 border-dashed mx-8">
            <button
                class="px-4 py-2 my-4 bg-accent-500 text-white rounded-lg hover:bg-primary-500 shadow-black shadow-sm"
                @click="confirmOrder">{{ $t('myaccount.confirm') }}</button>
        </div>
        <h1 class="text-2xl font-bold my-4 mx-8">{{ username }} - {{ $t('myaccount.order') }}</h1>
        <div class="flex justify-center">
            <div v-if="orders.length > 0">
                <table v-for="(order, index) in orders" :key="index"
                    class="m-auto divide-y divide-gray-200 table_order">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ $t('menu.name') }}</th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ $t('myaccount.quantitys') }}</th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ $t('myaccount.quantityl') }}</th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ $t('myaccount.price') }}</th>
                        </tr>
                    </thead>
                    <tbody v-for="cartItem in order" :key="cartItem.dish.name"
                        class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">{{ dish_lang(cartItem.dish).name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ cartItem.quantity['s'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ cartItem.quantity['l'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ cartItem.price }}</td>
                        </tr>
                    </tbody>
                    <tr>
                        <td colspan="3" class="px-6 py-4 whitespace-nowrap">{{ $t('myaccount.sum') }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ sum(order) }}</td>
                    </tr>
                </table>
            </div>
            <div v-else class="flex justify-center items-center">
                <p class="font-bold italic">{{ $t('myaccount.emptyorders') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import MenuItem from '@/components/MenuItem.vue'
import BreadCrumbs from '@/components/navigation/BreadCrumbs.vue'
export default {
    components: {
        Header,
        MenuItem,
        BreadCrumbs
    },
    data() {
        return {
            username: '',
            cartItems: [],
            order: []
        }
    },
    methods: {
        confirmOrder() {
            localStorage.removeItem('cartItems');

            let new_order = [];
            for (let i = 0; i < this.cartItems.length; i++) {
                new_order.push(this.cartItems[i]);
            }

            this.cartItems = [];
            if (new_order.length > 0) {
                this.orders.push(new_order);
                localStorage.setItem("orders", JSON.stringify(this.orders));
            }
        },
        dish_lang(dish) {
            const ret = {
                name: this.$i18n.locale === 'en' ? dish.name : dish.name_sr,
                category: this.$i18n.locale === 'en' ? dish.category : dish.category_sr
            };

            return ret;
        },
        sum(order) {
            let ret = 0;
            for (let i = 0; i < order.length; i++) {
                ret += order[i].price
            }
            return ret
        }
    },
    created: function () {
        this.cartItems = localStorage.getItem("cartItems")
        this.cartItems = this.cartItems ? JSON.parse(this.cartItems) : []

        this.username = localStorage.getItem("user")
        if (this.username) {
            this.username = JSON.parse(this.username)
        } else {
            this.username = "Pera"
            localStorage.setItem("user", JSON.stringify('Pera'))
        }

        this.orders = localStorage.getItem("orders")
        this.orders = this.orders ? JSON.parse(this.orders) : []
    },
    computed: {
        crumbs() {
            let ret = [
                { label: this.$t('nav.home'), to: '/' },
                { label: this.$t('nav.account'), to: '/my-account' }
            ]

            return ret
        }
    }
}
</script>