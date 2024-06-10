<template>
    <div class="gallery" style="height: 60vh;">
        <div class="relative h-full">
            <img :src="images[currentIndex]" :alt="`Image ${currentIndex + 1}`" class="w-full h-full object-cover rounded-lg shadow-md">
            <button @click="prevImage" :style="{opacity: arrowShow ? 1 : 0.5}" @mouseover="showArrow()" @mouseleave="hideArrow()" class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-l-md">←</button>
            <button @click="nextImage" :style="{opacity: arrowShow ? 1 : 0.5}" @mouseover="showArrow()" @mouseleave="hideArrow()" class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-r-md">→</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImageGallery",
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
            timer: null,
            arrowShow: false
        };
    },
    mounted: function() {
        this.startTimer()
    },
    beforeDestroy: function() {
        this.stopTimer()
    },
    methods: {
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.nextImage();
            }, 7500);
        },
        stopTimer() {
            clearInterval(this.timer);
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