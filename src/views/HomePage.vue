<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { ref } from 'vue';

  const gameAdvertisements = ref([
    {
      id: 1,
      title: "Super Mario Bros",
      description: "Original game from 1985. Mario is on a quest to find Princess Toadstool and topple the Turtle Tribe.",
      platform: "Nintendo",
      price: 500,
      condition: "Used",
      address: "Gulveien 30",
      imageURL: "https://i.etsystatic.com/24827046/r/il/d74bb4/2602346868/il_fullxfull.2602346868_mf3n.jpg"
    },
    {
      id: 2,
      title: "Crash Bandicoot",
      description: "A marsupial on a mission, Crash takes you on a tropical island adventure filled with precarious enemies and challenging levels.",
      platform: "Playstation",
      price: 350,
      condition: "Used",
      address: "Blueveien 40",
      imageURL: "https://www.playerschoicevideogames.com/prod_images_blowup/crashteamracing.jpg"
    }
  ]);

  const addGameAdvertisement = () => {
    const newGame = (
      {
        id: 3,
        title: "Frogger",
        description: "Hop through nine gaming worlds and dozens of levels based on themes from the original game.",
        platform: "Playstation",
        price: 175,
        condition: "Used",
        address: "Lillaveien 50",
        imageURL: "https://upload.wikimedia.org/wikipedia/en/1/16/Froggercover.png"
      }
    );
  gameAdvertisements.value.unshift(newGame);
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Retro Game Market 🎮</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="addGameAdvertisement">+</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-card v-for="game in gameAdvertisements" :key="game.id" :router-link="'/detail/' + game.id">
        <img :src="game.imageURL" height="150" :alt="'image of ' + game.title"/>
        <ion-card-header>
          <ion-card-subtitle>{{game.price}} kr</ion-card-subtitle>
          <ion-card-title>{{ game.title}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{game.description}}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>
