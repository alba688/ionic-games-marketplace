<script setup lang="ts">
import { IonContent, IonPage, IonCard, IonButton} from '@ionic/vue';

  /* const addGameAdvertisement = () => {
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
}*/

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
