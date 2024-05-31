<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Gallery</h1>
    <h2 class="text-xl font-semibold mb-2">Image Gallery</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <div v-for="image in images" :key="image.id" class="bg-gray-100 p-4">
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-48 object-cover mb-2"
        />
        <p>{{ image.caption }}</p>
      </div>
    </div>
    <h2 class="text-xl font-semibold mb-2">Video Gallery</h2>
    <div class="aspect-w-16 aspect-h-9">
      <iframe
        class="w-full h-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 1,
          src: "image1.jpg",
          alt: "Image 1",
          caption: "Delicious food 1",
        },
        {
          id: 2,
          src: "image2.jpg",
          alt: "Image 2",
          caption: "Delicious food 2",
        },
        {
          id: 3,
          src: "image3.jpg",
          alt: "Image 3",
          caption: "Delicious food 3",
        },
      ],
    };
  },
};
</script>
