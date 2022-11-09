<script setup lang="ts">
  import {IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard } from '@ionic/vue';
  import GameImage from '@/components/GameImage.vue'
  
  interface Props {
    game: {
      id: number;
      image: {
        id: string;
      };
      title: string;
      price: number;
      platform: string;
      condition: string;
      description: string;
    }
  }
    defineProps<Props>();


</script>

<template>

  <ion-card :router-link="'/detail/' + game.id">
      <ion-card-header>
        <game-image :image-id="game.image.id"/>

        <ion-card-title color="secondary">{{ game.title}}</ion-card-title>
        <h1>{{game.price}}</h1>
        <ion-card-subtitle color="medium">
          {{game.platform}} ({{game.condition}})
        </ion-card-subtitle>
    </ion-card-header>
      <ion-card-content>
        <p>{{game.description}}</p>
      </ion-card-content>
    </ion-card>

</template>

<style scoped>

</style>