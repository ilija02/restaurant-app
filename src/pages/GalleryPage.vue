<template>
    <div class="min-h-screen bg-gray-100">
        <Header />
        <h1 class="text-3xl font-bold mt-4 mx-12">{{ $t('nav.gallery') }}</h1>
        <BreadCrumbs :crumbs="crumbs" class="mx-12" />
        <div class="flex flex-col md:flex-row items-center mx-12 pb-6">
            <div class="md:w-1/2 pr-2">
                <h2 class="text-2x1 font-semibold">{{ $t('gallery.images_title') }}
                    <fa icon='camera' />
                </h2>
                <ImageGallery :images="images" class="h-100" />
            </div>
            <div class="md:w-1/2 pl-2">
                <h2 class="text-2x1 font-semibold">{{ $t('gallery.videos_title') }}
                    <fa icon='play-circle' />
                </h2>
                <VideoGallery :videos="videos" />
            </div>
        </div>
    </div>
</template>

<script>
import ImageGallery from '@/components/ImageGalleryComponent.vue'
import Header from '@/components/layout/Header.vue'
import VideoGallery from '@/components/VideoGalleryComponent.vue'
import BreadCrumbs from '../components/navigation/BreadCrumbs.vue';

export default {
    name: "GalleryPage",
    components: {
        ImageGallery,
        Header,
        VideoGallery,
        BreadCrumbs
    },
    data() {
        return {
            images: [
                'img/restaurant.jpg',
                'img/restaurant1.jpg',
                'img/restaurant2.jpg',
                'img/restaurant3.jpg',
                'img/restaurant4.jpg'
            ],
            videos: [
                'dQw4w9WgXcQ',
                'dQw4w9WgXcQ',
                'dQw4w9WgXcQ'
            ],
        };
    },
    computed: {
        crumbs() {
            return [
                { label: this.$t('nav.home'), to: '/' },
                { label: this.$t('nav.gallery'), to: '/gallery' }
            ]
        }
    }
};
</script>