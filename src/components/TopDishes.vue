<template>
    <div class="flex flex-col">
        <h1 class="text-3xl text-center mb-8 relative">
            <span class="bg-primary-50 text-primary-500 py-1 px-4 rounded-lg">
                <fa icon="trophy" /> {{ $t("home.best_dishes") }}
            </span>
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MenuItem v-for="dish in topDishes" :key="dish.id" :dish="dish" />
        </div>
    </div>
</template>

<script>
import { dishes } from '@/data/dishes.js';
import MenuItem from "@/components/MenuItem.vue";

export default {
    name: 'TopDishes',
    components: {
        MenuItem
    },
    data() {
        return {
            dishes,
        };
    },
    computed: {
        topDishes() {
            return this.dishes.sort((a, b) => b.rating - a.rating).slice(0, 3);
        },
    },
};
</script>

<style scoped></style>