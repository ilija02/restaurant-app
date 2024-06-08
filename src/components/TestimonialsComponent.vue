<template>
    <div class="bg-gray-100 rounded-lg">
        <h1 class="text-3xl text-center mb-8 relative">
            <span class=" text-primary-500 py-1 px-4 rounded-lg">
                <fa icon="quote-left" /> {{ $t("home.testimonials") }}
            </span>
        </h1>
        <div v-if="testimonials.length > 0">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="mb-4">
                <div class="bg-white rounded-lg shadow-md p-4">
                    <div class="flex items-center mb-2">
                        <div class="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center">
                            <fa icon="user" />
                        </div>
                        <div class="ml-2">
                            <h3 class="text-sm font-semibold text-gray-800">{{ testimonial.name }}</h3>
                            <p class="text-xs text-gray-600">{{ testimonial.position }}</p>
                        </div>
                    </div>
                    <div class="relative">
                        <p class="text-sm text-gray-700 leading-relaxed">{{ testimonial.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-600">No testimonials available.</p>
        </div>
    </div>
</template>

<script>
import all_testimonials from '@/data/testimonials.js'

export default {
    name: 'TestimonialsComponent',
    computed: {
        testimonials() {
            const ret = all_testimonials.map(testimonial => {
                return {
                    ...testimonial,
                    comment: this.$i18n.locale === 'en' ? testimonial.comment_en : testimonial.comment_sr,
                    position: this.$i18n.locale === "en" ? testimonial.position_en : testimonial.position_sr
                };
            });
            return ret;
        }
    }


};
</script>

<style scoped></style>