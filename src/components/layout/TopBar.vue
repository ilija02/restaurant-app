<template>
    <div class="bg-gray-600 text-white text-sm py-1 flex justify-between items-center px-4 md:px-8">
        <div>
            <span class="hidden md:inline">
                <fa icon="home" />
            </span> {{ $t("restaurant.topbar") }}
        </div>
        <div>
            <span class="hidden md:inline">
                <fa icon="phone" />
            </span> <a href="tel:+1234567890">+123 456 7890</a>
        </div>
    </div>

</template>