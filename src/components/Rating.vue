<template>
    <div class="flex items-center">
        <fa icon="star" v-for="i in 5" :key="i"
            :class="{ 'text-yellow-500': i <= rating, 'text-gray-300': i > rating }" />
    </div>
</template>

<script>
export default {
    name: "Rating",
    props: {
        rating: {
            required: true,
            type: Number
        }
    }
};
</script>

<style scoped></style>