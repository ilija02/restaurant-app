<template>
    <div class="map-container relative z-10 h-96 w-full">
        <div class="map object-cover w-full h-full" ref="map"></div>
    </div>
</template>

<style></style>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    name: "MapComponent",
    mounted() {
        this.initMap();
        setTimeout(() => {
            this.map.invalidateSize();
        }, 0);
    },
    methods: {
        initMap() {
            let latitude = 44.7845768
            let longitude = 20.4693792

            this.map = L.map(this.$refs.map).setView([latitude, longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        }
    }
}
</script>