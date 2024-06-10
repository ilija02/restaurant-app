<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <Header />
        <BreadCrumbs :crumbs="crumbs" class="mx-12" />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
            <div
                class="flex flex-col md:flex-row md:justify-between md:border-b-2 md:border-dashed md:border-gray-500  md:pb-2 mb-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ $t("menu.subtitle") }}</h2>

                <!-- Sorting and Searching -->
                <div class="flex flex-col md:flex-row md:justify-end flex-grow">
                    <div class="flex items-center space-x-2 md:mr-2 w-full md:w-auto">
                        <label for="sort" class="text-gray-700">{{ $t("menu.sort") }}:</label>
                        <select id="sort" v-model="sortKey"
                            class="p-2 border border-gray-300 rounded-md w-full md:w-auto">
                            <option value="name">{{ $t("menu.name") }}</option>
                            <option value="price">{{ $t("menu.price") }}</option>
                            <option value="rating">{{ $t("menu.rating") }}</option>
                        </select>
                    </div>
                    <div class="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                        <input type="text" v-model="searchQuery" :placeholder="$t('menu.find') + '...'"
                            class="p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                </div>
            </div>
            <!-- Category Tabs -->
            <div class="flex justify-center mb-8">
                <button v-for="category in categories" :key="category" @click="selectCategory(category)" :class="{
                    'bg-primary-500 text-white':
                        selectedCategory === categoryToSlug(category),
                    'bg-gray-200 text-gray-700':
                        selectedCategory !== categoryToSlug(category),
                }" class="px-4 py-2 mx-2 rounded-full focus:outline-none hover:bg-primary-500 hover:text-white">
                    {{ getTranslationCategory(category) }}
                </button>
            </div>

            <!-- Menu Items -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MenuItem v-for="dish in filteredAndSortedDishes" :key="dish.id" :dish="dish" />
            </div>
            <div v-if="filteredAndSortedDishes.length == 0" class="text-lg flex justify-center">
                <p>No such dish found</p>
            </div>
        </div>

        <!-- Modal for Dish Details -->
        <!-- <DishDetails v-if="selectedDish" :dish="selectedDish" @close="selectedDish = null" @add-to-cart="addToCart" /> -->

        <!-- Button to download menu as PDF -->
        <div class="fixed bottom-4 right-4 z-50">
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 shadow-black shadow-sm"
                @click="downloadMenu">
                {{ $t("menu.download") }}
            </button>
        </div>
    </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import Header from "@/components/layout/Header.vue";
import { dishes } from '@/data/dishes.js';
import downloadMenu from '@/util/menu.js'
import BreadCrumbs from "@/components/navigation/BreadCrumbs.vue";
export default {
    name: "MenuPage",
    components: {
        MenuItem,
        Header,
        BreadCrumbs
    },
    data() {
        return {
            selectedCategory: "all",
            categories: ["All", "Appetizers", "Main Courses", "Desserts"],
            sortKey: "name",
            searchQuery: "",
            dishes: dishes,
            selectedDish: null,
        };
    },
    computed: {
        filteredAndSortedDishes() {
            // console.log("Selected Category: ", this.selectedCategory);
            let filteredDishes = this.dishes.filter(
                (dish) =>
                    (this.selectedCategory === "all" ||
                        this.categoryToSlug(dish.category) ==
                        this.selectedCategory) &&
                    (dish.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        dish.price.toString().includes(this.searchQuery))
            );

            if (this.sortKey === "name") {
                filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortKey === "price") {
                filteredDishes.sort((a, b) => a.price - b.price);
            } else if (this.sortKey === "rating") {
                filteredDishes.sort((a, b) => b.rating - a.rating);
                console.log(filteredDishes.map(d => d.rating))
            }

            return filteredDishes;
        },
        crumbs() {
            let ret = [
                { label: this.$t('nav.home'), to: '/' },
                { label: this.$t('nav.menu'), to: '/menu' } ]

            let category = this.$route.params.category
            if (category) {
                ret.push({
                    label: this.$t('menu.' + category), to: '/menu/' + category
                })
            }
            return ret
        }
    },
    mounted: function () {
        this.selectedCategory = this.$route.params.category || "all";
    },
    updated: function () {
        this.selectedCategory = this.$route.params.category || "all";
    },
    methods: {
        getTranslationCategory(category) {
            if (this.$i18n.locale === 'en') {
                return category;
            }

            return this.$t("categories." + category);
        },
        viewDetails(dish) {
            this.selectedDish = dish;
        },
        addToCart(dish, portionSize, quantity) {
            console.log(
                `Added ${quantity} of ${dish.name} (${portionSize}) to cart.`
            );
        },
        selectCategory(category) {
            this.$router.push({
                name: "Menu",
                params: { category: this.categoryToSlug(category) },
            });
        },
        categoryToSlug(category) {
            return category.toLowerCase().replace(/\s+/g, "-");
        },
        downloadMenu, // from util/menu.js
    },
};
</script>

<style scoped></style>