<template>
    <div class="fixed bottom-4 left-4 transform z-50 ">
        <div v-if="showOptions">
            <button @click="setLanguage('en')"
                class="block w-24 bg-white text-gray-900 px-4 py-2 rounded-full shadow-md focus:outline-none mb-1">English</button>
            <button @click="setLanguage('sr')"
                class="block w-24 bg-white text-gray-900 px-4 py-2 rounded-full shadow-md focus:outline-none mb-1">Serbian</button>
        </div>
        <button @click="toggleOptions"
            class="bg-primary-500 text-white px-4 py-2 rounded-full  focus:outline-none shadow-sm shadow-gray-900">
            <fa icon="flag" class="mr-1" />
            {{ this.$i18n.locale }}
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showOptions: false,
        };
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
        setLanguage(lang) {
            this.$i18n.locale = lang;
            this.showOptions = false;
        },
    },
};
</script>

<style scoped></style>