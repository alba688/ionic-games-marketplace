<script setup lang="ts">

interface Props {
    imageId: string;
}
defineProps<Props>();
</script>

<template>
    <img :src="`https://q4vuzuzc.directus.app/assets/${imageId}`" />
</template>