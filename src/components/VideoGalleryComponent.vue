<template>
    <div class="gallery relative h-full w-full">
        <iframe ref="video" :src="youtubeEmbedUrl(videos[currentIndex])" allow="autoplay; encrypted-media"
            allowfullscreen class="w-full h-full rounded-lg shadow-md"></iframe>
        <button @click="prevVideo" :style="{ opacity: arrowShow ? 1 : 0.5 }" @mouseover="showArrow()"
            @mouseleave="hideArrow()"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-l-md">←</button>
        <button @click="nextVideo" :style="{ opacity: arrowShow ? 1 : 0.5 }" @mouseover="showArrow()"
            @mouseleave="hideArrow()"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-r-md">→</button>
    </div>
</template>


<script>
export default {
    name: "VideoGallery",
    props: {
        videos: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
            arrowShow: false,
        };
    },
    methods: {
        youtubeEmbedUrl(videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        },
        nextVideo() {
            this.currentIndex = (this.currentIndex + 1) % this.videos.length;
            this.updateVideo();
        },
        prevVideo() {
            this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
            this.updateVideo();
        },
        updateVideo() {
            const iframe = this.$refs.video;
            iframe.src = this.youtubeEmbedUrl(this.videos[this.currentIndex]);
        },
        showArrow() {
            this.arrowShow = true;
        },
        hideArrow() {
            this.arrowShow = false;
        },
    },
    watch: {
        currentIndex() {
            this.updateVideo();
        }
    },
};
</script>

<style></style>
