<template>
    <footer class="py-2 flex items-center justify-center w-full z-10">

        <p class="text-center w-1/3 md:w-full text-sm italic ">&copy; 2024, Ilija Radosavljević, Zlatko Golubović, {{
            $t('footer_text')
        }}</p>
        <div class="h-12 md:hidden"></div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>