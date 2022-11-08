<script setup lang="ts">
    defineProps(["imageId"]);
</script>

<template>
    <img :src="`https://q4vuzuzc.directus.app/assets/${imageId}`" />
</template>