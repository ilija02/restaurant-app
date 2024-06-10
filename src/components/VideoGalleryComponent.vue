<template>
    <div class="gallery">
        <div class="relative h-full">
            <video ref="video" :src="videos[currentIndex]" controls
                class="w-full h-full object-cover rounded-lg shadow-md" @ended="handleEnd()"></video>
            <button @click="prevVideo" :style="{ opacity: arrowShow ? 1 : 0.5 }" @mouseover="showArrow()"
                @mouseleave="hideArrow()"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-l-md">←</button>
            <button @click="nextVideo" :style="{ opacity: arrowShow ? 1 : 0.5 }" @mouseover="showArrow()"
                @mouseleave="hideArrow()"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-r-md">→</button>
        </div>
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
            arrowShow: false
        };
    },
    methods: {
        nextVideo() {
            this.$refs.video.pause();
            this.handleEnd();
        },
        prevVideo() {
            this.$refs.video.pause();
            this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
        },
        handleEnd() {
            this.currentIndex = (this.currentIndex + 1) % this.videos.length;
        },
        showArrow() {
            this.arrowShow = true
        },
        hideArrow() {
            this.arrowShow = false
        }
    },
};
</script>