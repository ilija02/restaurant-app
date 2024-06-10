<template>
    <div>
        <Header />
        <div class="flex flex-col md:flex-row items-center mx-12 py-6 border-b-2 border-gray-200 border-dashed">
            <div class="md:w-1/2 mt-6 md:mt-0 md:mr-8">
                <h2 class="text-3xl font-semibold text-gray-800 mb-4">{{ $t("about.title") }}</h2>
                <p class="text-gray-700 leading-relaxed">
                    {{ $t("about.description") }}
                </p>
            </div>
            <ImageGallery :images="galleryImages" class="md:w-1/2"/>
        </div>
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
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 mx-12 pt-6">{{ $t('about.address_tel_title') }}</h2>
        <div class="flex flex-col md:flex-row items-center mx-12 py-6">
            <div class="md:w-1/2 min-w-0">
                <Map />
            </div>
            <table class="md:w-1/2 mt-6 md:mt-0 md:ml-8">
                <tr>
                    <td class="text-smallcaps font-bold">{{ $t('about.address_title') }}:</td>
                    <td>{{ $t('about.address') }}</td>
                </tr>
                <tr>
                    <td class="text-smallcaps font-bold">Tel:</td>
                    <td>+123 456 7890</td>
                </tr>
            </table>
        </div>
        <Footer />
    </div>
</template>

<style>
.text-smallcaps{
    font-variant: small-caps;
}
</style>

<script>
import ImageGallery from '@/components/ImageGalleryComponent.vue';
import Header from "@/components/layout/Header.vue";
import Footer from '@/components/layout/Footer.vue';
import Map from '@/components/MapComponent.vue'

export default {
    components: {
        ImageGallery,
        Header,
        Footer,
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
            ]
        };
    },
    computed: {
        restaurant_prizes() {
            return this.$i18n.locale === 'en' ? [ 
                {name: "Michelin Star", desc: "Recipient of Two Michelin Stars"}, 
                {name: "Best Chinese Restaurant Award", desc: "Winner of the award for the best restaurant in the region"}, 
                {name: "Master Chef Certificate", desc: "A certificate awarded only to a true master of culinary skills"} ] 
                : [ 
                {name: "Mišelin Zvezda", desc: "Dobitnik Dve Mišelin Zvezde"}, 
                {name: "Nagrada za Najbolji Kineski Restoran", desc: "Winner of the award for the best restaurant in the region"}, 
                {name: "Master Šef Sertifikat", desc: "Sertifikat koji se dodeljuje samo pravom majstoru kulinarskih veština"} ]
        },
        site_prizes() {
            return this.$i18n.locale === 'en' ? [ 
            {name: "Top Online Ordering Platform", desc: "An exceptional online ordering system"},
            {name: "Customer Choice Award", desc: "Based on customer reviews and ratings, restaurant's consistently excellent food, service, and online presence was acknowledged"} ] 
            : [ 
            {name: "Vodeća Platforma za Online Naručivanje", desc: "Izuzetan sistem online naručivanja restorana"},
            {name: "Nagrada Izbora Korisnika", desc: "Zasnovana na recenzijama i ocenama korisnika na platformama, konzistentno izvanredna hrana, usluga i online prisustvo su prepoznati"} ]
        }
    },
};
</script>