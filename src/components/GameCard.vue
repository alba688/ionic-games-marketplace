<script setup lang="ts">
    import {IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard } from '@ionic/vue';
    import GameImage from '@/components/GameImage.vue'
    defineProps(["game"]);


</script>

<template>

  <ion-card :router-link="'/detail/' + game.id">
      <ion-card-header>
        <game-image :image-id="game.image.id"/>

        <ion-card-title color="secondary">{{ game.title}}</ion-card-title>
        <ion-card-subtitle color="medium">
          {{game.platform}} ({{game.condition}})
        </ion-card-subtitle>
    </ion-card-header>
      
    </ion-card>

</template>

<style scoped>

</style>