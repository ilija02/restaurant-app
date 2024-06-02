<template>
    <div class="min-h-screen bg-gray-100">
        <Header />

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Menu</h2>

            <!-- Sorting and Searching -->
            <div class="flex flex-col md:flex-row md:justify-between mb-8">
                <div class="flex items-center space-x-4">
                    <label for="sort" class="text-gray-700">Sort by:</label>
                    <select id="sort" v-model="sortKey" class="p-2 border border-gray-300 rounded-md">
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <div class="flex items-center space-x-4 mt-4 md:mt-0">
                    <input type="text" v-model="searchQuery" placeholder="Search..."
                        class="p-2 border border-gray-300 rounded-md" />
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
                    {{ category }}
                </button>
            </div>

            <!-- Menu Items -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MenuItem v-for="dish in filteredAndSortedDishes" :key="dish.id" :dish="dish" />
            </div>
        </div>

        <!-- Modal for Dish Details -->
        <!-- <DishDetails v-if="selectedDish" :dish="selectedDish" @close="selectedDish = null" @add-to-cart="addToCart" /> -->

        <!-- Button to download menu as PDF -->
        <div class="fixed bottom-4 right-4">
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 shadow-black shadow-sm"
                @click="downloadMenu">
                Download Menu
            </button>
        </div>
    </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import DishDetails from "@/components/DishDetails.vue";
import Header from "@/components/layout/Header.vue";
import { jsPDF } from "jspdf";

export default {
    name: "MenuPage",
    components: {
        MenuItem,
        DishDetails,
        Header,
    },
    data() {
        return {
            selectedCategory: this.$route.params.category || "All", // Get category from URL
            categories: ["All", "Appetizers", "Main Courses", "Desserts"],
            sortKey: "name",
            searchQuery: "",
            dishes: [
                {
                    id: 1,
                    name: "Spring Rolls",
                    category: "Appetizers",
                    price: 5,
                    image: "/img/food/spring-rolls.jpg",
                    smallPortion: 5,
                    largePortion: 8,
                    rating: 4.2,
                },
                {
                    id: 2,
                    name: "Sweet and Sour Pork",
                    category: "Main Courses",
                    price: 10,
                    image: "/img/food/sweet-sour-pork.jpg",
                    smallPortion: 10,
                    largePortion: 15,
                    rating: 4.5,
                },
                {
                    id: 3,
                    name: "Fried Ice Cream",
                    category: "Desserts",
                    price: 6,
                    image: "/img/food/fried-ice-cream.jpg",
                    smallPortion: 6,
                    largePortion: 9,
                    rating: 4.0,
                },
            ],
            selectedDish: null,
        };
    },
    computed: {
        filteredAndSortedDishes() {
            console.log("Selected Category: ", this.selectedCategory);
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
            }

            return filteredDishes;
        },
    },
    updated: function () {
        this.selectedCategory = this.$route.params.category || "All";
    },
    methods: {
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
        downloadMenu() {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Menu", 14, 22);

            let yPosition = 30;
            this.dishes.forEach((dish, index) => {
                if (index > 0 && index % 20 === 0) {
                    doc.addPage();
                    yPosition = 30;
                }
                doc.setFontSize(12);
                doc.text(`${dish.name} - $${dish.price}`, 14, yPosition);
                yPosition += 10;
            });

            doc.save("menu.pdf");
        },
    },
};
</script>

<style scoped></style>
