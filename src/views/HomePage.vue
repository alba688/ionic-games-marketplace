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
  
  <ion-content :fullscreen="true">
    <ion-card>
      <ion-img
          src="https://illlustrations.co/static/a8bffeb0395117a5c2d54c770d50e80e/ee604/day2-gaming-console.png"/>

          <h1
          class="ion-text-center ion-padding-bottom"
          color="primary">Welcome to RetroTise</h1>
    </ion-card>

    <ion-button router-link="/login" expand="block" fill="solid" color="primary" class="ion-padding ion-padding-bottom">
      Login to RetroTise
    </ion-button>
    <ion-button router-link="/market" expand="block" fill="outline" color="primary" class="ion-padding">
      View Marketplace
    </ion-button>


  </ion-content>
</ion-page>
</template>

<style scoped>

</style>
