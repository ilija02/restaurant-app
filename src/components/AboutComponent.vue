<template>
    <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2">
            <img src="/img/restaurant.jpg" alt="About Us" class="w-full h-auto md:max-w-lg rounded-lg shadow-md">
        </div>
        <div class="md:w-1/2 mt-6 md:mt-0 md:ml-8">
            <h2 class="text-3xl font-semibold text-gray-800 mb-4">{{ $t("about.title") }}</h2>
            <p class="text-gray-700 leading-relaxed">
                {{ $t("about.description") }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style scoped></style>
