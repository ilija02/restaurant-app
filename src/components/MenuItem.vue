<template>
    <div class="bg-white rounded-lg shadow-md p-4">
        <img src="@/assets/spring-rolls.jpg" alt=""
            class="h-40 w-full object-cover rounded-lg shadow-inner shadow-black">
        <div class="mt-4">
            <div class="flex flex-row justify-between items-end">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900">{{ dish.name }}</h3>
                    <p class="text-gray-600">{{ dish.category }}</p>
                    <p class="text-primary-500 font-bold">${{ dish.price }}</p>
                </div>
                <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600" @click="addToCart">
                    <fa icon="cart-plus" /> <span class="text-white text-sm pl-2">Add to cart
                    </span>
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
    methods: {
        addToCart() {
            // TODO: Implement add to cart functionality
        }
    },
};
</script>

<style scoped></style>
