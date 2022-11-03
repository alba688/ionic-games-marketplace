<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonFab, IonFabButton } from '@ionic/vue';
import { ref } from 'vue';
import { logInOutline, add } from 'ionicons/icons';

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
      imageURL: "https://obriens.no/40316-large_default/crash-bandicoot-the-wrath-of-cortex-playstation-2.jpg"
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
        imageURL: "https://i.ytimg.com/vi/mzLAZoOUMso/hqdefault.jpg"
      }
    );
  gameAdvertisements.value.unshift(newGame);
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button v-on:click="addGameAdvertisement">+</ion-button>
        </ion-buttons>
        <ion-title>RetroTise Market 🎮</ion-title>
        <ion-buttons slot="end">
            <ion-button router-link="/login">
              <ion-icon :icon="logInOutline"></ion-icon>
            </ion-button>
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
        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
            <ion-fab-button>
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>
