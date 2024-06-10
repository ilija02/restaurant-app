<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header Section -->
        <Header />
        <BreadCrumbs :crumbs="crumbs" class="mx-12" />

        <!-- About Section -->
        <div class="flex flex-col md:flex-row items-center mx-12 py-6 border-b-2 border-gray-200 border-dashed">
            <div class="md:w-1/2 mt-6 md:mt-0 md:mr-8">
                <h2 class="text-3xl font-semibold text-gray-800 mb-4">{{ $t("about.title") }}</h2>
                <p class="text-gray-700 leading-relaxed">
                    {{ $t("about.description") }}
                </p>
            </div>
            <ImageGallery :images="galleryImages" class="md:w-1/2" />
        </div>

        <!-- Prizes Section -->
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 mx-12 pt-6">{{ $t('about.prizes_title') }}</h2>
        <div class="flex flex-col md:flex-row items-center px-12 py-6">
            <ImageGallery :images="galleryRestaurantPrizes" class="md:w-1/2" />
            <div class="md:w-1/2 mt-6 md:mt-0 md:ml-8">
                <ul class="text-gray-700 leading-relaxed list-disc">
                    <li v-for="prize in restaurant_prizes" :key="prize.name" class="ml-4">
                        <p class="font-bold text-smallcaps text-lg">{{ prize.name }}</p>
                        <p>{{ prize.desc }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col md:flex-row items-center mx-12 py-6 border-b-2 border-gray-200 border-dashed">
            <div class="md:w-1/2 mt-6 md:mt-0 md:mr-8">
                <ul class="text-gray-700 leading-relaxed list-disc">
                    <li v-for="prize in site_prizes" :key="prize.name" class="ml-4">
                        <p class="font-bold text-smallcaps text-lg">{{ prize.name }}</p>
                        <p>{{ prize.desc }}</p>
                    </li>
                </ul>
            </div>
            <ImageGallery :images="gallerySitePrizes" class="md:w-1/2" />
        </div>

        <!-- Contact and Map Section -->
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 mx-12 pt-6">{{ $t('about.address_tel_title') }}</h2>
        <div class="flex flex-col md:flex-row items-center mx-12 py-6">
            <div class="md:w-1/2 min-w-64 w-full">
                <Map />
            </div>
            <div class="md:w-1/2 mt-6 md:mt-0 md:ml-8">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <table class="w-full">
                        <tbody>
                            <tr class="flex items-center space-x-2 mb-4">
                                <td class="text-gray-700 font-bold flex items-center">
                                    <fa icon="home" class="text-primary-500 mr-2" /> {{ $t('about.address_title') }}:
                                </td>
                                <td class="text-gray-600">
                                    {{ $t('about.address') }}
                                </td>
                            </tr>
                            <tr class="flex items-center space-x-2">
                                <td class="text-gray-700 font-bold flex items-center">
                                    <fa icon="phone" class="text-primary-500 mr-2" /> Tel:
                                </td>
                                <td class="text-gray-600">
                                    +123 456 7890
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Banners Section -->
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 mx-12 pt-6">{{ $t('about.banners_title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12 mb-8 p-4">
            <div v-for="banner in banners" :key="banner.url" class="flex justify-center">
                <a :href="banner.url" target="_blank" rel="noopener noreferrer">
                    <img :src="banner.image" :alt="banner.alt"
                        class="h-32 w-64 object-cover rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300" />
                </a>
            </div>
        </div>

    </div>
</template>

<style scoped>
.text-smallcaps {
    font-variant: small-caps;
}
</style>

<script>
import ImageGallery from '@/components/ImageGalleryComponent.vue';
import Header from "@/components/layout/Header.vue";
import Map from '@/components/MapComponent.vue';
import BreadCrumbs from '@/components/navigation/BreadCrumbs.vue';

export default {
    components: {
        ImageGallery,
        Header,
        BreadCrumbs,
        Map
    },
    data() {
        return {
            galleryImages: [
                '/img/restaurant.jpg',
                '/img/restaurant1.jpg',
                '/img/restaurant2.jpg'
            ],
            galleryRestaurantPrizes: [
                '/img/prizes/restaurant_prize1.jpg',
                '/img/prizes/restaurant_prize2.jpg',
                '/img/prizes/restaurant_prize3.jpg'
            ],
            gallerySitePrizes: [
                '/img/prizes/site_prize1.jpg',
                '/img/prizes/site_prize2.jpg'
            ],
            banners: [
                {
                    url: 'https://instantwok.com/',
                    image: '/img/banners/instant-wok.png',
                    alt: 'Banner 1 Description'
                },
                {
                    url: 'https://tripleeightsupplies.com/',
                    image: '/img/banners/888-logo.svg',
                    alt: 'Banner 2 Description'
                },
                {
                    url: 'https://asianhomegourmetdirect.co.uk/',
                    image: '/img/banners/asian-home-gourmet.jpg',
                    alt: 'Banner 3 Description'
                }
            ]
        };
    },
    computed: {
        restaurant_prizes() {
            return this.$i18n.locale === 'en' ? [
                { name: "Michelin Star", desc: "Recipient of Two Michelin Stars" },
                { name: "Best Chinese Restaurant Award", desc: "Winner of the award for the best restaurant in the region" },
                { name: "Master Chef Certificate", desc: "A certificate awarded only to a true master of culinary skills" }
            ] : [
                { name: "Mišelin Zvezda", desc: "Dobitnik Dve Mišelin Zvezde" },
                { name: "Nagrada za Najbolji Kineski Restoran", desc: "Dobitnik nagrade za najbolji restoran u regionu" },
                { name: "Master Šef Sertifikat", desc: "Sertifikat koji se dodeljuje samo pravom majstoru kulinarskih veština" }
            ];
        },
        site_prizes() {
            return this.$i18n.locale === 'en' ? [
                { name: "Top Online Ordering Platform", desc: "An exceptional online ordering system" },
                { name: "Customer Choice Award", desc: "Based on customer reviews and ratings, restaurant's consistently excellent food, service, and online presence was acknowledged" }
            ] : [
                { name: "Vodeća Platforma za Online Naručivanje", desc: "Izuzetan sistem online naručivanja restorana" },
                { name: "Nagrada Izbora Korisnika", desc: "Zasnovana na recenzijama i ocenama korisnika, konzistentno izvanredna hrana, usluga i online prisustvo su prepoznati" }
            ];
        },
        crumbs() {
            return [
                { label: this.$t('nav.home'), to: '/' },
                { label: this.$t('nav.about'), to: '/about' }
            ];
        }
    }
};
</script>
