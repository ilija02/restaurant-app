<template>
    <nav aria-label="Breadcrumb" class="flex mt-4 mb-8">
      <ol class="flex">
        <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
          <router-link :to="crumb.to" class="text-gray-500 hover:text-gray-700">{{ crumb.label }}</router-link>
          <span v-if="index < crumbs.length - 1" class=" mx-2 h-5 w-auto text-gray-400">
            >
          </span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    name: "BreadCrumbs",
    props: {
      crumbs: {
        type: Array,
        required: true
      }
    }
  }
  </script>