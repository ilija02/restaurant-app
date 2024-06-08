<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl text-center mb-8 relative">
            <span class="text-primary-500 py-1 px-4 rounded-lg">
                <fa icon="percent" /> {{ $t("home.deals") }}
            </span>
        </h1>
        <div v-if="deals.length > 0">
            <div v-for="(deal, index) in deals" :key="index" class="mb-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-base font-medium text-gray-700">{{ deal.title }}</h3>
                    <span class="text-primary-500 font-bold">{{ deal.discount }}</span>
                </div>
                <p class="text-sm text-gray-600">{{ deal.description }}</p>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-600">No current deals available.</p>
        </div>
    </div>
</template>

<script>
import deals from '@/data/deals'

export default {
    name: 'DealsComponent',
    computed: {
        deals() {
            return deals[this.$i18n.locale];
        }
    }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
